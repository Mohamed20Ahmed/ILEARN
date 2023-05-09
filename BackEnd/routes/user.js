const router = require("express").Router();
const userController = require("../controllers/userController");
const { body } = require("express-validator");

router.get("/home", userController.viewActiveCourses);

router.post(
  "/login",
  [body("email").isEmail().withMessage("Please Enter a Valid Email!")],
  userController.login
);

module.exports = router;
