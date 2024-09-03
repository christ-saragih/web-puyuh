import React from "react";
import { useNavigate } from "react-router-dom";
import useAuthAdmin from "../../hooks/useAuthAdmin";

const PublicRouteAdmin = ({ children }) => {
    const { admin, loading } = useAuthAdmin();
    const navigate = useNavigate();

    // Tunggu hingga status autentikasi selesai diproses
    if (loading) return <div>Loading...</div>;

    // Jika admin sudah login, redirect ke halaman dashboard atau halaman lain yang sesuai
    if (admin) {
        navigate("/admin"); // Ganti dengan rute yang sesuai
        return null; // Pastikan tidak ada komponen yang dirender saat redirect
    }

    // Jika admin belum login, tampilkan halaman login
    return children;
};

export default PublicRouteAdmin;
