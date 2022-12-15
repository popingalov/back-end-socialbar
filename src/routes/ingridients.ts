import express from 'express';
import getAll from '../controllers/ingridients/getAll';
import addOne from '../controllers/ingridients/newIng';
const roter = express.Router();
import controllerSync from '../middlewares/controllerSync';
roter.get('/', controllerSync(getAll));
roter.post('/', controllerSync(addOne));

export default roter;
