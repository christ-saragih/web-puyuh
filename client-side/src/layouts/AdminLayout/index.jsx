import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const AdminLayout = (props) => {
  const { title, children } = props;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="bg-white w-vw h-full overflow-hidden py-5 pe-6">
      <Sidebar isHovered={isHovered} setIsHovered={setIsHovered} />
      <div
        className={` transition-all duration-300 ease-in-out ${
          isHovered ? "md:ml-[19rem]" : "md:ml-32"
        }`}
      >
        <div className="flex flex-col gap-8">
          <Navbar title={title} />
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
