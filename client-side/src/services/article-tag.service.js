import axios from "axios";

export const getArticleTags = (callback) => {
  axios
    .get("http://localhost:3000/api/tag-artikel")
    .then((res) => {
      // Check if the data is as expected
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
