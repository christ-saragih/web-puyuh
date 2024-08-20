import InputSearch from "../../components/common/InputSearch.jsx";
import AdminLayout from "../../layouts/AdminLayout.jsx";
import BatchInvestasi from "../../assets/images/batch_investasi.png";
import Admin from "../../assets/images/admin.svg";
import {
  PiClockCountdown,
  PiDotsThreeOutlineVerticalBold,
  PiEyeBold,
  PiNotePencilBold,
  PiPlusCircle,
  PiTrashBold,
  PiUserCircleFill,
} from "react-icons/pi";
import { Dropdown } from "flowbite-react";

const AdminInvestasi = () => {
  return (
    <AdminLayout title={"Halaman Managemen Investasi"}>
      <div className="flex flex-col">
        <div className="bg-[#F5F5F7] w-full rounded-2xl shadow-md py-4 px-6">
          <div className="flex gap-5 mb-6">
            
            {/* FITUR SEARCHING */}
            <InputSearch
            // handleChange={(e) => setSearch(e.target.value)}
            />

            <button
              className="flex items-center py-2 px-6 bg-green-800 text-white font-medium rounded-2xl"
              // onClick={() => openModal("add_faq")}
            >
              <PiPlusCircle className="w-6 h-6 me-1" />
              <p>Tambah</p>
            </button>

            {/* MODAL */}
          </div>

          {/* List */}
          <div className="grid grid-cols-3 gap-x-14 gap-y-12">
            {/* Item */}

            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg">
                <img
                  src={BatchInvestasi}
                  alt="batch investasi"
                  className="h-40 w-full object-cover rounded-2xl shadow"
                />
                <div className="p-4 flex flex-col">
                  <div className="relative flex flex-col items-center mb-5 px-4 text-center">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                      Sukuk Ijarah Panacea
                    </h2>
                    <p className="font-medium text-gray-700 mb-3">
                      Lokasi CV Sukaraja
                    </p>
                    <div className="flex -space-x-2">
                      <img
                        src={Admin}
                        alt="investor"
                        className="h-8 w-8 rounded-full border-2 border-white"
                      />
                      <img
                        src={Admin}
                        alt="investor"
                        className="h-8 w-8 rounded-full border-2 border-white"
                      />
                      <img
                        src={Admin}
                        alt="investor"
                        className="h-8 w-8 rounded-full border-2 border-white"
                      />
                    </div>

                    <div className="absolute top-[3px] right-0 cursor-pointer">
                      <Dropdown
                      className="bg-white w-28 rounded-xl shadow font-semibold overflow-hidden"
                        label=""
                        dismissOnClick={false}
                        renderTrigger={() => (
                          <div className="border rounded-full p-[5px]">
                            <PiDotsThreeOutlineVerticalBold />
                          </div>
                        )}
                        placement="right-end"
                      >
                        <Dropdown.Item icon={PiEyeBold}>Detail</Dropdown.Item>
                        <Dropdown.Item icon={PiNotePencilBold}>Ubah</Dropdown.Item>
                        <Dropdown.Item icon={PiTrashBold}>Hapus</Dropdown.Item>
                      </Dropdown>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <p>Dana Terkumpul</p>
                      <p className="font-semibold text-lg text-[#e3a008]">
                        Rp. 2.600.000.000
                      </p>
                    </div>

                    <div className="bg-gray-200 rounded-full">
                      <div
                        className="text-xs font-medium text-white text-center p-0.5 leading-none rounded-full"
                        style={{
                          width: "25%",
                          backgroundColor: "#e3a008",
                        }}
                      >
                        25%
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1 text-slate-700">
                      <PiUserCircleFill className="w-6 h-6" />
                      <p className="font-medium">10 investor</p>
                    </div>
                    <div className="bg-[#fff5e3] text-[#FFA90B] items-center justify-center rounded-3xl py-1 px-3 flex gap-1">
                      <PiClockCountdown className="-ms-[3px] w-6 h-6" />
                      <p className="font-medium">12 hari lagi</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminInvestasi;
