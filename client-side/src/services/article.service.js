import axios from "axios";

export const getArticles = (callback) => {
  axios
    .get("http://localhost:3000/api/artikel")
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getArticleById = (id, callback) => {
  axios
    .get(`http://localhost:3000/api/artikel/${id}`)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
