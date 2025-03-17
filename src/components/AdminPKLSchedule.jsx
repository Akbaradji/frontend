import React, { useState } from "react";
import { Table } from "react-bootstrap";

const AdminPKLSchedule = () => {
    const [schedules, setSchedules] = useState([
        { id: 1, mahasiswa: "Budi Santoso", tanggalMulai: "2025-06-10", tanggalSelesai: "2025-09-10", status: "Berjalan" },
        { id: 2, mahasiswa: "Siti Aminah", tanggalMulai: "2025-07-01", tanggalSelesai: "2025-10-01", status: "Dijadwalkan" },
    ]);

    return (
        <div className="container mt-4 p-4">
            <h2 className="text-xl font-bold mb-4">Jadwal PKL</h2>
            
            {/* Tabel Jadwal PKL */}
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">Nama Mahasiswa</th>
                        <th className="border border-gray-300 px-4 py-2">Tanggal Mulai</th>
                        <th className="border border-gray-300 px-4 py-2">Tanggal Selesai</th>
                        <th className="border border-gray-300 px-4 py-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {schedules.map((item) => (
                        <tr key={item.id} className="text-center">
                            <td className="border border-gray-300 px-4 py-2">{item.mahasiswa}</td>
                            <td className="border border-gray-300 px-4 py-2">{item.tanggalMulai}</td>
                            <td className="border border-gray-300 px-4 py-2">{item.tanggalSelesai}</td>
                            <td className="border border-gray-300 px-4 py-2">{item.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


export default AdminPKLSchedule;
