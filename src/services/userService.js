import axios from '../axios';

const authCheck = async (data) => {
     return await axios.get(`/users?sessionKey=${data.sessionKey}`);
}

export {authCheck, login}