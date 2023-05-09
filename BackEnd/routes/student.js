const router = require("express").Router();
const studentController = require("../controllers/studentContoller");
const studentAuth = require("../middleware/studentAuth");

router.post("/enroll-course", studentAuth, studentController.enrollCourse);

router.get(
  "/get-my-courses",
  studentAuth,
  studentController.viewStudentCourses
);

router.get("/get-all-courses", studentAuth, studentController.viewAllCourses);

module.exports = router;
