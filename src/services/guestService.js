import axios from '../axios';

const getGuests = async () => {
     return axios.get("/guests");
}
const createGuest = async (data) => {
     return axios.post("/guests", data);
}
const checkGuest = async (data) => {
     return axios.get(`/guests?email=${data.email}`);
}
export {getGuests, createGuest, checkGuest}