import axios from "axios";

export const getAboutSejarahs = (callback) => {
    axios
      .get("http://localhost:3000/api/sejarah")
      .then((res) => {
        callback(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };