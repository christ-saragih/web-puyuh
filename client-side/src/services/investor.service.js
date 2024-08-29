import { axiosInstance } from "../lib/axios";

export const getInvestors = (callback) => {
  axiosInstance
    .get("/investor")
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getInvestorById = (id, callback) => {
  axiosInstance
    .get(`/investor/${id}`)
    .then((res) => {
      callback(res.data.data);
      console.log(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
