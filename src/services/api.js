import axios from "axios";


const API_URL = "http://127.0.0.1:8000/api"; // Tambahkan /api agar URL benar


const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials: true, // Jika Laravel pakai sesi login
});

// ✅ Interceptor REQUEST – Tambahkan Authorization token dari localStorage
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("admin_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// ⚠️ Interceptor RESPONSE – Untuk logging error atau redirect
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("admin_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default api;
