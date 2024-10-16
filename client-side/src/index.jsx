import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./assets/style/index.css";

import { AuthAdminProvider } from "./contexts/AuthAdminProvider";
import { AuthInvestorProvider } from "./contexts/AuthInvestorProvider";

// START: Guest
import Dashboard from "./pages/guest/Dashboard";
import Investasi from "./pages/guest/Investasi";
import DetailInvestasi from "./pages/guest/DetailInvestasi";
import Article from "./pages/guest/Article";
import ArticleDetail from "./pages/guest/ArticleDetail";
import About from "./pages/guest/About";
import Faq from "./pages/guest/Faq";
import ErrorPage from "./pages/ErrorPage";
// END: Guest

// Start: Admin
import ProtectedRouteAdmin from "./components/admin/ProtectedRouteAdmin";
import AdminMasuk from "./pages/admin/AdminMasuk";
import AdminLupaPassword from "./pages/admin/AdminLupaPassword";
import AdminProfil from "./pages/admin/AdminProfil";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Utama from "./pages/admin/halaman_depan/Utama";
import Profil from "./pages/admin/halaman_depan/Profil";
import Kontak from "./pages/admin/halaman_depan/Kontak";
import MediaSosial from "./pages/admin/halaman_depan/MediaSosial";
import Dokumentasi from "./pages/admin/halaman_depan/Dokumentasi";
import Dokumen from "./pages/admin/halaman_depan/Dokumen";
import FaqAdmin from "./pages/admin/halaman_depan/Faq";
import AdminArtikel from "./pages/admin/AdminArtikel/Index";
import AdminInvestasi from "./pages/admin/AdminInvestasi";
import AdminInvestor from "./pages/admin/AdminInvestor";

// END: Admin

// START: Investor
import ProtectedRouteInvestor from "./components/investor/ProtectedRouteInvestor";
import PublicRouteInvestor from "./components/investor/PublicRouteInvestor";
import Masuk from "./pages/investor/Masuk";
import Daftar from "./pages/investor/Daftar";
import LupaPassword from "./pages/investor/LupaPassword";
import InvestorDashboard from "./pages/investor/InvestorDashboard";
import InvestorProfil from "./pages/investor/InvestorProfil";
import InvestorInvestasi from "./pages/investor/InvestorInvestasi";
import InvestorInvestasiDetail from "./pages/investor/InvestorInvestasiDetail";
import InvestorTransaksi from "./pages/investor/InvestorTransaksi";
import Verifikasi from "./pages/investor/Verifikasi";
import PublicRouteAdmin from "./components/admin/PublicRouteAdmin";
import ProtectedRoute from "./components/protectedRoute";
import { AuthProvider } from "./contexts/AuthProvider";
import ResetPassword from "./pages/investor/ResetPassword";
import VerifikasiEmail from "./pages/investor/VerifikasiEmail";
// END: Investor

const router = createBrowserRouter([
  //guess start
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/investasi",
    element: <Investasi />,
  },
  {
    path: "/investasi/:slug",
    element: (
      <AuthProvider>
        <DetailInvestasi />
      </AuthProvider>
    ),
  },
  {
    path: "/artikel",
    element: <Article />,
  },
  {
    path: "/artikel/:slug",
    element: <ArticleDetail />,
  },
  {
    path: "/tentang-kami",
    element: <About />,
  },
  {
    path: "/faq",
    element: <Faq />,
  },
  // guest end

  // investor start
  {
    path: "/masuk",
    element: (
      <AuthProvider>
        {/* <PublicRouteInvestor> */}
        <Masuk />
        {/* </PublicRouteInvestor> */}
      </AuthProvider>
    ),
  },
  {
    path: "/daftar",
    element: <Daftar />,
  },
  {
    path: "/lupa-password",
    element: <LupaPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/verify-email",
    element: <VerifikasiEmail />,
  },
  {
    path: "/investor",
    element: (
      <AuthProvider>
        <ProtectedRoute requiredRole="investor" redirectPath="/masuk">
          <InvestorDashboard />
        </ProtectedRoute>
      </AuthProvider>
    ),
  },
  {
    path: "/investor/profil",
    element: (
      <AuthProvider>
        <ProtectedRoute requiredRole="investor" redirectPath="/masuk">
          <InvestorProfil />
        </ProtectedRoute>
      </AuthProvider>
    ),
  },
  {
    path: "/investor/investasi",
    element: (
      <AuthProvider>
        <ProtectedRoute requiredRole="investor" redirectPath="/masuk">
          <InvestorInvestasi />
        </ProtectedRoute>
      </AuthProvider>
    ),
  },
  {
    path: "/investor/investasi/detail/:id",
    element: <InvestorInvestasiDetail />,
  },
  {
    path: "/investor/transaksi",
    element: (
      <AuthProvider>
        <ProtectedRoute requiredRole="investor" redirectPath="/masuk">
          <InvestorTransaksi />
        </ProtectedRoute>
      </AuthProvider>
    ),
  },
  {
    path: "/verifikasi",
    element: <Verifikasi />,
  },
  // investor end

  // admin start
  {
    path: "/admin/masuk",
    element: (
      <AuthProvider>
        {/* <PublicRouteAdmin> */}
        <AdminMasuk />
        {/* </PublicRouteAdmin> */}
      </AuthProvider>
    ),
  },
  {
    path: "/admin/lupa-password",
    element: <AdminLupaPassword />,
  },
  {
    path: "/admin",
    element: (
      <AuthProvider>
        <ProtectedRoute requiredRole="admin" redirectPath="/admin/masuk">
          <AdminDashboard />
        </ProtectedRoute>
      </AuthProvider>
    ),
  },
  {
    path: "/admin/profil",
    element: (
      <AuthProvider>
        <ProtectedRoute requiredRole="admin" redirectPath="/admin/masuk">
          <AdminProfil />
        </ProtectedRoute>
      </AuthProvider>
    ),
  },
  {
    path: "/admin/halaman-depan/utama",
    element: (
      <AuthProvider>
        <ProtectedRoute requiredRole="admin" redirectPath="/admin/masuk">
          <Utama />
        </ProtectedRoute>
      </AuthProvider>
    ),
  },
  {
    path: "/admin/halaman-depan/profil",
    element: (
      <AuthProvider>
        <ProtectedRoute requiredRole="admin" redirectPath="/admin/masuk">
          <Profil />
        </ProtectedRoute>
      </AuthProvider>
    ),
  },
  {
    path: "/admin/halaman-depan/kontak",
    element: (
      <AuthProvider>
        <ProtectedRoute requiredRole="admin" redirectPath="/admin/masuk">
          <Kontak />
        </ProtectedRoute>
      </AuthProvider>
    ),
  },
  {
    path: "/admin/halaman-depan/media-sosial",
    element: (
      <AuthProvider>
        <ProtectedRoute requiredRole="admin" redirectPath="/admin/masuk">
          <MediaSosial />
        </ProtectedRoute>
      </AuthProvider>
    ),
  },
  {
    path: "/admin/halaman-depan/dokumentasi",
    element: (
      <AuthProvider>
        <ProtectedRoute requiredRole="admin" redirectPath="/admin/masuk">
          <Dokumentasi />
        </ProtectedRoute>
      </AuthProvider>
    ),
  },
  {
    path: "/admin/halaman-depan/dokumen",
    element: (
      <AuthProvider>
        <ProtectedRoute requiredRole="admin" redirectPath="/admin/masuk">
          <Dokumen />
        </ProtectedRoute>
      </AuthProvider>
    ),
  },
  {
    path: "/admin/halaman-depan/faq",
    element: (
      <AuthProvider>
        <ProtectedRoute requiredRole="admin" redirectPath="/admin/masuk">
          <FaqAdmin />
        </ProtectedRoute>
      </AuthProvider>
    ),
  },

  {
    path: "/admin/artikel",
    element: (
      <AuthProvider>
        <ProtectedRoute requiredRole="admin" redirectPath="/admin/masuk">
          <AdminArtikel />
        </ProtectedRoute>
      </AuthProvider>
    ),
  },

  {
    path: "/admin/investasi",
    element: (
      <AuthProvider>
        <ProtectedRoute requiredRole="admin" redirectPath="/admin/masuk">
          <AdminInvestasi />
        </ProtectedRoute>
      </AuthProvider>
    ),
  },
  {
    path: "/admin/investor",
    element: (
      <AuthProvider>
        <ProtectedRoute requiredRole="admin" redirectPath="/admin/masuk">
          <AdminInvestor />
        </ProtectedRoute>
      </AuthProvider>
    ),
  },
  {
    path: "/admin/halaman-depan/profil",
    element: (
      <AuthProvider>
        <ProtectedRoute requiredRole="admin" redirectPath="/admin/masuk">
          <Profil />
        </ProtectedRoute>
      </AuthProvider>
    ),
  },
  // admin end
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
