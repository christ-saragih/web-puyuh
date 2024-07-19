import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// styling
import "./assets/style/index.css";
import Dashboard from "./pages/guest/Dashboard";
import Investasi from "./pages/guest/Investasi";
import About from "./pages/guest/About";
import DetailInvestasi from "./pages/guest/DetailInvestasi";
import Article from "./pages/guest/Article";
import ArticleDetail from "./pages/guest/ArticleDetail";

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
    element: <About />,
  },
  //admin
  {
    path: "/admin/login",
    element: (
      <div className="font-semibold text-3xl text-red-600">
        Halaman Login Admin
      </div>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
