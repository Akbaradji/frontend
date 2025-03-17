import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaUserGraduate,
  FaBuilding,
  FaClipboardList,
  FaCalendarAlt,
  FaFileAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import logo from "../assets/kominfo.png";
import "./Sidebar.css";

const SidebarAdmin = () => {
  const [isMasterDataOpen, setMasterDataOpen] = useState(false);

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
            <Link to="/admin/data-mahasiswa" className="submenu-item">
              <FaUserGraduate className="menu-icon" /> <span>Data Mahasiswa</span>
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
      </nav>
    </div>
  );
};

export default SidebarAdmin;
