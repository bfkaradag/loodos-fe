import axios from '../axios';

const getMeeting = async (data) => {
    return axios.get(`/meetings?id=${data.id}`)
}
const createMeeting = async (data) => {
     return axios.post("/meetings", data);
}
const checkMeeting = async (data) => {
    return axios.get(`/meetings?date=${data.date}`)
}
const getMeetings = async (data) => {
    return axios.get(`/meetings?userId=${data.userId}`);
}
const updateMeeting = async (data) => {
    return axios.put(`/meetings/${data.id}`, data.body)
}

export {createMeeting, checkMeeting,getMeeting, getMeetings, updateMeeting};