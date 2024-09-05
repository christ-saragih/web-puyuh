import axios from "axios";

// Mutex untuk menyegarkan token
const refreshTokenPromise = {
    promise: null,
    resolve: null,
    reject: null,
};

// Instance Axios untuk Admin
const apiAdmin = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
});

apiAdmin.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (!refreshTokenPromise.promise) {
                refreshTokenPromise.promise = new Promise((resolve, reject) => {
                    refreshTokenPromise.resolve = resolve;
                    refreshTokenPromise.reject = reject;
                });

                try {
                    await apiAdmin.post("/auth/admin/refresh-token");
                    refreshTokenPromise.resolve();
                } catch (refreshError) {
                    refreshTokenPromise.reject(refreshError);
                    window.location.href = "/admin/masuk";
                    return Promise.reject(refreshError);
                } finally {
                    refreshTokenPromise.promise = null;
                }
            }

            try {
                await refreshTokenPromise.promise;
                return apiAdmin(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

// Instance Axios untuk Investor
const apiInvestor = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
});

apiInvestor.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (!refreshTokenPromise.promise) {
                refreshTokenPromise.promise = new Promise((resolve, reject) => {
                    refreshTokenPromise.resolve = resolve;
                    refreshTokenPromise.reject = reject;
                });

                try {
                    await apiInvestor.post("/auth/investor/refresh-token");
                    refreshTokenPromise.resolve();
                } catch (refreshError) {
                    refreshTokenPromise.reject(refreshError);
                    window.location.href = "/masuk";
                    return Promise.reject(refreshError);
                } finally {
                    refreshTokenPromise.promise = null;
                }
            }

            try {
                await refreshTokenPromise.promise;
                return apiInvestor(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export { apiAdmin, apiInvestor };
