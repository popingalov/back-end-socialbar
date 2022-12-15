import express from 'express';
// const minitest = require('../controllers/index');
import newUser from '../controllers/users/newUser';
const roter = express.Router();
import controllerSync from 'middlewares/controllerSync';
roter.post('/', controllerSync(newUser));

export default roter;
