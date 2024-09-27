import { apiAdmin } from "../hooks/useAxiosConfig";

export const getArticleTags = (callback) => {
  apiAdmin
    .get("/tag-artikel")
    .then((res) => {
      callback(res.data.data.reverse());
    })
    .catch((err) => {
      console.log(err);
      callback([]);
    });
};

export const addArticleTag = (data, callback) => {
  apiAdmin
    .post("/tag-artikel", data)
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateArticleTag = (id, data, callback) => {
  apiAdmin
    .put(`/tag-artikel/${id}`, data)
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteArticleTag = (id, successCallback, errorCallback) => {
  apiAdmin
    .delete(`/tag-artikel/${id}`)
    .then(() => {
      successCallback();
    })
    .catch((err) => {
      console.log(err);
      if (err.response && err.response.data && err.response.data.message) {
        errorCallback(err.response.data.message);
      } else {
        errorCallback("Terjadi kesalahan saat menghapus tag artikel.");
      }
    });
};
