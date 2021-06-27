import {Router} from 'express';
import * as fileController from '../controllers/file.controller';
const router=Router();



//The second parameter specifies middleware function to be called
router.post('/files',  fileController.createFile);
router.get('/files',fileController.getFiles);
router.get('/file',fileController.getFile);
router.get('/fileUpdate',fileController.updateFile);
router.delete('/fileDelete',fileController.deleteFile);

export default router;
