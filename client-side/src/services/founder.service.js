import { axiosInstance } from "../lib/axios"


export const getFounders = (callback) => {
    axiosInstance.get("/founder").then((res) => {
        callback(res.data.data);
        console.log(res.data.data);
    }).catch((err) => {
        console.log(err);
        
    });
}


export const addFounder = (data, callback) => {
    axiosInstance
      .post("/founder", data, { withCredentials: true })
      .then((res) => {
        callback(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  export const updateFounder = (id, data, callback) => {
    axiosInstance
      .put(`/founder/${id}`, data, { withCredentials: true })
      .then((res) => {
        callback(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  export const deleteFounder = (id, callback) => {
    axiosInstance
      .delete(`/founder/${id}`, { withCredentials: true })
      .then(() => {
        callback();
      })
      .catch((err) => {
        console.log(`Error deleting founder with id: ${id}`, err);
      });
  };