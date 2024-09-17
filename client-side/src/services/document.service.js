import { apiAdmin } from "../hooks/useAxiosConfig";

export const getDocument = (callback) => {
  apiAdmin
    .get("/dokumen-frontpage")
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addDocument = (data, callback) => {
  apiAdmin
    .post("/dokumen-frontpage", data)
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateDocument = (id, data, callback) => {
  apiAdmin
    .put(`/dokumen-frontpage/${id}`, data)
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteDocument = (id, callback) => {
  apiAdmin
    .delete(`/dokumen-frontpage/${id}`)
    .then(() => {
      callback();
    })
    .catch((err) => {
      console.error(`Error deleting document with id: ${id}`, err);
    });
};