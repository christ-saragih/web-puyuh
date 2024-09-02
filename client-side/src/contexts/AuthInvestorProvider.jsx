import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { axiosInstance } from "../hooks/useAxiosConfig";

export const AuthInvestorContext = createContext();

export const AuthInvestorProvider = ({ children }) => {
    const [investor, setInvestor] = useState(null);

    useEffect(() => {
        const checkInvestor = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:3000/api/auth/investor/protected",
                    {
                        withCredentials: true,
                    }
                );
                setInvestor(res.data.user);
            } catch (error) {
                setInvestor(null);
            }
        };
        checkInvestor();
    }, []);

    const login = async (usernameOrEmail, password) => {
        try {
            const res = await axios.post(
                "http://localhost:3000/api/auth/investor/login",
                { usernameOrEmail, password },
                { withCredentials: true }
            );
            setInvestor(res.data.investor);
            return res.data;
        } catch (error) {
            console.error(error.response.data.message);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await axiosInstance.post(
                "/api/auth/investor/logout",
                {},
                { withCredentials: true }
            );
            setInvestor(null);
        } catch (error) {
            console.error(error.response.data.message);
        }
    };

    const refreshAccessToken = async () => {
        try {
            const response = await axios.post(
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
