import { apiAdmin } from "../hooks/useAxiosConfig";

export const getDocumentation = (callback) => {
  apiAdmin
    .get("/dokumentasi-frontpage")
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addDocumentation = (data, callback) => {
  apiAdmin
    .post("/dokumentasi-frontpage", data)
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateDocumentation = (id, data, callback) => {
  apiAdmin
    .put(`/dokumentasi-frontpage/${id}`, data)
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteDocumentation = (id, callback) => {
  apiAdmin
    .delete(`/dokumentasi-frontpage/${id}`)
    .then(() => {
      callback();
    })
    .catch((err) => {
      console.error(`Error deleting documentation with id: ${id}`, err);
    });
};
