const router = require("express").Router();
const instructorController = require("../controllers/instructorController");
const { body } = require("express-validator");
const instructorAuth = require("../middleware/instructorAuth");

router.get(
  "/view-instructor-courses",
  instructorAuth,
  instructorController.viewMyCourses
);
router.get(
  "/view-courses-with-students",
  instructorAuth,
  instructorController.viewMyCoursesAndNumberEnrolled
);
router.get(
  "/view-enrolled-students",
  instructorAuth,
  instructorController.viewStudents
);

router.post(
  "/set-grades",
  instructorAuth,
  [
    body("grade")
      .isInt({ min: 0, max: 100 })
      .withMessage("Please Enter a Valid Grade"),
  ],
  instructorController.setGrades
);

module.exports = router;
