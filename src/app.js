import express from 'express';
import morgan from 'morgan';
import FileRouter from './routes/files.routes';
const app =express();

app.use(morgan('dev'));
app.use(express.json());
app.use(FileRouter);

export default app;
