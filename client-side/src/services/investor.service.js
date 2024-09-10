import { apiAdmin } from "../hooks/useAxiosConfig";

export const getInvestors = (callback) => {
  apiAdmin
    .get("/admin/investor")
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getInvestorById = (id, callback) => {
  apiAdmin
    .get(`/admin/investor/${id}`)
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
