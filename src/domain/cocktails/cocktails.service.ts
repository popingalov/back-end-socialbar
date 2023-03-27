import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UpdateCocktailDto } from './dto/update-cocktail.dto';

// ? Helpers
import filterDefault from '../../helpers/filterDefaultCocktails';
import filterMy from '../../helpers/filterMyCocktails';
import addFavoriteAndICan from '../../helpers/addFavoriteAndICan';
import errorGenerator from '../../helpers/errorGenerator';

// ?
import { FavoriteService } from '../favorite/favorite.service';
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

  // todo METHODS
  async createOne(cocktail): Promise<Cocktail> {
    const langBody = {
      owner: cocktail.owner,
      en: cocktail,
    };

    const newCocktail = await this.cocktailModel.create(langBody);
    // await newCocktail.save();
    return newCocktail;
  }

  async getDefault({ lang = 'en' }): Promise<IDefaultCocktails> {
    const owner = process.env.OWNER;

    const cocktails: Cocktail[] = await this.cocktailModel
      .find({ owner }, `${lang}`)
      .populate(`${lang}.ingredients.data`, [
        `${lang}.id`,
        `${lang}.title`,
        `${lang}.description`,
        `${lang}.picture`,
      ])
      .populate(`${lang}.glass`, '-__v')
      .populate(`${lang}.ingredients.alternatives`);

    const ingredients: ShopingList = await this.IngredientListModel.findOne({
      owner,
    });
    const favorite: Favorite = await this.FavoriteService.getAll({
      owner,
      lang,
    });

    const result: IDefaultCocktails = filterDefault(
      cocktails,
      ingredients,
      favorite,
      lang,
    );
    return result;
  }

  async getMyDefault({ owner, lang = 'en' }): Promise<IDefaultCocktails> {
    const defaultOwner = process.env.OWNER;

    const [cocktails, ingredients, favorite]: [
      Cocktail[],
      IngredientList,
      Favorite,
    ] = await Promise.all([
      this.cocktailModel
        .find({ owner: defaultOwner }, `${lang}`)
        .populate(`${lang}.ingredients.data`, [
          `${lang}.id`,
          `${lang}.title`,
          `${lang}.description`,
          `${lang}.picture`,
        ])
        .populate(`${lang}.glass`, '-__v')
        .populate(`${lang}.ingredients.alternatives`),
      this.IngredientListModel.findOne({
        owner: owner,
      }),
      this.FavoriteService.getAll({ owner, lang }),
    ]);

    const result: IDefaultCocktails = filterDefault(
      cocktails,
      ingredients,
      favorite,
      lang,
    );
    return result;
  }

  async getMyCocktails({ owner, lang = 'en' }): Promise<IMyCocktails> {
    const [cocktails, ingredients, favorite, defaultObj]: [
      Cocktail[],
      IngredientList,
      Favorite,
      IDefaultCocktails,
    ] = await Promise.all([
      this.cocktailModel
        .find({ owner }, `${lang}`)
        .populate(`${lang}.ingredients.data`, [
          `${lang}.id`,
          `${lang}.title`,
          `${lang}.description`,
          `${lang}.picture`,
        ])
        .populate(`${lang}.glass`, '-__v')
        .populate(`${lang}.ingredients.alternatives`),
      this.IngredientListModel.findOne({
        owner,
      }),
      this.FavoriteService.getAll({ owner, lang }),
      this.getMyDefault({ owner, lang }),
    ]);

    const myObj = filterMy(cocktails, ingredients, favorite, lang);
    const mine = myObj.all.length === 0 ? null : myObj.mine;

    const result = {
      haveAll: myObj.haveAll.concat(defaultObj.haveAll),
      needMore: myObj.needMore.concat(defaultObj.needMore),
      other: myObj.other.concat(defaultObj.other),
      all: myObj.all.concat(defaultObj.all),
      mine,
      lang,
    };
    return result;
  }

  async getById({ id, owner, lang = 'en' }): Promise<Cocktail> {
    try {
      const [cocktail, favorite, ingredients] = await Promise.all([
        this.cocktailModel
          .findById(id, `${lang}`)
          .populate(`${lang}.ingredients.data`, [
            `${lang}.id`,
            `${lang}.title`,
            `${lang}.description`,
            `${lang}.picture`,
          ])
          .populate(`${lang}.glass`, '-__v')
          .populate(`${lang}.ingredients.alternatives`),
        this.FavoriteService.getAll({ owner, lang }),
        this.IngredientListModel.findOne({
          owner,
        }),
      ]);

      const result = addFavoriteAndICan(cocktail, ingredients, favorite, lang);
      return result;
    } catch (error) {
      errorGenerator('Wrong ID , cocktail not found', 'NOT_FOUND');
    }
  }

  async deleteMy({ userId, id }): Promise<void> {
    await this.cocktailModel.findOneAndDelete({ owner: userId, id });
  }

  async findByIngredient({ id, lang }): Promise<Cocktail[]> {
    const path = `ingredients.${lang}.data`;
    const cock: Cocktail[] = await this.cocktailModel
      .find({ path: id }, `${lang}`)
      .populate(`${lang}.ingredients.data`, `${lang}.title ${lang}.id`);

    return cock.map((el) => {
      el[lang].ingredients.map((el) => {
        el.data = el.data[lang];
        return el;
      });
      return el[lang];
    });
  }

  async updateOne(
    id: Types.ObjectId,
    cocktail: UpdateCocktailDto,
    lang: string = 'en',
  ): Promise<Cocktail> {
    const oldData = await this.cocktailModel.findById(id);
    const {
      ingredients,
      ratings,
      category,
      glass,
      recipe,
      picture,
      isDefault,
      favorite,
      iCan,
      lacks,
    } = oldData[lang];

    const { title, description } = cocktail;
    const newData = {
      [lang]: {
        id,
        title,
        description,
        ingredients,
        ratings,
        category,
        glass,
        recipe,
        picture,
        isDefault,
        favorite,
        iCan,
        lacks,
      },
    };

    const updateCocktail = this.cocktailModel.findOneAndUpdate(
      { _id: id },
      { $set: newData },
      {
        new: true,
      },
    );
    return await updateCocktail;
  }

  // todo Work with image and s3
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
