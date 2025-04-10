import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminPKLSubmission.css";

const AdminPKLSubmission = () => {
    const [pengajuan, setPengajuan] = useState([]);
    const [selectedPengajuan, setSelectedPengajuan] = useState(null);
    const [statusBaru, setStatusBaru] = useState("");
    const [catatan, setCatatan] = useState("");
    const [showModal, setShowModal] = useState(false);

    // Fungsi untuk mengambil data pengajuan dari API
    const fetchPengajuan = () => {
        axios.get("http://127.0.0.1:8000/api/pengajuan")
            .then(response => {
                setPengajuan(response.data.data);
            })
            .catch(error => {
                console.error("Gagal mengambil data pengajuan:", error);
            });
    };

    // Ambil data pengajuan saat komponen dimuat
    useEffect(() => {
        fetchPengajuan();
    }, []);

    // Menampilkan modal saat tombol ditekan
    const handleOpenModal = (pengajuan, status) => {
        console.log("Tombol diklik! Data:", pengajuan, "Status Baru:", status);
        setSelectedPengajuan(pengajuan);
        setStatusBaru(status);
        setCatatan("");
        setShowModal(true);
    };

    // Fungsi untuk mengupdate status dan catatan di backend
    const handleSubmitStatus = () => {
        if (!selectedPengajuan) return;

        console.log("SUBMIT DIKLIK!");

        axios.put(`http://127.0.0.1:8000/api/pengajuan/status/${selectedPengajuan.id}`,

            { status: statusBaru.toLowerCase(), catatan },
            {
                headers: { 'Content-Type': 'application/json' }
            })
            .then(() => {
                alert("Status berhasil diperbarui!");
                setShowModal(false);
                fetchPengajuan(); // Refresh data setelah update
            })
            .catch(error => {
                console.error("Gagal memperbarui status:", error);
            });
    };

    return (
        <div className="admin-pkl-container">
            <h2 className="title">Daftar Pengajuan PKL</h2>
            <table className="pkl-table">
                <thead>
                    <tr>
                        <th>Nama</th>
                        <th>NIM</th>
                        <th>Pendidikan</th>
                        <th>Jurusan</th>
                        <th>Nama Instansi</th>
                        <th>Tanggal Mulai</th>
                        <th>Tanggal Selesai</th>
                        <th>Foto</th>
                        <th>File Pengajuan</th>
                        <th>Status</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {pengajuan.map((item) => (
                        <tr key={item.id}>
                            <td>{item.nama}</td>
                            <td>{item.nim}</td>
                            <td>{item.pendidikan}</td>
                            <td>{item.jurusan}</td>
                            <td>{item.nama_instansi}</td>
                            <td>{item.tanggal_mulai}</td>
                            <td>{item.tanggal_selesai}</td>
                            <td>
                                {item.foto ? (
                                    <a href={item.foto} target="_blank" rel="noopener noreferrer">Lihat Foto</a>
                                ) : (
                                    'Tidak ada'
                                )}
                            </td>
                            <td>
                                {item.file_pengajuan ? (
                                    <a href={item.file_pengajuan} target="_blank" rel="noopener noreferrer" download>Download File</a>
                                ) : (
                                    'Tidak ada'
                                )}
                            </td>
                            <td className={`status ${item.status ? item.status.toLowerCase() : "pending"}`}>
                                {item.status || "Pending"}
                                {item.catatan && <p className="catatan">Catatan: {item.catatan}</p>}
                            </td>
                            <td>
                                {item.status !== "disetujui" && item.status !== "ditolak" && (
                                    <>
                                        <button onClick={() => handleOpenModal(item, "disetujui")}>✅ Terima</button>
                                        <button onClick={() => handleOpenModal(item, "ditolak")}>❌ Tolak</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal untuk Input Catatan */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>{statusBaru === "disetujui" ? "Terima Pengajuan" : "Tolak Pengajuan"}</h3>
                        <p>Masukkan catatan untuk mahasiswa:</p>
                        <textarea
                            value={catatan}
                            onChange={(e) => setCatatan(e.target.value)}
                            placeholder={`Catatan untuk ${statusBaru === "disetujui" ? "persetujuan" : "penolakan"}...`}
                        ></textarea>
                        <div className="modal-actions">
                            <button onClick={handleSubmitStatus}>Simpan</button>
                            <button onClick={() => setShowModal(false)}>Batal</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPKLSubmission;