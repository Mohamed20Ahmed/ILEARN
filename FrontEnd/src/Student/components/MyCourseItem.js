import React from "react";

import img1 from "../assets/imgs/lap2.jpg";

function MyCourseItem(props) {
  const view = () => {
    document.getElementById(props.code).style.display = "block";
    document.getElementById(`${props.code}-view`).style.display = "none";
  };

  return (
    <>
      <div className="col-3 d-flex justify-content-center pb-5">
        <div className="card" style={{ width: "18rem" }}>
          <img src={img1} className="card-img-top" alt="..." />
          <div className="card-body text-center">
            <h3>{props.name}</h3>

            <h6 className="st-item">{props.code}</h6>

            <h5 className="st-item">{props.instructorName}</h5>
            <button
              className="btn btn-outline-brown"
              onClick={view}
              id={`${props.code}-view`}
            >
              View Grades
            </button>

            <h5
              className="st-item"
              id={props.code}
              style={{
                color: "rgb(140, 140, 140)",
                display: "none",
                marginTop: "17px",
              }}
            >
              <span style={{ color: "#f76b07" }}>Your grade: </span>
              {props.grade || "none"}
            </h5>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyCourseItem;
