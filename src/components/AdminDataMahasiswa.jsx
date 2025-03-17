import React, { useState } from "react";

const AdminDataMahasiswa = () => {
    const [mahasiswa, setMahasiswa] = useState([
        { id: 1, nama: "Budi Santoso", nim: "210001", prodi: "Teknik Informatika", mulai: "01-04-2025", selesai: "30-06-2025", status: "Berjalan" },
        { id: 2, nama: "Siti Aminah", nim: "210002", prodi: "Sistem Informasi", mulai: "10-03-2025", selesai: "10-06-2025", status: "Selesai" },
    ]);


    return (
        <div className="container mt-4">
            <h2 className="text-xl font-bold mb-4">Data Mahasiswa PKL</h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">No</th>
                        <th className="border border-gray-300 px-4 py-2">Nama</th>
                        <th className="border border-gray-300 px-4 py-2">NIM</th>
                        <th className="border border-gray-300 px-4 py-2">Program Studi</th>
                        <th className="border border-gray-300 px-4 py-2">Tanggal Mulai</th>
                        <th className="border border-gray-300 px-4 py-2">Tanggal Selesai</th>
                        <th className="border border-gray-300 px-4 py-2">Status PKL</th>
                    </tr>
                </thead>
                <tbody>
                    {mahasiswa.map((mhs, index) => (
                        <tr key={mhs.id} className="text-center">
                            <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                            <td className="border border-gray-300 px-4 py-2">{mhs.nama}</td>
                            <td className="border border-gray-300 px-4 py-2">{mhs.nim}</td>
                            <td className="border border-gray-300 px-4 py-2">{mhs.prodi}</td>
                            <td className="border border-gray-300 px-4 py-2">{mhs.mulai}</td>
                            <td className="border border-gray-300 px-4 py-2">{mhs.selesai}</td>
                            <td className="border border-gray-300 px-4 py-2">{mhs.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDataMahasiswa;