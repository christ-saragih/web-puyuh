import Input from "../../components/common/Input.jsx";
import Label from "../../components/common/Label.jsx";
import Modal from "../../components/common/Modal.jsx";
import AdminLayout from "../../layouts/AdminLayout";
import BatchList from "../../components/admin/BatchList.jsx";
import {
  getBatchs,
  getDetailInvestasiBySlug,
  addInvestment,
  updateInvestment,
  deleteInvestment,
} from "../../services/batch.service.js";
import { formatDate } from "../../utils/formatDate.js";
import { formatRupiah } from "../../utils/formatRupiah.js";
import { calculateDaysRemaining } from "../../utils/calculateDaysRemaining.js";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  PiCalendarCheckDuotone,
  PiCalendarDotsDuotone,
  PiCalendarXDuotone,
  PiMoneyWavyDuotone,
  PiPercent,
  PiPlusCircle,
  PiTargetDuotone,
  PiUserBold,
  PiUsersThreeBold,
} from "react-icons/pi";
import { Dropdown, Tabs } from "flowbite-react";
import { FaPercent } from "react-icons/fa";
import InputError from "../../components/common/InputError.jsx";

const AdminInvestasi = () => {
  const [investments, setInvestments] = useState([]);
  const [formInvestment, setFormInvestment] = useState({
    judul: "",
    deskripsi: "",
    gambar: null,
    alamat: "",
    url_map: "",
    penerbit: "",
    penggunaan_dana: "",
    bagi_hasil: "",
    minimum_investasi: "",
    maksimum_investasi: "",
    total_pendanaan: "",
    target_pendanaan: "",
    tenor: "",
    pembayaran_bagi_hasil: "",
    tanggal_pembukaan_penawaran: "",
    tanggal_berakhir_penawaran: "",
    status: "",
    transaksi: [],
  });
  const [filteredInvestments, setFilteredInvestments] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);
  const [errors, setErrors] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  useEffect(() => {
    getBatchs((data) => {
      setInvestments(data);
      setFilteredInvestments(data);
    });
  }, []);

  console.log(investments);

  // Input Validations: Start
  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const formatDecimal = (number) => {
    return number.toString().replace(".", ",");
  };

  // Fungsi untuk memformat data sebelum ditampilkan di form
  const formatDataForDisplay = (data) => {
    return {
      ...data,
      target_pendanaan: data.target_pendanaan
        ? formatNumber(data.target_pendanaan)
        : "",
      minimum_investasi: data.minimum_investasi
        ? formatNumber(data.minimum_investasi)
        : "",
      maksimum_investasi: data.maksimum_investasi
        ? formatNumber(data.maksimum_investasi)
        : "",
      bagi_hasil: data.bagi_hasil ? formatDecimal(data.bagi_hasil) : "",
    };
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formInvestment.judul.trim()) {
      newErrors.judul = "Judul investasi wajib diisi";
    }
    if (!formInvestment.gambar && modalType === "add_investment") {
      newErrors.gambar = "Gambar wajib diisi";
    }
    if (
      !formInvestment.deskripsi.trim() ||
      formInvestment.deskripsi.replace(/<[^>]*>/g, "").trim() === ""
    ) {
      newErrors.deskripsi = "Deskripsi wajib diisi";
    }
    if (!formInvestment.penerbit.trim()) {
      newErrors.penerbit = "Penerbit wajib diisi";
    }
    if (!formInvestment.penggunaan_dana.trim()) {
      newErrors.penggunaan_dana = "Penggunaan dana wajib diisi";
    }
    if (!formInvestment.tanggal_pembukaan_penawaran.trim()) {
      newErrors.tanggal_pembukaan_penawaran =
        "Tanggal pembukaan penawaran wajib diisi";
    }
    if (!formInvestment.tanggal_berakhir_penawaran.trim()) {
      newErrors.tanggal_berakhir_penawaran =
        "Tanggal berakhir penawaran wajib diisi";
    }
    if (!formInvestment.target_pendanaan.trim()) {
      newErrors.target_pendanaan = "Target pendanaan wajib diisi";
    }
    if (!formInvestment.tenor.trim()) {
      newErrors.tenor = "Tenor wajib diisi";
    }
    if (!formInvestment.pembayaran_bagi_hasil.trim()) {
      newErrors.pembayaran_bagi_hasil = "Pembayaran bagi hasil wajib diisi";
    }
    if (!formInvestment.bagi_hasil.trim()) {
      newErrors.bagi_hasil = "Bagi hasil wajib diisi";
    }
    if (!formInvestment.minimum_investasi.trim()) {
      newErrors.minimum_investasi = "Minimum investasi wajib diisi";
    }
    if (!formInvestment.maksimum_investasi.trim()) {
      newErrors.maksimum_investasi = "Maksimum investasi wajib diisi";
    }
    if (!formInvestment.alamat.trim()) {
      newErrors.alamat = "Alamat wajib diisi";
    }
    if (!formInvestment.url_map.trim()) {
      newErrors.url_map = "URL map wajib diisi";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getErrorMessage = (fieldName) => {
    const fieldNames = {
      judul: "Judul investasi",
      penerbit: "Penerbit",
      penggunaan_dana: "Penggunaan dana",
      tanggal_pembukaan_penawaran: "Tanggal pembukaan penawaran",
      tanggal_berakhir_penawaran: "Tanggal berakhir penawaran",
      target_pendanaan: "Target pendanaan",
      tenor: "Tenor",
      pembayaran_bagi_hasil: "Pembayaran bagi hasil",
      bagi_hasil: "Bagi hasil",
      minimum_investasi: "Minimum investasi",
      maksimum_investasi: "Maksimum investasi",
      alamat: "Alamat",
      url_map: "URL map",
    };

    return `${fieldNames[fieldName] || fieldName} wajib diisi`;
  };

  const clearError = (fieldName) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[fieldName];
      return newErrors;
    });
  };
  // Input Validations: End

  // CRUD: Start
  const handleInvestmentImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const validTypes = [
        "image/svg+xml",
        "image/png",
        "image/jpeg",
        "image/jpg",
      ];
      if (validTypes.includes(file.type)) {
        setFormInvestment({ ...formInvestment, gambar: file });
        setPreviewImage(URL.createObjectURL(file));
        clearError("gambar");
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          gambar: "File harus berupa SVG, PNG, JPG, atau JPEG",
        }));
        // Clear the file input
        e.target.value = null;
      }
    }
  };

  const handleInvestmentDescriptionChange = (value) => {
    setFormInvestment({
      ...formInvestment,
      deskripsi: value,
    });

    if (!value.trim() || value.replace(/<[^>]*>/g, "").trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        deskripsi: "Deskripsi wajib diisi",
      }));
    } else {
      clearError("deskripsi");
    }
  };

  const handleInvestmentTextChange = (e) => {
    const { name, value } = e.target;

    let formattedValue = value;
    let isValid = true;

    if (
      ["target_pendanaan", "minimum_investasi", "maksimum_investasi"].includes(
        name
      )
    ) {
      // Remove existing dots and non-numeric characters
      const numericValue = value.replace(/\./g, "").replace(/\D/g, "");

      // Check if the input is valid (contains only digits after removing dots)
      isValid = numericValue === value.replace(/\./g, "");

      // Format the number with dots as thousand separators
      formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    } else if (name === "bagi_hasil") {
      // Allow only numbers and one comma
      formattedValue = value.replace(/[^\d,]/g, "");
      const parts = formattedValue.split(",");
      if (parts[1] && parts[1].length > 2) {
        parts[1] = parts[1].slice(0, 2);
        formattedValue = parts.join(",");
      }
    }

    setFormInvestment({
      ...formInvestment,
      [name]: formattedValue,
    });

    if (!value.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: getErrorMessage(name),
      }));
    } else if (!isValid) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `${
          name.charAt(0).toUpperCase() + name.slice(1).replace(/_/g, " ")
        } harus berupa angka`,
      }));
    } else if (
      name === "bagi_hasil" &&
      !/^\d{1,2}(,\d{1,2})?$/.test(formattedValue)
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Format bagi hasil tidak valid. Gunakan format: XX,XX",
      }));
    } else {
      clearError(name);
    }
  };

  const prepareFormData = () => {
    const preparedData = { ...formInvestment };
    ["target_pendanaan", "minimum_investasi", "maksimum_investasi"].forEach(
      (field) => {
        if (preparedData[field]) {
          preparedData[field] = parseInt(
            preparedData[field].replace(/\./g, ""),
            10
          );
        }
      }
    );
    if (preparedData.bagi_hasil) {
      preparedData.bagi_hasil = parseFloat(
        preparedData.bagi_hasil.replace(",", ".")
      );
    }
    return preparedData;
  };

  const handleAddInvestment = () => {
    setIsDescriptionFocused(false);

    if (validateForm()) {
      const preparedData = prepareFormData();
      const form = new FormData();
      for (const key in preparedData) {
        if (key === "gambar" && preparedData[key] instanceof File) {
          form.append(key, preparedData[key]);
        } else {
          form.append(key, preparedData[key]);
        }
      }

      addInvestment(form, (response) => {
        setInvestments([response, ...investments]);
        closeModal();
        resetForm();
      });
    }
  };

  const handleUpdateInvestment = () => {
    if (validateForm()) {
      const preparedData = prepareFormData();
      const form = new FormData();
      for (const key in preparedData) {
        if (key === "gambar" && preparedData[key] instanceof File) {
          form.append(key, preparedData[key]);
        } else {
          form.append(key, preparedData[key]);
        }
      }

      updateInvestment(selectedInvestment.id, form, (updateData) => {
        setInvestments((prevInvestment) =>
          prevInvestment.map((item) =>
            item.id === updateData.id ? updateData : item
          )
        );

        closeModal();
        resetForm();
      });
    }
  };

  const handleDeleteInvestment = () => {
    deleteInvestment(selectedInvestment.id, () => {
      setInvestments(
        investments.filter(
          (investment) => investment.id !== selectedInvestment.id
        )
      );
      closeModal();
    });
  };
  // CRUD: End

  // Search Investment: Start
  // Ambil parameter pencarian dan status dari URL
  const searchQuery = searchParams.get("search") || "";
  const statusQuery = searchParams.get("status") || "Semua Status";

  useEffect(() => {
    let filtered = investments;

    // Filter berdasarkan status
    if (statusQuery && statusQuery !== "Semua Status") {
      filtered = filtered.filter(
        (investment) =>
          investment.status.toLowerCase() === statusQuery.toLowerCase()
      );
    }

    // Filter berdasarkan judul investasi
    if (searchQuery) {
      filtered = filtered.filter((investment) =>
        investment.judul.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredInvestments(filtered);
  }, [searchQuery, statusQuery, investments]);

  // Fungsi untuk mengubah parameter pencarian di URL
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      if (value) {
        newParams.set("search", value);
      } else {
        newParams.delete("search");
      }
      return newParams;
    });
  };

  // Fungsi untuk mengubah kategori status di URL
  const handleStatusChange = (status) => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      if (status !== "Semua Status") {
        newParams.set("status", status);
      } else {
        newParams.delete("status");
      }
      return newParams;
    });
  };
  // Search Investment: End

  // Modal: Start
  const openModal = (type, investment = null) => {
    setModalType(type);
    setIsModalOpen(true);

    if (type === "detail_investment" && investment) {
      setSelectedInvestment(investment);
      getDetailInvestasiBySlug(investment.slug, (investment) => {
        setFormInvestment(investment);
      });
    }

    if (type === "update_investment" && investment) {
      setSelectedInvestment(investment);
      setFormInvestment(formatDataForDisplay(investment));
      setPreviewImage(
        `http://localhost:3000/api/investasi/image/${investment.gambar}`
      );
    }

    if (type === "delete_investment" && investment) {
      setSelectedInvestment(investment);
    }
  };

  const closeModal = () => {
    setModalType("");
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setFormInvestment({
      judul: "",
      deskripsi: "",
      gambar: null,
      alamat: "",
      url_map: "",
      penerbit: "",
      penggunaan_dana: "",
      bagi_hasil: "",
      minimum_investasi: "",
      maksimum_investasi: "",
      target_pendanaan: "",
      tenor: "",
      pembayaran_bagi_hasil: "",
      tanggal_pembukaan_penawaran: "",
      tanggal_berakhir_penawaran: "",
      transaksi: [],
    });
    setPreviewImage("");
    setSelectedInvestment(null);
  };
  // Modal: End

  return (
    <AdminLayout title={"Halaman Managemen Investasi"}>
      <div className="flex flex-col">
        <div className="bg-[#F5F5F7] w-full rounded-2xl shadow-md py-4 px-6">
          <div className="flex mb-6 justify-between">
            <div className="max-w-lg grow ">
              <div className="flex flex-col items-center rounded-2xl gap-y-3 sm:shadow sm:flex-row">
                <div className="flex-shrink-0 w-full sm:w-fit ">
                  <Dropdown label={statusQuery} dismissOnClick={false}>
                    <Dropdown.Item
                      onClick={() => handleStatusChange("Semua Status")}
                    >
                      Semua Status
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleStatusChange("Segera")}>
                      Segera
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleStatusChange("Proses")}>
                      Proses
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => handleStatusChange("Selesai")}
                    >
                      Selesai
                    </Dropdown.Item>
                  </Dropdown>
                </div>

                <div className="relative w-full">
                  <div className="absolute inset-y-0 start-1 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>

                  <input
                    type="text"
                    className="block p-2.5 w-full z-20 ps-11 text-gray-900 bg-gray-50 rounded-2xl sm:rounded-s-none sm:border-s-gray-50 sm:border-s-2 border border-gray-300 focus:ring-[#B87817] focus:border-[#B87817] focus:outline-none shadow sm:shadow-none"
                    placeholder="Masukkan judul investasi ..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e)}
                    required
                  />
                </div>
              </div>
            </div>

            <button
              className="flex items-center py-2 px-6 bg-green-800 text-white font-medium rounded-2xl"
              onClick={() => openModal("add_investment")}
            >
              <PiPlusCircle className="w-6 h-6 me-1" />
              <p>Tambah</p>
            </button>

            <Modal
              open={isModalOpen}
              onClose={closeModal}
              size={modalType === "delete_investment" ? "sm" : ""}
            >
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
                    <Label htmlFor={"judul"} value={"Judul Investasi"} />
                    <Input
                      type={"text"}
                      name={"judul"}
                      placeholder={"Masukkan judul investasi.."}
                      variant={"primary-outline"}
                      value={formInvestment.judul}
                      handleChange={handleInvestmentTextChange}
                      isError={!!errors.judul}
                    />
                    <InputError message={errors.judul} />

                    <Label htmlFor={"gambar"} value={"Gambar"} />
                    <div className="mb-4">
                      <div
                        className={`flex flex-col items-center justify-center w-full py-4 mt-2 h-full border-2 rounded-2xl bg-gray-50 shadow ${
                          errors.gambar ? "border-red-500" : "border-gray-300"
                        }`}
                      >
                        {previewImage && (
                          <img
                            src={previewImage}
                            alt="Preview"
                            className="object-top w-56 h-52 mb-4 object-cover rounded-xl border-2 border-gray-300"
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
                              SVG, PNG, JPG atau JPEG
                            </p>
                          </div>
                          <input
                            id="gambar"
                            name="gambar"
                            type="file"
                            className="hidden"
                            onChange={handleInvestmentImageChange}
                            accept=".svg,.png,.jpg,.jpeg"
                          />
                        </label>
                      </div>
                      <InputError message={errors.gambar} />
                    </div>

                    <Label htmlFor={"deskripsi"} value={"Deskripsi"} />

                    <div
                      onFocus={() => setIsDescriptionFocused(true)}
                      onBlur={() => setIsDescriptionFocused(false)}
                      className={`react-quill-container ${
                        isDescriptionFocused ? "focus" : ""
                      } ${
                        errors.deskripsi ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <ReactQuill
                        theme="snow"
                        value={formInvestment.deskripsi}
                        onChange={handleInvestmentDescriptionChange}
                      />
                    </div>
                    <InputError message={errors.deskripsi} />

                    {/* Profil Bisnis */}
                    <div className="grid grid-cols-2 gap-x-4 ">
                      <div>
                        <Label htmlFor={"penerbit"} value={"Penerbit"} />
                        <Input
                          type={"text"}
                          name={"penerbit"}
                          placeholder={"Masukkan penerbit.."}
                          variant={"primary-outline"}
                          value={formInvestment.penerbit}
                          handleChange={handleInvestmentTextChange}
                          isError={!!errors.penerbit}
                        />
                        <InputError message={errors.penerbit} />
                      </div>
                      <div>
                        <Label
                          htmlFor={"penggunaan_dana"}
                          value={"Penggunaan Dana"}
                        />
                        <Input
                          type={"text"}
                          name={"penggunaan_dana"}
                          placeholder={"Masukkan penggunaan dana.."}
                          variant={"primary-outline"}
                          value={formInvestment.penggunaan_dana}
                          handleChange={handleInvestmentTextChange}
                          isError={!!errors.penggunaan_dana}
                        />
                        <InputError message={errors.penggunaan_dana} />
                      </div>
                      <div>
                        <Label
                          htmlFor={"tanggal_pembukaan_penawaran"}
                          value={"Tanggal Pembukaan"}
                        />
                        <Input
                          type={"date"}
                          name={"tanggal_pembukaan_penawaran"}
                          variant={"primary-outline"}
                          value={formInvestment.tanggal_pembukaan_penawaran}
                          handleChange={handleInvestmentTextChange}
                          isError={!!errors.tanggal_pembukaan_penawaran}
                        />
                        <InputError
                          message={errors.tanggal_pembukaan_penawaran}
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor={"tanggal_berakhir_penawaran"}
                          value={"Tanggal Berakhir"}
                        />
                        <Input
                          type={"date"}
                          name={"tanggal_berakhir_penawaran"}
                          variant={"primary-outline"}
                          value={formInvestment.tanggal_berakhir_penawaran}
                          handleChange={handleInvestmentTextChange}
                          isError={!!errors.tanggal_berakhir_penawaran}
                        />
                        <InputError
                          message={errors.tanggal_berakhir_penawaran}
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor={"target_pendanaan"}
                          value={"Target Pendanaan"}
                        />
                        <div className="flex">
                          <span className="inline-flex items-center px-3 text-sm text-gray-900 font-medium bg-gray-200 border-2 rounded-e-0 border-gray-300 border-e-0 rounded-s-2xl shadow">
                            Rp
                          </span>
                          <Input
                            type={"text"}
                            name={"target_pendanaan"}
                            placeholder={"Masukkan target pendanaan.."}
                            variant={"primary-outline"}
                            value={formInvestment.target_pendanaan}
                            handleChange={handleInvestmentTextChange}
                            isError={!!errors.target_pendanaan}
                            className={"rounded-s-none border-s-[1px]"}
                          />
                        </div>

                        <InputError message={errors.target_pendanaan} />
                      </div>
                      <div>
                        <Label htmlFor={"tenor"} value={"Tenor"} />
                        <Input
                          type={"text"}
                          name={"tenor"}
                          placeholder={"Masukkan tenor.."}
                          variant={"primary-outline"}
                          value={formInvestment.tenor}
                          handleChange={handleInvestmentTextChange}
                          isError={!!errors.tenor}
                        />
                        <InputError message={errors.tenor} />
                      </div>
                      <div>
                        <Label
                          htmlFor={"pembayaran_bagi_hasil"}
                          value={"Pembayaran Bagi Hasil"}
                        />
                        <Input
                          type={"text"}
                          name={"pembayaran_bagi_hasil"}
                          placeholder={"Masukkan pembayaran bagi hasil.."}
                          variant={"primary-outline"}
                          value={formInvestment.pembayaran_bagi_hasil}
                          handleChange={handleInvestmentTextChange}
                          isError={!!errors.pembayaran_bagi_hasil}
                        />
                        <InputError message={errors.pembayaran_bagi_hasil} />
                      </div>
                      <div>
                        <Label htmlFor={"bagi_hasil"} value={"Bagi Hasil"} />
                        <div className="">
                          <div className="relative">
                            <Input
                              type={"text"}
                              name={"bagi_hasil"}
                              placeholder={"Masukkan bagi hasil.."}
                              variant={"primary-outline"}
                              value={formInvestment.bagi_hasil}
                              handleChange={handleInvestmentTextChange}
                              isError={!!errors.bagi_hasil}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                              <FaPercent className="text-gray-400 w-3 h-3" />
                            </div>
                          </div>
                          <InputError message={errors.bagi_hasil} />
                        </div>
                      </div>
                      <div>
                        <Label
                          htmlFor={"minimum_investasi"}
                          value={"Minimum Investasi"}
                        />
                        <div className="flex">
                          <span className="inline-flex items-center px-3 text-sm text-gray-900 font-medium bg-gray-200 border-2 rounded-e-0 border-gray-300 border-e-0 rounded-s-2xl shadow">
                            Rp
                          </span>
                          <Input
                            type={"text"}
                            name={"minimum_investasi"}
                            placeholder={"Masukkan minimum investasi.."}
                            variant={"primary-outline"}
                            value={formInvestment.minimum_investasi}
                            handleChange={handleInvestmentTextChange}
                            isError={!!errors.minimum_investasi}
                            className={"rounded-s-none border-s-[1px]"}
                          />
                        </div>
                        <InputError message={errors.minimum_investasi} />
                      </div>
                      <div>
                        <Label
                          htmlFor={"maksimum_investasi"}
                          value={"Maksimum Investasi"}
                        />
                        <div className="flex">
                          <span className="inline-flex items-center px-3 text-sm text-gray-900 font-medium bg-gray-200 border-2 rounded-e-0 border-gray-300 border-e-0 rounded-s-2xl shadow">
                            Rp
                          </span>
                          <Input
                            type={"text"}
                            name={"maksimum_investasi"}
                            placeholder={"Masukkan maksimum investasi.."}
                            variant={"primary-outline"}
                            value={formInvestment.maksimum_investasi}
                            handleChange={handleInvestmentTextChange}
                            isError={!!errors.maksimum_investasi}
                            className={"rounded-s-none border-s-[1px]"}
                          />
                        </div>
                        <InputError message={errors.maksimum_investasi} />
                      </div>
                    </div>

                    <Label htmlFor={"alamat"} value={"Alamat"} />
                    <Input
                      type={"text"}
                      name={"alamat"}
                      placeholder={"Masukkan alamat.."}
                      variant={"primary-outline"}
                      value={formInvestment.alamat}
                      handleChange={handleInvestmentTextChange}
                      isError={!!errors.alamat}
                    />
                    <InputError message={errors.alamat} />

                    <Label htmlFor={"url_map"} value={"URL Map"} />
                    <Input
                      type={"text"}
                      name={"url_map"}
                      placeholder={"Masukkan URL map.."}
                      variant={"primary-outline"}
                      value={formInvestment.url_map}
                      handleChange={handleInvestmentTextChange}
                      isError={!!errors.url_map}
                    />
                    <InputError message={errors.url_map} />
                  </Modal.Body>
                  <Modal.Footer
                    action={modalType === "add_investment" ? "Tambah" : "Ubah"}
                    onAction={
                      modalType === "add_investment"
                        ? handleAddInvestment
                        : handleUpdateInvestment
                    }
                    onClose={closeModal}
                  />
                </>
              )}

              {modalType === "delete_investment" && (
                <>
                  <Modal.Header title="Hapus Investasi" onClose={closeModal} />
                  <Modal.Body>
                    <p>Apakah Anda yakin ingin menghapus investasi ini?</p>
                  </Modal.Body>
                  <Modal.Footer
                    action="Hapus"
                    onAction={handleDeleteInvestment}
                    onClose={closeModal}
                  />
                </>
              )}

              {modalType === "detail_investment" && (
                <>
                  <Modal.Header title="Detail Investasi" onClose={closeModal} />
                  <Modal.Body>
                    <div className="max-w-3xl mx-auto">
                      <div className="h-96 mb-4 rounded-xl overflow-hidden">
                        <img
                          src={`http://localhost:3000/api/investasi/image/${formInvestment.gambar}`}
                          alt="gambar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex items-center justify-between mb-10">
                        <div>
                          <h2 className="font-bold text-3xl mb-1">
                            {formInvestment.judul}
                          </h2>
                          <p className="font-medium text-lg">
                            {formInvestment.penerbit}
                          </p>
                        </div>
                        {formInvestment.status === "segera" ? (
                          <div className="bg-[#5766CE] font-semibold text-white text-lg text-center py-1 w-32 rounded-3xl">
                            Segera
                          </div>
                        ) : formInvestment.status === "selesai" ? (
                          <div className="bg-[#138A36] font-semibold text-white text-lg text-center py-1 w-32 rounded-3xl">
                            Selesai
                          </div>
                        ) : (
                          <div className="bg-[#FFA90B] font-semibold text-white text-lg text-center py-1 w-32 rounded-3xl">
                            {calculateDaysRemaining(
                              formInvestment.tanggal_pembukaan_penawaran,
                              formInvestment.tanggal_berakhir_penawaran
                            )}{" "}
                            hari lagi
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between mb-2">
                        <div>
                          {formInvestment.status === "selesai" ? (
                            <p className="font-semibold text-2xl text-[#138A36]">
                              {formatRupiah(formInvestment.total_pendanaan)}
                            </p>
                          ) : (
                            <p className="font-semibold text-2xl text-[#FFA90B]">
                              {formatRupiah(formInvestment.total_pendanaan)}
                            </p>
                          )}
                          <p>{`dari target dana ${formatRupiah(
                            formInvestment.target_pendanaan
                          )}`}</p>
                        </div>
                        {/* total investor */}
                        <div className="bg-gray-200 text-slate-900 font-semibold text-lg text-center py-1 w-32 rounded-3xl">
                          {formInvestment.transaksi.length} investor
                        </div>
                      </div>

                      <div className="w-full bg-gray-200 rounded-full mb-12">
                        <div
                          className="font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                          style={{
                            width: `${Math.round(
                              (formInvestment.total_pendanaan /
                                formInvestment.target_pendanaan) *
                                100
                            )}%`,
                            backgroundColor: `${
                              formInvestment.status === "selesai"
                                ? "#138A36"
                                : "#FFA90B"
                            }`,
                          }}
                        >
                          {" "}
                          {Math.round(
                            (formInvestment.total_pendanaan /
                              formInvestment.target_pendanaan) *
                              100
                          )}
                          %
                        </div>
                      </div>

                      <Tabs aria-label="Pills" variant="pills">
                        <Tabs.Item active title="Tentang Bisnis">
                          <div>
                            <div className="format min-w-full">
                              <p
                                className="text-black"
                                dangerouslySetInnerHTML={{
                                  __html: formInvestment.deskripsi,
                                }}
                              ></p>
                            </div>
                            <h3 className="text-2xl mb-4 font-semibold">
                              Penggunaan Dana
                            </h3>{" "}
                            {formInvestment.penggunaan_dana}
                          </div>
                        </Tabs.Item>
                        <Tabs.Item title="Profil Bisnis">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-16 p-1">
                                <PiCalendarCheckDuotone className="w-full h-full" />
                              </div>
                              <div>
                                <p className="text-lg font-medium">
                                  Tanggal Dibuka
                                </p>
                                <p>
                                  {formatDate(
                                    formInvestment.tanggal_pembukaan_penawaran
                                  )}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-16 p-1">
                                <PiCalendarXDuotone className="w-full h-full" />
                              </div>
                              <div>
                                <p className="text-lg font-medium">
                                  Tanggal Ditutup
                                </p>
                                <p>
                                  {formatDate(
                                    formInvestment.tanggal_berakhir_penawaran
                                  )}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-16 p-1">
                                <PiTargetDuotone className="w-full h-full" />
                              </div>
                              <div>
                                <p className="text-lg font-medium">
                                  Target Pendanaan
                                </p>
                                <p>
                                  {formatRupiah(
                                    formInvestment.target_pendanaan
                                  )}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-16 p-1">
                                <PiPercent className="w-full h-full" />
                              </div>
                              <div>
                                <p className="text-lg font-medium">
                                  Bagi Hasil
                                </p>
                                <p>{formInvestment.bagi_hasil}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-16 p-1">
                                <PiCalendarDotsDuotone className="w-full h-full" />
                              </div>
                              <div>
                                <p className="text-lg font-medium">Tenor</p>
                                <p>{formInvestment.tenor}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-16 p-1">
                                <PiCalendarCheckDuotone className="w-full h-full" />
                              </div>
                              <div>
                                <p className="text-lg font-medium">
                                  Pembayaran Bagi Hasil
                                </p>
                                <p>{formInvestment.pembayaran_bagi_hasil}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-16 p-2">
                                <PiMoneyWavyDuotone className="w-full h-full" />
                              </div>
                              <div>
                                <p className="text-lg font-medium">
                                  Minimum Investasi
                                </p>
                                <p>
                                  {formatRupiah(
                                    formInvestment.minimum_investasi
                                  )}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-16 p-2">
                                <PiMoneyWavyDuotone className="w-full h-full" />
                              </div>
                              <div>
                                <p className="text-lg font-medium">
                                  Maksimum Investasi
                                </p>
                                <p>
                                  {formatRupiah(
                                    formInvestment.maksimum_investasi
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                        </Tabs.Item>
                        <Tabs.Item title="Lokasi">
                          <div className="mt-2">
                            <div
                              className="w-full h-[400px] mb-3"
                              dangerouslySetInnerHTML={{
                                __html: formInvestment.url_map,
                              }}
                            />
                            <p>{formInvestment.alamat}</p>
                          </div>
                        </Tabs.Item>
                        <Tabs.Item title="Investor">
                          {/* total investor */}
                          <h3 className="text-2xl font-semibold mb-4">
                            Investor ({formInvestment.transaksi.length})
                          </h3>

                          <div className="flex flex-col gap-4">
                            {formInvestment.transaksi.map((investor) => (
                              <div
                                key={investor.investorId}
                                className="flex gap-3 items-center"
                              >
                                <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden p-2">
                                  {investor.foto_profil ? (
                                    <img
                                      src={investor.foto_profil}
                                      alt={investor.nama_lengkap}
                                      className="w-full h-full"
                                    />
                                  ) : investor.kategori_investor ===
                                    "organisasi" ? (
                                    <PiUsersThreeBold className="w-full h-full" />
                                  ) : (
                                    <PiUserBold className="w-full h-full" />
                                  )}
                                </div>

                                <div className="grow">
                                  <p className="text-lg font-medium">
                                    {investor.nama_lengkap}
                                  </p>
                                  <p>{investor.kategori_investor}</p>
                                </div>
                                <div className="bg-gray-200 text-slate-900 font-semibold text-lg text-center py-1 min-w-36 max-w-fit rounded-3xl">
                                  {formatRupiah(investor.total_investasi)}
                                </div>
                              </div>
                            ))}
                          </div>
                        </Tabs.Item>
                      </Tabs>
                    </div>
                  </Modal.Body>
                  <Modal.Footer buttonLabel={"Kembali"} onClose={closeModal} />
                </>
              )}
            </Modal>
          </div>

          {/* List */}
          <BatchList investments={filteredInvestments} openModal={openModal} />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminInvestasi;
