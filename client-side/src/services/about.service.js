import { axiosInstance } from "../lib/axios";

export const getAbouts = (callback) => {
  axiosInstance
    .get("/tentang-kami")
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAboutSejarahs = (callback) => {
  axiosInstance
    .get("/sejarah")
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getFounder = (callback) => {
  axiosInstance
    .get("/founder")
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
