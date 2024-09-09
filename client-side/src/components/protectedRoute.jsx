import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";

const ProtectedRoute = ({ children, requiredRole, redirectPath }) => {
    const { user, role, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    console.log(user);
    console.log(role);

    useEffect(() => {
        if (!loading) {
            if (!user) {
                // Jika user tidak ada, arahkan sesuai role yang dibutuhkan
                if (requiredRole === "investor") {
                    navigate("/masuk");
                } else if (requiredRole === "admin") {
                    navigate("/admin/masuk");
                }
            } else {
                // Jika user ada dan role sesuai, tidak ada redirect
                if (role === "admin") {
                    navigate("/admin");
                } else if (role === "investor") {
                    navigate("/investor");
                }
            }
        }
    }, [user, role, loading, navigate, requiredRole, redirectPath]);

    if (loading) {
        return <div>Loading...</div>;
    }

    // Hanya render children jika user ada dan role sesuai dengan requiredRole
    if (user && role === requiredRole) {
        return children;
    }

    // Jika tidak memenuhi syarat, jangan render apapun
    return null;
};

export default ProtectedRoute;
