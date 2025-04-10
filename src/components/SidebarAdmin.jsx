import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUserGraduate,
  FaBuilding,
  FaClipboardList,
  FaCalendarAlt,
  FaFileAlt,
  FaChevronDown,
  FaChevronUp,
  FaSignOutAlt,
} from "react-icons/fa";
import logo from "../assets/kominfo.png";
import "./Sidebar.css";

const SidebarAdmin = () => {
  const [isMasterDataOpen, setMasterDataOpen] = useState(false);
  const navigate = useNavigate();
  const isAdminLoggedIn = localStorage.getItem("admin_token");

  const handleLogout = () => {
    if (window.confirm("Yakin ingin logout?")) {
      localStorage.removeItem("admin_token");
      localStorage.removeItem("role");
      window.location.reload();
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={logo} alt="Admin Logo" className="profile-img" />
        <p className="user-name">Admin</p>
        <p className="user-role">Dashboard Admin PKL</p>
      </div>

      <nav className="sidebar-menu">
        <Link to="/" className="menu-item">
          <FaHome className="menu-icon" /> <span>Home</span>
        </Link>

        {/* Master Data */}
        <div className="menu-item" onClick={() => setMasterDataOpen(!isMasterDataOpen)}>
          <FaFileAlt className="menu-icon" /> <span>Master Data</span>
          {isMasterDataOpen ? <FaChevronUp className="submenu-icon" /> : <FaChevronDown className="submenu-icon" />}
        </div>

        {isMasterDataOpen && (
          <div className="submenu">
            <Link to="/admin/pengajuanlist" className="submenu-item">
              <FaUserGraduate className="menu-icon" /> <span>Data Pengajuan PKL</span>
            </Link>
            <Link to="/admin/data-instansi" className="submenu-item">
              <FaBuilding className="menu-icon" /> <span>Data Instansi</span>
            </Link>
          </div>
        )}

        <Link to="/admin/pengajuan-pkl" className="menu-item">
          <FaClipboardList className="menu-icon" /> <span>Kelola Pengajuan</span>
        </Link>

        <Link to="/admin/jadwal" className="menu-item">
          <FaCalendarAlt className="menu-icon" /> <span>Jadwal PKL</span>
        </Link>

        {/* Logout hanya tampil jika admin login */}
        {isAdminLoggedIn && (
          <div className="menu-item logout-item" onClick={handleLogout} style={{ color: "red" }}>
            <FaSignOutAlt className="menu-icon" /> <span>Logout</span>
          </div>
        )}
      </nav>
    </div>
  );
};


export default SidebarAdmin;
