import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import SidebarAdmin from "./components/SidebarAdmin";
import Home from "./pages/home";
import PKLSubmission from "./components/PKLSubmission";
import AdminPKLSubmission from "./components/AdminPKLSubmission";
import AdminPKLSchedule from "./components/AdminPKLSchedule";
import AdminDataMahasiswa from "./components/AdminDataMahasiswa";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import "./App.css";
import api from "./services/api"; 

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("user"); // Default user

  useEffect(() => {
      // Simulasi role dari localStorage atau API auth
      const storedRole = localStorage.getItem("role") || "user";
      setRole(storedRole);

      // Fetch data dari API
      api.get("/data")
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

  return (
      <Router>
          <div className="app-container">
              <Container fluid>
                  <Row>
                      {/* Sidebar di kiri */}
                      <Col md={3} className="sidebar-container">
                          {role === "admin" ? <SidebarAdmin /> : <Sidebar />}
                      </Col>

                      {/* Konten utama di kanan */}
                      <Col md={9} className="content-container">
                          {loading ? (
                              <p>Loading...</p> // Tambahkan indikator loading
                          ) : (
                              <Routes>  
                                  <Route path="/" element={<Home />} />
                                  <Route path="/pengajuan" element={<PKLSubmission />} />
                                  {role === "admin" && (
                                      <>
                                          <Route path="/admin/data-mahasiswa" element={<AdminDataMahasiswa />} />
                                          <Route path="/admin/pengajuan-pkl" element={<AdminPKLSubmission />} />
                                          <Route path="/admin/jadwal" element={<AdminPKLSchedule />} />
                                      </>
                                  )}
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
