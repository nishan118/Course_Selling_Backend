import express from "express";
import { courseDetails, createCourse,deleteCourse,getCourse,updateCourse  } from "../controller/course.controller.js";

const courseRouter = express.Router();

courseRouter.get("/courses",getCourse );
courseRouter.get("/:courseId",courseDetails);
courseRouter.post("/create", createCourse);
courseRouter.put("/update/:courseId",updateCourse);
courseRouter.delete("/delete/:courseId",deleteCourse);
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
