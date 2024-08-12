import { axiosInstance } from "../lib/axios";

export const getDocumentation = (callback) => {
  axiosInstance
    .get("/dokumentasi-frontpage")
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addDocumentation = (data, callback) => {
  axiosInstance
    .post("/dokumentasi-frontpage", data)
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateDocumentation = (id, data, callback) => {
  axiosInstance
    .put(`/dokumentasi-frontpage/${id}`, data)
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteDocumentation = (id, callback) => {
  axiosInstance
    .delete(`/dokumentasi-frontpage/${id}`)
    .then(() => {
      callback();
    })
    .catch((err) => {
      console.error(`Error deleting documentation with id: ${id}`, err);
    });
};
