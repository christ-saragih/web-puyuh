import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// styling
import "./assets/style/index.css";
import Dashboard from "./pages/guest/Dashboard";
import Investasi from "./pages/guest/Investasi";
import Artikel from "./pages/guest/Artikel";
import TentangKami from "./pages/guest/TentangKami";
import About from "./pages/guest/About";
import Masuk from "./pages/investor/Masuk";
import Daftar from "./pages/investor/Daftar";
import LupaPassword from "./pages/investor/LupaPassword";

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
    path: "/artikel",
    element: <Artikel />,
  },
  // {
  //   path: "/tentang-kami",
  //   element: <TentangKami />,
  // },
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
    path: "/admin/login",
    element: (
      <div className="font-semibold text-3xl text-red-600">Halaman Login Admin</div>
    ),
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
