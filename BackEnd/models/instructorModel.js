const connection = require("../models/connection");
const util = require("util");
const query = util.promisify(connection.query).bind(connection);

class InstructorModel {
  //VIEW COURSES WITH ENROLLED STUDENTS AFTER PRESSING COURSE
  getMyCoursesAndNumberEnrolled(instructorId) {
    const queryString = `SELECT c.name AS CourseName, c.code AS CourseCode ,COUNT(sc.student_id) AS EnrolledStudents
    FROM course AS c
    LEFT JOIN studentcourse AS sc
    ON sc.course_id = c.id
    WHERE c.instructor_id = ?
    GROUP BY c.id `;
    const result = query(queryString, instructorId);
    return result;
  }

  //VIEW DETAILS OF ENROLLED STUDENTS FOR SPECIFIC INSTRUCTOR
  getStudents(courseCode) {
    const queryString = `SELECT c.name AS CourseName,u.name AS StudentName,u.email AS StudentEmail,sc.grade AS StudentGrade
    FROM user AS u
    JOIN studentcourse AS sc
    ON u.id = sc.student_id
    JOIN course AS c
    ON sc.course_id = c.id
    WHERE code = ? `;
    const result = query(queryString, courseCode);
    return result;
  }

  // SET STUDENTS GRADES
  setStudentGrade(data) {
    const queryString = "UPDATE studentcourse SET ? WHERE ? AND ? ";
    const result = query(queryString, [
      { grade: data[0].grade },
      { student_id: data[1].student_id },
      { course_id: data[2].course_id },
    ]);
    return result;
  }

  // RETRIEVE INSTRUCTOR ID
  getInstructorByEmail(instructorEmail) {
    const queryString = "SELECT * FROM user WHERE ? AND type = 'instructor'";
    const result = query(queryString, { email: instructorEmail });
    return result;
  }
}
instructorModel = new InstructorModel();
module.exports = instructorModel;
