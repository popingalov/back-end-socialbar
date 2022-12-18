import express from 'express';
import getAll from '../controllers/ingridients/getAll';
import addOne from '../controllers/ingridients/newIngredient';
import changeIgredient from '../controllers/ingridients/changeIngredient';
const roter = express.Router();
import controllerSync from '../middlewares/controllerSync';
import validation from '../middlewares/valid';
import shame from '../models/ingridient';

//
roter.get('/', controllerSync(getAll));
roter.post('/', validation(shame.addIngJoi), controllerSync(addOne));
roter.put('/', validation(shame.changeIngJoi), controllerSync(changeIgredient));

export default roter;
