import { axiosInstance } from "../lib/axios";

export const getTransaksi = (callback, token) => {
  axiosInstance
    .get('/investor/transaksi/all', {
      headers: {
        Authorization: `Bearer ${token}`, // Sertakan token di sini
      },
    })
    .then((res) => {
      console.log("API response:", res.data); // Check the data structure
      console.log("API response:", res.data.data); // Check the data structure
      callback(res.data.data); // Make sure the data structure is correct
    })
    .catch((err) => {
      console.log("API Error:", err);
    });
};