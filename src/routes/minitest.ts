import express from 'express';
// const minitest = require('../controllers/index');
import minitest from 'controllers/minitest/minitest';
const roter = express.Router();

roter.get('/', minitest);
