const instructorModel = require("../models/instructorModel");
const courseModel = require("../models/courseModel");
const studentModel = require("../models/studentModel");
const { validationResult } = require("express-validator");

const InstructorController = {
  viewMyCourses: async (req, res) => {
    try {
      const instructor = await instructorModel.getInstructorByEmail(
        req.headers.email
      );

      if (instructor.length === 0) {
        return res.status(404).json("NOT EXIST");
      }

      const instructorCourses = await courseModel.getInstructorCourses(
        instructor[0].id
      );

      if (instructorCourses.length == 0)
        return res.status(200).json("No Courses Exist");

      res.status(200).json(instructorCourses);
    } catch (err) {
      res.status(404).json(err);
    }
  },
  viewMyCoursesAndNumberEnrolled: async (req, res) => {
    try {
      const instructor = await instructorModel.getInstructorByEmail(
        req.headers.email
      );

      if (instructor.length === 0) {
        return res.status(404).json("NOT EXIST");
      }

      const instructorCourses =
        await instructorModel.getMyCoursesAndNumberEnrolled(instructor[0].id);

      if (instructorCourses.length === 0) {
        return res.status(200).json("NO COURSES EXIST");
      }

      res.status(200).json(instructorCourses);
    } catch (err) {
      res.status(404).json(err);
    }
  },
  viewStudents: async (req, res) => {
    try {
      const students = await instructorModel.getStudents(req.headers.code);

      if (students.length === 0) {
        return res.status(200).json("NO STUDENTS ENROLLED");
      }

      res.status(200).json(students);
    } catch (err) {
      res.status(404).json(err);
    }
  },
  setGrades: async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const data = req.body;

      let studentData = [];

      studentData.push({ grade: data.grade });

      const student = await studentModel.getStudentByEmail(data.student_email);

      if (student.length === 0) {
        return res.status(404).json("The Email Is Not Exist");
      }

      studentData.push({ student_id: student[0].id });

      const course = await courseModel.getCourseByCode(data.course_code);

      if (course.length === 0) {
        return res.status(404).json("The Course Is Not Exist");
      }

      studentData.push({ course_id: course[0].id });

      const result = await instructorModel.setStudentGrade(studentData);

      res.status(200).json(result);
    } catch (err) {
      res.status(404).json(err);
    }
  },
};

module.exports = InstructorController;
