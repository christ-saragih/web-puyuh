import Label from "../../../components/common/Label.jsx";
import Input from "../../../components/common/Input.jsx";
import FileInput from "../../../components/common/FileInput.jsx";
import Modal from "../../../components/common/Modal.jsx";
import DocumentList from "../../../components/admin/DocumentList.jsx";
import AdminLayout from "../../../layouts/AdminLayout";
import { showToast } from "../../../utils/toast.js";
import {
  getDocument,
  addDocument,
  updateDocument,
  deleteDocument,
} from "../../../services/document.service.js";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PiPlusCircle } from "react-icons/pi";
import InputError from "../../../components/common/InputError.jsx";


const Dokumen = () => {
  const [documents, setDocuments] = useState([]);
  const [formData, setFormData] = useState({
    nama: "",
    file: null,
    status: "tidak-aktif",
  });
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [selectedFile, setSelectedFile] = useState("Silahkan pilih file..");
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [errors, setErrors] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  useEffect(() => {
    getDocument((data) => {
      setDocuments(data);
    });
  }, []);

  // Input Validations: Start
  const validateForm = () => {
    let newErrors = {};
    if (!formData.nama.trim()) {
      newErrors.nama = "Nama dokumen wajib diisi";
    }
    if (!formData.file) {
      newErrors.file = "File dokumen wajib dinggah";
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
  // Input Validations: End

  // CRUD: Start
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (!value.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `${
          name.charAt(0).toUpperCase() + name.slice(1)
        } dokumen wajib diisi`,
      }));
    } else {
      clearError(name);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const maxSizeInBytes = 10 * 1024 * 1024;

    if (file) {
      if (file.type === "application/pdf") {
        if (file.size <= maxSizeInBytes) {
          setFormData({ ...formData, file: file });
          setSelectedFile(file.name);
          clearError("file");
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            file: "Ukuran file tidak boleh melebihi 10MB",
          }));
          e.target.value = null;
        }
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          file: "File dokumen harus berupa PDF",
        }));
        e.target.value = null;
      }
    }
  };

  const handleAddDocument = () => {
    if (validateForm()) {
      const form = new FormData();
      form.append("nama", formData.nama);
      form.append("file", formData.file);
      form.append("status", "tidak-aktif");

      addDocument(form, (response) => {
        setDocuments([...documents, response]);
        closeModal();
        showToast("Dokumen berhasil ditambahkan");
      });
    }
  };

  const handleUpdateDocument = () => {
    if (validateForm()) {
      const form = new FormData();
      form.append("nama", formData.nama);
      if (formData.file instanceof File) {
        form.append("file", formData.file);
      }

      updateDocument(selectedDocument.id, form, (updateData) => {
        setDocuments((prevDocuments) =>
          prevDocuments.map((item) =>
            item.id === updateData.id ? updateData : item
          )
        );
        closeModal();
        showToast("Dokumen berhasil diubah");
      });
    }
  };

  const handleDeleteDocument = () => {
    deleteDocument(selectedDocument.id, () => {
      setDocuments(
        documents.filter((document) => document.id !== selectedDocument.id)
      );
      closeModal();
      showToast("Dokumen berhasil dihapus");
    });
  };

  const handleToggleStatus = (documentId, newStatus) => {
    updateDocument(documentId, { status: newStatus }, (updateDocument) => {
      setDocuments((prevDocuments) =>
        prevDocuments.map((document) =>
          document.id === updateDocument.id
            ? { ...document, status: updateDocument.status }
            : document
        )
      );
    });
  };
  // CRUD: End

  // Search: Start
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    if (searchQuery) {
      const filtered = documents.filter((document) =>
        document.nama.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredDocuments(filtered);
    } else {
      setFilteredDocuments(documents);
    }
  }, [searchQuery, documents]);

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
  const openModal = (type, document = null) => {
    setModalType(type);
    setIsModalOpen(true);
    if (type === "update_document" && document) {
      setSelectedDocument(document);
      setFormData({
        nama: document.nama,
        file: document.file,
      });

      setSelectedFile(document.file);
    } else if (type === "delete_document" && document) {
      setSelectedDocument(document);
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
      file: null,
    });
    setSelectedFile("Silahkan pilih file..");
    setSelectedDocument(null);
  };
  // Modal: End

  return (
    <AdminLayout title={"Halaman Depan / Dokumen"}>
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
                    placeholder="Masukkan nama dokumen ..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e)}
                    required
                  />
                </div>
              </div>
            </div>

            <button
              className="flex items-center py-2 px-6 bg-green-800 text-white font-medium rounded-2xl"
              onClick={() => openModal("add_document")}
            >
              <PiPlusCircle className="w-6 h-6 me-1" />
              <p>Tambah</p>
            </button>

            {/* MODAL */}
            <Modal
              open={isModalOpen}
              onClose={closeModal}
              size={modalType === "delete_document" ? "sm" : ""}
            >
              {(modalType === "add_document" ||
                modalType === "update_document") && (
                <>
                  <Modal.Header
                    title={
                      modalType === "add_document"
                        ? "Tambah Dokumen"
                        : "Ubah Dokumen"
                    }
                    onClose={closeModal}
                  />
                  <Modal.Body>
                    <Label htmlFor={"nama"} value={"Nama"} />
                    <Input
                      type={"text"}
                      name={"nama"}
                      placeholder={"Masukkan nama file.."}
                      variant={"primary-outline"}
                      value={formData.nama}
                      handleChange={handleInputChange}
                      isError={!!errors.nama}
                    />
                    <InputError message={errors.nama} />

                    <Label htmlFor={"file"} value={"File"} />
                    <FileInput
                      inputId={"file"}
                      selectedFile={selectedFile}
                      handleChange={handleFileChange}
                      isError={!!errors.file}
                    />
                    <InputError message={errors.file} />
                  </Modal.Body>
                  <Modal.Footer
                    action={modalType === "add_document" ? "Tambah" : "Ubah"}
                    onAction={
                      modalType === "add_document"
                        ? handleAddDocument
                        : handleUpdateDocument
                    }
                    onClose={closeModal}
                  />
                </>
              )}

              {modalType === "delete_document" && (
                <>
                  <Modal.Header title="Hapus Dokumen" onClose={closeModal} />
                  <Modal.Body>
                    <p>Apakah Anda yakin ingin menghapus dokumen ini?</p>
                  </Modal.Body>
                  <Modal.Footer
                    action="Hapus"
                    onAction={handleDeleteDocument}
                    onClose={closeModal}
                  />
                </>
              )}
            </Modal>
          </div>

          <DocumentList
            documents={filteredDocuments}
            openModal={openModal}
            handleToggleStatus={handleToggleStatus}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dokumen;
