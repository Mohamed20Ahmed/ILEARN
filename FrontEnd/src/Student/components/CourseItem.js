import React from "react";
import axios from "axios";
import img10 from "../assets/imgs/Business.jpg";
import { getAuthUser } from "../../helper/Storage";
import { Link, useNavigate } from "react-router-dom";

function CourseItem(props) {
  const auth = getAuthUser();
  const navigate = useNavigate();
  // let code = props.code;
  const enrollCourse = (courseCode) => {
    axios
      .post(
        "http://localhost:4000/enroll-course",
        { email: auth.email, code: courseCode },
        { headers: { token: auth.token } }
      )
      .then((res) => {
        navigate(`/Student/MyCourses`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="col-3 d-flex justify-content-evenly align-items-center pb-4">
        <div className="st-card">
          <div className="st-small_card">
            <i className="fa-solid fa-heart icon"></i>
            <i className="fa-solid fa-share icon"></i>
          </div>
          <div className="st-image">
            <img src={img10} width="270px" height="200px" alt="" />
          </div>
          <div className="st-products_text">
            <h3>{props.name}</h3>

            <h6>
              <p>Code</p>
              {props.code}
            </h6>

            <h5>
              <p>Instructor Name</p>
              {props.instructorName}
            </h5>
            <div className="st-products_star">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
            </div>

            <button
              type="button"
              className="btn btn-success"
              onClick={(e) => {
                enrollCourse(props.code);
              }}
            >
              Enroll
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseItem;
