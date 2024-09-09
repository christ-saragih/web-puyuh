// // useAuthAdmin.js
// import { useState, useEffect } from "react";
// import { apiAdmin } from "./useAxiosConfig";

// const useAuthAdmin = () => {
//     const [admin, setAdmin] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const checkAuth = async () => {
//             try {
//                 const res = await apiAdmin.get("/auth/admin/protected");
//                 setAdmin(res.data.admin);
//             } catch (error) {
//                 setAdmin(null);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         checkAuth();
//     }, []);

//     return { admin, loading };
// };

// export default useAuthAdmin;
