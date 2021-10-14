import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { authCheck } from "../../services/authService";
 
const Layout = ({children}) => {
    const history = useHistory();
    useEffect(async () => {
        const check = await authCheck({sessionKey: localStorage.getItem("sessionKey")});
        if(!check.data.length > 0) history.push("/login");
    },[]);
  return (
    <>
        {children}    
    </>
  );
};

export default Layout;
