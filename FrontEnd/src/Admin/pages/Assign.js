import "../style/Form.css";
import React, { useState } from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import { getAuthUser } from "../../helper/Storage";

const Assign = () => {
  const auth = getAuthUser();

  const [data, setData] = useState({
    instructor_email: "",
    code: "",
    loading: false,
    success: "",
    error: "",
  });

  const assign = (e) => {
    e.preventDefault();
    setData({ ...data, loading: true, error: "", success: "" });
    const link = "http://localhost:4000/assign-instructors-to-courses";
    axios
      .put(
        link,
        { instructor_email: data.instructor_email, code: data.code },
        {
          headers: {
            token: auth.token,
          },
        }
      )
      .then((res) => {
        setData({
          instructor_email: "",
          code: "",
          loading: false,
          error: "",
          success: res.data,
        });
      })
      .catch((err) => {
        if (err.response.status === 400)
          setData({
            ...data,
            error: err.response.data,
            loading: false,
            success: "",
          });
        else if (err.response.status === 422)
          setData({
            ...data,
            error: err.response.data.errors[0].msg,
            loading: false,
            success: "",
          });
        else
          setData({
            instructor_email: "",
            code: "",
            error: "Something Went Wrong",
            loading: false,
            success: "",
          });
      });
  };

  return (
    <div className="admin-container">
      <div id="shared-table-p">Assign Courses To Instructors</div>
      {data.loading === false && data.error && (
        <Alert variant="danger" className="p-2">
          {data.error}
        </Alert>
      )}
      {data.loading === false && data.success && (
        <Alert variant="success" className="p-2">
          {data.success}
        </Alert>
      )}
      <form action="/action_page.php" className="admin-form" onSubmit={assign}>
        <div className="admin-row">
          <div className="admin-col-25">
            <label htmlFor="Email">Instructor Email</label>
          </div>
          <div className="admin-col-75">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Instructor email"
              className="admin-input-select"
              required
              value={data.instructor_email}
              onChange={(e) =>
                setData({ ...data, instructor_email: e.target.value })
              }
            />
          </div>
        </div>

        <div className="admin-row">
          <div className="admin-col-25">
            <label htmlFor="Number" className="admin-label">
              Course Code
            </label>
          </div>
          <div className="admin-col-75">
            <input
              type="text"
              id="text"
              name="text"
              placeholder="Course Code"
              className="admin-input-select"
              required
              value={data.code}
              onChange={(e) => setData({ ...data, code: e.target.value })}
            />
          </div>
        </div>

        <div className="admin-row">
          <input type="submit" value="Submit" className="admin-submit" />
        </div>
      </form>
    </div>
  );
};

export default Assign;
