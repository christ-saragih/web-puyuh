import { apiAdmin } from "../hooks/useAxiosConfig";

export const getSocialMedia = (callback) => {
  apiAdmin
    .get("/sosial-media")
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addSocialMedia = (data, callback) => {
  apiAdmin
    .post("/sosial-media", data)
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateSocialMedia = (id, data, callback) => {
  apiAdmin
    .put(`/sosial-media/${id}`, data)
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteSocialMedia = (id, callback) => {
  apiAdmin
    .delete(`/sosial-media/${id}`)
    .then(() => {
      callback();
    })
    .catch((err) => {
      console.error(`Error deleting social media with id: ${id}`, err);
    });
};
