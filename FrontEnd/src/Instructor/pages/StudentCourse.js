import "../style/StudentCourses.css";
import DynamicTable from "../../shared/DynamicTable";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAuthUser } from "../../helper/Storage";
import Alert from "react-bootstrap/Alert";
import { useParams } from "react-router-dom";

const StudentCourse = () => {
  let { code } = useParams();
  const auth = getAuthUser();
  const [courses, setCourses] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });
  useEffect(() => {
    setCourses({ ...courses, loading: true });
    axios
      .get("http://localhost:4000/view-enrolled-students", {
        headers: { token: auth.token, code: code },
      })
      .then((resp) => {
        setCourses({ ...courses, results: resp.data, loading: false });
      })
      .catch((err) => {
        console.log(err);
        setCourses({
          ...courses,
          loading: false,
          err: "Something Went Wrong",
        });
      });
  }, [courses.reload]);

  const setGrade = (email, grade) => {
    if (grade === "") {
      grade = null;
    }
    axios
      .post(
        "http://localhost:4000/set-grades",
        { student_email: email, course_code: code, grade: grade },
        {
          headers: {
            token: auth.token,
          },
        }
      )
      .then((res) => {
        setCourses({ ...courses, reload: courses.reload + 1 });
      })
      .catch((error) => {
        if (error.response.status === 422) {
          const errorMsg = error.response.data.errors[0].msg;
          setCourses({ ...courses, loading: false, err: errorMsg });
        } else {
          setCourses({
            ...courses,
            loading: false,
            err: "Something Went Wrong",
          });
        }
      });
  };

  let TableData;
  if (Array.isArray(courses.results)) {
    courses.results.forEach((result) => {
      result = Object.assign(result, {
        Grade: (
          <input
            type="number"
            max="100"
            min="0"
            onChange={(e) => {
              result.StudentGrade = e.target.value;
            }}
          />
        ),
        Update: (
          <input
            type="submit"
            className="student-submit"
            onClick={(e) => {
              setGrade(result.StudentEmail, result.StudentGrade);
            }}
          />
        ),
      });
    });

    TableData = courses.results.map((obj) => {
      const { CourseName, ...rest } = obj;
      return rest;
    });
  }

  return (
    <>
      {courses.loading === false &&
        courses.err === null &&
        Array.isArray(courses.results) &&
        DynamicTable(TableData, courses.results[0].CourseName)}

      {courses.loading === false &&
        courses.err == null &&
        !Array.isArray(courses.results) &&
        courses.results && (
          <Alert
            variant="info"
            style={{
              width: "50%",
              margin: "5% auto",
              textAlign: "center",
            }}
          >
            {courses.results}
          </Alert>
        )}

      {courses.loading === false && courses.err != null && (
        <>
          {" "}
          <Alert
            key="danger"
            variant="danger"
            style={{
              width: "50%",
              margin: "5% auto",
              zIndex: "-1",
              textAlign: "center",
            }}
          >
            {courses.err}
          </Alert>
          <br />
          <button className="showbtn" onClick={(e) => window.location.reload()}>
            Back
          </button>
          <br />
          <br />
        </>
      )}
    </>
  );
};

export default StudentCourse;
