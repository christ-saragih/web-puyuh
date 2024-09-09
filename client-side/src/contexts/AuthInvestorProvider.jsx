import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { apiInvestor } from "../hooks/useAxiosConfig";

export const AuthInvestorContext = createContext();

const decodeToken = (token) => {
    try {
        return jwtDecode(token);
    } catch (error) {
        console.error("Failed to decode token:", error);
        return null;
    }
};

export const AuthInvestorProvider = ({ children }) => {
    const [investor, setInvestor] = useState(null);
    const [loadingInvestor, setLoadingInvestor] = useState(true);
    const [role, setRole] = useState(null); // Add role state
    const [intervalId, setIntervalId] = useState(null); // State to store interval ID
    useEffect(() => {
        const checkInvestor = async () => {
            try {
                const res = await apiInvestor.get("/auth/investor/protected");
                setInvestor(res.data.investor);
                const investor = res.data.investor;
                console.log(investor.role);
                if (investor?.role === "investor") {
                    setRole(investor.role); // Set role state
                } else {
                    setRole(null); // Clear role if not investor
                }
            } catch (error) {
                setInvestor(null);
                setRole(null);
            } finally {
                setLoadingInvestor(false);
            }
        };

        checkInvestor();
    }, []);

    useEffect(() => {
        const refreshToken = async () => {
            try {
                const res = await apiInvestor.post("/auth/admin/refresh-token");
                const decodedToken = decodeToken(res.data.accessToken);
                console.log(decodedToken.role);
                if (decodedToken?.role === "admin") {
                    setRole(decodedToken.role); // Update role state
                } else {
                    console.error("Refreshed token does not have admin role.");
                    throw new Error("Invalid role");
                }
            } catch (error) {
                console.error("Failed to refresh admin token:", error);
                // Handle token refresh failure
            }
        };

        // Refresh token every 5 minutes (300000 milliseconds)
        const id = setInterval(() => {
            refreshToken();
        }, 300000); // Set the interval to 5 minutes

        setIntervalId(id);

        // Cleanup interval on component unmount
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, []); // Empty dependency array to set up interval on mount

    const login = async (usernameOrEmail, password) => {
        try {
            const res = await apiInvestor.post("/auth/investor/login", {
                usernameOrEmail,
                password,
            });
            setInvestor(res.data.investor);
            const decodedToken = decodeToken(res.data.accessToken);
            console.log(decodedToken.role);

            if (decodedToken?.role === "investor") {
                setRole(decodedToken.role); // Set role state
            } else {
                console.error("Token does not have investor role.");
                throw new Error("Invalid role");
            }
            return res.data;
        } catch (error) {
            console.error(error.response?.data?.message || "Login failed");
            throw error;
        }
    };

    const logout = async () => {
        try {
            await apiInvestor.post("/auth/investor/logout");
            setInvestor(null);
        } catch (error) {
            console.error(error.response?.data?.message || "Logout failed");
        }
    };

    const refreshAccessToken = async () => {
        try {
            const response = await apiInvestor.post(
                "/auth/investor/refresh-token"
            );
            return response.data.accessToken;
        } catch (error) {
            console.error("Failed to refresh investor token:", error);
        }
    };

    return (
        <AuthInvestorContext.Provider
            value={{
                investor,
                role,
                loadingInvestor,
                login,
                logout,
                refreshAccessToken,
            }}
        >
            {children}
        </AuthInvestorContext.Provider>
    );
};
