// import { useEffect, useState } from "react";
// import { getDataAdmin } from "../services/authAdmin.service";
// import Cookies from "js-cookie";

// export const useLoginAdmin = () => {
//   const [dataAdmin, setDataAdmin] = useState({
//     username: "",
//     email: "",
//   });

//   useEffect(() => {
//     // const accessToken = localStorage.getItem("accessToken");
//     const accessToken = Cookies.get("accessToken");

//     if (accessToken) {
//       setDataAdmin(getDataAdmin(accessToken));
//     } else {
//       window.location.href = "/admin/masuk";
//     }
//   }, []);

//   return dataAdmin;
// };
