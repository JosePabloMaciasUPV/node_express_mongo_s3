import express from 'express';
import morgan from 'morgan';
import FileRouter from './routes/files.routes';
import AuthRouter from './routes/auth.routes';
const app =express();
const cors = require('cors');
app.use(cors({
    origin: '*'
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(FileRouter);
app.use(AuthRouter);
export default app;
