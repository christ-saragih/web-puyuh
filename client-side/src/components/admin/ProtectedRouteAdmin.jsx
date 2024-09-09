import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthAdminContext } from "../../contexts/AuthAdminProvider";

const ProtectedRouteAdmin = ({ children }) => {
    const { admin, role, loadingAdmin } = useContext(AuthAdminContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loadingAdmin && role !== "admin") {
            navigate("/admin/masuk");
        }
    }, [role, loadingAdmin, navigate]);

    if (loadingAdmin) {
        return <div>Loading...</div>;
    }

    return role === "admin" ? children : null;
};

export default ProtectedRouteAdmin;
