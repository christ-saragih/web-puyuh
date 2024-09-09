import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
// import { AuthAdminContext } from "../../contexts/AuthAdminProvider";
import { AuthInvestorContext } from "../../contexts/AuthInvestorProvider";

const PublicRouteInvestor = ({ children }) => {
    // const { admin } = useContext(AuthAdminContext);
    const { investor, role } = useContext(AuthInvestorContext);
    // const { admin, loading: loadingAdmin } = useAuthAdmin();
    // const { investor, loading: loadingInvestor } = useAuthInvestor();
    const navigate = useNavigate();

    // // Jika sedang loading (baik untuk admin maupun investor), tampilkan loading
    // if (loadingAdmin || loadingInvestor) return <div>Loading...</div>;

    // Jika admin sudah login, redirect ke halaman dashboard admin
    // if (admin) {
    //     navigate("/admin"); // Ganti dengan rute dashboard admin yang sesuai
    //     return null;
    // }

    // Jika investor belum login, redirect ke halaman login investor
    if (role === "investor") {
        navigate("/investor");
        return null;
    }

    // Jika investor sudah login, render konten halaman yang di-protect
    return children;
};

export default PublicRouteInvestor;
