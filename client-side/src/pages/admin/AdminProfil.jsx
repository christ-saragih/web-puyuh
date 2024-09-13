import { useEffect, useState } from "react";
import Admin from "../../assets/images/admin.svg";
import AdminLayout from "../../layouts/AdminLayout";
import { getAdmin } from "../../services/admin.service";
import { formatDate } from "../../utils/formatDate";

const AdminProfil = () => {
  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    getAdmin((data) => {
      setAdmin(data);
    });
  }, []);

  return (
    <AdminLayout title={"Halaman Profil Admin"}>
      <div className="flex flex-col">
        <div className="bg-[#F5F5F7] w-full rounded-2xl shadow-md py-8 px-6">
          <div className="flex gap-10 justify-center">
            <div className="w-40 h-40 rounded-full shadow-md overflow-hidden">
              <img
                src={admin.adminBiodata?.foto_profil ? `http://localhost:3000/api/biodata-admin/images/${admin.adminBiodata.foto_profil}` : Admin}
                alt={admin.adminBiodata?.foto_profil}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-1 w-fit">
              <h4 className="font-semibold text-2xl">{admin.username}</h4>
              <p className="text-gray-600 text-lg">Admin</p>

              <div className="grid grid-cols-2 gap-3 w-[34rem] mt-6">
                <div className="flex justify-between font-medium text-lg">
                  <span>Nama Lengkap</span>
                  <span>:</span>
                </div>
                <p className="font-medium text-lg">
                  {admin.adminBiodata?.nama_lengkap}
                </p>
                <div className="flex justify-between font-medium text-lg">
                  <span>Email</span>
                  <span>:</span>
                </div>
                <p className="font-medium text-lg">{admin.email}</p>
                <div className="flex justify-between font-medium text-lg">
                  <span>Nomor Telepon</span>
                  <span>:</span>
                </div>
                <p className="font-medium text-lg">
                  {admin.adminBiodata?.no_hp}
                </p>
                <div className="flex justify-between font-medium text-lg">
                  <span>Jenis Kelamin</span>
                  <span>:</span>
                </div>
                <p className="font-medium text-lg">{admin.adminBiodata?.jk}</p>
                <div className="flex justify-between font-medium text-lg">
                  <span>Tempat Lahir</span>
                  <span>:</span>
                </div>
                <p className="font-medium text-lg">
                  {admin.adminBiodata?.tempat_lahir}
                </p>
                <div className="flex justify-between font-medium text-lg">
                  <span>Tanggal Lahir</span>
                  <span>:</span>
                </div>
                <p className="font-medium text-lg">
                  {formatDate(admin.adminBiodata?.tanggal_lahir)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProfil;
