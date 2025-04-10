import React, { useState } from "react";
import { getStatusPKL } from "../services/pengajuan";

const StatusPKL = () => {
    const [nim, setNim] = useState(""); // Input NIM dari mahasiswa
    const [status, setStatus] = useState(null);
    const [error, setError] = useState("");

    const checkStatus = async () => {
        if (!nim) {
            setError("Masukkan NIM terlebih dahulu!");
            return;
        }
        setError("");
        const data = await getStatusPKL(nim);
        console.log("Data dari API:", data);
        if (data.message) {
            setError(data.message);
            setStatus(null);
        } else {
            setStatus(data);
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white shadow-lg p-6 rounded-lg mt-6">
            <h2 className="text-2xl font-bold text-center mb-4">Cek Status PKL</h2>
            <input
                type="text"
                value={nim}
                onChange={(e) => setNim(e.target.value)}
                placeholder="Masukkan NIM"
                className="border p-2 w-full mb-2"
            />
            <button onClick={checkStatus} className="bg-blue-500 text-white p-2 rounded w-full">
                Cek Status
            </button>

            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            {status && (
                <div className="mt-4 text-center">
                    <p><strong>Nama:</strong> {status.nama}</p>
                    <p><strong>Status:</strong> {status.status}</p>
                    {status.catatan && <p><strong>Catatan:</strong> {status.catatan}</p>}
                </div>
            )}
        </div>
    );
};

export default StatusPKL;
