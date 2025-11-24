<<<<<<< HEAD
// utils / api.js
=======
>>>>>>> e4e0adaa769a55decb634c548f0450d1f52bc96e
import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000",
});

<<<<<<< HEAD
// Add token to Authorization Header
=======
>>>>>>> e4e0adaa769a55decb634c548f0450d1f52bc96e
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) req.headers.Authorization = `Bearer ${token}`;
    return req;
});

export default API;