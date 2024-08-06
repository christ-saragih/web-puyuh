import axios from "axios";

export const getDashboardFrontpage = (callback) => {
  axios
    .get("http://localhost:3000/api/beranda")
    .then((res) => {
      callback(res.data);
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addDashboardFrontpage = (formData, successCallback, errorCallback) => {
  console.log("Data yang akan dikirim:", formData); // Debugging payload
  axios
    .post("http://localhost:3000/api/beranda", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      successCallback(res.data);
      console.log(res.data);
    })
    .catch((err) => {
      console.error("Error saat mengirim data:", err);
      errorCallback(err);
    });
};