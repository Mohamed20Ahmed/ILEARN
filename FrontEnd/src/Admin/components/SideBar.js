import '../style/SideBar.css';
import '../../index.js';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const SideBar =()=>{
  var {type}=useParams();
  if(type===undefined){
    type="Instructor";
  }
  const openNav=()=> {
    document.getElementById("adminMySidenav").style.width = "250px";
    //document.getElementsByTagName("body").style.marginLeft = "250px";
    document.getElementById("admin-open").style.display="none";
    document.getElementById("admin-close").style.display="block";
  }
  
  const closeNav=()=> {
    document.getElementById("adminMySidenav").style.width = "30px";
    //document.getElementById("main").style.marginLeft= "30px";
    document.getElementById("admin-open").style.display="block";
    document.getElementById("admin-close").style.display="none";
  }
    return(
        <aside id="adminMySidenav" className="admin-sideBar">
          <Link to={"/Admin/"+type}>Show {type}</Link>
          <Link to={"/Admin/add/"+type}>Add {type}</Link>
          <span style={{fontSize: '30px' , cursor:'pointer'}} onClick={openNav} id="admin-open"><i className="fa-solid fa-circle-arrow-right"></i> </span>
          <span style={{fontSize: '30px' , cursor:'pointer'}} onClick={closeNav} id="admin-close"><i className="fa-solid fa-circle-arrow-left"></i> </span>
        </aside>
    );
}



export default SideBar;