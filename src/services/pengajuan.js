import api from "../services/api.js";

// Ambil semua pengajuan PKL
export const getPengajuan = async () => {
  const response = await api.get("/pengajuan");
  return response.data;
};

// Ambil pengajuan berdasarkan ID
export const getPengajuanById = async (id) => {
  const response = await api.get(`/pengajuan/${id}`);
  return response.data;
};

// Tambah pengajuan PKL baru
export const createPengajuan = async (data) => {
  const response = await api.post("/pengajuan", data);
  return response.data;
};

// Update pengajuan PKL berdasarkan ID
export const updatePengajuan = async (id, data) => {
  const response = await api.put(`/pengajuan/${id}`, data);
  return response.data;
};

// Hapus pengajuan PKL berdasarkan ID
export const deletePengajuan = async (id) => {
  const response = await api.delete(`/pengajuan/${id}`);
  return response.data;
};

// Update status pengajuan PKL
export const updateStatusPengajuan = async (id, status) => {
  const response = await api.put(`/pengajuan/${id}/status`, { status });
  return response.data;
};

// Ambil status PKL mahasiswa yang diterima
export const getStatusPKL = async (nim) => {
  try {
    const response = await api.get(`/status-pkl/${nim}`);
    return response.data;
  } catch (error) {
    return { message: "Gagal mengambil data. Mungkin belum mengajukan." };
  }
};