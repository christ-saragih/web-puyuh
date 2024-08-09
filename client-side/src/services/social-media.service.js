import { axiosInstance } from "../lib/axios";

export const getSocialMedia = (callback) => {
  axiosInstance
    .get("/sosial-media")
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addSocialMedia = (data, callback) => {
  axiosInstance
    .post("/sosial-media", data)
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Contoh fungsi updateSocialMedia di social-media.service.js
export const updateSocialMedia = (id, data, callback) => {
  axiosInstance
    .put(`/sosial-media/${id}`, data)
    .then((res) => {
      callback(res.data.data); // Pastikan data yang dikembalikan benar
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteSocialMedia = (id, callback) => {
  axiosInstance
    .delete(`/sosial-media/${id}`)
    .then(() => {
      console.log(`Successfully deleted social media with id: ${id}`);
      callback();
    })
    .catch((err) => {
      console.error(`Error deleting social media with id: ${id}`, err);
    });
};
