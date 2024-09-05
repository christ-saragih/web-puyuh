import React from "react";
import { useNavigate } from "react-router-dom";
import useAuthAdmin from "../../hooks/useAuthAdmin";
import useAuthInvestor from "../../hooks/useAuthInvestor";

const ProtectedRouteInvestor = ({ children }) => {
    const { admin } = useAuthAdmin();
    const { investor } = useAuthInvestor();
    const navigate = useNavigate();

    // Jika admin sudah login, redirect ke halaman dashboard admin
    if (admin) {
        navigate("/admin"); // Ganti dengan rute dashboard admin yang sesuai
        return null;
    }

    // Jika investor belum login, redirect ke halaman login investor
    if (!investor) {
        navigate("/masuk");
        return null;
    }

    // Jika investor sudah login, render konten halaman yang di-protect
    return children;
};

export default ProtectedRouteInvestor;
