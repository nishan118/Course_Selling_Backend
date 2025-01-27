import express from "express";
import { userSignup, userSignin, userLogout,userPurchase } from "../controller/user.controller.js";
const userRouter=express.Router();

userRouter.post("/signup",userSignup);
userRouter.post("/signin",userSignin);
userRouter.get("/logout",userLogout);
userRouter.get("/purchase",userPurchase);


export default userRouter