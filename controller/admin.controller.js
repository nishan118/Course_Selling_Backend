import { adminModel } from "../models/admin.model.js";
import bcrypt from "bcrypt";
import {z} from 'zod';
import jwt from 'jsonwebtoken';
import config from '../config.js';
import cookieParser from "cookie-parser";
export const adminSignup = async (req,res)=>{
    const{firstName, lastName, email, password}=req.body;
    //server side validation using zod
    const adminSchema= z.object({
        firstName:z.string().min(3).max(50),
        lastName:z.string().min(3).max(50),
        email:z.string().email(),
        password:z.string().min(6).max(100),
    })
    const validateData= adminSchema.safeParse(req.body);
    if(!validateData.success){
        return res.status(400).json({errors:validateData.error.issues.map(err=>err.message)});
    }
    const hashedPassword=  await bcrypt.hash(password,10);
   try{
         //check if user is already existing
    const existingAdmin= await adminModel.findOne({email:email});
    if(existingAdmin){
        return res.status(400).json({error:"user already exists"});
    }
    //Adding new user
    const newAdmin=new adminModel({firstName, lastName, email, password:hashedPassword});
    await newAdmin.save();
    res.status(201).json({message:"singnup successfully", newAdmin});
   }catch(error){
    res.status(500).json({errors:"Error in signup"});
   }
    
};
export const adminSignin =async (req,res)=>{
const {email, password}=req.body;
try{
    const admin=  await adminModel.findOne({email:email});
    const isPasswordCorrect= await bcrypt.compare(password,admin.password);
    if(!admin || !isPasswordCorrect){
        return res.status(403).json({error:"Invalid credential"});
    }
    //jwt code
    const token = jwt.sign({
        id:admin._id,
        
    },
    config.JWT_ADMIN_PASSWORD,
    {expiresIn:"1d"}
   );
   const cookieOptions= {
    expires: new Date(Date.now() + 24*60*60*1000),//1 day
    httpOnly:true,
    secure:process.env.NODE_ENV==="production",  //true for https only
    sameSite:"Strict"
   }
    res.cookie("jwt",token,cookieOptions);
    res.status(201).json({message:"Signin Sucessfully", admin,token});

}catch(error){
    res.status(500).json({error:"error while signin"});
    
}
};

export const adminLogout =(req,res)=>{
   try{
    if(!req.cookies.jwt){
        return res.status(401).json({errors:"kindly login "})
    }
    res.clearCookie("jwt");
    res.status(200).json({message:"logout successfully"});
    } catch(error){
      res.status(500).json({error:"Server error while logout"});
   } 
   };