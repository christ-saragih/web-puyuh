import { useState } from "react";
import Sidebar from "../../components/common/Sidebar";
import AdminContentLayout from "../../layouts/AdminContentLayout";
import Dropdown from "../../components/common/Dropdown";
import InputSearch from "../../components/common/InputSearch";
import Investor1 from "../../assets/images/investors/1.png";
import Investor2 from "../../assets/images/investors/2.png";
import Investor3 from "../../assets/images/investors/3.png";
import AdminNavbar from "../../components/admin/AdminNavbar";
import Modal from "../../components/common/Modal";
import Label from "../../components/common/Label";
import Input from "../../components/common/Input";
import { Tabs } from "flowbite-react";
import { PiTargetDuotone, PiUsersThreeBold } from "react-icons/pi";

const AdminInvestor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  // modal logic
  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setModalType("");
    setIsModalOpen(false);
  };
  // buat size modal delete menjadi lebih kecil
  const modalSize = modalType === "delete" ? "small" : "large";

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
                <div key={i}>
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
                        <button
                          className="font-medium text-start w-fit text-blue-700"
                          onClick={() => openModal()}
                        >
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
                </div>
              ))}
            </div>

            {/* START: Modal detail profil investor */}
            <Modal open={isModalOpen} onClose={closeModal} size={modalSize}>
              <>
                <Modal.Header onClose={closeModal}>
                  <div className="flex items-center mx-auto mt-2 gap-4">
                    <img
                      src={Investor1}
                      alt="..."
                      className="w-24 h-24 rounded-full"
                    />
                    <div>
                      <h3 className="text-2xl font-semibold text-[#572618]">
                        Bennefit Christy Saragih
                      </h3>
                      <p>Individu</p>
                    </div>
                  </div>
                </Modal.Header>

                <Modal.Body className="md:pb-5">
                  <Tabs aria-label="Pills" variant="pills">
                    <Tabs.Item active title="Biodata">
                      <Label value={"Email"} />
                      <Input
                        variant={"disabled"}
                        className={"mt-1 mb-4 disabled"}
                        value={"bennefit@investor.com"}
                        isDisabled={true}
                      />
                      <Label value={"Jenis Kelamin"} />
                      <Input
                        variant={"disabled"}
                        className={"mt-1 mb-4 disabled"}
                        value={"Laki-Laki"}
                        isDisabled={true}
                      />
                      <Label value={"Tempat Lahir"} />
                      <Input
                        variant={"disabled"}
                        className={"mt-1 mb-4 disabled"}
                        value={"Indonesia"}
                      />
                      <Label value={"Tanggal Lahir"} />
                      <Input
                        variant={"disabled"}
                        className={"mt-1 mb-4 disabled"}
                        value={"19 Mei 2004"}
                        isDisabled={true}
                      />
                      <Label value={"Nomor Telepon"} />
                      <Input
                        variant={"disabled"}
                        className={"mt-1 mb-4 disabled"}
                        value={"081234559876"}
                        isDisabled={true}
                      />
                    </Tabs.Item>
                    <Tabs.Item title="Alamat">
                      <Label value={"Alamat sesuai KTP"} />
                      <Input
                        variant={"disabled"}
                        className={"mt-1 mb-4 disabled"}
                        value={"Girang Sari"}
                        isDisabled={true}
                      />
                      <Label value={"Provinsi"} />
                      <Input
                        variant={"disabled"}
                        className={"mt-1 mb-4 disabled"}
                        value={"Jawa Barat"}
                        isDisabled={true}
                      />
                      <Label value={"Kabupaten/Kota"} />
                      <Input
                        variant={"disabled"}
                        className={"mt-1 mb-4 disabled"}
                        value={"Kota Bogor"}
                        isDisabled={true}
                      />
                      <Label value={"Kecamatan"} />
                      <Input
                        variant={"disabled"}
                        className={"mt-1 mb-4 disabled"}
                        value={"Ciawi"}
                        isDisabled={true}
                      />
                      <Label value={"Kelurahan"} />
                      <Input
                        variant={"disabled"}
                        className={"mt-1 mb-4 disabled"}
                        value={"Ciawi"}
                        isDisabled={true}
                      />
                      <Label value={"Kode Pos"} />
                      <Input
                        variant={"disabled"}
                        className={"mt-1 mb-4 disabled"}
                        value={"30466"}
                        isDisabled={true}
                      />
                    </Tabs.Item>
                    <Tabs.Item title="Identitas">
                      <Label value={"Nomor KTP"} />
                      <Input
                        variant={"disabled"}
                        className={"mt-1 mb-4 disabled"}
                        value={"123456789012345"}
                        isDisabled={true}
                      />
                      <Label value={"Foto KTP"} />
                      <div className="flex items-center justify-center w-full mt-1 mb-4">
                        <label
                          htmlFor="dropzone-file"
                          className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-50 rounded-2xl cursor-pointer bg-gray-50"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
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
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              SVG, PNG, JPG or GIF (MAX. 800x400px)
                            </p>
                          </div>
                          <input
                            id="dropzone-file"
                            type="file"
                            className="hidden"
                          />
                        </label>
                      </div>
                      <Label value={"Nomor NPWP"} />
                      <Input
                        variant={"disabled"}
                        className={"mt-1 mb-4 disabled"}
                        value={"123456789067890"}
                        isDisabled={true}
                      />
                      <Label value={"Foto NPWP"} />
                      <div className="flex items-center justify-center w-full mt-1 mb-4">
                        <label
                          htmlFor="dropzone-file"
                          className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-50 rounded-2xl cursor-pointer bg-gray-50"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
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
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              SVG, PNG, JPG or GIF (MAX. 800x400px)
                            </p>
                          </div>
                          <input
                            id="dropzone-file"
                            type="file"
                            className="hidden"
                          />
                        </label>
                      </div>
                      <Label value={"Foto Selfi dengan KTP"} />
                      <div className="flex items-center justify-center w-full mt-1 mb-4">
                        <label
                          htmlFor="dropzone-file"
                          className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-50 rounded-2xl cursor-pointer bg-gray-50"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
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
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              SVG, PNG, JPG or GIF (MAX. 800x400px)
                            </p>
                          </div>
                          <input
                            id="dropzone-file"
                            type="file"
                            className="hidden"
                          />
                        </label>
                      </div>
                    </Tabs.Item>
                    <Tabs.Item title="Pendukung">
                      <Label value={"Latar Belakang Pendidikan"} />
                      <Input
                        variant={"disabled"}
                        className={"mt-1 mb-4 disabled"}
                        value={"SMA"}
                        isDisabled={true}
                      />
                      <Label value={"Sumber Penghasilan"} />
                      <Input
                        variant={"disabled"}
                        className={"mt-1 mb-4 disabled"}
                        value={"Orang tua"}
                        isDisabled={true}
                      />
                      <Label value={"Jumlah Penghasilan"} />
                      <Input
                        variant={"disabled"}
                        className={"mt-1 mb-4 disabled"}
                        value={"271 T (Aminnnn..)"}
                        isDisabled={true}
                      />
                      <Label value={"Bidang Usaha"} />
                      <Input
                        variant={"disabled"}
                        className={"mt-1 mb-4 disabled"}
                        value={"Progamming"}
                        isDisabled={true}
                      />
                      <Label value={"Tujuang Investasi"} />
                      <Input
                        variant={"disabled"}
                        className={"mt-1 mb-4 disabled"}
                        value={"Iseng aja sih"}
                        isDisabled={true}
                      />
                      <Label value={"Nomor SID"} />
                      <Input
                        variant={"disabled"}
                        className={"mt-1 mb-4 disabled"}
                        value={"123456709"}
                        isDisabled={true}
                      />
                      <Label value={"Tanggal Pembuatan SID"} />
                      <Input
                        variant={"disabled"}
                        className={"mt-1 mb-4 disabled"}
                        value={"01 Agustus 2024"}
                        isDisabled={true}
                      />
                    </Tabs.Item>
                  </Tabs>
                </Modal.Body>
              </>
            </Modal>
            {/* END: Modal detail profil investor */}

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
