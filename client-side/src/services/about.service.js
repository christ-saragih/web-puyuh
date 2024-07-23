import axios from "axios";

export const getAbouts = (callback) => {
  axios
    .get("http://localhost:3000/api/tentang-kami")
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
