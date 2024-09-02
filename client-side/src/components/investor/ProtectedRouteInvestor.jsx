import React from "react";
import { useNavigate } from "react-router-dom";
import useAuthInvestor from "../../hooks/useAuthInvestor";

const ProtectedRouteInvestor = ({ children }) => {
    const { investor, loading } = useAuthInvestor();
    const navigate = useNavigate();

    if (loading) return <div>Loading...</div>;

    if (!investor) {
        navigate("/masuk");
        return null; // Pastikan tidak ada komponen yang dirender saat redirect
    }

    return children;
};

export default ProtectedRouteInvestor;
