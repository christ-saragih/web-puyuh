import axios from "axios";

export const getArticleTags = (callback) => {
  axios
    .get("http://localhost:3000/api/tag-artikel")
    .then((res) => {
      if (res.data && Array.isArray(res.data.data)) {
        callback(res.data.data);
      } else {
        console.error("Data is not an array:", res.data);
        callback([]);
      }
    })
    .catch((err) => {
      console.log(err);
      callback([]);
    });
};

export const addArticleTag = (tag, callback) => {
  axios
    .post("http://localhost:3000/api/tag-artikel", tag)
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
