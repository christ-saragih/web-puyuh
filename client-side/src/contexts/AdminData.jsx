import { createContext, useEffect, useState } from "react";
import { getAdmin } from "../services/admin.service";

const AdminDataContext = createContext();

const AdminDataContextProvider = ({ children }) => {
  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    getAdmin((data) => {
      setAdmin(data)
    })
  }, [])

  return (
    <AdminDataContext.Provider value={{ admin, setAdmin }}>
      {children}
    </AdminDataContext.Provider>
  );
};

export const AdminData = AdminDataContext;
export default AdminDataContextProvider;
