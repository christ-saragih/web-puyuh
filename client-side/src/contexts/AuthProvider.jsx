import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { apiAdmin, apiInvestor } from "../hooks/useAxiosConfig";
import axios from "axios";

export const AuthContext = createContext();

const decodeToken = (token) => {
    try {
        return jwtDecode(token);
    } catch (error) {
        console.error("Failed to decode token:", error);
        return null;
    }
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // State for both admin and investor
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState(null);
    const [intervalId, setIntervalId] = useState(null);

    // useEffect(() => {
    //     const checkUser = async () => {
    //         try {
    //             const [resAdmin, resInvestor] = await Promise.allSettled([
    //                 apiAdmin.get("/auth/admin/protected"),
    //                 apiInvestor.get("/auth/investor/protected"),
    //             ]);

    //             console.log("Admin result:", resAdmin);
    //             console.log("Investor result:", resInvestor);

    //             if (
    //                 resAdmin.status === "fulfilled" &&
    //                 resAdmin.value.data.admin?.role === "admin"
    //             ) {
    //                 setUser(resAdmin.value.data.admin);
    //                 setRole("admin");
    //             } else if (
    //                 resInvestor.status === "fulfilled" &&
    //                 resInvestor.value.data.investor?.role === "investor"
    //             ) {
    //                 setUser(resInvestor.value.data.investor);
    //                 setRole("investor");
    //             } else {
    //                 setUser(null);
    //                 setRole(null);
    //             }
    //         } catch (error) {
    //             console.error("Error checking user:", error);
    //             setUser(null);
    //             setRole(null);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     checkUser();
    // }, []);

    // useEffect(() => {
    //     const checkUser = async () => {
    //         try {
    //             const resInvestor = await apiInvestor.get(
    //                 "/auth/investor/protected"
    //             );
    //             setUser(resInvestor.data.investor);

    //             const investor = resInvestor.data.investor;

    //             if (investor?.role === "investor") {
    //                 setRole(investor.role);
    //             } else {
    //                 // If not admin, check investor
    //                 const resAdmin = await apiAdmin.get(
    //                     "/auth/admin/protected"
    //                 );
    //                 setUser(resAdmin.data.admin);
    //                 const admin = resAdmin.data.admin;

    //                 if (admin?.role === "admin") {
    //                     setRole(admin.role);
    //                 } else {
    //                     setRole(null);
    //                 }
    //             }
    //         } catch (error) {
    //             // Jika terjadi error dengan status 403, lanjutkan untuk cek admin
    //             if (error.response?.status === 403) {
    //                 try {
    //                     const resAdmin = await apiAdmin.get(
    //                         "/auth/admin/protected"
    //                     );
    //                     setUser(resAdmin.data.admin);
    //                     const admin = resAdmin.data.admin;

    //                     if (admin?.role === "admin") {
    //                         setRole(admin.role);
    //                     } else {
    //                         setRole(null);
    //                     }
    //                 } catch (adminError) {
    //                     setUser(null);
    //                     setRole(null);
    //                 }
    //             } else {
    //                 setUser(null);
    //                 setRole(null);
    //             }
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     checkUser();
    // }, []);

    // useEffect(() => {
    //     const checkUser = async () => {
    //         try {
    //             // Cek admin terlebih dahulu
    //             const resAdmin = await axios.get(
    //                 "http://localhost:3000/api/auth/admin/protected",
    //                 { withCredentials: true }
    //             );
    //             setUser(resAdmin.data.admin);

    //             const admin = resAdmin.data.admin;

    //             if (admin?.role === "admin") {
    //                 setRole(admin.role);
    //             } else {
    //                 // Jika bukan admin, cek investor
    //                 const resInvestor = await axios.get(
    //                     "http://localhost:3000/api/auth/investor/protected",
    //                     { withCredentials: true }
    //                 );
    //                 setUser(resInvestor.data.investor);
    //                 const investor = resInvestor.data.investor;

    //                 if (investor?.role === "investor") {
    //                     setRole(investor.role);
    //                 } else {
    //                     setRole(null);
    //                 }
    //             }
    //         } catch (error) {
    //             // Jika terjadi error dengan status 403 pada admin, lanjutkan cek investor
    //             if (error.response?.status === 403) {
    //                 try {
    //                     const resInvestor = await axios.get(
    //                         "http://localhost:3000/api/auth/investor/protected",
    //                         { withCredentials: true }
    //                     );
    //                     setUser(resInvestor.data.investor);
    //                     const investor = resInvestor.data.investor;

    //                     if (investor?.role === "investor") {
    //                         setRole(investor.role);
    //                     } else {
    //                         setRole(null);
    //                     }
    //                 } catch (investorError) {
    //                     setUser(null);
    //                     setRole(null);
    //                 }
    //             } else {
    //                 setUser(null);
    //                 setRole(null);
    //             }
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     checkUser();
    // }, []);

    useEffect(() => {
        const checkUser = async () => {
            try {
                // Cek investor terlebih dahulu
                const resInvestor = await axios.get(
                    "http://localhost:3000/api/auth/investor/protected",
                    { withCredentials: true }
                );
                setUser(resInvestor.data.investor);

                const investor = resInvestor.data.investor;

                if (investor?.role === "investor") {
                    setRole(investor.role);
                } else {
                    // Jika bukan investor, cek admin
                    const resAdmin = await axios.get(
                        "http://localhost:3000/api/auth/admin/protected",
                        { withCredentials: true }
                    );
                    setUser(resAdmin.data.admin);
                    const admin = resAdmin.data.admin;

                    if (admin?.role === "admin") {
                        setRole(admin.role);
                    } else {
                        setRole(null);
                    }
                }
            } catch (error) {
                // Jika terjadi error dengan status 403 pada investor, lanjutkan cek admin
                if (error.response?.status === 403) {
                    try {
                        const resAdmin = await axios.get(
                            "http://localhost:3000/api/auth/admin/protected",
                            { withCredentials: true }
                        );
                        setUser(resAdmin.data.admin);
                        const admin = resAdmin.data.admin;

                        if (admin?.role === "admin") {
                            setRole(admin.role);
                        } else {
                            setRole(null);
                        }
                    } catch (adminError) {
                        setUser(null);
                        setRole(null);
                    }
                } else {
                    setUser(null);
                    setRole(null);
                }
            } finally {
                setLoading(false);
            }
        };

        checkUser();
    }, []);

    useEffect(() => {
        const refreshToken = async () => {
            try {
                if (role === "admin") {
                    const res = await apiAdmin.post(
                        "/auth/admin/refresh-token"
                    );
                    const decodedToken = decodeToken(res.data.accessToken);
                    if (decodedToken?.role === "admin") {
                        setRole(decodedToken.role);
                    } else {
                        console.error(
                            "Refreshed token does not have admin role."
                        );
                        throw new Error("Invalid role");
                    }
                } else if (role === "investor") {
                    const res = await apiInvestor.post(
                        "/auth/investor/refresh-token"
                    );
                    const decodedToken = decodeToken(res.data.accessToken);
                    if (decodedToken?.role === "investor") {
                        setRole(decodedToken.role);
                    } else {
                        console.error(
                            "Refreshed token does not have investor role."
                        );
                        throw new Error("Invalid role");
                    }
                }
            } catch (error) {
                console.error("Failed to refresh token:", error);
            }
        };

        // Refresh token every 5 minutes (300000 milliseconds)
        const id = setInterval(() => {
            refreshToken();
        }, 300000);

        setIntervalId(id);

        // Cleanup interval on component unmount
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [role]); // Dependency array includes role to determine which refresh token to use

    const login = async (usernameOrEmail, password, userType) => {
        try {
            let res;
            if (userType === "admin") {
                res = await axios.post(
                    "http://localhost:3000/api/auth/admin/login",
                    {
                        usernameOrEmail,
                        password,
                    },
                    { withCredentials: true }
                );
                setUser(res.data.admin);
            } else if (userType === "investor") {
                res = await axios.post(
                    "http://localhost:3000/api/auth/investor/login",
                    {
                        usernameOrEmail,
                        password,
                    },
                    { withCredentials: true }
                );
                setUser(res.data.investor);
            }

            const decodedToken = decodeToken(res.data.accessToken);
            if (decodedToken?.role === userType) {
                setRole(decodedToken.role);
            } else {
                console.error(`Token does not have ${userType} role.`);
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
            if (role === "admin") {
                const response = await apiAdmin.post(
                    "/auth/admin/refresh-token"
                );
                return response.data.accessToken;
            } else if (role === "investor") {
                const response = await apiInvestor.post(
                    "/auth/investor/refresh-token"
                );
                return response.data.accessToken;
            }
        } catch (error) {
            console.error("Failed to refresh token:", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            if (role === "admin") {
                await apiAdmin.post("/auth/admin/logout");
            } else if (role === "investor") {
                await apiInvestor.post("/auth/investor/logout");
            }
            setUser(null);
            setRole(null);
        } catch (error) {
            console.error(error.response?.data?.message || "Logout failed");
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                role,
                loading,
                login,
                logout,
                refreshAccessToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
