import React from "react";
import { useNavigate } from "react-router-dom";
import useAuthAdmin from "../../hooks/useAuthAdmin";
import useAuthInvestor from "../../hooks/useAuthInvestor";

const ProtectedRouteAdmin = ({ children }) => {
    const { admin } = useAuthAdmin();
    const { investor } = useAuthInvestor();
    const navigate = useNavigate();

    // Jika investor sudah login, redirect ke halaman dashboard investor
    if (investor) {
        navigate("/investor"); // Ganti dengan rute dashboard investor yang sesuai
        return null;
    }

    // Jika admin belum login, redirect ke halaman login admin
    if (!admin) {
        navigate("/admin/masuk");
        return null;
    }

    // Jika admin sudah login, render konten halaman yang di-protect
    return children;
};

export default ProtectedRouteAdmin;
