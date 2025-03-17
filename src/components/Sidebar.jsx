import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaClipboardList, FaFileAlt } from "react-icons/fa";
import logo from "../assets/kominfo.png";
import "./Sidebar.css";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <img src={logo} alt="Mahasiswa Logo" className="profile-img" />
                <p className="user-name">Mahasiswa</p>
                <p className="user-role">Dashboard Mahasiswa PKL</p>
            </div>

            <nav className="sidebar-menu">
                <Link to="/" className="menu-item">
                    <FaHome className="menu-icon" /> <span>Home</span>
                </Link>
                <Link to="/pengajuan" className="menu-item">
                    <FaClipboardList className="menu-icon" /> <span>Ajukan PKL</span>
                </Link>
                
            </nav>
        </div>
    );
};

export default Sidebar;
