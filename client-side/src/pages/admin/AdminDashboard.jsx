import Sidebar from "../../components/common/Sidebar";

const AdminDashboard = () => {
  return (
    <div className="bg-white w-dvw h-dvh overflow-y-auto">
      <Sidebar />

      <div className="px-4 p-4 py-5 md:ml-32">{/* konten */}</div>
    </div>
  );
};

export default AdminDashboard;
