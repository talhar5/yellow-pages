import { Router } from 'express';
const authRouter = Router();
import authController from './authController.js'

authRouter.post('/register', authController.registerUser)
authRouter.post('/login', authController.loginUser)




export default authRouter;