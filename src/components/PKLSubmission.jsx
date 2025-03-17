import { useState } from "react";
import "./PKLSubmission.css";

const PKLSubmission = () => {
    const [formData, setFormData] = useState({
        name: "",
        nim: "",
        startDate: "",
        endDate: "",
        notes: "",
    });

    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    
    const validateForm = () => {
        let newErrors = {};

        if (!formData.name.trim()) newErrors.name = "Nama wajib diisi";
        if (!formData.nim.trim() || isNaN(formData.nim)) newErrors.nim = "NIM harus berupa angka";
        if (!formData.startDate) newErrors.startDate = "Tanggal mulai wajib diisi";
        if (!formData.endDate) newErrors.endDate = "Tanggal selesai wajib diisi";
        if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
          newErrors.endDate = "Tanggal selesai harus setelah tanggal mulai";
        }
        
        setErrors(newErrors);
        console.log("Errors:", newErrors);

        return Object.keys(newErrors).length === 0;
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Data yang dikirim:", formData);
            setSubmitted(true);

            setTimeout(() => {
                setSubmitted(false);
                setFormData({
                    name: "",
                    nim: "",
                    startDate: "",
                    endDate: "",
                    notes: "",
                });
            }, 3000);
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white shadow-lg p-6 rounded-lg mt-6">
            <h2 className="text-2xl font-bold text-center mb-4">Form Pengajuan PKL</h2>

            {submitted && (
                <div className="p-3 mb-4 text-green-700 bg-green-200 border border-green-600 rounded">
                    ✅ Pengajuan berhasil dikirim!
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Nama Mahasiswa</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                <div>
                    <label className="block text-gray-700">NIM</label>
                    <input type="text" name="nim" value={formData.nim} onChange={handleChange} className="w-full p-2 border rounded" required />
                    {errors.nim && <p className="text-red-500 text-sm">{errors.nim}</p>}
                </div>

                <div className="flex gap-4">
                    <div className="w-1/2">
                        <label className="block text-gray-700">Tanggal Mulai</label>
                        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="w-full p-2 border rounded" required />
                        {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate}</p>}
                    </div>

                    <div className="w-1/2">
                        <label className="block text-gray-700">Tanggal Selesai</label>
                        <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="w-full p-2 border rounded" required />
                        {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate}</p>}
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700">Keterangan Tambahan</label>
                    <textarea name="notes" value={formData.notes} onChange={handleChange} className="w-full p-2 border rounded" rows="3"></textarea>
                </div>

                <button
                    type="submit"
                    className="pkl-submit-btn">
                    Kirim Pengajuan
                </button>
            </form>
        </div>
    );
};

export default PKLSubmission;