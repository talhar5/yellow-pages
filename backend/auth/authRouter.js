import { Router } from 'express';
const authRouter = Router();
import authController from './authController.js'

authRouter.post('/register', authController.registerUser)
authRouter.post('/login', authController.loginUser)
authRouter.put('/verifyOtp', authController.verifyOtp)
authRouter.post('/resetPassword', authController.resetPassword)
authRouter.post("/createPassword", authController.createPassword)

// testing


export default authRouter;