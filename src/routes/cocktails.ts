import express from 'express';
import addOne from '../controllers/cocktails/addCocktail';
import getAll from '../controllers/cocktails/getAll';
const roter = express.Router();
//
import controllerSync from '../middlewares/controllerSync';
import ingJoiSchemas from '../models/coctails';
import validation from '../middlewares/valid';
import changeCoc from '../controllers/cocktails/changeCocktail';
//
roter.get('/', controllerSync(getAll));
roter.post('/', validation(ingJoiSchemas.addCocJoi), controllerSync(addOne));
roter.put(
  '/',
  validation(ingJoiSchemas.changeCocJoi),
  controllerSync(changeCoc),
);

export default roter;
