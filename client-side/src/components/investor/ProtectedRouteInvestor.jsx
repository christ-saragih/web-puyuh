import React from "react";
import { useNavigate } from "react-router-dom";
import useAuthInvestor from "../../hooks/useAuthInvestor";
import useAuthAdmin from "../../hooks/useAuthAdmin";

const ProtectedRouteInvestor = ({ children }) => {
    const { investor, loading } = useAuthInvestor();
    const navigate = useNavigate();

    if (loading) return <div>Loading...</div>;

    if (!investor) {
        navigate("/masuk");
        return null;
    }

    return children;
};

export default ProtectedRouteInvestor;
