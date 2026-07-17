import { forgotPassword, getUserById, getUserResumes, loginUser, registerUser, resetPassword } from "../controllers/userController.js";
import protect from "../middlewares/authMiddleware.js";
import express from "express";

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/data',protect, getUserById);
userRouter.get('/resume',protect, getUserResumes);
userRouter.post('/forgot-password', forgotPassword)
userRouter.post('/reset-password/:token',resetPassword)

export default userRouter;