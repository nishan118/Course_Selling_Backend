import express from "express";
import { adminLogout,adminSignin,adminSignup } from "../controller/admin.controller.js";

const adminRouter=express.Router();

adminRouter.post("/signup",adminSignup);
adminRouter.post("/signin",adminSignin);
adminRouter.get("/logout",adminLogout);

export default adminRouter