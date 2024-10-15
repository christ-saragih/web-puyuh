import Label from "../../../components/common/Label.jsx";
import Input from "../../../components/common/Input.jsx";
import InputError from "../../../components/common/InputError.jsx";
import Modal from "../../../components/common/Modal";
import SocialMediaList from "../../../components/admin/SocialMediaList.jsx";
import AdminLayout from "../../../layouts/AdminLayout";
import { showToast } from "../../../utils/toast.js";
import {
  getSocialMedia,
  addSocialMedia,
  updateSocialMedia,
  deleteSocialMedia,
} from "../../../services/social-media.service.js";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PiPlusCircle } from "react-icons/pi";

const MediaSosial = () => {
  const [socialMedias, setSocialMedias] = useState([]);
  const [formData, setFormData] = useState({
    nama: "",
    icon: null,
    url: "",
  });
  const [selectedSocialMedia, setSelectedSocialMedia] = useState(null);
  const [previewIcon, setPreviewIcon] = useState("");
  const [filteredSocialMedias, setFilteredSocialMedias] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [errors, setErrors] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  useEffect(() => {
    getSocialMedia((data) => {
      setSocialMedias(data);
    });
  }, []);

  // Input Validation: Start
  const validateForm = () => {
    let newErrors = {};
    if (!formData.icon && modalType === "add_sosial_media") {
      newErrors.icon = "Ikon media sosial wajib diunggah";
    }
    if (!formData.nama.trim()) {
      newErrors.nama = "Nama media sosial wajib diisi";
    }
    if (!formData.url.trim()) {
      newErrors.url = "URL media sosial wajib diisi";
    } else if (!isValidUrl(formData.url)) {
      newErrors.url =
        "URL tidak valid. Harap masukkan URL yang benar (contoh: https://www.example.com)";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const clearError = (fieldName) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[fieldName];
      return newErrors;
    });
  };
  // Input Validation: End

  // CRUD: Start
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validasi input setiap kali ada perubahan
    if (!value.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `${
          name.charAt(0).toUpperCase() + name.slice(1)
        } media sosial wajib diisi`,
      }));
    } else if (name === "url" && !isValidUrl(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]:
          "URL tidak valid. Harap masukkan URL yang benar (contoh: https://www.example.com)",
      }));
    } else {
      clearError(name);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const validTypes = [
        "image/svg+xml",
        "image/png",
        "image/jpeg",
        "image/jpg",
      ];
      if (validTypes.includes(file.type)) {
        setFormData({ ...formData, icon: file });
        setPreviewIcon(URL.createObjectURL(file));
        clearError("icon");
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          icon: "Ikon harus berupa SVG, PNG, JPG, atau JPEG",
        }));
        // Clear the file input
        e.target.value = null;
      }
    }
  };

  const handleAddSocialMedia = () => {
    if (validateForm()) {
      const form = new FormData();
      form.append("nama", formData.nama);
      form.append("icon", formData.icon);
      form.append("url", formData.url);

      addSocialMedia(form, (response) => {
        setSocialMedias([...socialMedias, response]);
        closeModal();
        showToast("Media sosial berhasil ditambahkan");
      });
    }
  };

  const handleUpdateSocialMedia = () => {
    if (validateForm()) {
      const form = new FormData();
      form.append("nama", formData.nama);
      if (formData.icon instanceof File) {
        form.append("icon", formData.icon);
      }
      form.append("url", formData.url);

      updateSocialMedia(selectedSocialMedia.id, form, (updatedData) => {
        setSocialMedias((prevSocialMedias) =>
          prevSocialMedias.map((item) =>
            item.id === updatedData.id ? updatedData : item
          )
        );
        closeModal();
        showToast("Media sosial berhasil diubah");
      });
    }
  };

  const handleDeleteSocialMedia = () => {
    deleteSocialMedia(selectedSocialMedia.id, () => {
      setSocialMedias(
        socialMedias.filter(
          (socialMedia) => socialMedia.id !== selectedSocialMedia.id
        )
      );
      closeModal();
      showToast("Media sosial berhasil dihapus");
    });
  };
  // CRUD: End

  // Search: Start
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    if (searchQuery) {
      const filtered = socialMedias.filter((socialMedia) =>
        socialMedia.nama.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSocialMedias(filtered);
    } else {
      setFilteredSocialMedias(socialMedias);
    }
  }, [searchQuery, socialMedias]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    if (value) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };
  // Search: End

  // Modal: Start
  const openModal = (type, socialMedia = null) => {
    setModalType(type);
    setIsModalOpen(true);
    if (type === "update_social_media" && socialMedia) {
      setSelectedSocialMedia(socialMedia);
      setFormData({
        nama: socialMedia.nama,
        icon: socialMedia.icon,
        url: socialMedia.url,
      });
      setPreviewIcon(
        `http://localhost:3000/api/sosial-media/image/${socialMedia.icon}`
      );
    } else if (type === "delete_social_media" && socialMedia) {
      setSelectedSocialMedia(socialMedia);
    }
  };

  const closeModal = () => {
    setModalType("");
    setIsModalOpen(false);
    resetForm();
    setErrors({});
  };

  const resetForm = () => {
    setFormData({
      nama: "",
      icon: null,
      url: "",
    });
    setPreviewIcon("");
    setSelectedSocialMedia(null);
  };
  // Modal: End

  return (
    <AdminLayout title={"Halaman Depan / Media Sosial"}>
      <div className="flex flex-col">
        <div className="bg-[#F5F5F7] w-full rounded-2xl shadow-md py-4 px-6">
          <div className="flex mb-6 justify-between">
            <div className="max-w-md grow">
              <div className="flex rounded-2xl shadow">
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
                    className="block p-2.5 w-full z-20 ps-11 text-gray-900 bg-gray-50 rounded-2xl  border border-gray-300 focus:ring-[#B87817] focus:border-[#B87817] focus:outline-none"
                    placeholder="Masukkan nama media sosial ..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e)}
                    required
                  />
                </div>
              </div>
            </div>

            <button
              className="flex items-center py-2 px-6 bg-green-800 text-white font-medium rounded-2xl"
              onClick={() => openModal("add_sosial_media")}
            >
              <PiPlusCircle className="w-6 h-6 me-1" />
              <p>Tambah</p>
            </button>

            <Modal
              open={isModalOpen}
              onClose={closeModal}
              size={modalType === "delete_social_media" ? "sm" : ""}
            >
              {(modalType === "add_sosial_media" ||
                modalType === "update_social_media") && (
                <>
                  <Modal.Header
                    title={
                      modalType === "add_sosial_media"
                        ? "Tambah Media Sosial"
                        : "Ubah Media Sosial"
                    }
                    onClose={closeModal}
                  />
                  <Modal.Body>
                    <Label htmlFor={"icon"} value={"Ikon"} />
                    <div>
                      <div
                        className={`flex flex-col items-center justify-center w-full py-4 h-full border-2 rounded-2xl bg-gray-50 shadow ${
                          errors.icon ? "border-red-500" : "border-gray-300"
                        }`}
                      >
                        {previewIcon && (
                          <img
                            src={previewIcon}
                            alt="Preview"
                            className="w-28 h-28 mb-4 object-cover rounded-full border-2 border-gray-300"
                          />
                        )}

                        <label
                          htmlFor="icon"
                          className={`flex flex-col items-center justify-center w-full cursor-pointer ${
                            !previewIcon && "h-32"
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
                                  Unggah ikon di sini
                                </span>
                              </p>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              SVG, PNG, JPG atau JPEG
                            </p>
                          </div>
                          <input
                            id="icon"
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                            accept=".svg,.png,.jpg,.jpeg"
                          />
                        </label>
                      </div>
                      <InputError message={errors.icon} />
                    </div>

                    <Label htmlFor={"media_sosial"} value={"Media Sosial"} />
                    <Input
                      type={"text"}
                      name={"nama"}
                      placeholder={"Masukkan nama media sosial.."}
                      variant={"primary-outline"}
                      value={formData.nama}
                      handleChange={handleInputChange}
                      isError={!!errors.nama}
                    />
                    <InputError message={errors.nama} />

                    <Label htmlFor={"url"} value={"URL"} />
                    <Input
                      type={"text"}
                      name={"url"}
                      placeholder={"Masukkan URL sosial media.."}
                      variant={"primary-outline"}
                      value={formData.url}
                      handleChange={handleInputChange}
                      isError={!!errors.url}
                    />
                    <InputError message={errors.url} />
                  </Modal.Body>
                  <Modal.Footer
                    action={
                      modalType === "add_sosial_media" ? "Tambah" : "Ubah"
                    }
                    onAction={
                      modalType === "add_sosial_media"
                        ? handleAddSocialMedia
                        : handleUpdateSocialMedia
                    }
                    onClose={closeModal}
                  />
                </>
              )}

              {modalType === "delete_social_media" && (
                <>
                  <Modal.Header
                    title="Hapus Media Sosial"
                    onClose={closeModal}
                  />
                  <Modal.Body>
                    <p>Apakah Anda yakin ingin menghapus media sosial ini?</p>
                  </Modal.Body>
                  <Modal.Footer
                    action="Hapus"
                    onAction={handleDeleteSocialMedia}
                    onClose={closeModal}
                  />
                </>
              )}
            </Modal>
          </div>

          <SocialMediaList
            socialMedias={filteredSocialMedias}
            openModal={openModal}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default MediaSosial;
