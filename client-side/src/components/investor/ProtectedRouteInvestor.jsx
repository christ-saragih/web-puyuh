import React from "react";
import { useNavigate } from "react-router-dom";
import useAuthAdmin from "../../hooks/useAuthAdmin";
import useAuthInvestor from "../../hooks/useAuthInvestor";

const ProtectedRouteInvestor = ({ children }) => {
    // const { admin, loading: loadingAdmin } = useAuthAdmin();
    const { investor, loading: loadingInvestor } = useAuthInvestor();
    const navigate = useNavigate();

    // Jika sedang loading (baik untuk admin maupun admin), tampilkan loading
    if (loadingInvestor) return <div>Loading...</div>;

    // Jika admin sudah login, redirect ke halaman dashboard admin
    // if (admin) {
    //     navigate("/admin"); // Ganti dengan rute dashboard admin yang sesuai
    //     return null;
    // }

    // Jika investor belum login, redirect ke halaman login investor
    if (!investor) {
        navigate("/masuk");
        return null;
    }

    // Jika investor sudah login, render konten halaman yang di-protect
    return children;
};

export default ProtectedRouteInvestor;
