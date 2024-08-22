import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./assets/style/index.css";

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
import AdminMasuk from "./pages/admin/AdminMasuk";
import AdminLupaPassword from "./pages/admin/AdminLupaPassword";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Utama from "./pages/admin/halaman_depan/Utama";
import Profil from "./pages/admin/halaman_depan/Profil";
import Kontak from "./pages/admin/halaman_depan/Kontak";
import MediaSosial from "./pages/admin/halaman_depan/MediaSosial";
import Dokumentasi from "./pages/admin/halaman_depan/Dokumentasi";
import Dokumen from "./pages/admin/halaman_depan/Dokumen";
import FaqAdmin from "./pages/admin/halaman_depan/Faq";
import AdminArtikel from "./pages/admin/AdminArtikel";
import AdminInvestasi from "./pages/admin/AdminInvestasi";
import AdminInvestor from "./pages/admin/AdminInvestor";

// END: Admin

// START: Investor
import Masuk from "./pages/investor/Masuk";
import Daftar from "./pages/investor/Daftar";
import LupaPassword from "./pages/investor/LupaPassword";
import InvestorDashboard from "./pages/investor/InvestorDashboard";
import InvestorProfil from "./pages/investor/InvestorProfil";
import InvestorInvestasi from "./pages/investor/InvestorInvestasi";
import InvestorInvestasiDetail from "./pages/investor/InvestorInvestasiDetail";
import InvestorTransaksi from "./pages/investor/InvestorTransaksi";
import Verifikasi from "./pages/investor/Verifikasi";

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
    element: <DetailInvestasi />,
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
    element: <Masuk />,
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
    path: "/investor/",
    element: <InvestorDashboard />,
  },
  {
    path: "/investor/profil",
    element: <InvestorProfil />,
  },
  {
    path: "/investor/investasi",
    element: <InvestorInvestasi />,
  },
  {
    path: "/investor/investasi/detail/:id",
    element: <InvestorInvestasiDetail />,
  },
  {
    path: "/investor/transaksi",
    element: <InvestorTransaksi />,
  },
  {
    path: "/verifikasi",
    element: <Verifikasi />,
  },
  // investor end

  // admin start
  {
    path: "/admin/masuk",
    element: <AdminMasuk />,
  },
  {
    path: "/admin/lupa-password",
    element: <AdminLupaPassword />,
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
  },
  {
    path: "/admin/halaman-depan/utama",
    element: <Utama />,
  },
  {
    path: "/admin/halaman-depan/profil",
    element: <Profil />,
  },
  {
    path: "/admin/halaman-depan/kontak",
    element: <Kontak />,
  },
  {
    path: "/admin/halaman-depan/media-sosial",
    element: <MediaSosial />,
  },
  {
    path: "/admin/halaman-depan/dokumentasi",
    element: <Dokumentasi />,
  },
  {
    path: "/admin/halaman-depan/dokumen",
    element: <Dokumen />,
  },
  {
    path: "/admin/halaman-depan/faq",
    element: <FaqAdmin />,
  },

  {
    path: "/admin/artikel",
    element: <AdminArtikel />,
  },

  {
    path: "/admin/investasi",
    element: <AdminInvestasi />,
  },
  {
    path: "/admin/investor",
    element: <AdminInvestor />,
  },
  {
    path: "/admin/halaman-depan/profil",
    element: <Profil />,
  },
  // admin end
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
