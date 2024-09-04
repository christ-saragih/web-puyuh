import React, { createContext, useState, useEffect } from "react";
import { apiInvestor } from "../hooks/useAxiosConfig";

export const AuthInvestorContext = createContext();

export const AuthInvestorProvider = ({ children }) => {
    const [investor, setInvestor] = useState(null);

    useEffect(() => {
        const checkInvestor = async () => {
            try {
                const res = await apiInvestor.get(
                    "/api/auth/investor/protected"
                );
                setInvestor(res.data.investor);
            } catch (error) {
                setInvestor(null);
            }
        };
        checkInvestor();
    }, []);

    const login = async (usernameOrEmail, password) => {
        try {
            const res = await apiInvestor.post("/api/auth/investor/login", {
                usernameOrEmail,
                password,
            });
            setInvestor(res.data.investor);
            return res.data;
        } catch (error) {
            console.error(error.response?.data?.message || "Login failed");
            throw error;
        }
    };

    const logout = async () => {
        try {
            await apiInvestor.post("/api/auth/investor/logout");
            setInvestor(null);
        } catch (error) {
            console.error(error.response?.data?.message || "Logout failed");
        }
    };

    const refreshAccessToken = async () => {
        try {
            const response = await apiInvestor.post(
                "/api/auth/investor/refresh-token"
            );
            return response.data.accessToken;
        } catch (error) {
            console.error("Failed to refresh investor token:", error);
        }
    };

    return (
        <AuthInvestorContext.Provider
            value={{ investor, login, logout, refreshAccessToken }}
        >
            {children}
        </AuthInvestorContext.Provider>
    );
};
