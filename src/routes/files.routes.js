import {Router} from 'express';
import * as fileController from '../controllers/file.controller';
const router=Router();

//Handle multer file uploader middleware
const multer = require('multer');
const upload = multer({ dest: 'fileTemp/' });

//The second parameter specifies middleware function to be called
router.post('/files', upload.single('file'), fileController.createFile);
router.get('/files',fileController.getFiles);
router.get('/file',fileController.getFile);
router.get('/fileUpdate',fileController.updateFile);
router.delete('/fileDelete',fileController.deleteFile);

export default router;