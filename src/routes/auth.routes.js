import {Router} from 'express';
import * as authController from '../controllers/auth.controller';
const router=Router();

//The second parameter specifies middleware function to be called
router.post('/login' , authController.login);
router.post('/register',authController.register);