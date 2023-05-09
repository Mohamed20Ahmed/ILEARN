import React from "react";
import { Outlet ,Navigate } from "react-router-dom";
import { getAuthUser } from "../helper/Storage";
const Admin =()=>{
    const auth = getAuthUser();
    return <>
    {
    auth && auth.type==="admin" ? <Outlet/>:<Navigate to={`/`}/>
    }
    </>;
}
export default Admin;