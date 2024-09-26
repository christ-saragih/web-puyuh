import Admin from "../../assets/images/admin.svg";
import Input from "../../components/common/Input";
import Label from "../../components/common/Label";
import Modal from "../../components/common/Modal";
import AdminLayout from "../../layouts/AdminLayout";
import { getAdmin, saveProfileAdmin } from "../../services/admin.service";
import { formatDate } from "../../utils/formatDate";
import { useEffect, useState } from "react";
import Select from "react-select";
import { PiNotePencil } from "react-icons/pi";

const AdminProfil = () => {
  const [admin, setAdmin] = useState([]);
  const [formAdmin, setFormAdmin] = useState({
    email: "",
    foto_profil: null,
    nama_lengkap: "",
    no_hp: "",
    jk: "",
    tempat_lahir: "",
    tanggal_lahir: "",
  });
  const [previewImage, setPreviewImage] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  useEffect(() => {
    getAdmin((data) => {
      setAdmin(data);

      if (data) {
        setFormAdmin({
          email: data.email || "",
          foto_profil: data.adminBiodata.foto_profil || "",
          nama_lengkap: data.adminBiodata.nama_lengkap || "",
          no_hp: data.adminBiodata.no_hp || "",
          jk: data.adminBiodata.jk || "",
          tempat_lahir: data.adminBiodata.tempat_lahir || "",
          tanggal_lahir: data.adminBiodata.tanggal_lahir || "",
        });
        // Set preview image dari data yang ada
        setPreviewImage(
          `http://localhost:3000/api/biodata-admin/images/${data.adminBiodata.foto_profil}`
        );
      }
    });
  }, []);

  // Update Admin Profile: Start
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormAdmin({
      ...formAdmin,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormAdmin({
        ...formAdmin,
        foto_profil: file,
      });
      setPreviewImage(URL.createObjectURL(file)); // Set preview image dari file yang dipilih
    }
  };

  const genderOptions = [
    { value: "pria", label: "Pria" },
    { value: "wanita", label: "Wanita" },
  ];

  const handleGenderChange = (selectedOption) => {
    setFormAdmin({
      ...formAdmin,
      jk: selectedOption.value,
    });
  };

  const handleSaveAdminProfile = () => {
    const dataToSend = new FormData();
    dataToSend.append("email", formAdmin.email);
    if (formAdmin.foto_profil) {
      dataToSend.append("foto_profil", formAdmin.foto_profil);
    }
    dataToSend.append("nama_lengkap", formAdmin.nama_lengkap);
    dataToSend.append("no_hp", formAdmin.no_hp);
    dataToSend.append("jk", formAdmin.jk);
    dataToSend.append("tempat_lahir", formAdmin.tempat_lahir);
    dataToSend.append("tanggal_lahir", formAdmin.tanggal_lahir);

    saveProfileAdmin(dataToSend, (newData) => {
      setAdmin({
        ...admin, // Salin data yang sudah ada
        email: newData.admin.email, // Update email dari respons
        adminBiodata: {
          // Buat objek adminBiodata secara manual
          foto_profil: newData.foto_profil,
          nama_lengkap: newData.nama_lengkap,
          no_hp: newData.no_hp,
          jk: newData.jk,
          tempat_lahir: newData.tempat_lahir,
          tanggal_lahir: newData.tanggal_lahir,
        },
      });

      setPreviewImage(
        `http://localhost:3000/api/biodata-admin/images/${newData.foto_profil}`
      );
    });
    closeModal();
  };
  // Update Admin Profile: End

  // Modal: Start
  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
    // Mengatur ulang form ke data terbaru dari state 'admin'
    setFormAdmin({
      email: admin.email || "",
      foto_profil: admin.adminBiodata?.foto_profil || "",
      nama_lengkap: admin.adminBiodata?.nama_lengkap || "",
      no_hp: admin.adminBiodata?.no_hp || "",
      jk: admin.adminBiodata?.jk || "",
      tempat_lahir: admin.adminBiodata?.tempat_lahir || "",
      tanggal_lahir: admin.adminBiodata?.tanggal_lahir || "",
    });
    setPreviewImage(
      `http://localhost:3000/api/biodata-admin/images/${admin.adminBiodata?.foto_profil}`
    );
  };

  const closeModal = () => {
    setModalType("");
    setIsModalOpen(false);
  };
  // Modal: End

  // Custom style react-select
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      // color: state.isSelected ? "white" : "black",
      color: state.isFocused ? "white" : "black",
      backgroundColor: state.isFocused ? "#B87817" : "white",
      "&:hover": {
        backgroundColor: "#B87817",
        color: "white",
      },
    }),
  };
  

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
                      alt={
                        admin.adminBiodata?.foto_profil
                          ? admin.adminBiodata.foto_profil
                          : "default admin"
                      }
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <h4 className="font-semibold text-2xl">{admin.username}</h4>
                    <p className="text-gray-600 text-lg">Admin</p>
                  </div>
                </div>
                <button
                  onClick={() => openModal("update_admin_profile")}
                  className="py-2 px-4 border border-gray-400 rounded-2xl flex items-center gap-[6px] hover:shadow-md duration-300 ease-in-out"
                >
                  <p className="font-medium">Ubah</p>
                  <PiNotePencil className="w-[18px] h-[18px]" />
                </button>

                <Modal open={isModalOpen} onClose={closeModal}>
                  {modalType === "update_admin_profile" && (
                    <>
                      <Modal.Header
                        title={"Ubah Profil"}
                        onClose={closeModal}
                      />
                      <Modal.Body>
                        <Label htmlFor={"gambar"} value={"Gambar"} />
                        <div className="flex flex-col items-center justify-center w-full py-4 mt-2 mb-4 h-full border-2 rounded-2xl bg-gray-50 shadow border-gray-300">
                          {previewImage && (
                            <img
                              src={previewImage}
                              alt="foto profil admin"
                              className="object-top w-40 h-40 mb-4 object-cover rounded-full border-2 border-gray-300"
                            />
                          )}

                          <label
                            htmlFor="gambar"
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
                              id="gambar"
                              name="gambar"
                              type="file"
                              className="hidden"
                              onChange={handleImageChange}
                            />
                          </label>
                        </div>
                        <Label
                          htmlFor={"nama_lengkap"}
                          value={"Nama Lengkap"}
                        />
                        <Input
                          type={"text"}
                          name={"nama_lengkap"}
                          placeholder={"Masukkan nama lengkap.."}
                          variant={"primary-outline"}
                          value={formAdmin.nama_lengkap}
                          handleChange={handleTextChange}
                        />
                        <Label htmlFor={"email"} value={"Email"} />
                        <Input
                          type={"email"}
                          name={"email"}
                          placeholder={"Masukkan email.."}
                          variant={"primary-outline"}
                          value={formAdmin.email}
                          handleChange={handleTextChange}
                        />
                        <Label htmlFor={"no_hp"} value={"Nomor Telepon"} />
                        <Input
                          type={"text"}
                          name={"no_hp"}
                          placeholder={"Masukkan nomor telepon.."}
                          variant={"primary-outline"}
                          value={formAdmin.no_hp}
                          handleChange={handleTextChange}
                        />
                        <Label htmlFor={"jk"} value={"Jenis Kelamin"} />
                        <Select
                          id="jk"
                          name="jk"
                          className="mt-2 mb-4"
                          options={genderOptions}
                          value={genderOptions.find(
                            (option) => option.value === formAdmin.jk
                          )} // Set default selected value
                          onChange={handleGenderChange}
                          styles={customStyles}
                        />
                        
                        <Label
                          htmlFor={"tempat_lahir"}
                          value={"Tempat Lahir"}
                        />
                        <Input
                          type={"text"}
                          name={"tempat_lahir"}
                          placeholder={"Masukkan tempat lahir.."}
                          variant={"primary-outline"}
                          value={formAdmin.tempat_lahir}
                          handleChange={handleTextChange}
                        />
                        <Label
                          htmlFor={"tanggal_lahir"}
                          value={"Tanggal Lahir"}
                        />
                        <Input
                          type={"date"}
                          name={"tanggal_lahir"}
                          placeholder={"Masukkan tanggal lahir.."}
                          variant={"primary-outline"}
                          value={formAdmin.tanggal_lahir}
                          handleChange={handleTextChange}
                        />
                      </Modal.Body>
                      <Modal.Footer
                        action={"Ubah"}
                        onAction={handleSaveAdminProfile}
                        onClose={closeModal}
                      />
                    </>
                  )}
                </Modal>
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
