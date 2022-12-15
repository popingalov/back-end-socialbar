import express from 'express';
// import getAll from '../controllers/coctails/getAll';
import addOne from '../controllers/coctails/newCoc';
import getAll from '../controllers/coctails/getAll';
const roter = express.Router();
import controllerSync from 'middlewares/controllerSync';
roter.get('/', controllerSync(getAll));
roter.post('/', controllerSync(addOne));

export default roter;
