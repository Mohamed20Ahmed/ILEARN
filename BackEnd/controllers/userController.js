const courseModel = require("../models/courseModel");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const userController = {
  viewActiveCourses: async (req, res) => {
    try {
      const queryResult = await courseModel.getActiveCourses();
      res.status(200).json(queryResult);
    } catch (err) {
      res.status(404).json(err);
    }
  },

  login: async (req, res) => {
    try {
      const loginData = req.body;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const user = await userModel.checkEmailExists(loginData.email);

      if (user.length == 0) {
        return res.status(400).json({
          errors: [
            {
              msg: "Email or Password Not Found !",
            },
          ],
        });
      }

      if (user[0].status === 0) {
        return res.status(400).json({
          errors: [
            {
              msg: "You Are BLOCKED From The System, Please Contact The Admin ",
            },
          ],
        });
      }

      const checkPassword =
        user[0].type == "admin"
          ? loginData.password === user[0].password
          : await bcrypt.compare(loginData.password, user[0].password);

      if (checkPassword) {
        delete user[0].password;
        return res.status(200).json(user[0]);
      }

      res.status(400).json({
        errors: [
          {
            msg: "Email or Password Not Found !",
          },
        ],
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ err: err });
    }
  },
};

module.exports = userController;
