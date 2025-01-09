import express from "express";
const app = express();
app.get("/",(req,res)=>{
    console.log("server is running");
    res.json({
        message:"Server is running"
    });
});
app.listen(8000);