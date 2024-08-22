import { axiosInstance } from "../lib/axios";

export const getBatchs = (callback) => {
    axiosInstance
      .get("/investasi")
      .then((res) => {
        callback(res.data.data);
        console.log('DATA INVESTASI', res.data.data);
        
      })
      .catch((err) => {
        console.log(err);
      });
  };