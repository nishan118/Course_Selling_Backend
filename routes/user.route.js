import express from "express";
import { userSignup, userSignin, userLogout,userPurchase } from "../controller/user.controller.js";
import userMiddleware from "../middleware/user.middleware.js";
const userRouter=express.Router();

userRouter.post("/signup",userSignup);
userRouter.post("/signin",userSignin);
userRouter.get("/logout",userLogout);
userRouter.get("/purchase",userMiddleware,userPurchase);


export default userRouter