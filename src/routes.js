import React, {useState, useEffect} from 'react';
import Login from './screens/Auth/Login';
import Panel from './screens/Panel';
import {Route, Redirect } from 'react-router';
import {authCheck} from './services/authService';
const Routes = () => {    
    
    const [isLogin, setIsLogin] = useState(null);  
    
    useEffect(async() => {
        const check = await authCheck({sessionKey: localStorage.getItem("sessionKey")});
        if(check.data.length > 0) setIsLogin(true);
    },[]);
    return(
        <>
            <Route path="/" exact>
                {
                    !isLogin
                    ?
                        <Redirect to="/login" />
                    :
                        <Redirect to="/panel" />
                }
            </Route>
            <Route path="/panel">
                <Panel />
            </Route>
            <Route path="/login">
                <Login />
            </Route>
        </>
    )
}

export default Routes;