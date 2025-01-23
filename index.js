import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import courseRouter from "./routes/course.route.js"
dotenv.config();

const app = express();
app.use(express.json());
const port=process.env.PORT || 3000;
const DB_URI=process.env.MONGO_URI;

//courseRouter
app.use("/api/v1/course",courseRouter);
app.use("/api/v1/course",courseRouter);


//function to connect the database
async function main(){
    await mongoose.connect(DB_URI);
}


app.listen(port,()=>{
    console.log(`server is running on this port ${port} `);
});

//function call for connect the database
main();




