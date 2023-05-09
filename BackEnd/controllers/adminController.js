const adminModel = require("../models/adminModel");
const courseModel = require("../models/courseModel");
const studentModel = require("../models/studentModel");
const instructorModel = require("../models/instructorModel");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { validationResult } = require("express-validator");

const AdminController = {
  viewInstructors: async (req, res) => {
    try {
      const instructors = await adminModel.getInstructors();

      if (instructors.length == 0) {
        return res.status(200).json("No Instructors Found");
      }

      res.status(200).json(instructors);
    } catch (err) {
      res.status(404).json(err);
    }
  },
  viewStudents: async (req, res) => {
    try {
      const students = await adminModel.getStudents();

      if (students.length == 0) {
        return res.status(200).json("No Students Found");
      }

      res.status(200).json(students);
    } catch (err) {
      res.status(404).json(err);
    }
  },
  viewCourses: async (req, res) => {
    try {
      const courses = await courseModel.getCourses();

      if (courses.length == 0) {
        return res.status(200).json("No Courses Found");
      }

      res.status(200).json(courses);
    } catch (err) {
      res.status(404).json(err);
    }
  },
  getCourse: async (req, res) => {
    try {
      const course = await courseModel.getCourseByCode(req.params.code);

      if (course.length == 0) {
        return res.status(400).json("Course Not Found");
      }

      res.status(200).json(course);
    } catch (err) {
      res.status(404).json(err);
    }
  },

  getInstructor: async (req, res) => {
    try {
      const instructor = await instructorModel.getInstructorByEmail(
        req.params.email
      );

      if (instructor.length == 0) {
        return res.status(400).json("Instructor Not Found");
      }

      res.status(200).json(instructor);
    } catch (err) {
      res.status(404).json(err);
    }
  },
  getStudent: async (req, res) => {
    try {
      const student = await studentModel.getStudentByEmail(req.params.email);

      if (student.length == 0) {
        return res.status(400).json("Student Not Found");
      }

      res.status(200).json(student);
    } catch (err) {
      res.status(404).json(err);
    }
  },
  deleteInstructor: async (req, res) => {
    try {
      const instructor = await adminModel.getUser(req.body.email);

      if (instructor.length === 0) {
        return res.status(404).json("Instructor Email Is Not Exists");
      }

      const instructorCourses = await courseModel.getInstructorCourses(
        instructor[0].id
      );

      if (instructorCourses.length === 0) {
        await adminModel.deleteInstructorByEmail(instructor[0].email);
        return res.status(200).json("Instructor Deleted Successfully");
      }

      res
        .status(400)
        .json(
          "You Should In-Active his Courses or Assign Them To Anthor Instructor"
        );
    } catch (err) {
      res.status(404).json(err);
    }
  },
  deleteStudent: async (req, res) => {
    try {
      const student = await adminModel.getUser(req.body.email);

      if (student.length == 0) {
        return res.status(404).json("Student Email Is Not Exists");
      }

      await adminModel.deleteStudentByEmail(student[0].email);
      res.status(200).json("Student Deleted Successfully");
    } catch (err) {
      res.status(404).json(err);
    }
  },
  deleteCourse: async (req, res) => {
    try {
      const course = await courseModel.getCourseByCode(req.body.code);

      if (course.length == 0) {
        return res.status(404).json("Course Is Not Exists");
      }

      await courseModel.deleteCourse(course[0].code);
      res.status(200).json("Course Deleted Successfully");
    } catch (err) {
      res.status(404).json(err);
    }
  },
  addInstructor: async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const instructor = {
        name: req.body.name,
        password: await bcrypt.hash(req.body.password, 10),
        email: req.body.email,
        phone: req.body.phone,
        status: req.body.status,
        token: crypto.randomBytes(16).toString("hex"),
        type: "instructor",
      };

      const existingEmail = await adminModel.getUser(instructor.email);

      if (existingEmail.length > 0) {
        return res.status(409).json("Instructor Email Is Already Exists");
      }

      const existingPhone = await adminModel.getUserByPhone(instructor.phone);

      if (existingPhone.length > 0) {
        return res.status(409).json("Instructor Phone Is Already Exists");
      }

      await adminModel.insertInstructor(instructor);
      res.status(200).json("Instructor Added Successfully");
    } catch (err) {
      res.status(404).json(err);
    }
  },
  addStudent: async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const student = {
        name: req.body.name,
        password: await bcrypt.hash(req.body.password, 10),
        email: req.body.email,
        phone: req.body.phone,
        status: req.body.status,
        token: crypto.randomBytes(16).toString("hex"),
        type: "student",
      };

      const existingEmail = await adminModel.getUser(student.email);

      if (existingEmail.length > 0) {
        return res.status(409).json("Student Email Is Already Exists");
      }

      const existingPhone = await adminModel.getUserByPhone(student.phone);

      if (existingPhone.length > 0) {
        return res.status(409).json("Student Phone Is Already Exists");
      }

      await adminModel.insertStudent(student);
      res.status(200).json("Student Added Successfully");
    } catch (err) {
      res.status(404).json(err);
    }
  },
  addCourse: async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const course = req.body;

      const existingCode = await courseModel.getCourseByCode(course.code);

      if (existingCode.length > 0) {
        return res.status(409).json("Course Code Is Already Exists");
      }

      await courseModel.insertCourse(course);
      res.status(200).json("Course Added Successfully");
    } catch (err) {
      res.status(404).json(err);
    }
  },
  updateInstructor: async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      let instructor = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        status: req.body.status,
        token: crypto.randomBytes(16).toString("hex"),
        type: "instructor",
      };

      const instructorPassword = req.body.password;

      if (instructorPassword.length >= 8 && instructorPassword.length <= 50) {
        instructor = Object.assign(instructor, {
          password: await bcrypt.hash(instructorPassword, 10),
        });
      }

      const existingEmail = await adminModel.getUser(instructor.email);

      const instructorOldData = await adminModel.getUser(req.body.oldEmail);

      if (
        existingEmail.length > 0 &&
        instructor.email != instructorOldData[0].email
      ) {
        return res.status(409).json("Instructor Email Is Already Exists");
      }

      const existingPhone = await adminModel.getUserByPhone(instructor.phone);

      if (
        existingPhone.length > 0 &&
        instructor.phone != instructorOldData[0].phone
      ) {
        return res.status(409).json("Instructor Phone Is Already Exists");
      }

      if (instructor.status == "1") {
        await adminModel.updateInstructorData(
          instructor,
          instructorOldData[0].email
        );
        return res.status(200).json("Instructor Updated Successfully");
      }

      const instructorCourses = await courseModel.getInstructorCourses(
        instructorOldData[0].id
      );

      if (instructorCourses.length === 0) {
        await adminModel.updateInstructorData(
          instructor,
          instructorOldData[0].email
        );
        return res.status(200).json("Instructor Updated Successfully");
      }

      res
        .status(400)
        .json(
          "You Should In-Active his Courses or Assign Them To Anthor Instructor"
        );
    } catch (err) {
      res.status(404).json(err);
    }
  },
  updateStudent: async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      let student = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        status: req.body.status,
        token: crypto.randomBytes(16).toString("hex"),
        type: "student",
      };

      const studentPassword = req.body.password;

      if (studentPassword.length >= 8 && studentPassword.length <= 50) {
        student = Object.assign(student, {
          password: await bcrypt.hash(studentPassword, 10),
        });
      }

      const existingEmail = await adminModel.getUser(student.email);

      const studentOldData = await adminModel.getUser(req.body.oldEmail);

      if (
        existingEmail.length > 0 &&
        student.email != studentOldData[0].email
      ) {
        return res.status(409).json("Student Email Is Already Exists");
      }

      const existingPhone = await adminModel.getUserByPhone(student.phone);

      if (
        existingPhone.length > 0 &&
        student.phone != studentOldData[0].phone
      ) {
        return res.status(409).json("Student Phone Is Already Exists");
      }

      await adminModel.updateStudentData(student, studentOldData[0].email);
      res.status(200).json("Student Updated Successfully");
    } catch (err) {
      res.status(404).json(err);
    }
  },
  updateCourse: async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const course = {
        name: req.body.name,
        code: req.body.code,
        status: req.body.status,
      };

      const courseOldCode = req.body.oldCode;

      const courseOldStatus = req.body.oldStatus;

      if (courseOldStatus == "0" && course.status == "1") {
        return res
          .status(400)
          .json(
            "To Change Course Status To 'Active', You Should Assign Instructor To The Course"
          );
      }

      const courseId = await courseModel.getCourseByCode(courseOldCode).id;

      const existingCode = await courseModel.getCourseByCode(course.code);

      if (existingCode.length > 0 && course.code != courseOldCode) {
        return res.status(409).json("Course Code Is Already Exists");
      }

      if (course.status == "0") {
        await courseModel.updateInstructorId(course.code, null);
        await courseModel.deleteFromStudentCourse(courseId);
      }

      await courseModel.updateCourse(course, courseOldCode);
      res.status(200).json("Course Updated Successfully");
    } catch (err) {
      res.status(404).json(err);
    }
  },
  assignInstructorsToCourse: async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const data = req.body;

      const instructor = await adminModel.getUser(data.instructor_email);

      if (
        instructor.length == 0 ||
        instructor[0].type != "instructor" ||
        instructor[0].status == "0"
      ) {
        return res.status(400).json("Instructor Not Exist or In-Active");
      }

      const instructorId = instructor[0].id;

      const course = await courseModel.getCourseByCode(data.code);

      if (course.length == 0) {
        return res.status(400).json("Course Not Exist");
      }

      await courseModel.updateInstructorId(data.code, instructorId);
      await courseModel.updateStatus(data.code, "1");
      res.status(200).json("Done Successfully");
    } catch (err) {
      res.status(404).json(err);
    }
  },
};

module.exports = AdminController;
