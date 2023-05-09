import { Link } from "react-router-dom";
import "../../styleShared/Table.css";
import DynamicTable from "../../shared/DynamicTable";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAuthUser } from "../../helper/Storage";
import Alert from "react-bootstrap/Alert";

const Courses = () => {
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
      .get("http://localhost:4000/view-courses-with-students", {
        headers: { token: auth.token, email: auth.email },
      })
      .then((resp) => {
        setCourses({ ...courses, results: resp.data, loading: false });
      })
      .catch((err) => {
        console.log(err);
        setCourses({ ...courses, loading: false, err: "Something Went Wrong" });
      });
  }, [courses.reload]);

  if (Array.isArray(courses.results)) {
    courses.results.forEach((result) => {
      result = Object.assign(result, {
        AboutCourse: (
          <Link
            to={`/Instructor/StudentCourse/${result.CourseCode}`}
            className="Ins-Link"
          >
            More details
          </Link>
        ),
      });
    });
  }

  return (
    <>
      {courses.loading === false &&
        courses.err === null &&
        Array.isArray(courses.results) &&
        DynamicTable(courses.results, "Courses")}

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
      )}
    </>
  );
};

export default Courses;
