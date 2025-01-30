import express from "express";
import { buyCourses, courseDetails, createCourse,deleteCourse,getCourse,updateCourse  } from "../controller/course.controller.js";
import userMiddleware from "../middleware/user.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";

const courseRouter = express.Router();


courseRouter.post("/create",adminMiddleware ,createCourse);
courseRouter.put("/update/:courseId",adminMiddleware,updateCourse);
courseRouter.delete("/delete/:courseId",adminMiddleware,deleteCourse);

courseRouter.get("/courses",getCourse );
courseRouter.get("/:courseId",courseDetails);

courseRouter.post("/buy/:courseId", userMiddleware,buyCourses);
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
