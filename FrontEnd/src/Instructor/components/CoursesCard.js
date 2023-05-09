import React from "react";
import "../style/CourseCard.css";
import bookImg from "../assets/images/book.jpg";
const CoursesCard = (props) => {
  return (
    <div className="Instructor-course-card">
      <div className="Instructor-card-top">
        <img src={bookImg} alt="/" />
      </div>
      <div className="Instructor-card-info">
        <h4 className="ins-title">{props.name}</h4>
        <p className="ins-btn">Code: {props.code}</p>
      </div>
    </div>
  );
};
export default CoursesCard;
