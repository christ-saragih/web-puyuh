import { useState } from "react";
import AdminContentLayout from "../AdminContentLayout";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const AdminLayout = (props) => {
  const { title, children } = props;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="bg-white w-vw h-full overflow-hidden py-5 pe-6">
      <Sidebar isHovered={isHovered} setIsHovered={setIsHovered} />

      <AdminContentLayout isHovered={isHovered} setIsHovered={setIsHovered}>
        <div className="flex flex-col gap-8">
          <Navbar title={title} />
          {children}
        </div>
      </AdminContentLayout>
    </div>
  );
};

export default AdminLayout;
