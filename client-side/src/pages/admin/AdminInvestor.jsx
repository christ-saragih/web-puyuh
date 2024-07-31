import { useState } from "react";
import Sidebar from "../../components/common/Sidebar";
import AdminContentLayout from "../../layouts/AdminContentLayout";
import Dropdown from "../../components/common/Dropdown";
import InputSearch from "../../components/common/InputSearch";
import Investor1 from "../../assets/images/investors/1.png";
import Investor2 from "../../assets/images/investors/2.png";
import Investor3 from "../../assets/images/investors/3.png";
import AdminNavbar from "../../components/admin/AdminNavbar";

const AdminInvestor = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="bg-white w-dvw h-dvh overflow-y-auto py-5 pe-6">
      <Sidebar isHovered={isHovered} setIsHovered={setIsHovered} />

      <AdminContentLayout isHovered={isHovered} setIsHovered={setIsHovered}>
        <div className="flex flex-col gap-8">
          <AdminNavbar />
          

          <div className="bg-[#F5F5F7] w-full rounded-2xl shadow-md py-4 px-6">
            <div className="flex gap-5 mb-6">
              <Dropdown
                options={["1", "2", "3"]}
                label="Tampilkan"
                onOptionSelect={"1"}
              />

              {/* FITUR SEARCHING */}
              <InputSearch />

              {/*  */}
            </div>

            <div className="flex flex-col gap-8">
              {[1, 2, 3, 4].map((i) => (
                <>
                  <div className="grid grid-cols-4 gap-8">
                    <div className="bg-white flex items-center px-5 py-6 gap-4 rounded-2xl shadow-lg">
                      <img
                        src={Investor1}
                        alt="..."
                        className="rounded-full w-20 h-20"
                      />
                      <div className="flex flex-col truncate">
                        <h4 className="font-semibold truncate">
                          Bennefit Christy Saragih
                        </h4>
                        <p className="text-gray-500 text-sm mb-2">Individu</p>
                        <button className="font-medium text-start w-fit text-blue-700">
                          Lihat Profil
                        </button>
                      </div>
                    </div>
                    <div className="bg-white flex items-center px-5 py-6 gap-4 rounded-2xl shadow-lg">
                      <img
                        src={Investor2}
                        alt="..."
                        className="rounded-full w-20 h-20"
                      />
                      <div className="flex flex-col truncate">
                        <h4 className="font-semibold truncate">
                          Iqbal Fadhila
                        </h4>
                        <p className="text-gray-500 text-sm mb-2">Organisasi</p>
                        <button className="font-medium text-start w-fit text-blue-700">
                          Lihat Profil
                        </button>
                      </div>
                    </div>
                    <div className="bg-white flex items-center px-5 py-6 gap-4 rounded-2xl shadow-lg">
                      <img
                        src={Investor3}
                        alt="..."
                        className="rounded-full w-20 h-20"
                      />
                      <div className="flex flex-col truncate">
                        <h4 className="font-semibold truncate">
                          Nathanael Jonathan Feryanto
                        </h4>
                        <p className="text-gray-500 text-sm mb-2">Organisasi</p>
                        <button className="font-medium text-start w-fit text-blue-700">
                          Lihat Profil
                        </button>
                      </div>
                    </div>
                    <div className="bg-white flex items-center px-5 py-6 gap-4 rounded-2xl shadow-lg">
                      <img
                        src={Investor1}
                        alt="..."
                        className="rounded-full w-20 h-20"
                      />
                      <div className="flex flex-col truncate">
                        <h4 className="font-semibold truncate">Dewi Sartika</h4>
                        <p className="text-gray-500 text-sm mb-2">Individu</p>
                        <button className="font-medium text-start w-fit text-blue-700">
                          Lihat Profil
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>

            {/* START: Table */}
            {/* <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-base text-left text-gray-500">
                <thead className="bg-white text-sm text-gray-700 uppercase border-b-2">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      No
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Nama
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Telepon
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Kategori
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <>
                      <tr
                        key={i}
                        className="bg-white border-b hover:bg-gray-50"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium  whitespace-nowrap "
                        >
                          1
                        </th>
                        <td
                          scope="row"
                          className="px-6 py-4 font-medium  whitespace-nowrap "
                        >
                          className="font-semibold" Bennefit Christy Saragih
                        </td>
                        <td className="px-6 py-4">bennefit@gmail.com</td>
                        <td className="px-6 py-4">08121234599</td>
                        <td className="px-6 py-4" className="text-gray-500 text-sm">Individu</td>
                        <td className="px-6 py-4 text-center">
                          <a
                            href="#"
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            <ActionButton
                              icon={PiEyeBold}
                              className={"text-blue-600"}
                              tooltip={"Detail"}
                              // onClick={() => openModal("detail")}
                            />
                          </a>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div> */}
            {/* END: Table */}
          </div>
        </div>
      </AdminContentLayout>
    </div>
  );
};

export default AdminInvestor;
