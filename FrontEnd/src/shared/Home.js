import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import img3 from "../Student/assets/imgs/instructor.jpeg";
import img4 from "../Student/assets/imgs/2.jpg";
import img6 from "../Student/assets/imgs/Freerange.jpg";
import img7 from "../Student/assets/imgs/Freerange-Stock-Svetlana-Sokolova-164.jpg";
import img8 from "../Student/assets/imgs/4.jpg";
import "../styleShared/home.css";
import CourseItem from "../Student/components/CourseItem";
import Alert from "react-bootstrap/Alert";

function Home() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  useEffect(() => {
    setCourses({ ...courses, loading: true });
    axios
      .get("http://localhost:4000/home")
      .then((resp) => {
        setCourses({ ...courses, results: resp.data, loading: false });
      })
      .catch((err) => {
        console.log(err);
        setCourses({ ...courses, loading: false, err: "No Courses Exist" });
      });
  }, [courses.reload]);

  function selectImage(small) {
    if (small && small.src) {
      let full = document.getElementById("imagebox");
      full.src = small.src;
    } else {
      console.log("Image not defined or has no src property.");
    }
  }
  let instructors = [],
    x = 0,
    y = 0;
  return (
    <>
      <section className="st-main-page">
        <div className="st-Section_top">
          <div className="st-content">
            <h1>
              Read & Learn <br /> in an easy way
            </h1>
            <a href={"#courses"}>Discover our courses</a>
          </div>
        </div>
      </section>

      <div
        className="modal fade"
        id="enroll"
        tabIndex="-1"
        aria-labelledby="enrollLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="enrollLabel">
                Confirmation
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">
                    Are you sure?{" "}
                  </label>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={() => navigate("/login")}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="st-review" id="Instructors">
        <h1>Instructors</h1>
        <div className="st-review_box">
          {courses.loading === false && courses.results.length === 0 && (
            <Alert
              variant="danger"
              style={{
                width: "50%",
                margin: "5% auto",
                textAlign: "center",
              }}
            >
              No Instructors
            </Alert>
          )}
          {courses.loading === false &&
            courses.results.map((instructor) => {
              if (
                !instructors.includes(
                  JSON.stringify(instructor.InstructorName)
                ) &&
                x !== 3
              ) {
                instructors.push(JSON.stringify(instructor.InstructorName));
                x++;
                return (
                  <div key={x} className="st-review_card">
                    <div className="st-card_top">
                      <div className="st-profile">
                        <div className="st-profile_image">
                          <img src={img3} alt="" />
                        </div>

                        <div className="st-name">
                          <strong>{instructor.InstructorName}</strong>
                        </div>
                      </div>
                    </div>
                    <div className="st-comment">
                      <p>
                        Instructors are responsible imparting knowledge to
                        students. They are well-versed in different topics
                        related to their area of teaching. They prepare lessons,
                        create presentation materials and other collaterals, and
                        present these to the students. They manage the classroom
                        and ensure that students are attentive.
                      </p>
                    </div>
                  </div>
                );
              }
            })}
        </div>
      </div>

      <section className="home-courses" id="courses">
        <div className="st-products" id="Products">
          <h1>COURSES</h1>
          <section className="container-fluid">
            <div className="row">
              {courses.loading === false && courses.results.length === 0 && (
                <Alert
                  variant="danger"
                  style={{
                    width: "50%",
                    margin: "5% auto",
                    textAlign: "center",
                  }}
                >
                  No Courses
                </Alert>
              )}
              {courses.loading === false &&
                courses.results.map((course) => {
                  if (y++ <= 3) {
                    return (
                      <CourseItem
                        key={y}
                        code={course.code}
                        name={course.CourseName}
                        instructorName={course.InstructorName}
                      />
                    );
                  }
                })}
            </div>
            {y >= 4 && (
              <>
                <br />
                <Link className="showbtn" to={"/login"}>
                  Show More
                </Link>
              </>
            )}
          </section>
        </div>
      </section>
      <div className="st-about" id="About">
        <h1>About</h1>
        <div className="st-about_main">
          <div className="st-about_image">
            <div className="st-about_small_image">
              <img src={img7} onClick={(e) => selectImage(e.target)} alt="" />
              <img src={img6} onClick={(e) => selectImage(e.target)} alt="" />
              <img src={img8} onClick={(e) => selectImage(e.target)} alt="" />
              <img src={img4} onClick={(e) => selectImage(e.target)} alt="" />
            </div>

            <div className="st-image_contaner">
              <img src={img6} id="imagebox" width={"650px"} alt="" />
            </div>
          </div>

          <div className="st-about_text">
            <p>
              the term lecturer may be used inmally to refer to anyone who
              conducts lectures at a university or elsewhere, but mally refers
              to a specific academic rank. The academic ranks in Australia are
              similar to those in the UK, with the rank of associate professor
              roughly equivalent to reader in UK universities. The academic
              levels in Australia are (in ascending academic level): (A)
              associate lecturer, (B) lecturer, (C) senior lecturer, (D)
              associate professor, and (E) professor.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
