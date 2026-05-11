import express from "express";
import { getUsers, getUserById } from "../controller/user.js";
import {  signin, signup } from "../controller/auth.js";
export const userRouter = express.Router();
userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/signIn", signin);
userRouter.post("/signUp", signup);
