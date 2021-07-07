import {Router} from 'express';
import * as fileController from '../controllers/file.controller';
const router=Router();
//Handle multer file uploader middleware
const multer = require('multer');
var upload = multer({ dest: 'uploads/', 
limits: { fileSize: 2000000000,fieldNameSize:200 } })
//The second parameter specifies middleware function to be called
router.post('/newFile', upload.single('file'),fileController.createFile);
router.post('/files',fileController.getFiles);
router.post('/file',fileController.getFile);
router.get('/fileUpdate',fileController.updateFile);
router.delete('/fileDelete',fileController.deleteFile);

export default router;
