import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthInvestorContext } from "../../contexts/AuthInvestorProvider";

const ProtectedRouteInvestor = ({ children }) => {
    const { investor, role, loadingInvestor } = useContext(AuthInvestorContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loadingInvestor && (!investor || role !== "investor")) {
            navigate("/masuk");
        }
    }, [investor, role, loadingInvestor, navigate]);

    if (loadingInvestor) {
        return <div>Loading...</div>;
    }

    return investor && role === "investor" ? children : null;
};

export default ProtectedRouteInvestor;
