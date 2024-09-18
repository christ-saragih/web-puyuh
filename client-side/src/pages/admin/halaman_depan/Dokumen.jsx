import Label from "../../../components/common/Label.jsx";
import Input from "../../../components/common/Input.jsx";
import InputSearch from "../../../components/common/InputSearch.jsx";
import FileInput from "../../../components/common/FileInput.jsx";
import Modal from "../../../components/common/Modal.jsx";
import Dropdown from "../../../components/common/Dropdown.jsx";
import AdminLayout from "../../../layouts/AdminLayout";
import DocumentList from "../../../components/admin/DocumentList.jsx";
import {
  getDocument,
  addDocument,
  updateDocument,
  deleteDocument,
} from "../../../services/document.service.js";
import { useEffect, useState } from "react";
import { PiPlusCircle } from "react-icons/pi";

const Dokumen = () => {
  const [documents, setDocuments] = useState([]);
  const [formData, setFormData] = useState({
    nama: "",
    file: null,
    status: "tidak-aktif",
  });
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [selectedFile, setSelectedFile] = useState("Silahkan pilih file..");

  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  useEffect(() => {
    getDocument((data) => {
      setDocuments(data);
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, file: file });
    setSelectedFile(e.target.files[0].name);
  };

  const handleAddDocument = () => {
    const form = new FormData();
    form.append("nama", formData.nama);
    form.append("file", formData.file);
    form.append("status", "tidak-aktif");

    addDocument(form, (response) => {
      setDocuments([...documents, response]);
      closeModal();
      resetForm();
    });
  };

  const handleUpdateDocument = () => {
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
      resetForm();
    });
  };

  const handleDeleteDocument = () => {
    deleteDocument(selectedDocument.id, () => {
      setDocuments(
        documents.filter((document) => document.id !== selectedDocument.id)
      );
      closeModal();
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
  };

  const resetForm = () => {
    setFormData({
      nama: "",
      file: null,
    });
    setSelectedFile("Silahkan pilih file..");
    setSelectedDocument(null);
  };

  return (
    <AdminLayout title={"Halaman Depan / Dokumen"}>
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
                      className={"mt-1 mb-4"}
                      value={formData.nama}
                      handleChange={handleInputChange}
                    />

                    <Label htmlFor={"file"} value={"File"} />
                    <FileInput
                      inputId={"file"}
                      selectedFile={selectedFile}
                      handleChange={handleFileChange}
                    />
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

          {/* DocumentList */}
          <DocumentList documents={documents} openModal={openModal} handleToggleStatus={handleToggleStatus}/>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dokumen;
