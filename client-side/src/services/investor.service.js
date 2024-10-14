import { apiAdmin, apiInvestor } from "../hooks/useAxiosConfig";

export const getInvestor = (callback) => {
  apiInvestor
    .get("/investor")
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

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

export const verifyInvestorProfile = (id, callback) => {
  apiAdmin
    .post(`/admin/verifikasiProfile/${id}`)
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};


