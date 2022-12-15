import express from 'express';
import getAll from '../controllers/ingridients/getAll';
import addOne from '../controllers/ingridients/newIng';
const roter = express.Router();

roter.get('/', getAll);
roter.post('/', addOne);

export default roter;
