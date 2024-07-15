import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// styling
import "./assets/style/index.css";
import Dashboard from "./pages/guest/Dashboard";
import About from "./pages/guest/About";

const router = createBrowserRouter([
  //guess
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/login",
    element: (
      <div className="font-semibold text-3xl text-red-600">Halaman Login</div>
    ),
  },
  {
    path: "/tentang-kami",
    element: <About />
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
