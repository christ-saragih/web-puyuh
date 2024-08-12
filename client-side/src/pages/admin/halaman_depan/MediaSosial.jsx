import { PiPlusCircle } from "react-icons/pi";
import { useEffect, useState } from "react";
import Input from "../../../components/common/Input.jsx";
import Label from "../../../components/common/Label.jsx";
import Modal from "../../../components/common/Modal";
import AdminLayout from "../../../layouts/AdminLayout.jsx";
import SocialMediaList from "../../../components/admin/SocialMediaList.jsx";
import {
  getSocialMedia,
  addSocialMedia,
  updateSocialMedia,
  deleteSocialMedia,
} from "../../../services/social-media.service.js";
import Dropdown from "../../../components/common/Dropdown.jsx";
import InputSearch from "../../../components/common/InputSearch.jsx";

const MediaSosial = () => {
  const [socialMedias, setSocialMedias] = useState([]);
  const [formData, setFormData] = useState({
    nama: "",
    icon: null,
    url: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [previewIcon, setPreviewIcon] = useState("");
  const [selectedSocialMedia, setSelectedSocialMedia] = useState(null);

  useEffect(() => {
    getSocialMedia((data) => {
      setSocialMedias(data);
    });
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, icon: file });
    setPreviewIcon(URL.createObjectURL(file));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddSocialMedia = () => {
    const form = new FormData();
    form.append("nama", formData.nama);
    form.append("icon", formData.icon);
    form.append("url", formData.url);

    addSocialMedia(form, (response) => {
      setSocialMedias([...socialMedias, response]);
      closeModal();
      resetForm();
    });
  };

  const handleUpdateSocialMedia = () => {
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
      resetForm();
    });
  };

  const handleDeleteSocialMedia = () => {
    deleteSocialMedia(selectedSocialMedia.id, () => {
      setSocialMedias(
        socialMedias.filter(
          (socialMedia) => socialMedia.id !== selectedSocialMedia.id
        )
      );
      closeModal();
    });
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
  };

  return (
    <AdminLayout title={"Halaman Depan / Media Sosial"}>
      <div className="flex flex-col">
        <div className="bg-[#F5F5F7] w-full rounded-2xl shadow-md py-4 px-6">
          <div className="flex gap-5 mb-6">
            <Dropdown
              options={[1, 2, 3, 4]}
              label="Tampilkan"
              // onOptionSelect={handleOptionSelect}
            />

            {/* FITUR SEARCHING */}
            <InputSearch
            // handleChange={(e) => setSearch(e.target.value)}
            />

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
              className={"w-[35rem]"}
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
                    <Label htmlFor={"icon"} value={"Icon"} />
                    <div className="flex flex-col items-center justify-center w-full py-4 mt-2 mb-4 h-full border-2 rounded-2xl bg-gray-50 shadow border-gray-300">
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
                                Unggah gambar di sini
                              </span>
                            </p>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </div>
                        <input
                          id="icon"
                          type="file"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>

                    <Label htmlFor={"media_sosial"} value={"Media Sosial"} />
                    <Input
                      type={"text"}
                      name={"nama"}
                      placeholder={"Masukkan nama media sosial.."}
                      variant={"primary-outline"}
                      className={"mt-1 mb-4"}
                      value={formData.nama}
                      handleChange={handleInputChange}
                    />
                    <Label htmlFor={"link"} value={"Link"} />
                    <Input
                      type={"text"}
                      name={"url"}
                      placeholder={"Masukkan URL link.."}
                      variant={"primary-outline"}
                      className={"mt-1 mb-4"}
                      value={formData.url}
                      handleChange={handleInputChange}
                    />
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

          {/* TODO: 
              1. Mempelajari alur dari create dan update data
              2. Membuat fitur hapus data
          */}

          <SocialMediaList socialMedias={socialMedias} openModal={openModal} />
        </div>
      </div>
    </AdminLayout>
  );
};

export default MediaSosial;
