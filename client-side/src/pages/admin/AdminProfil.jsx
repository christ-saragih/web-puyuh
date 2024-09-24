import Admin from "../../assets/images/admin.svg";
import AdminLayout from "../../layouts/AdminLayout";
import { getAdmin } from "../../services/admin.service";
import { formatDate } from "../../utils/formatDate";
import { useEffect, useState } from "react";
import { PiNotePencil } from "react-icons/pi";

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
          <div className="max-w-4xl mx-auto py-6 px-7 border border-gray-400 shadow-md rounded-2xl">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                  <div className="w-24 h-24 rounded-full shadow-md overflow-hidden">
                    <img
                      src={
                        admin.adminBiodata?.foto_profil
                          ? `http://localhost:3000/api/biodata-admin/images/${admin.adminBiodata.foto_profil}`
                          : Admin
                      }
                      alt={admin.adminBiodata?.foto_profil}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <h4 className="font-semibold text-2xl">{admin.username}</h4>
                    <p className="text-gray-600 text-lg">Admin</p>
                  </div>
                </div>
                <button className="py-2 px-4 border border-gray-400 rounded-2xl flex items-center gap-[6px] hover:shadow-md duration-300 ease-in-out">
                  <p className="font-medium">Ubah</p>
                  <PiNotePencil className="w-[18px] h-[18px]" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-5 ms-1">
                <div>
                  <p className="text-gray-600">Nama Lengkap</p>
                  <p className="text-lg font-medium">
                    {admin.adminBiodata?.nama_lengkap}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Email</p>
                  <p className="text-lg font-medium">{admin.email}</p>
                </div>
                <div>
                  <p className="text-gray-600">Nomor Telepon</p>
                  <p className="text-lg font-medium">
                    {admin.adminBiodata?.no_hp}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Jenis Kelamin</p>
                  <p className="text-lg font-medium">
                    {admin.adminBiodata?.jk}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Tempat Lahir</p>
                  <p className="text-lg font-medium">
                    {admin.adminBiodata?.tempat_lahir}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Tanggal Lahir</p>
                  <p className="text-lg font-medium">
                    {formatDate(admin.adminBiodata?.tanggal_lahir)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProfil;
