import React from 'react';
import GuestLayout from '../../layouts/GuestLayout';
import { useNavigate } from 'react-router-dom';

const Verifikasi = () => {
  const navigate = useNavigate();

  const handleKembali = () => {
    navigate('/masuk'); // Arahkan pengguna kembali ke halaman login
  };

  return (
    <GuestLayout>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Verifikasi Email Anda</h1>
        <p className="text-gray-700 text-center mb-6">
          Kami telah mengirimkan email verifikasi ke alamat email Anda. Silakan periksa email Anda dan klik tautan verifikasi untuk mengaktifkan akun Anda.
        </p>
        <button
          onClick={handleKembali}
          className="bg-[#4B241A] hover:bg-[#381f19] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Kembali ke Halaman Login
        </button>
      </div>
    </GuestLayout>
  );
};

export default Verifikasi;
