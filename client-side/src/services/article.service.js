import { apiAdmin } from "../hooks/useAxiosConfig";

export const getArticles = (callback) => {
  apiAdmin
    .get("/artikel")
    .then((res) => {
      callback(res.data.data.reverse());
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getArticleBySlug = (slug, callback) => {
  apiAdmin
    .get(`/artikel/${slug}`)
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addArticle = (data, callback) => {
  apiAdmin
    .post("/artikel", data)
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateArticle = (id, data, callback) => {
  apiAdmin
    .put(`/artikel/${id}`, data)
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteArticle = (id, callback) => {
  apiAdmin
    .delete(`/artikel/${id}`)
    .then(() => {
      callback();
    })
    .catch((err) => {
      console.log(`Error deleting article with id: ${id}`, err);
    });
};
