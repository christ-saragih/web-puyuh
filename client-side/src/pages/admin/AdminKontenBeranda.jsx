import { useState } from "react";
import Sidebar from "../../components/common/Sidebar";

const AdminKontenBeranda = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="bg-white w-dvw h-dvh overflow-y-auto py-5 pe-6">
      <Sidebar isHovered={isHovered} setIsHovered={setIsHovered} />

      
    </div>
  );
};

export default AdminKontenBeranda;
