import AdminLayout from "../../layouts/AdminLayout.jsx";

const AdminDashboard = () => {

  return (
    <AdminLayout
      title={"Halaman Beranda"}
    >
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
    </AdminLayout>
  );
};

export default AdminDashboard;
