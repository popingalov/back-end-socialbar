import express from 'express';
// import getAll from '../controllers/coctails/getAll';
import addOne from '../controllers/coctails/newCoc';
const roter = express.Router();

// roter.get('/', getAll);
roter.post('/', addOne);

export default roter;
