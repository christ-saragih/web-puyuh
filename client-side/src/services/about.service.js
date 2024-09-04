import axios from "axios";

export const getAbouts = (callback) => {
  axios
    .get("http://localhost:3000/api/tentang-kami")
    .then((res) => {
      callback(res.data.data);
      console.log("DATA TENTANG KAMI");
      console.log(res.data.data);
      
      
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAboutSejarahs = (callback) => {
  axios
    .get("http://localhost:3000/api/sejarah")
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getFounder = (callback) => {
  axios
    .get("http://localhost:3000/api/founder")
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
