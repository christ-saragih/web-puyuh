import { axiosInstance } from "../lib/axios";

export const getSocialMedia = (callback) => {
  axiosInstance
    .get("/sosial-media")
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

