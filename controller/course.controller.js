import { courseModel } from "../models/course.model.js"; 
import { v2 as cloudinary } from 'cloudinary';

export const createCourse = async (req,res)=>{
    const {title , description, price, url}=req.body;
    try{
        //checking the data is present or not
        if(! title || !description || !price ){
            return res.status(400).json({error:"All fields are required"});
        }
        //code for image upload 
        const {image}= req.files
        if(!req.files || Object.keys(req.files).length===0){
            return res.status(400).json({error:"No files uploaded"});
        }
        //code forto check the  format of image
        const allowedFormat=["image/png","image/jpg"]
        if(!allowedFormat.includes(image.mimetype)){
            return res.status(400).json({error:"invalid file format. Only PNG and JPG are allowed"});
        }
        //cloudinary code to upload an image on cloud
        const cloud_response= await cloudinary.uploader.upload(image.tempFilePath)
        if(!cloud_response || cloud_response.error){
            return res.status(400).json({errors:"Error while uploading file to cloudinary"})
        }

        const coursedata = {
            title,
            description,
            price, 
            image:{
                public_id:cloud_response.public_id,
                url:cloud_response.url,
            },
            
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

    try{
        const response = await courseModel.find({
        
        });
        res.status(201).json({
            message: response
        })

    }catch(error){
        res.status(500).json({errors:"error while getting the course"})
        console.log("error to get courses",error)
    }
    
};

//function to update the course
export const updateCourse= async (req,res)=>{
    const {courseId} =req.params;
    const {title, description,price,image}=req.body;

    try{
        const course= courseModel.updateOne({
            _id:courseId
        },{
            title,
            description,
            price,
            image:{
                public_id:image?.public_id ,
                url:image?.url ,
            }
        })
        res.status(201).json({message:"Course updated Successfully"})
    }catch(error){
        res.status(500).json({error:"Error occurs while updating the course"})
    }
};

//function to delete the course
export const deleteCourse= async (req,res)=>{
    const {courseId}=req.params;
    try{
        const course= await courseModel.findOneAndDelete({
            _id:courseId,
        });
        if(!course){
          return  res.status(404).json({error:"Course not found"})
        }
        res.status(200).json({message:"course deleted successfully"})
    }catch(error){
        res.status(500).json({error:"error in course deleting"})
        console.log("Error while deleting the course",error);
    }
};

//function to find particular course
export const courseDetails=async (req,res)=>{
   const {courseId}=req.params;
    try{
        const response= await courseModel.findById({
            _id:courseId
        });
        if(!response){
            return res.status(404).json({message:"course not found"});
        }
        res.status(200).json({message:"course details find successfully",response})

    }catch(error){
        res.status(500).json({errors:"error while fetching particular  course"})
        console.log("error while fetching particular course",error)
    }
}