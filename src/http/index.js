import axios from "axios";
export const API_URL = 'https://photoa.azurewebsites.net/api';
const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
});
$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('Userdata'))}`;
    return config;
});
$api.interceptors.response.use((config) => {
    return config;
}, (e) => {
    if (e.response.status == 401) {
        localStorage.removeItem('Userdata');
    }
    throw e;
});
export default $api;