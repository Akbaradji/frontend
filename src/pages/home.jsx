import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import logo from "../assets/kominfo.png";
import "./home.css";

const Home = () => {
    const [role, setRole] = useState(localStorage.getItem("role") || "mahasiswa");

    useEffect(() => {
        const handleStorageChange = () => {
            setRole(localStorage.getItem("role") || "mahasiswa");
        };

        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-6 text-center">
            {/* Tambahkan Logo Kominfo */}
            <img src={logo} alt="Logo Kominfo" className="home-logo mb-4" />

            <motion.h1
                className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                {role === "admin"
                    ? "Dashboard Admin PKL Kominfo Pacitan"
                    : "Selamat Datang di Sistem PKL Kominfo Kabupaten Pacitan"}
            </motion.h1>

            <motion.p
                className="text-lg md:text-xl text-gray-600 max-w-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
            >
                {role === "admin"
                    ? "Kelola pengajuan, jadwal, dan laporan PKL mahasiswa dengan mudah."
                    : "Pantau status pengajuan dan jadwal PKL Anda dengan cepat dan praktis."}
            </motion.p>

            {/* Bagian Footer dengan Alamat */}
            <div className="home-footer-container bg-[#0033A0] text-white p-4 rounded-lg shadow-md mt-6">
                <div className="home-footer text-center">
                    <p className="font-semibold">📍 Dinas Kominfo Pacitan</p>
                    <p>Jl. Jaksa Agung Suprapto No. 8, Pacitan</p>
                    <p>☎ (0357) 881234 | ✉ kominfo@pacitan.go.id</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
