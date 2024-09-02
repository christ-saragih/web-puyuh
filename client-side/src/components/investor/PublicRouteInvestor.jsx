import React from "react";
import { useNavigate } from "react-router-dom";
import useAuthInvestor from "../../hooks/useAuthInvestor";

const PublicRouteInvestor = ({ children }) => {
    const { investor, loading } = useAuthInvestor();
    const navigate = useNavigate();

    // Tunggu hingga status autentikasi selesai diproses
    if (loading) return <div>Loading...</div>;

    // Jika investor sudah login, redirect ke halaman dashboard atau halaman lain yang sesuai
    if (investor) {
        navigate("/investor"); // Ganti dengan rute yang sesuai
        return null; // Pastikan tidak ada komponen yang dirender saat redirect
    }

    // Jika investor belum login, tampilkan halaman login
    return children;
};

export default PublicRouteInvestor;
