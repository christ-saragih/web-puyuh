import Label from "../../../components/common/Label.jsx";
import Input from "../../../components/common/Input.jsx";
import InputError from "../../../components/common/InputError.jsx";
import Modal from "../../../components/common/Modal.jsx";
import DocumentationList from "../../../components/admin/DocumentationList.jsx";
import AdminLayout from "../../../layouts/AdminLayout";
import { showToast } from "../../../utils/toast.js";
import {
  getDocumentation,
  addDocumentation,
  updateDocumentation,
  deleteDocumentation,
} from "../../../services/documentation.service.js";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PiPlusCircle } from "react-icons/pi";

const Dokumentasi = () => {
  const [documentations, setDocumentations] = useState([]);
  const [formData, setFormData] = useState({
    nama: "",
    image: null,
  });
  const [selectedDocumentation, setSelectedDocumentation] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [filteredDocumentations, setFilteredDocumentations] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [errors, setErrors] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  useEffect(() => {
    getDocumentation((data) => {
      setDocumentations(data);
      setFilteredDocumentations(data);
    });
  }, []);

  // Input Validation: Start
  const validateForm = () => {
    let newErrors = {};
    if (!formData.image && modalType === "add_documentation") {
      newErrors.image = "Gambar dokumentasi wajib diunggah";
    }
    if (!formData.nama.trim()) {
      newErrors.nama = "Nama dokumentasi wajib diisi";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
        setFormData({ ...formData, image: file });
        setPreviewImage(URL.createObjectURL(file));
        clearError("image");
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          image: "Gambar dokumentasi harus berupa SVG, PNG, JPG, atau JPEG",
        }));

        e.target.value = null;
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (!value.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `${
          name.charAt(0).toUpperCase() + name.slice(1)
        } dokumentasi wajib diisi`,
      }));
    } else {
      clearError(name);
    }
  };

  const handleAddDocumentation = () => {
    if (validateForm()) {
      const form = new FormData();
      form.append("nama", formData.nama);
      form.append("image", formData.image);

      addDocumentation(form, (response) => {
        setDocumentations([...documentations, response]);
        closeModal();
        showToast("Dokumentasi berhasil ditambahkan");
      });
    }
  };

  const handleUpdateDocumentation = () => {
    if (validateForm()) {
      const form = new FormData();
      form.append("nama", formData.nama);
      if (formData.image instanceof File) {
        form.append("image", formData.image);
      }

      updateDocumentation(selectedDocumentation.id, form, (updateData) => {
        setDocumentations((prevDocumentations) =>
          prevDocumentations.map((item) =>
            item.id === updateData.id ? updateData : item
          )
        );
        closeModal();
        showToast("Dokumentasi berhasil diubah");
      });
    }
  };

  const handleDeleteDocumentation = () => {
    deleteDocumentation(selectedDocumentation.id, () => {
      setDocumentations(
        documentations.filter(
          (documentation) => documentation.id !== selectedDocumentation.id
        )
      );
      closeModal();
      showToast("Dokumentasi berhasil dihapus");
    });
  };
  // CRUD: End

  // Search: Start
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    if (searchQuery) {
      const filtered = documentations.filter((documentation) =>
        documentation.nama.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredDocumentations(filtered);
    } else {
      setFilteredDocumentations(documentations);
    }
  }, [searchQuery, documentations]);

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
  const openModal = (type, documentation = null) => {
    setModalType(type);
    setIsModalOpen(true);
    if (type === "update_documentation" && documentation) {
      setSelectedDocumentation(documentation);
      setFormData({
        nama: documentation.nama,
        image: documentation.image,
      });
      setPreviewImage(
        `http://localhost:3000/api/dokumentasi-frontpage/image/${documentation.image}`
      );
    } else if (type === "delete_documentation" && documentation) {
      setSelectedDocumentation(documentation);
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
      image: null,
    });
    setPreviewImage("");
    setSelectedDocumentation(null);
  };
  // Modal: End

  return (
    <AdminLayout title={"Halaman Depan / Dokumentasi"}>
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
                    placeholder="Masukkan nama dokumentasi ..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e)}
                    required
                  />
                </div>
              </div>
            </div>

            <button
              className="flex items-center py-2 px-6 bg-green-800 text-white font-medium rounded-2xl"
              onClick={() => openModal("add_documentation")}
            >
              <PiPlusCircle className="w-6 h-6 me-1" />
              <p>Tambah</p>
            </button>

            {/* MODAL */}
            <Modal
              open={isModalOpen}
              onClose={closeModal}
              size={modalType === "delete_documentation" ? "sm" : ""}
            >
              {(modalType === "add_documentation" ||
                modalType === "update_documentation") && (
                <>
                  <Modal.Header
                    title={
                      modalType === "add_documentation"
                        ? "Tambah Dokumentasi"
                        : "Ubah Dokumentasi"
                    }
                    onClose={closeModal}
                  />
                  <Modal.Body>
                    <Label htmlFor={"image"} value={"Gambar"} />
                    <div className="mb-4">
                      <div
                        className={`flex flex-col items-center justify-center w-full py-4 h-full border-2 rounded-2xl bg-gray-50 shadow ${
                          errors.image ? "border-red-500" : "border-gray-300"
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
                              SVG, PNG, JPG atau JPEG
                            </p>
                          </div>
                          <input
                            id="image"
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                            accept=".svg,.png,.jpg,.jpeg"
                          />
                        </label>
                      </div>
                      <InputError message={errors.image} />
                    </div>

                    <Label htmlFor={"nama"} value={"Nama"} />
                    <Input
                      type={"text"}
                      name={"nama"}
                      placeholder={"Masukkan nama gambar.."}
                      variant={"primary-outline"}
                      value={formData.nama}
                      handleChange={handleInputChange}
                      isError={!!errors.nama}
                    />
                    <InputError message={errors.nama} />
                  </Modal.Body>
                  <Modal.Footer
                    action={
                      modalType === "add_documentation" ? "Tambah" : "Ubah"
                    }
                    onAction={
                      modalType === "add_documentation"
                        ? handleAddDocumentation
                        : handleUpdateDocumentation
                    }
                    onClose={closeModal}
                  />
                </>
              )}

              {modalType === "delete_documentation" && (
                <>
                  <Modal.Header
                    title="Hapus Dokumentasi"
                    onClose={closeModal}
                  />
                  <Modal.Body>
                    <p>Apakah Anda yakin ingin menghapus dokumentasi ini?</p>
                  </Modal.Body>
                  <Modal.Footer
                    action="Hapus"
                    onAction={handleDeleteDocumentation}
                    onClose={closeModal}
                  />
                </>
              )}
            </Modal>
          </div>

          <DocumentationList
            documentations={filteredDocumentations}
            openModal={openModal}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dokumentasi;
