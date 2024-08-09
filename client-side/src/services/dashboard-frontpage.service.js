import { axiosInstance } from "../lib/axios";

export const getDashboardFrontpage = (callback) => {
  axiosInstance
    .get("/beranda")
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const saveDashboardFrontpage = (data, callback) => {
  axiosInstance
    .post("/beranda", data)
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};