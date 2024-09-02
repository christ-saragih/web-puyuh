// axiosConfig.js
import axios from "axios";

// Instance Axios untuk Admin
const apiAdmin = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
});

apiAdmin.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                await apiAdmin.post("/api/auth/admin/refresh-token", {});
                return apiAdmin(originalRequest);
            } catch (refreshError) {
                console.error("Error refreshing token:", refreshError);
                window.location.href = "/admin/masuk";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

// Instance Axios untuk Investor
const apiInvestor = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
});

apiInvestor.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                await apiInvestor.post("/api/auth/investor/refresh-token", {});
                return apiInvestor(originalRequest);
            } catch (refreshError) {
                console.error("Error refreshing token:", refreshError);
                window.location.href = "/masuk";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

// Buat instance axios
const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true, // Pastikan cookie termasuk dalam request
});

// Interceptor untuk menambahkan accessToken di setiap request
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = document.cookie
            .split("; ")
            .find((row) => row.startsWith("accessToken="))
            ?.split("=")[1];

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// export default axiosInstance;

export { apiAdmin, apiInvestor, axiosInstance };
