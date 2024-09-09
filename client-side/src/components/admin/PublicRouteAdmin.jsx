import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthAdminContext } from "../../contexts/AuthAdminProvider";
// import { AuthInvestorContext } from "../../contexts/AuthInvestorProvider";

const PublicRouteAdmin = ({ children }) => {
    const { admin, role } = useContext(AuthAdminContext);
    // const { investor } = useContext(AuthInvestorContext);
    const navigate = useNavigate();

    // // Jika sedang loading (baik untuk admin maupun investor), tampilkan loading
    // if (loadingAdmin || loadingInvestor) return <div>Loading...</div>;

    // Jika investor sudah login, redirect ke halaman dashboard investor
    // if (investor) {
    //     navigate("/investor"); // Ganti dengan rute dashboard investor yang sesuai
    //     return null;
    // }

    // Jika admin belum login, redirect ke halaman login admin
    if (role === "admin") {
        navigate("/admin");
        return null;
    }

    // Jika admin sudah login, render konten halaman yang di-protect
    return children;
};

export default PublicRouteAdmin;
