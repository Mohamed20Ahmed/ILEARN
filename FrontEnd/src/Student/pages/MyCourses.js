import React, { useState, useEffect } from "react";
import axios from "axios";
import MyCourseItem from "../components/MyCourseItem";
import "../assets/style/myCourses.css";
import { getAuthUser } from "../../helper/Storage";
import Alert from "react-bootstrap/Alert";

function MyCourses() {
  const auth = getAuthUser();

  const [courses, setCourses] = useState({
    loading: true,
    results: [],
    courseGrade: "",
    err: null,
    reload: 0,
  });
  useEffect(() => {
    setCourses({ ...courses, loading: true });
    axios
      .get("http://localhost:4000/get-my-courses", {
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

  return (
    <>
      {courses.loading === false && courses.err === null && (
        <section className="st-courses" id="courses">
          <div className="st-products" id="Products">
            <section className="container-fluid ">
              <h1 className="text-center pt-5">My Courses</h1>
              <div className="row py-5">
                {Array.isArray(courses.results) &&
                  courses.results.map((course) => {
                    return (
                      <MyCourseItem
                        key={course.code}
                        code={course.code}
                        name={course.CourseName}
                        instructorName={course.InstructorName}
                        grade={course.grade}
                      />
                    );
                  })}
                {!Array.isArray(courses.results) && courses.results && (
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
              </div>
            </section>
          </div>
        </section>
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
}

export default MyCourses;
