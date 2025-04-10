import { useState } from "react";
import axios from "axios";
import "./PKLSubmission.css";

const PKLSubmission = () => {
    const [formData, setFormData] = useState({
        nama: "",
        nim: "",
        pendidikan: "",
        nama_instansi: "",
        jurusan: "",
        tanggal_mulai: "",
        tanggal_selesai: "",
        foto: null,
        file_pengajuan: null,
    });

    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files.length > 0) {
            setFormData(prevState => ({
                ...prevState,
                [name]: files[0],  // Simpan file yang dipilih
            }));
        }
    };

    const validateForm = () => {
        let newErrors = {};

        if (!formData.nama.trim()) newErrors.nama = "Nama wajib diisi";
        if (!formData.nim.trim() || isNaN(formData.nim)) newErrors.nim = "NIM harus berupa angka";
        if (!formData.pendidikan) newErrors.pendidikan = "Pendidikan wajib dipilih";
        if (!formData.nama_instansi.trim()) newErrors.nama_instansi = "Nama Instansi wajib diisi";
        if (!formData.jurusan.trim()) newErrors.jurusan = "Jurusan wajib diisi";
        if (!formData.tanggal_mulai) newErrors.tanggal_mulai = "Tanggal mulai wajib diisi";
        if (!formData.tanggal_selesai) newErrors.tanggal_selesai = "Tanggal selesai wajib diisi";
        if (formData.tanggal_mulai && formData.tanggal_selesai && formData.tanggal_mulai > formData.tanggal_selesai) {
            newErrors.tanggal_selesai = "Tanggal selesai harus setelah tanggal mulai";
        }
        if (!formData.foto) newErrors.foto = "Foto wajib diunggah";
        if (!formData.file_pengajuan) newErrors.file_pengajuan = "File PDF wajib diunggah";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data sebelum submit:", formData);

        if (!validateForm()) return;

        const submitData = new FormData();
        Object.keys(formData).forEach((key) => {
            submitData.append(key, formData[key]);
        });

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/pengajuan", submitData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            console.log("Response dari API:", response.data);
            alert("Pengajuan berhasil dikirim!");

            // Reset form setelah sukses submit
            setFormData({
                nama: "",
                nim: "",
                pendidikan: "",
                nama_instansi: "",
                jurusan: "",
                tanggal_mulai: "",
                tanggal_selesai: "",
                foto: null,
                file_pengajuan: null,
            });

            e.target.reset(); // Reset seluruh form
            setSubmitted(true);
        } catch (error) {
            console.error("Gagal mengirim pengajuan:", error.response?.data || error.message);
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
                    <label className="block text-gray-700 font-medium">Nama</label>
                    <input type="text" name="nama" value={formData.nama} onChange={handleChange} className="w-full p-2 border rounded" required />
                    {errors.nama && <p className="text-red-500 text-sm">{errors.nama}</p>}
                </div>

                <div>
                    <label className="block text-gray-700 font-medium">NIM</label>
                    <input type="text" name="nim" value={formData.nim} onChange={handleChange} className="w-full p-2 border rounded" required />
                    {errors.nim && <p className="text-red-500 text-sm">{errors.nim}</p>}
                </div>

                <div>
                    <label className="block text-gray-700 font-medium">Pendidikan</label>
                    <select name="pendidikan" value={formData.pendidikan} onChange={handleChange} className="w-full p-2 border rounded" required>
                        <option value="">Pilih Pendidikan</option>
                        <option value="SMA">SMA</option>
                        <option value="SMK">SMK</option>
                        <option value="D1">D1</option>
                        <option value="D2">D2</option>
                        <option value="D3">D3</option>
                        <option value="S1">S1</option>
                        <option value="S2">S2</option>
                        <option value="S3">S3</option>
                    </select>
                    {errors.pendidikan && <p className="text-red-500 text-sm">{errors.pendidikan}</p>}
                </div>

                <div>
                    <label className="block text-gray-700 font-medium">Nama Instansi</label>
                    <input type="text" name="nama_instansi" value={formData.nama_instansi} onChange={handleChange} className="w-full p-2 border rounded" required />
                    {errors.nama_instansi && <p className="text-red-500 text-sm">{errors.nama_instansi}</p>}
                </div>

                <div>
                    <label className="block text-gray-700 font-medium">Jurusan</label>
                    <input
                        type="text"
                        name="jurusan"
                        value={formData.jurusan}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                    {errors.jurusan && <p className="text-red-500 text-sm">{errors.jurusan}</p>}
                </div>

                {/* Input Tanggal Mulai */}
                <div>
                    <label className="block text-gray-700 font-medium">Tanggal Mulai</label>
                    <input type="date" name="tanggal_mulai" value={formData.tanggal_mulai} onChange={handleChange} className="w-full p-2 border rounded" required />
                    {errors.tanggal_mulai && <p className="text-red-500 text-sm">{errors.tanggal_mulai}</p>}
                </div>

                {/* Input Tanggal Selesai */}
                <div>
                    <label className="block text-gray-700 font-medium">Tanggal Selesai</label>
                    <input type="date" name="tanggal_selesai" value={formData.tanggal_selesai} onChange={handleChange} className="w-full p-2 border rounded" required />
                    {errors.tanggal_selesai && <p className="text-red-500 text-sm">{errors.tanggal_selesai}</p>}
                </div>

                <div>
                    <label className="block text-gray-700 font-medium">Upload Foto</label>
                    <input type="file" name="foto" accept="image/*" onChange={handleFileChange} className="w-full p-2 border rounded" />
                    {errors.foto && <p className="text-red-500 text-sm">{errors.foto}</p>}
                </div>

                <div>
                    <label className="block text-gray-700 font-medium">Upload File PDF</label>
                    <input type="file" name="file_pengajuan" accept="application/pdf" onChange={handleFileChange} className="w-full p-2 border rounded" />
                    {errors.file_pengajuan && <p className="text-red-500 text-sm">{errors.file_pengajuan}</p>}
                </div>

                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                    Kirim Pengajuan
                </button>
            </form>
        </div>
    );
};
export default PKLSubmission;