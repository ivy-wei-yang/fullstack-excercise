import axios from "axios";

const instance = axios.create({
    baseURL: process.env.SERVICE_URL
});

export default instance;
