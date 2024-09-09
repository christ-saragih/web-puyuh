import { apiAdmin } from "../hooks/useAxiosConfig";

export const getDashboardFrontpage = (callback) => {
  apiAdmin
    .get("/beranda")
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const saveDashboardFrontpage = (data, callback) => {
  apiAdmin
    .post("/beranda", data)
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
