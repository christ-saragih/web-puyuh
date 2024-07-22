import axios from "axios";

export const getFaqs = (callback) => {
  axios
    .get("http://localhost:3000/api/faq")
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
