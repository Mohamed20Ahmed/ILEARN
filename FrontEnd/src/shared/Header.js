import '../styleShared/Header.css';
import '../index';
import { Link ,useNavigate} from 'react-router-dom';
import {removeAuthUser,getAuthUser} from "../helper/Storage";
const Header =()=>{
  const navigate =useNavigate();
  const auth = getAuthUser();
  const Logout=()=>{
    removeAuthUser();
    navigate("/");
  }
    const myFunction=()=>{
      var x = document.getElementById("adminMyTopNav");
      if (x.className === "admin-navbar-collapse") {
        x.className += " responsive";
      } else {
        x.className = "admin-navbar-collapse";
      }}
      return(
          <nav className="admin-navbar" id="admin-navbar">

              {auth&&(
                <>
                <Link to={`/${auth.type}`} className="admin-navbar-brand" id="admin-logo"><span>i</span>learn</Link>
                <div className="admin-logout">
                <Link to="/"className="admin-log-link" onClick={Logout}>logout</Link>
                </div>
                </>
              )}
              {!auth&&(
                <>
                <Link to={`/`} className="admin-navbar-brand" id="admin-logo"><span>i</span>learn</Link>
                <div className="admin-logout">
                <Link to="/login"className="admin-log-link">login</Link>
                </div>
                </> 
              )}
              
              <button className="admin-icon" onClick={myFunction}>
                  <i className="fa-solid fa-bars"></i>
                </button>
                {/*HomeHeader*/}
                {!auth && (
                  <div className="admin-navbar-collapse" id="adminMyTopNav">  
                  <a href={"#courses"}className="admin-nav-link">Courses</a>
                  <a href={"#Instructors"}className="admin-nav-link">Instructors</a>
                  <a href={"#About"}className="admin-nav-link">About</a>
                  </div>
                )}
                {/*AdminHeader*/}
                {auth && auth.type==="admin"&&(
                  <div className="admin-navbar-collapse" id="adminMyTopNav">    
                  <Link to="/Admin/Student"className="admin-nav-link" >Students</Link>
                  <Link to="/Admin/Course"className="admin-nav-link" >Courses</Link>
                  <Link to="/Admin/Instructor"className="admin-nav-link" >Instructors</Link>
                  <Link to="/Admin/Assign"className="admin-nav-link" >Assign Courses</Link>
                  </div>
                )}
                {/*StudentHeader*/}
                {auth && auth.type==="student"&&(
                  <div className="admin-navbar-collapse" id="adminMyTopNav">  
                  <Link to={"/Student/AllCourses"}className="admin-nav-link">Courses</Link>
                  <Link to={"/Student/MyCourses"}className="admin-nav-link">My Courses</Link>
                  </div>
                )}
                {/*instructorHeader*/}
                {auth && auth.type==="instructor"&&(
                  <div className="admin-navbar-collapse" id="adminMyTopNav">    
                  <Link className="admin-nav-link" to="/Instructor/courses">Courses</Link>
                  </div>
                )}
                

          </nav>
      );
  }
  

  export default Header;