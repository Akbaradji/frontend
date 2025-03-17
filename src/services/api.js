import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api"; // Tambahkan /api agar URL benar

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials: true, // Jika Laravel menggunakan sesi
});

// Interceptor untuk menangani error respons dari API
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default api;
