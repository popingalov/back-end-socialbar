import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

//
import ingRoute from './routes/ingredients';
import usersRoute from './routes/users';
import cocRoute from './routes/cocktails';
//
dotenv.config();

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
//
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/api/users', usersRoute);
app.use('/api/ing', ingRoute);
app.use('/api/coc', cocRoute);
export default app;
// module.exports = app;
