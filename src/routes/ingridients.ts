import express from 'express';
import getAll from '../controllers/ingridients/getAll';
import addOne from '../controllers/ingridients/newIng';
import changeIng from '../controllers/ingridients/changeIng';
const roter = express.Router();
import controllerSync from '../middlewares/controllerSync';
import validation from '../middlewares/valid';
import shame from '../models/ingridient';

//
roter.get('/', controllerSync(getAll));
roter.post('/', validation(shame.addIngJoi), controllerSync(addOne));
roter.put('/', validation(shame.changeIngJoi), controllerSync(changeIng));

export default roter;
