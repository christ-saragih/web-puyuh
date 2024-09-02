import React from "react";
import { useNavigate } from "react-router-dom";
import useAuthAdmin from "../../hooks/useAuthAdmin";

const ProtectedRouteAdmin = ({ children }) => {
    const { admin, loading } = useAuthAdmin();
    const navigate = useNavigate();

    if (loading) return <div>Loading...</div>;

    if (!admin) {
        navigate("/admin/masuk");
        return null; // Pastikan tidak ada komponen yang dirender saat redirect
    }

    return children;
};

export default ProtectedRouteAdmin;
