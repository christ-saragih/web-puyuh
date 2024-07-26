import { useState } from "react";
import Sidebar from "../../components/common/Sidebar";

const AdminPengguna = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="bg-white w-dvw h-dvh overflow-y-auto py-5 pe-6">
      <Sidebar isHovered={isHovered} setIsHovered={setIsHovered} />

      <div
        className={`px-8 py-5 rounded-xl bg-[#F5F5F7] transition-all duration-300 ease-in-out ${
          isHovered ? "md:ml-64" : "md:ml-32"
        }`}
      >
        <h1 className="text-3xl font-semibold">Halaman Pengguna Admin</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi maiores
          earum magni corrupti nesciunt rem eaque neque, debitis molestiae
          distinctio dolorem inventore. Dolores doloremque unde culpa? Sequi
          aperiam rem molestias?
        </p>
      </div>
    </div>
  );
};

export default AdminPengguna;
