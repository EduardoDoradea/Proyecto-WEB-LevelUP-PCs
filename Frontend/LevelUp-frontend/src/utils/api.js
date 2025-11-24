<<<<<<< HEAD
=======
// utils / api.js
>>>>>>> 22cc379de6e7ebec1e6999af0e20e0332bcf213f
import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000",
});

<<<<<<< HEAD
=======
// Add token to Authorization Header
>>>>>>> 22cc379de6e7ebec1e6999af0e20e0332bcf213f
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
});

export default API;