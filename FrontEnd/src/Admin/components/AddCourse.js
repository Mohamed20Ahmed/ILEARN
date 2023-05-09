import "../style/Form.css";
import React, { useState } from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import { getAuthUser } from "../../helper/Storage";

const AddCourse = () => {
  const auth = getAuthUser();

  const [course, setCourse] = useState({
    name: "",
    code: "",
    loading: false,
    success: "",
    error: "",
  });

  const Add = (e) => {
    e.preventDefault();
    setCourse({ ...course, loading: true, error: "", success: "" });
    const link = "http://localhost:4000/add-course";
    axios
      .post(
        link,
        { name: course.name, code: course.code },
        {
          headers: {
            token: auth.token,
          },
        }
      )
      .then((res) => {
        setCourse({
          name: "",
          code: "",
          loading: false,
          error: "",
          success: res.data,
        });
      })
      .catch((err) => {
        if (err.response.status === 409)
          setCourse({
            ...course,
            error: err.response.data,
            loading: false,
            success: "",
          });
        else if (err.response.status === 422)
          setCourse({
            ...course,
            error: err.response.data.errors[0].msg,
            loading: false,
            success: "",
          });
        else
          setCourse({
            name: "",
            code: "",
            error: "Something Went Wrong",
            loading: false,
            success: "",
          });
      });
  };

  return (
    <>
      <div className="admin-container">
        <div id="shared-table-p">Add Course</div>
        {course.loading === false && course.error && (
          <Alert variant="danger" className="p-2">
            {course.error}
          </Alert>
        )}
        {course.loading === false && course.success && (
          <Alert variant="success" className="p-2">
            {course.success}
          </Alert>
        )}
        <form
          name="myForm"
          action="/action_page.php"
          className="admin-form"
          onSubmit={Add}
        >
          <div className="admin-row">
            <div className="admin-col-25">
              <label key="name" className="admin-label">
                Name
              </label>
            </div>
            <div className="admin-col-75">
              <input
                type="text"
                placeholder="Course Name"
                id="name"
                className="admin-input-select"
                required
                value={course.name}
                onChange={(e) => setCourse({ ...course, name: e.target.value })}
              />
            </div>
          </div>
          <div className="admin-row">
            <div className="admin-col-25">
              <label key="code" className="admin-label">
                Code
              </label>
            </div>
            <div className="admin-col-75">
              <input
                type="number"
                placeholder="Course Code"
                id="code"
                className="admin-input-select"
                required
                value={course.code}
                onChange={(e) => setCourse({ ...course, code: e.target.value })}
              />
            </div>
          </div>
          <div className="admin-row">
            <input
              type="submit"
              value="Submit"
              className="admin-submit"
              disabled={course.loading === true}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddCourse;
