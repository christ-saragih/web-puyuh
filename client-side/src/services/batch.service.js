import { axiosInstance } from "../lib/axios";

export const getBatchs = (callback) => {
  axiosInstance
    .get("/investasi")
    .then((res) => {
      callback(res.data.data.reverse());
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

export const addInvestment = (data, callback) => {
  axiosInstance
    .post("/investasi", data, { withCredentials: true })
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateInvestment = (id, data, callback) => {
  axiosInstance
    .put(`/investasi/${id}`, data, { withCredentials: true })
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteInvestment = (id, callback) => {
  axiosInstance
    .delete(`/investasi/${id}`, { withCredentials: true })
    .then(() => {
      callback();
    })
    .catch((err) => {
      console.log(`Error deleting investment with id: ${id}`, err);
    });
};
