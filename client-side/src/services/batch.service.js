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

  export const getDetailInvestasiBySlug = (slug, callback) => {
    axiosInstance
      .get(`/investasi/${slug}`)
      .then((res) => {
        callback(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };