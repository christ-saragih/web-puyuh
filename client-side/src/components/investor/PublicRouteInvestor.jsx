import React from "react";
import { useNavigate } from "react-router-dom";
import useAuthAdmin from "../../hooks/useAuthAdmin";
import useAuthInvestor from "../../hooks/useAuthInvestor";

const PublicRouteInvestor = ({ children }) => {
    const { admin } = useAuthAdmin();
    const { investor } = useAuthInvestor();
    // const { admin, loading: loadingAdmin } = useAuthAdmin();
    // const { investor, loading: loadingInvestor } = useAuthInvestor();
    const navigate = useNavigate();

    // // Jika sedang loading (baik untuk admin maupun investor), tampilkan loading
    // if (loadingAdmin || loadingInvestor) return <div>Loading...</div>;

    // Jika admin sudah login, redirect ke halaman dashboard admin
    if (admin) {
        navigate("/admin"); // Ganti dengan rute dashboard admin yang sesuai
        return null;
    }

    // Jika investor belum login, redirect ke halaman login investor
    if (investor) {
        navigate("/investor");
        return null;
    }

    // Jika investor sudah login, render konten halaman yang di-protect
    return children;
};

export default PublicRouteInvestor;
