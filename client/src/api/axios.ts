import axios from "axios";

const api = axios.create({
    baseURL: "http://ec2-100-60-71-190.compute-1.amazonaws.com:3000/api", 
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;