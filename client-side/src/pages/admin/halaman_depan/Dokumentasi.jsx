import { PiPlusCircle } from "react-icons/pi";
import Button from "../../../components/common/Button.jsx";
import Dropdown from "../../../components/common/Dropdown.jsx";
import InputSearch from "../../../components/common/InputSearch.jsx";
import AdminLayout from "../../../layouts/AdminLayout";
import {
  getDocumentation,
  addDocumentation,
  updateDocumentation,
  deleteDocumentation,
} from "../../../services/documentation.service.js";
import { useEffect, useState } from "react";
import DocumentationList from "../../../components/admin/DocumentationList.jsx";
import Modal from "../../../components/common/Modal.jsx";
import Label from "../../../components/common/Label.jsx";
import Input from "../../../components/common/Input.jsx";

const Dokumentasi = () => {
  const [documentations, setDocumentations] = useState([]);
  const [formData, setFormData] = useState({
    nama: "",
    image: null,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [selectedDocumentation, setSelectedDocumentation] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddDocumentation = () => {
    const form = new FormData();
    form.append("nama", formData.nama);
    form.append("image", formData.image);

    // add documentation api
    addDocumentation(form, (response) => {
      setDocumentations([...documentations, response]);
      closeModal();
      resetForm();
    });
  };

  const handleUpdateDocumentation = () => {
    const form = new FormData();
    form.append("nama", formData.nama);
    if (formData.image instanceof File) {
      form.append("image", formData.image);
    }

    // update documentation api
    updateDocumentation(selectedDocumentation.id, form, (updateData) => {
      setDocumentations((prevDocumentations) =>
        prevDocumentations.map((item) =>
          item.id === updateData.id ? updateData : item
        )
      );
      closeModal();
      resetForm();
    });
  };

  const handleDeleteDocumentation = () => {
    // delete documentation api
    deleteDocumentation(selectedDocumentation.id, () => {
      setDocumentations(
        documentations.filter(
          (documentation) => documentation.id !== selectedDocumentation.id
        )
      );
      closeModal();
    });
  };

  const resetForm = () => {
    setFormData({
      nama: "",
      image: null,
    });
    setPreviewImage("");
    setSelectedDocumentation(null);
  };

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
        setSelectedDocumentation(documentation)
    }
  };

  const closeModal = () => {
    setModalType("");
    setIsModalOpen(false);
    resetForm();
  };

  useEffect(() => {
    getDocumentation((data) => {
      setDocumentations(data);
    });
  }, []);

  return (
    <AdminLayout title={"Halaman Depan / Dokumentasi"}>
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
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>

                    <Label htmlFor={"nama"} value={"Nama"} />
                    <Input
                      type={"text"}
                      name={"nama"}
                      placeholder={"Masukkan nama gambar.."}
                      variant={"primary-outline"}
                      className={"mt-1 mb-4"}
                      value={formData.nama}
                      handleChange={handleInputChange}
                    />
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
            documentations={documentations}
            openModal={openModal}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dokumentasi;
