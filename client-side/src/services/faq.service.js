import { apiAdmin } from "../hooks/useAxiosConfig";

export const getFaqs = (callback) => {
  apiAdmin
    .get("/faq")
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addFaq = (data, callback) => {
  apiAdmin
    .post("/faq", data)
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateFaq = (id, data, callback) => {
  apiAdmin
    .put(`/faq/${id}`, data)
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteFaq = (id, callback) => {
  apiAdmin
    .delete(`/faq/${id}`)
    .then(() => {
      callback();
    })
    .catch((err) => {
      console.error(`Error deleting faq with id: ${id}`, err);
    });
};
