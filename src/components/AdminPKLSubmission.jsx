import React, { useState } from "react";
import "./AdminPKLSubmission.css";

const AdminPKLSubmission = () => {
    const [pengajuan, setPengajuan] = useState([
        { id: 1, nama: "Siti Aminah", nim: "210002", tanggal: "2025-03-10", status: "Pending" },
        { id: 2, nama: "Budi Santoso", nim: "210001", tanggal: "2025-03-12", status: "Pending" },
    ]);
    

    const updateStatus = (id, statusBaru) => {
        setPengajuan(pengajuan.map((item) => item.id === id ? { ...item, status: statusBaru } : item));
    };

    return (
        <div className="admin-pkl-container">
            <h2 className="title">Pengajuan PKL Mahasiswa</h2>
            <table className="pkl-table">
                <thead>
                    <tr>
                        <th>Nama</th>
                        <th>NIM</th>
                        <th>Tanggal</th>
                        <th>Status</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {pengajuan.map((item) => (
                        <tr key={item.id}>
                            <td>{item.nama}</td>
                            <td>{item.nim}</td>
                            <td>{item.tanggal}</td>
                            <td className={`status ${item.status.toLowerCase()}`}>{item.status}</td>
                            <td>
                                {item.status === "Pending" && (
                                    <>
                                        <button className="accept" onClick={() => updateStatus(item.id, "Diterima")}>
                                            ✅ Terima
                                        </button>
                                        <button className="reject" onClick={() => updateStatus(item.id, "Ditolak")}>
                                            ❌ Tolak
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPKLSubmission;
