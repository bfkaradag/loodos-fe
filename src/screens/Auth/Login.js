import React, {useState, useEffect} from 'react';
import { Input, Button } from 'antd';
import { UserOutlined, LockOutlined, ArrowRightOutlined,EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import Crypto from '../../helpers/crypto';
import {login} from '../../services/authService';
import {useHistory} from 'react-router-dom';
import {authCheck} from '../../services/authService';
const Login = () => {
    const history = useHistory();
    useEffect(async () => {
        const check = await authCheck({sessionKey: localStorage.getItem("sessionKey")});
        if(check.data.length > 0) history.push("/panel");
    },[]);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const handleChangeUsername = (e) => {
        setUsername(e.target.value);
    } 

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const successfullyLogin = (data) => {
        localStorage.setItem("sessionKey", data.sessionKey);
        window.location.reload();
        history.push("/panel");
    }

    const requestLogin = () => {
        const encrypted = Crypto.aesEncrypt(password, username);
        login({username: username})
        .then(res => {
            res.data.length === 0 
            ?
                alert("Böyle bir kullanıcı bulunamadı!")
            :
            res.data[0].password === encrypted
            ?
                successfullyLogin(res.data[0])
            :
                alert("Girdiğiniz şifre yanlış!")
        })
    }

    return(
        <div className="d-flex justify-content-center align-items-center outer" >
            <div className="d-flex flex-row justify-content-center p-3 shadow" id="container-login">
                <h3>Giriş</h3>
                <div className="mt-1">
                    <Input 
                        size="middle" 
                        placeholder="Kullanıcı Adı" 
                        prefix={<UserOutlined />} 
                        onChange = {(e) => handleChangeUsername(e)}
                    />
                </div>
                <div className="mt-1">
                    <Input.Password
                        placeholder="Şifre"
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        prefix={<LockOutlined />}
                        onChange = {(e) => handleChangePassword(e)}
                    />
                </div>
                <div className="d-flex justify-content-end mt-2">
                    <Button 
                        type="primary" 
                        icon={<ArrowRightOutlined />} 
                        size="large"
                        onClick = {() => requestLogin()}
                        />
                </div>
            </div>
        </div>
    )
}

export default Login;