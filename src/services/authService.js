import axios from '../axios';

const authCheck = async (data) => {
     return await axios.get(`/users?sessionKey=${data.sessionKey}`);
}
const login = async (data) => {
    return axios.get(`/users?username=${data.username}`);
   
}

export {authCheck, login}