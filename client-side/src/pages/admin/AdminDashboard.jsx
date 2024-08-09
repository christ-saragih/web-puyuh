import { useState } from "react";
import Sidebar from "../../components/common/Sidebar";
import AdminContentLayout from "../../layouts/AdminContentLayout";
import AdminContentContainerLayout from "../../layouts/AdminContentContainerLayout";

const AdminDashboard = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <AdminContentContainerLayout>
      <Sidebar isHovered={isHovered} setIsHovered={setIsHovered} />

      <AdminContentLayout isHovered={isHovered} setIsHovered={setIsHovered}>
        <div className="flex gap-10">
          <div className="bg-[#F5F5F7] w-[65%] rounded-xl py-4 px-6">
            <h1 className="text-3xl font-semibold">Halaman Dashboard Admin</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi
              maiores earum magni corrupti nesciunt rem eaque neque, debitis
              molestiae distinctio dolorem inventore. Dolores doloremque unde
              culpa? Sequi aperiam rem molestias?
            </p>
          </div>

          <div className="bg-[#F5F5F7] w-[35%] rounded-xl py-4 px-6">
            <h1 className="text-3xl font-semibold">Halaman Dashboard Admin</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi
              maiores earum magni corrupti nesciunt rem eaque neque, debitis
              molestiae distinctio dolorem inventore. Dolores doloremque unde
              culpa? Sequi aperiam rem molestias?
            </p>
          </div>
        </div>
      </AdminContentLayout>
      
    </AdminContentContainerLayout>
  );
};

export default AdminDashboard;
