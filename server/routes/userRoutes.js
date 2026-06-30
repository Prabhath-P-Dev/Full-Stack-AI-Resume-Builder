import { getUserById, getUserResumes, loginUser, registerUser } from "../controllers/userController.js";
import protect from "../middlewares/authMiddleware.js";
import express from "express";

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/data',protect, getUserById);
userRouter.get('/resume',protect, getUserResumes);

export default userRouter;