import { apiAdmin } from "../hooks/useAxiosConfig";

export const getAdmin = (callback) => {
  apiAdmin
    .get("/admin")
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const saveProfileAdmin = (data, callback) => {
  apiAdmin
    .post("/biodata-admin", data)
    .then((res) => {
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
