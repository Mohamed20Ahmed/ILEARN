import "../style/main.css";
import "../style/CourseCard.css";
import CoursesCard from "../components/CoursesCard";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import { getAuthUser } from "../../helper/Storage";

const Main = () => {
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
      .get("http://localhost:4000/view-instructor-courses", {
        headers: {
          token: auth.token,
          email: auth.email,
        },
      })
      .then((resp) => {
        setCourses({ ...courses, results: resp.data, loading: false });
      })
      .catch((err) => {
        console.log(err);
        setCourses({ ...courses, loading: false, err: "Something Went Wrong" });
      });
  }, [courses.reload]);
  return (
    <>
      <div className="InstructorContainer">
        <div className="text">
          <i>
            {" "}
            in iLEARN you can manage<br></br> your courses eaily
          </i>
        </div>
        <Link to="/Instructor/Courses" className="Ins-Link">
          {" "}
          Courses{" "}
        </Link>
      </div>
      <br></br>
      <br></br>
      <div>
        <div className="Instructor-course-list">
          {courses.loading === false &&
            courses.err == null &&
            Array.isArray(courses.results) &&
            courses.results.map((item) => {
              return (
                <CoursesCard
                  key={item.code}
                  name={item.name}
                  code={item.code}
                />
              );
            })}
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
                textAlign: "center",
              }}
            >
              {courses.err}
            </Alert>
          )}
        </div>
      </div>
    </>
  );
};

export default Main;
