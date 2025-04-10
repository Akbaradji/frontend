import React, { useEffect, useState } from "react";
import { getPengajuan } from "../services/pengajuan";
import "./PengajuanList.css";

const PengajuanList = () => {
    const [pengajuans, setPengajuans] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getPengajuan();
                // Filter hanya pengajuan dengan status "disetujui" (case-insensitive)
                const pengajuanDiterima = data.data.filter(
                    (item) => item.status.toLowerCase() === "disetujui"
                );
                setPengajuans(pengajuanDiterima);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const formatTanggal = (tanggal) => {
        return new Intl.DateTimeFormat("id-ID", { dateStyle: "long" }).format(new Date(tanggal));
    };

    return (
        <div>
            <h2>Daftar Pengajuan PKL (Disetujui)</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Nama</th>
                        <th>NIM</th>
                        <th>Pendidikan</th>
                        <th>Jurusan</th>
                        <th>Nama Instansi</th>
                        <th>Tanggal Mulai</th>
                        <th>Tanggal Selesai</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {pengajuans.length > 0 ? (
                        pengajuans.map((item) => (
                            <tr key={item.id}>
                                <td>{item.nama}</td>
                                <td>{item.nim}</td>
                                <td>{item.pendidikan}</td>
                                <td>{item.jurusan}</td>
                                <td>{item.nama_instansi}</td>
                                <td>{formatTanggal(item.tanggal_mulai)}</td>
                                <td>{formatTanggal(item.tanggal_selesai)}</td>
                                <td style={{ color: "green", fontWeight: "bold" }}>
                                    {item.status}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" style={{ textAlign: "center", fontWeight: "bold" }}>
                                Tidak ada pengajuan yang diterima.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default PengajuanList;