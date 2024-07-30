import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// styling
import "./assets/style/index.css";
import Dashboard from "./pages/guest/Dashboard";
import Investasi from "./pages/guest/Investasi";
import About from "./pages/guest/About";
import Masuk from "./pages/investor/Masuk";
import Daftar from "./pages/investor/Daftar";
import LupaPassword from "./pages/investor/LupaPassword";
import DetailInvestasi from "./pages/guest/DetailInvestasi";
import Article from "./pages/guest/Article";
import ArticleDetail from "./pages/guest/ArticleDetail";

import AdminMasuk from "./pages/admin/AdminMasuk";
import AdminLupaPassword from "./pages/admin/AdminLupaPassword";
import ErrorPage from "./pages/ErrorPage";
import Faq from "./pages/guest/Faq";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminArticle from "./pages/admin/AdminKontenArtikel";
import AdminKontenTentangKami from "./pages/admin/AdminKontenTentangKami";
import AdminKontenArtikel from "./pages/admin/AdminKontenArtikel";
import AdminKontenBeranda from "./pages/admin/AdminKontenBeranda";
import AdminKontenFaq from "./pages/admin/AdminKontenFaq";
import AdminInvestasi from "./pages/admin/AdminInvestasi";
import AdminPengguna from "./pages/admin/AdminPengguna";

import InvestorDashboard from "./pages/investor/InvestorDashboard";
import InvestorProfil from "./pages/investor/InvestorProfil";



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
    path: "/investasi/:id",
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
    path: "/admin/beranda",
    element: <AdminKontenBeranda />,
  },
  {
    path: "/admin/artikel",
    element: <AdminKontenArtikel />,
  },
  {
    path: "/admin/tentang-kami",
    element: <AdminKontenTentangKami />,
  },
  {
    path: "/admin/faq",
    element: <AdminKontenFaq />,
  },
  {
    path: "/admin/investasi",
    element: <AdminInvestasi />,
  },
  {
    path: "/admin/pengguna",
    element: <AdminPengguna />,
  },
  // admin end
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
