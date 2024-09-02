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

// Instance umum untuk request API dengan otentikasi
const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true, // Pastikan cookie dikirimkan dalam request
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

// Interceptor untuk menangani response error
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Jalankan refresh token
                const refreshResponse = await axios.post(
                    "http://localhost:3000/api/auth/refresh-token",
                    {},
                    { withCredentials: true }
                );

                // Simpan accessToken baru dari response refresh token ke cookie
                const newAccessToken = refreshResponse.data.accessToken;
                document.cookie = `accessToken=${newAccessToken}; path=/`;

                // Tambahkan accessToken baru ke request header dan ulangi request asli
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error("Error refreshing token:", refreshError);
                window.location.href = "/masuk";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export { apiAdmin, apiInvestor, axiosInstance };
