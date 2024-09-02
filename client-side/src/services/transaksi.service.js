// import { axiosInstance } from "../lib/axios";
import { axiosInstance } from "../hooks/useAxiosConfig";

export const getTransaksi = (callback) => {
    axiosInstance
        .get("/investor/me/transaksi")
        .then((res) => {
            console.log("API response:", res.data); // Check the data structure
            console.log("API response:", res.data.data); // Check the data structure
            callback(res.data.data); // Make sure the data structure is correct
        })
        .catch((err) => {
            console.log("API Error:", err);
        });
};
