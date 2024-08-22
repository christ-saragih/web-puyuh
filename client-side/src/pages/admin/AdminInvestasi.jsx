import Admin from "../../assets/images/admin.svg";
import Input from "../../components/common/Input.jsx";
import InputSearch from "../../components/common/InputSearch.jsx";
import Label from "../../components/common/Label.jsx";
import Modal from "../../components/common/Modal.jsx";
import AdminLayout from "../../layouts/AdminLayout.jsx";
import BatchInvestasi from "../../assets/images/batch_investasi.png";
import { useState } from "react";
import { Dropdown } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  PiClockCountdown,
  PiDotsThreeOutlineVerticalBold,
  PiEyeBold,
  PiNotePencilBold,
  PiPlusCircle,
  PiTrashBold,
  PiUserCircleFill,
} from "react-icons/pi";

const AdminInvestasi = () => {
  const [previewImage, setPreviewImage] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  // fungsi modal
  const openModal = (type, investment = null) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalType("");
    setIsModalOpen(false);
    // resetForm();
  };

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
              onClick={() => openModal("add_investment")}
            >
              <PiPlusCircle className="w-6 h-6 me-1" />
              <p>Tambah</p>
            </button>

            {/* MODAL */}
            <Modal open={isModalOpen} onClose={closeModal}>
              {(modalType === "add_investment" ||
                modalType === "update_investment") && (
                <>
                  <Modal.Header
                    title={
                      modalType === "add_investment"
                        ? "Tambah Investasi"
                        : "Ubah Investasi"
                    }
                    onClose={closeModal}
                  />
                  <Modal.Body>
                    <Label
                      htmlFor={"investment_title"}
                      value={"Judul Investasi"}
                    />
                    <Input
                      type={"text"}
                      name={"investment_title"}
                      placeholder={"Masukkan judul investasi.."}
                      variant={"primary-outline"}
                      // value={formArticle.judul}
                      // handleChange={handleArticleInputChange}
                    />
                    <Label htmlFor={"image"} value={"Gambar"} />
                    <div className="flex flex-col items-center justify-center w-full py-4 mt-2 mb-4 h-full border-2 rounded-2xl bg-gray-50 shadow border-gray-300">
                      {previewImage && (
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="object-top w-56 h-52 mb-4 object-cover rounded-xl border-2 border-gray-300"
                        />
                      )}

                      <label
                        htmlFor="image"
                        className={`flex flex-col items-center justify-center w-full cursor-pointer ${
                          !previewImage && "h-32"
                        }`}
                      >
                        <div className="flex flex-col items-center justify-center">
                          <div className="flex items-center gap-2 mb-2">
                            <svg
                              className="w-8 h-8 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 16"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                              />
                            </svg>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Unggah gambar di sini
                              </span>
                            </p>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </div>
                        <input
                          id="image"
                          type="file"
                          className="hidden"
                          // onChange={handleArticleImageChange}
                        />
                      </label>
                    </div>

                    <Label htmlFor={"deskripsi"} value={"Deskripsi"} />
                    <ReactQuill
                      theme="snow"
                      // value={formArticle.deskripsi}
                      // onChange={handleArticleDescriptionChange}
                    />
                    {/* Profil Bisnis */}
                    <div className="grid grid-cols-2 gap-x-4 ">
                      <div>
                        <Label htmlFor={"tanggal"} value={"Tanggal"} />
                        <Input
                          type={"date"}
                          name={"tanggal"}
                          variant={"primary-outline"}
                          // value={formArticle.tanggal}
                          // handleChange={handleArticleInputChange}
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor={"funding_targets"}
                          value={"Target Pendanaan"}
                        />
                        <Input
                          type={"text"}
                          name={"funding_targets"}
                          placeholder={"Masukkan target pendanaan.."}
                          variant={"primary-outline"}
                        />
                      </div>
                      <div>
                        <Label htmlFor={"deadline"} value={"Waktu Pendanaan"} />
                        <Input
                          type={"text"}
                          name={"deadline"}
                          placeholder={"Masukkan waktu pendanaan.."}
                          variant={"primary-outline"}
                        />
                      </div>
                      <div>
                        <Label htmlFor={"tenor"} value={"Tenor"} />
                        <Input
                          type={"text"}
                          name={"tenor"}
                          placeholder={"Masukkan tenor.."}
                          variant={"primary-outline"}
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor={"profit_sharing_period"}
                          value={"Periode Bagi Hasil"}
                        />
                        <Input
                          type={"text"}
                          name={"profit_sharing_period"}
                          placeholder={"Masukkan periode bagi hasil.."}
                          variant={"primary-outline"}
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor={"minimum_investment"}
                          value={"Minimum Investasi"}
                        />
                        <Input
                          type={"text"}
                          name={"minimum_investment"}
                          placeholder={"Masukkan minimum investasi.."}
                          variant={"primary-outline"}
                        />
                      </div>
                    </div>

                    <Label htmlFor={"address"} value={"Alamat"} />
                    <Input
                      type={"text"}
                      name={"address"}
                      placeholder={"Masukkan alamat.."}
                      variant={"primary-outline"}
                    />
                    <Label htmlFor={"map_url"} value={"URL Map"} />
                    <Input
                      type={"text"}
                      name={"map_url"}
                      placeholder={"Masukkan URL map.."}
                      variant={"primary-outline"}
                    />
                  </Modal.Body>
                  <Modal.Footer
                    action={modalType === "add_investment" ? "Tambah" : "Ubah"}
                    // onAction={
                    //   modalType === "add_article"
                    //     ? handleAddArticle
                    //     : handleUpdateArticle
                    // }
                    onClose={closeModal}
                  />
                </>
              )}
            </Modal>
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
                        <Dropdown.Item icon={PiNotePencilBold}>
                          Ubah
                        </Dropdown.Item>
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
