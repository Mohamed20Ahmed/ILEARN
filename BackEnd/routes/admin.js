const router = require("express").Router();
const adminController = require("../controllers/adminController");
const { body } = require("express-validator");
const adminAuth = require("../middleware/adminAuth");
const { reconstructFieldPath } = require("express-validator/src/select-fields");

//Course
router.get("/view-courses", adminAuth, adminController.viewCourses);

router.get("/get-course/:code", adminAuth, adminController.getCourse);

router.post(
  "/add-course",
  adminAuth,
  [body("code").isInt({ min: 0 }).withMessage("Please Enter a Valid Code")],
  adminController.addCourse
);

router.put(
  "/update-course",
  adminAuth,
  [body("code").isInt({ min: 0 }).withMessage("Please Enter a Valid Code")],
  adminController.updateCourse
);

router.delete("/delete-course", adminAuth, adminController.deleteCourse);

//Instructor
router.get("/view-instructors", adminAuth, adminController.viewInstructors);

router.get("/get-instructor/:email", adminAuth, adminController.getInstructor);

router.post(
  "/add-instructor",
  adminAuth,
  [
    body("email").isEmail().withMessage("Please Enter a Valid Email!"),
    body("password")
      .isLength({ min: 8, max: 50 })
      .withMessage("Password Should Be Between (8-50) Character"),
    body("phone")
      .isMobilePhone()
      .withMessage("Please Enter a Valid Phone Number")
      .isLength({ min: 11, max: 11 })
      .withMessage("Phone Number Should Be 11 Digits"),
  ],
  adminController.addInstructor
);

router.put(
  "/update-instructor",
  adminAuth,
  [
    body("email").isEmail().withMessage("Please Enter a Valid Email!"),
    body("password")
      .custom(async (value) => {
        if (!(value.length === 0 || (value.length >= 8 && value.length <= 50)))
          throw new Error();
      })
      .withMessage("Password Should Be Between (8-50) Character"),
    body("phone")
      .isMobilePhone()
      .withMessage("Please Enter a Valid Phone Number")
      .isLength({ min: 11, max: 11 })
      .withMessage("Phone Number Should Be 11 Digits"),
  ],
  adminController.updateInstructor
);

router.delete(
  "/delete-instructor",
  adminAuth,
  adminController.deleteInstructor
);

//Student
router.get("/view-students", adminAuth, adminController.viewStudents);

router.get("/get-student/:email", adminAuth, adminController.getStudent);

router.post(
  "/add-student",
  adminAuth,
  [
    body("email").isEmail().withMessage("Please Enter a Valid Email!"),
    body("password")
      .isLength({ min: 8, max: 50 })
      .withMessage("Password Should Be Between (8-50) Character"),
    body("phone")
      .isMobilePhone()
      .withMessage("Please Enter a Valid Phone Number")
      .isLength({ min: 11, max: 11 })
      .withMessage("Phone Number Should Be 11 Digits"),
  ],
  adminController.addStudent
);

router.put(
  "/update-student",
  adminAuth,
  [
    body("email").isEmail().withMessage("Please Enter a Valid Email!"),
    body("password")
      .custom(async (value) => {
        if (!(value.length === 0 || (value.length >= 8 && value.length <= 50)))
          throw new Error();
      })
      .withMessage("Password Should Be Between (8-50) Character"),
    body("phone")
      .isMobilePhone()
      .withMessage("Please Enter a Valid Phone Number")
      .isLength({ min: 11, max: 11 })
      .withMessage("Phone Number Should Be 11 Digits"),
  ],
  adminController.updateStudent
);

router.delete("/delete-student", adminAuth, adminController.deleteStudent);

//Assign instructors to course
router.put(
  "/assign-instructors-to-courses",
  adminAuth,
  [
    body("instructor_email")
      .isEmail()
      .withMessage("Please Enter a Valid Email!"),
    body("code").isNumeric().withMessage("Please Enter a Valid Code"),
  ],
  adminController.assignInstructorsToCourse
);

module.exports = router;
