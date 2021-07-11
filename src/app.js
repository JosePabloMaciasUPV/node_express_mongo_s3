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

//About spa file hosting provider
const path = require('path')
app.use('/', express.static(path.join(__dirname, '../public')))
app.get('/*', async (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});
app.use(express.json());
app.use(FileRouter);
app.use(AuthRouter);
export default app;