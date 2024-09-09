import axios from "axios";

// Mutex untuk menyegarkan token
const refreshTokenPromises = {
    admin: {
        promise: null,
        resolve: null,
        reject: null,
        attempts: 0,
    },
    investor: {
        promise: null,
        resolve: null,
        reject: null,
        attempts: 0,
    },
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

            if (refreshTokenPromises.admin.promise === null) {
                refreshTokenPromises.admin.promise = new Promise(
                    (resolve, reject) => {
                        refreshTokenPromises.admin.resolve = resolve;
                        refreshTokenPromises.admin.reject = reject;
                    }
                );

                try {
                    await apiAdmin.post("/auth/admin/refresh-token");
                    refreshTokenPromises.admin.resolve();
                } catch (refreshError) {
                    refreshTokenPromises.admin.reject(refreshError);
                    if (refreshTokenPromises.admin.attempts < 1) {
                        refreshTokenPromises.admin.attempts++;
                        return apiAdmin(originalRequest);
                    } else {
                        window.location.href = "/admin/masuk";
                        return Promise.reject(refreshError);
                    }
                } finally {
                    refreshTokenPromises.admin.promise = null;
                }
            } else {
                // Tunggu hingga promise penyegaran token selesai
                try {
                    await refreshTokenPromises.admin.promise;
                    return apiAdmin(originalRequest);
                } catch (refreshError) {
                    return Promise.reject(refreshError);
                }
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

            if (refreshTokenPromises.investor.promise === null) {
                refreshTokenPromises.investor.promise = new Promise(
                    (resolve, reject) => {
                        refreshTokenPromises.investor.resolve = resolve;
                        refreshTokenPromises.investor.reject = reject;
                    }
                );

                try {
                    await apiInvestor.post("/auth/investor/refresh-token");
                    refreshTokenPromises.investor.resolve();
                } catch (refreshError) {
                    refreshTokenPromises.investor.reject(refreshError);
                    if (refreshTokenPromises.investor.attempts < 1) {
                        refreshTokenPromises.investor.attempts++;
                        return apiInvestor(originalRequest);
                    } else {
                        window.location.href = "/masuk";
                        return Promise.reject(refreshError);
                    }
                } finally {
                    refreshTokenPromises.investor.promise = null;
                }
            } else {
                // Tunggu hingga promise penyegaran token selesai
                try {
                    await refreshTokenPromises.investor.promise;
                    return apiInvestor(originalRequest);
                } catch (refreshError) {
                    return Promise.reject(refreshError);
                }
            }
        }

        return Promise.reject(error);
    }
);

export { apiAdmin, apiInvestor };

// import axios from "axios";

// // Instance Axios untuk Admin
// const apiAdmin = axios.create({
//     baseURL: "http://localhost:3000/api",
//     withCredentials: true,
// });

// apiAdmin.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config;

//         if (error.response?.status === 403 && !originalRequest._retry) {
//             originalRequest._retry = true;

//             try {
//                 // Coba refresh token admin
//                 await apiAdmin.post("/auth/admin/refresh-token");
//                 // Coba ulangi request asli
//                 return apiAdmin(originalRequest);
//             } catch (refreshError) {
//                 window.location.href = "/admin/masuk"; // Redirect ke halaman login admin
//                 return Promise.reject(refreshError);
//             }
//         }

//         return Promise.reject(error);
//     }
// );

// // Instance Axios untuk Investor
// const apiInvestor = axios.create({
//     baseURL: "http://localhost:3000/api",
//     withCredentials: true,
// });

// apiInvestor.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config;

//         if (error.response?.status === 403 && !originalRequest._retry) {
//             originalRequest._retry = true;

//             try {
//                 // Coba refresh token investor
//                 await apiInvestor.post("/auth/investor/refresh-token");
//                 // Coba ulangi request asli
//                 return apiInvestor(originalRequest);
//             } catch (refreshError) {
//                 window.location.href = "/masuk"; // Redirect ke halaman login investor
//                 return Promise.reject(refreshError);
//             }
//         }

//         return Promise.reject(error);
//     }
// );

// // export { apiAdmin, apiInvestor };
// import axios from "axios";

// // Instance Axios untuk Admin
// const apiAdmin = axios.create({
//     baseURL: "http://localhost:3000/api",
//     withCredentials: true,
// });

// // Instance Axios untuk Investor
// const apiInvestor = axios.create({
//     baseURL: "http://localhost:3000/api",
//     withCredentials: true,
// });

// export { apiAdmin, apiInvestor };
