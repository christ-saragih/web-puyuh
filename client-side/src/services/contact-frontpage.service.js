import { apiAdmin } from "../hooks/useAxiosConfig";
import { axiosInstance } from "../lib/axios";

export const getContactFrontpage = (callback) => {
    axiosInstance
        .get("/kontak-frontpage")
        .then((res) => {
            callback(res.data.data);
        })
        .catch((err) => {
            console.log(err);
        });
};

export const saveContactFrontpage = (data, callback) => {
    apiAdmin
        .post("/kontak-frontpage", data)
        .then((res) => {
            callback(res.data.data);
        })
        .catch((err) => {
            console.log(err);
        });
};
