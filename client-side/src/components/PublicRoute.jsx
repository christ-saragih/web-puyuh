import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";

const PublicRoute = ({ children, requiredRole, redirectPath }) => {
    const { user, role, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading) {
            if (user) {
                // Jika user sudah login dan role tidak sesuai, redirect ke halaman yang tepat
                if (role == requiredRole) {
                    navigate(redirectPath || "/");
                }
            }
        }
    }, [user, role, loading, navigate, requiredRole, redirectPath]);

    if (loading) {
        return <div>Loading...</div>;
    }

    // Jika user belum login atau role sesuai, render halaman publik
    if (!user || (user && role === requiredRole)) {
        return children;
    }

    return null;
};

export default PublicRoute;
