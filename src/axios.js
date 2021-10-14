import axios from 'axios';
import { API_ADDRESS } from './environments/environment';

export default axios.create({
    baseURL: API_ADDRESS
})