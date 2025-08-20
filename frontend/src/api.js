import axios from "axios";

const API = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true       //needed because of tokens and auth
});

export default API;