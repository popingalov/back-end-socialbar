import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

//
import { UpdateCocktailDto } from './dto/update-cocktail.dto';
//
import filterDefault from '../../helpers/filterDefaultCocktails';
import filterMy from '../../helpers/filterMyCocktails';
import { FavoriteService } from '../favorite/favorite.service';
import addFavoriteAndICan from '../../helpers/addFavoriteAndICan';
import errorGenerator from '../../helpers/errorGenerator';
import { Cocktail, CocktailDocument } from './shame/cocktails.schema';
import {
  IngredientListDocument,
  IngredientList,
} from '../ingredient-list/schema/ingredientList.schema';
import { Favorite } from '../favorite/shema/favorite.schema';
import { IDefaultCocktails } from './dto/returnDefaultCocktails.dto';
import { ShopingList } from '../shoping-list/schema/shoping-list.schema';
import { IMyCocktails } from './dto/returnMyCocktails.dto';
// ! s3
import getFileName from 'src/helpers/imageHeplers/getFileName';
import { v4 as uuidv4 } from 'uuid';
import { S3 } from 'aws-sdk';

@Injectable()
export class CocktailsService {
  constructor(
    private readonly FavoriteService: FavoriteService,
    @InjectModel(Cocktail.name)
    private readonly cocktailModel: Model<CocktailDocument>,
    @InjectModel(IngredientList.name)
    private readonly IngredientListModel: Model<IngredientListDocument>,
  ) {}

  async createOne(cocktail): Promise<Cocktail> {
    // console.log(cocktail);

    const langBody = {
      owner: cocktail.owner,
      en: cocktail,
      ua: cocktail,
      ru: cocktail,
    };

    const newCocktail = await this.cocktailModel.create(langBody);
    // await newCocktail.save();

    return newCocktail;
  }

  async getDefault(): Promise<IDefaultCocktails> {
    // !
    const language = 'en';
    // !
    const owner = process.env.OWNER;
    const cocktails: Cocktail[] = await this.cocktailModel
      .find({ owner }, `-__v -owner ${language}`)
      .populate('ingredients.data', ['id', 'title', 'description', 'image'])
      .populate('glass')
      .populate('ingredients.alternatives');
    const ingredients: ShopingList = await this.IngredientListModel.findOne({
      owner,
    });
    const favorite: Favorite = await this.FavoriteService.getAll({ owner });

    const result: IDefaultCocktails = filterDefault(
      cocktails,
      ingredients,
      favorite,
    );
    return result;
  }

  async getMyDefault({ owner }): Promise<IDefaultCocktails> {
    console.log('THIS');
    // !
    const language = 'en';
    console.log(language);
    // !
    const defaultOwner = process.env.OWNER;
    const [cocktails, ingredients, favorite]: [
      Cocktail[],
      IngredientList,
      Favorite,
    ] = await Promise.all([
      this.cocktailModel
        .find({ title: '' }, `${language}`)
        .populate(`${language}.ingredients.data`, [
          'id',
          'title',
          'description',
          'image',
        ])
        .populate(`${language}.glass`, '-__v')
        .populate(`${language}.ingredients.alternatives`),
      this.IngredientListModel.findOne({
        owner: owner,
      }),
      this.FavoriteService.getAll({ owner }),
    ]);
    // console.log(cocktails);

    const result: IDefaultCocktails = filterDefault(
      cocktails,
      ingredients,
      favorite,
    );
    return result;
  }

  async getMyCocktails({ owner }): Promise<IMyCocktails> {
    // !
    const language = 'en';
    console.log(language);
    // !

    const [cocktails, ingredients, favorite, defaultObj]: [
      Cocktail[],
      IngredientList,
      Favorite,
      IDefaultCocktails,
    ] = await Promise.all([
      this.cocktailModel
        .find({ owner }, `${language}`)
        .populate(`${language}.ingredients.data`, [
          'id',
          'title',
          'description',
          'image',
        ])
        .populate(`${language}.glass`, '-__v')
        .populate(`${language}.ingredients.alternatives`),
      this.IngredientListModel.findOne({
        owner,
      }),
      this.FavoriteService.getAll({ owner }),
      this.getMyDefault({ owner }),
    ]);

    const myObj = filterMy(cocktails, ingredients, favorite);
    // console.log(myObj);

    const mine = myObj.all.length === 0 ? null : myObj.mine;
    const result = {
      haveAll: myObj.haveAll.concat(defaultObj.haveAll),
      needMore: myObj.needMore.concat(defaultObj.needMore),
      other: myObj.other.concat(defaultObj.other),
      all: myObj.all.concat(defaultObj.all),
      mine,
    };
    return result;
  }

  async getById({ id, owner }): Promise<Cocktail> {
    try {
      const [cocktail, favorite, ingredients] = await Promise.all([
        this.cocktailModel
          .findById(id, '-__v -owner')
          .populate('ingredients.data', ['id', 'title', 'description', 'image'])
          .populate('glass')
          .populate('ingredients.alternatives'),
        this.FavoriteService.getAll({ owner }),
        this.IngredientListModel.findOne({
          owner,
        }),
      ]);
      const result = addFavoriteAndICan(cocktail, ingredients, favorite);
      return result;
    } catch (error) {
      errorGenerator('Wrong ID , ingredient not found', 'NOT_FOUND');
    }
  }

  async deleteMy({ userId, id }): Promise<void> {
    await this.cocktailModel.findOneAndDelete({ owner: userId, id });
  }

  async findByIngredient({ id }): Promise<Cocktail[]> {
    return await this.cocktailModel.find({ 'ingredients.data': id });
  }

  async updateOne(
    id: Types.ObjectId,
    cocktail: UpdateCocktailDto,
  ): Promise<Cocktail> {
    const { title, description } = cocktail;
    const updateCocktail = this.cocktailModel.findByIdAndUpdate(
      id,
      { title, description },
      {
        new: true,
      },
    );
    return await updateCocktail;
  }

  // todo work with image and s3

  async uploadImage(dataBuffer: Buffer, fileName: string) {
    const s3 = new S3();
    const result = await s3
      .upload({
        Bucket: process.env.AWS_BUCKET_NAME,
        Body: dataBuffer,
        Key: `${uuidv4()}-${fileName}`,
      })
      .promise();
    return result;
  }

  async deleteImage(fileName: string) {
    if (!fileName) return;
    const newFileName = getFileName(fileName);
    const s3 = new S3();
    await s3.deleteObject(
      { Bucket: process.env.AWS_BUCKET_NAME, Key: newFileName },
      (err, data) => {
        if (!err) console.log('Delete data', data);
        else console.log(err, err.stack);
      },
    );
  }
}
