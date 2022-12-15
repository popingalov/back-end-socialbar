import express from 'express';
// const minitest = require('../controllers/index');
import newUser from '../controllers/users/newUser';
const roter = express.Router();

roter.post('/', newUser);

export default roter;
