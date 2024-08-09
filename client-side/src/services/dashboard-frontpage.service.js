import { axiosInstance } from "../lib/axios";

export const getDashboardFrontpage = (callback) => {
  axiosInstance
    .get("/beranda")
    .then((res) => {
      callback(res.data.data);
      // console.log(res.data.data);
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

// .post("http://localhost:3000/api/beranda", formData, {
//   headers: {
//     "Content-Type": "multipart/form-data",
//   },
// })
