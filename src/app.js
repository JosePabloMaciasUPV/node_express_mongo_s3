import express from 'express';
import morgan from 'morgan';
import FileRouter from './routes/files.routes';
import AuthRouter from './routes/auth.routes';
const app =express();
const cors = require('cors');
//About spa file hosting provider
const path = require('path');
app.use(cors({
    origin: '*'
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(FileRouter);
app.use(AuthRouter);
app.use('/', express.static(path.join(__dirname, '../public')))

export default app;