import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { axiosInstance } from "../hooks/useAxiosConfig";

export const AuthAdminContext = createContext();

export const AuthAdminProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const res = await axiosInstance.get(
                    "http://localhost:3000/api/auth/admin/login",
                    {
                        withCredentials: true,
                    }
                );
                setAdmin(res.data.user);
            } catch (error) {
                setAdmin(null);
            }
        };
        checkAdmin();
    }, []);

    const login = async (usernameOrEmail, password) => {
        try {
            const res = await axios.post(
                "/api/login-admin",
                { usernameOrEmail, password },
                { withCredentials: true }
            );
            setAdmin(res.data.user);
            return res.data;
        } catch (error) {
            console.error(error.response.data.message);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await axios.post(
                "/api/logout-admin",
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
