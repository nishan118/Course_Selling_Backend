import express from "express";
import { createCourse,getCourse  } from "../controller/course.controller.js";

const courseRouter = express.Router();

courseRouter.get("/get",getCourse );
courseRouter.post("/create", createCourse);

export default courseRouter;





















// import express from "express";

// const router = express.Router();

// router.get("/create", (req,res)=>{
//     console.log("hi from create");
    
//     console.log("create-course route creation");
//     res.json({
//         message:"created Successfully"
//     })
    
// })

// export default router;
