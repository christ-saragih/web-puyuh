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

const router = createBrowserRouter([
  //guess
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/investasi",
    element: <Investasi />,
  },
  {
    path: "/investasi/detail",
    element: <DetailInvestasi />,
  },
  {
    path: "/artikel",
    element: <Article />,
  },
  {
    path: "/artikel/detail",
    element: <ArticleDetail />,
  },
  {
    path: "/tentang-kami",
    element: <About />
  },

  // investor
  {
    path: "/masuk",
    element: <Masuk />
  },
  {
    path: "/daftar",
    element: <Daftar />
  },
  {
    path: "/lupa-password",
    element: <LupaPassword />
  },
  //admin
  {
    path: "/admin/masuk",
    element: <AdminMasuk />
  },
  {
    path: "/admin/lupa-password",
    element: <AdminLupaPassword />
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
