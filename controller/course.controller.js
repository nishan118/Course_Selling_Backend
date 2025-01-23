import { courseModel } from "../models/course.model.js"; 


export const createCourse = async (req,res)=>{
    const {title , description, price, image ,url}=req.body;
    try{
        //checking the data is present or not
        if(! title || !description || !price || !image || !url){
            return res.status(400).json({error:"All fields are required"});
        }
        const coursedata = {
            title,
            description,
            price, 
            image,
            url
        }
        //if all data available then we add the course in our courseModel
        const course = await courseModel.create(coursedata);
        res.json({
            message:"course is added successfully",
            course:course
        });

    }catch(error){
        res.json({
            error:"Error while creating course"
        });
    }
    
    
};
    //function to find the all courses in the list
export const getCourse= async (req,res)=>{
    const response = await courseModel.find({
        
    });
    res.json({
        message: response
    })
};