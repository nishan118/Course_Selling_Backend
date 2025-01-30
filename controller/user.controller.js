import { userModel } from "../models/user.model.js";
import bcrypt from "bcrypt";
import {z} from 'zod';
import jwt from 'jsonwebtoken';
import config from '../config.js';
import { purchaseModel } from "../models/purchase.model.js";
import { courseModel } from "../models/course.model.js";
export const userSignup = async (req,res)=>{
    const{firstName, lastName, email, password}=req.body;
    //server side validation using zod
    const userSchema= z.object({
        firstName:z.string().min(3).max(50),
        lastName:z.string().min(3).max(50),
        email:z.string().email(),
        password:z.string().min(6).max(100),
    })
    const validateData= userSchema.safeParse(req.body);
    if(!validateData.success){
        return res.status(400).json({errors:validateData.error.issues.map(err=>err.message)});
    }
    const hashedPassword=  await bcrypt.hash(password,10);
   try{
         //check if user is already existing
    const existingUser= await userModel.findOne({email:email});
    if(existingUser){
        return res.status(400).json({error:"user already exists"});
    }
    //Adding new user
    const newUser=new userModel({firstName, lastName, email, password:hashedPassword});
    await newUser.save();
    res.status(201).json({message:"singnup successfully", newUser});
   }catch(error){
    res.status(500).json({errors:"Error in signup"});
   }
    
};
export const userSignin =async (req,res)=>{
const {email, password}=req.body;
try{
    const user=  await userModel.findOne({email:email});
    const isPasswordCorrect= await bcrypt.compare(password,user.password);
    if(!user || !isPasswordCorrect){
        return res.status(403).json({error:"Invalid credential"});
    }
    //jwt code
    const token = jwt.sign({
        id:user._id,
        
    },
    config.JWT_USER_PASSWORD,
    {expiresIn:"1d"}
   );
   const cookieOptions= {
    expires: new Date(Date.now() + 24*60*60*1000),//1 day
    httpOnly:true,
    secure:process.env.NODE_ENV==="production",  //true for https only
    sameSite:"Strict"
   }
    res.cookie("jwt",token,cookieOptions);
    res.status(201).json({message:"Signin Sucessfully", user,token});

}catch(error){
    res.status(500).json({error:"error while signin"});
    
}
};

export const userLogout =(req,res)=>{
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

export const userPurchase = async(req,res)=>{
   const userId=req.userId;
   try{
        const purchased= await purchaseModel.find({userId})
        let purchasedCourseId= []
        for(let i=0;i<purchased.length;i++){
            purchasedCourseId.push(purchased[i].courseId)
        }
            const courseData= await courseModel.find({
                _id:{$in:purchasedCourseId}
            })
        
        res.status(200).json({purchased,courseData});
   }catch(error){
    res.status(500).json({error:"Error while fetching all purchased course"})
   }
}
