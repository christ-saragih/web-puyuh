import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// styling
import "./assets/style/index.css";
import Dashboard from "./pages/guest/Dashboard";
import Investasi from "./pages/guest/Investasi";
import Artikel from "./pages/guest/Artikel";
import TentangKami from "./pages/guest/TentangKami";

const router = createBrowserRouter([
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
  {
    path: "/tentang-kami",
    element: <TentangKami />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
