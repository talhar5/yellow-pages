import { Router } from 'express';
const userRouter = Router();


import userController from './userController.js'


userRouter.get("/", userController.getUsers)




export default userRouter;