import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { v2 as cloudinary } from 'cloudinary';
import fileUpload from "express-fileupload";
import courseRouter from "./routes/course.route.js"
import adminRouter from "./routes/admin.route.js";
import userRouter from "./routes/user.route.js";

dotenv.config();

const app = express();
app.use(express.json());
// code for file upload
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
}));

//enviroment variables 
const port=process.env.PORT || 3000;
const DB_URI=process.env.MONGO_URI;

//courseRouter for all the course end points
app.use("/api/v1/course",courseRouter);

//adminRouter for all the admin end points
app.use("/api/v1/admin",adminRouter);

//userRouter for all the user router
app.use("/api/v1/user",userRouter);
//function to connect the database

 // cloudinary Configuration code
 cloudinary.config({ 
    cloud_name: process.env.cloud_name, 
    api_key: process.env.api_key, 
    api_secret: process.env.api_secret ,
});
async function main(){
    await mongoose.connect(DB_URI);
}


app.listen(port,()=>{
    console.log(`server is running on this port ${port} `);
});

//function call for connect the database
main();




