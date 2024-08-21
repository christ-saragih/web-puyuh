import { axiosInstance } from "../lib/axios";
import { jwtDecode } from "jwt-decode";

export const loginAdmin = (data, callback) => {
  axiosInstance
    .post("/auth/admin/login", data)
    .then((res) => {
      // console.log(res);
      callback(true, res.data.accessToken);
    })
    .catch((err) => {
      callback(false, err);
    });
};

export const getDataAdmin = (accessToken) => {
  const decoded = jwtDecode(accessToken);
  // console.log(decoded);
  return decoded;
};
