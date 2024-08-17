import { axiosInstance } from "../lib/axios";

export const getArticles = (callback) => {
  axiosInstance
    .get("/artikel")
    .then((res) => {
      callback(res.data.data.reverse());
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getArticleById = (id, callback) => {
  axiosInstance
    .get(`/artikel/${id}`)
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addArticle = (data, callback) => {
  axiosInstance
    .post("/artikel", data)
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateArticle = (id, data, callback) => {
  axiosInstance
    .put(`/artikel/${id}`, data)
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteArticle = (id, callback) => {
  axiosInstance
    .delete(`/artikel/${id}`)
    .then(() => {
      callback();
    })
    .catch((err) => {
      console.log(`Error deleting article with id: ${id}`, err);
    });
};
