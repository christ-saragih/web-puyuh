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
