import PrivateRouteAdmin from "./components/PrivateRouteAdmin";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import { useState, useEffect } from "react";
import LoginAdmin from './components/LoginAdmin';
import Sidebar from "./components/Sidebar";
import SidebarAdmin from "./components/SidebarAdmin";
import Home from "./pages/home";
import PKLSubmission from "./components/PKLSubmission";
import AdminPKLSubmission from "./components/AdminPKLSubmission";
import PengajuanList from "./components/PengajuanList";
import StatusPKL from "./pages/StatusPKL";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import "./App.css";
import api from "./services/api";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("user");
  

  useEffect(() => {
    // Ambil role dari localStorage
    const storedRole = localStorage.getItem("role") || "admin";
    setRole(storedRole);

    // Fetch data pengajuan
    api.get("/pengajuan")
      .then((response) => {
        console.log("Data dari API:", response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Gagal mengambil data dari API:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Cek apakah admin sudah login berdasarkan token
  const isAdminLoggedIn = !!localStorage.getItem("admin_token");

  return (
    <Router>
      <div className="app-container">
        <Container fluid>
          <Row>
            {/* Sidebar */}
            <Col md={3} className="sidebar-container">
              {role === "admin" ? <SidebarAdmin /> : <Sidebar />}
            </Col>


            {/* Konten utama */}
            <Col md={9} className="content-container">
              {loading ? (
                <p>Loading...</p>
              ) : (
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/pengajuan" element={<PKLSubmission />} />
                  <Route path="/status-pkl" element={<StatusPKL />} />

                  <Route path="/admin/login" element={<LoginAdmin />} />

                  {/* 🔒 Route yang butuh login admin */}
                  <Route
                    path="/admin/pengajuanlist"
                    element={
                      <PrivateRouteAdmin>
                        <PengajuanList />
                      </PrivateRouteAdmin>
                    }
                  />
                  <Route
                    path="/admin/pengajuan-pkl"
                    element={
                      <PrivateRouteAdmin>
                        <AdminPKLSubmission />
                      </PrivateRouteAdmin>
                    }
                  />
                </Routes>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </Router>
  );
}


export default App;
