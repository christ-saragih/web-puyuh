// import { axiosInstance } from "../lib/axios";
import { apiAdmin, apiInvestor } from "../hooks/useAxiosConfig";

export const getTransaksi = (callback) => {
  apiInvestor
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

export const getTransactionsByInvestor = (id, callback) => {
  apiAdmin(`/transaksi/investor/${id}`)
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
