import mongoose from "mongoose";
const Schema=mongoose.Schema;


const courseSchema =new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    }
})

export const courseModel=mongoose.model("course",courseSchema);
