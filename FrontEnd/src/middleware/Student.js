import React from "react";
import { Outlet ,Navigate } from "react-router-dom";
import { getAuthUser } from "../helper/Storage";
const Student =()=>{
    const auth = getAuthUser();
    return <>
    {
    auth && auth.type==="student" ? <Outlet/>:<Navigate to={`/`}/>
    }
    </>;
}
export default Student;