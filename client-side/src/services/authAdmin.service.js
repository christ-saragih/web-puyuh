import { axiosInstance } from "../lib/axios";
import { jwtDecode } from "jwt-decode";

export const loginAdmin = (data, callback) => {
  axiosInstance
    .post("/auth/admin/login", data, { withCredentials: true })
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

export const logoutAdmin = (callback) => {
  axiosInstance
    .post("/auth/admin/logout", {}, { withCredentials: true })
    .then(() => {
      callback(true);
    })
    .catch((err) => {
      callback(false, err);
    });
};
