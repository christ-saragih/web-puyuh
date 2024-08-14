import { axiosInstance } from "../lib/axios";

export const getDocument = (callback) => {
  axiosInstance
    .get("/dokumen-frontpage")
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addDocument = (data, callback) => {
  axiosInstance
    .post("/dokumen-frontpage", data)
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateDocument = (id, data, callback) => {
  axiosInstance
    .put(`/dokumen-frontpage/${id}`, data)
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteDocument = (id, callback) => {
  axiosInstance
    .delete(`/dokumen-frontpage/${id}`)
    .then(() => {
      callback();
    })
    .catch((err) => {
      console.error(`Error deleting document with id: ${id}`, err);
    });
};