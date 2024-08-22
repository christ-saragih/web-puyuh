import { axiosInstance } from "../lib/axios";

export const getFaqs = (callback) => {
  axiosInstance
    .get("/faq")
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addFaq = (data, callback) => {
  axiosInstance
    .post("/faq", data)
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateFaq = (id, data, callback) => {
  axiosInstance
    .put(`/faq/${id}`, data)
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteFaq = (id, callback) => {
  axiosInstance
    .delete(`/faq/${id}`)
    .then(() => {
      callback();
    })
    .catch((err) => {
      console.error(`Error deleting faq with id: ${id}`, err);
    });
};
