import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { apiAdmin } from "../hooks/useAxiosConfig";

export const AuthAdminContext = createContext();

const decodeToken = (token) => {
    try {
        return jwtDecode(token);
    } catch (error) {
        console.error("Failed to decode token:", error);
        return null;
    }
};

export const AuthAdminProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [loadingAdmin, setLoadingAdmin] = useState(true);
    const [role, setRole] = useState(null); // Add role state
    const [intervalId, setIntervalId] = useState(null); // State to store interval ID

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const res = await apiAdmin.get("/auth/admin/protected");
                setAdmin(res.data.admin);
                const admin = res.data.admin;
                // console.log(admin.role);
                if (admin?.role === "admin") {
                    setRole(admin.role); // Set role state
                } else {
                    setRole(null); // Clear role if not admin
                }
            } catch (error) {
                setAdmin(null); // Set admin to null if error occurs
            } finally {
                setLoadingAdmin(false); // Set loading to false once the check is complete
            }
        };

        checkAdmin();
    }, []); // Empty dependency array ensures this runs only once on mount

    useEffect(() => {
        const refreshToken = async () => {
            try {
                const res = await apiAdmin.post("/auth/admin/refresh-token");
                const decodedToken = decodeToken(res.data.accessToken);
                // console.log(decodedToken.role);
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
            const res = await apiAdmin.post("/auth/admin/login", {
                usernameOrEmail,
                password,
            });
            setAdmin(res.data.admin); // Set admin state upon successful login
            const decodedToken = decodeToken(res.data.accessToken);
            // console.log(decodedToken.role);

            if (decodedToken?.role === "admin") {
                setRole(decodedToken.role); // Set role state
            } else {
                console.error("Token does not have admin role.");
                throw new Error("Invalid role");
            }
            return res.data;
        } catch (error) {
            console.error(error.response?.data?.message || "Login failed");
            throw error;
        }
    };

    const refreshAccessToken = async () => {
        try {
            const response = await apiAdmin.post("/auth/admin/refresh-token");
            return response.data.accessToken;
        } catch (error) {
            console.error("Failed to refresh admin token:", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await apiAdmin.post("/auth/admin/logout");
            setAdmin(null); // Clear admin state on logout
        } catch (error) {
            console.error(error.response?.data?.message || "Logout failed");
        }
    };

    return (
        <AuthAdminContext.Provider
            value={{
                admin,
                role,
                loadingAdmin,
                login,
                logout,
                refreshAccessToken,
            }}
        >
            {children}
        </AuthAdminContext.Provider>
    );
};
