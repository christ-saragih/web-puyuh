import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { apiAdmin } from "../hooks/useAxiosConfig";

export const AuthAdminContext = createContext();

export const AuthAdminProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const res = await apiAdmin.get("/api/auth/admin/protected");
                setAdmin(res.data.admin);
            } catch (error) {
                setAdmin(null);
            }
        };
        checkAdmin();
    }, []);

    const login = async (usernameOrEmail, password) => {
        try {
            const res = await apiAdmin.post("/api/auth/admin/login", {
                usernameOrEmail,
                password,
            });
            setAdmin(res.data.admin);
            return res.data;
        } catch (error) {
            console.error(error.response?.data?.message || "Login failed");
            throw error;
        }
    };

    const logout = async () => {
        try {
            await apiAdmin.post(
                "http://localhost:3000/api/auth/admin/logout",
                {},
                { withCredentials: true }
            );
            setAdmin(null);
        } catch (error) {
            console.error(error.response.data.message);
        }
    };

    const refreshAccessToken = async () => {
        try {
            const response = await axios.post(
                "http://localhost:3000/api/auth/admin/refresh-token"
            );
            return response.data.accessToken;
        } catch (error) {
            console.error("Failed to refresh admin token:", error);
        }
    };

    return (
        <AuthAdminContext.Provider
            value={{ admin, login, logout, refreshAccessToken }}
        >
            {children}
        </AuthAdminContext.Provider>
    );
};
