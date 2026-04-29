import express from "express";

import {
  signup,
  login,
  logout,
  getCurrentUser,
} from "../controllers/user.controller.js";
import protect from "../middleware/auth.middleware.js";
import { get } from "mongoose";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/logout", protect, logout);
userRouter.get("/me", protect, getCurrentUser);

export default userRouter;
