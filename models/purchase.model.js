import mongoose from "mongoose";

const purchaseSchema= new mongoose.Schema({
     userId:{
        type:mongoose.Types.ObjectId,
        ref:"userModel"
     },
     courseId:{
        type:mongoose.Types.ObjectId,
        ref:"courseModel"
     }
});

export const purchaseModel= mongoose.model("purchase",purchaseSchema);