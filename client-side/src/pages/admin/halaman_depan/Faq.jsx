import Label from "../../../components/common/Label.jsx";
import Input from "../../../components/common/Input.jsx";
import InputError from "../../../components/common/InputError.jsx";
import Modal from "../../../components/common/Modal.jsx";
import Textarea from "../../../components/common/Textarea.jsx";
import FaqAdminList from "../../../components/admin/FaqList.jsx";
import AdminLayout from "../../../layouts/AdminLayout";
import { showToast } from "../../../utils/toast.js";
import {
  getFaqs,
  addFaq,
  updateFaq,
  deleteFaq,
} from "../../../services/faq.service.js";
import { useEffect, useState } from "react";
import { PiPlusCircle } from "react-icons/pi";
import { useSearchParams } from "react-router-dom";

const FaqAdmin = () => {
  const [faqs, setFaqs] = useState([]);
  const [formData, setFormData] = useState({
    pertanyaan: "",
    jawaban: "",
    status: "",
  });
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [filteredFaqs, setFilteredFaqs] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [errors, setErrors] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  useEffect(() => {
    getFaqs((data) => {
      setFaqs(data);
    });
  }, []);

  // Input Validations: Start
  const validateForm = () => {
    let newErrors = {};
    if (!formData.pertanyaan.trim()) {
      newErrors.pertanyaan = "Pertanyaan wajib di isi";
    }
    if (!formData.jawaban.trim()) {
      newErrors.jawaban = "Jawaban wajib di isi";
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
        [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} wajib diisi`,
      }));
    } else {
      clearError(name);
    }
  };

  const handleAddFaq = () => {
    if (validateForm()) {
      const dataToSend = {
        pertanyaan: formData.pertanyaan,
        jawaban: formData.jawaban,
        status: "tidak-aktif",
      };

      addFaq(dataToSend, (newData) => {
        setFaqs([...faqs, newData]);
        closeModal();
        showToast("FAQ berhasil ditambahkan");
      });
    }
  };

  const handleUpdateFaq = () => {
    const dataToSend = {
      pertanyaan: formData.pertanyaan,
      jawaban: formData.jawaban,
    };

    updateFaq(selectedFaq.id, dataToSend, (updateData) => {
      setFaqs((prevFaqs) =>
        prevFaqs.map((item) => (item.id === updateData.id ? updateData : item))
      );
      closeModal();
      showToast("Dokumen berhasil diubah");
    });
  };

  const handleDeleteFaq = () => {
    deleteFaq(selectedFaq.id, () => {
      setFaqs(faqs.filter((faq) => faq.id !== selectedFaq.id));
      closeModal();
      showToast("Dokumen berhasil dihapus");
    });
  };

  // Fungsi untuk mengubah status FAQ
  const handleToggleStatus = (faqId, newStatus) => {
    // Kirim request ke backend untuk update status FAQ
    updateFaq(faqId, { status: newStatus }, (updatedFaq) => {
      // Perbarui state dengan status baru
      setFaqs((prevFaqs) =>
        prevFaqs.map((faq) =>
          faq.id === updatedFaq.id ? { ...faq, status: updatedFaq.status } : faq
        )
      );
    });
  };
  // CRUD: End

  // Search: Start
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    if (searchQuery) {
      const filtered = faqs.filter((faq) =>
        faq.pertanyaan.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredFaqs(filtered);
    } else {
      setFilteredFaqs(faqs);
    }
  }, [searchQuery, faqs]);

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
  const openModal = (type, faq = null) => {
    setModalType(type);
    setIsModalOpen(true);
    if (type === "update_faq" && faq) {
      setSelectedFaq(faq);
      setFormData({
        pertanyaan: faq.pertanyaan,
        jawaban: faq.jawaban,
      });
    } else if (type === "delete_faq" && faq) {
      setSelectedFaq(faq);
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
      pertanyaan: "",
      jawaban: "",
    });
    setSelectedFaq(null);
  };
  // Modal: End

  return (
    <AdminLayout title={"Halaman Depan / Faq"}>
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
                    placeholder="Masukkan pertanyaan FAQ ..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e)}
                    required
                  />
                </div>
              </div>
            </div>

            <button
              className="flex items-center py-2 px-6 bg-green-800 text-white font-medium rounded-2xl"
              onClick={() => openModal("add_faq")}
            >
              <PiPlusCircle className="w-6 h-6 me-1" />
              <p>Tambah</p>
            </button>

            {/* MODAL */}
            <Modal
              open={isModalOpen}
              onClose={closeModal}
              size={modalType === "delete_faq" ? "sm" : ""}
            >
              {(modalType === "add_faq" || modalType === "update_faq") && (
                <>
                  <Modal.Header
                    title={modalType === "add_faq" ? "Tambah Faq" : "Ubah Faq"}
                    onClose={closeModal}
                  />
                  <Modal.Body>
                    <Label htmlFor={"pertanyaan"} value={"Pertanyaan"} />
                    <Input
                      type={"text"}
                      name={"pertanyaan"}
                      placeholder={"Masukkan pertanyaan.."}
                      variant={"primary-outline"}
                      value={formData.pertanyaan}
                      handleChange={handleInputChange}
                      isError={!!errors.pertanyaan}
                    />
                    <InputError message={errors.pertanyaan} />

                    <Label htmlFor={"jawaban"} value={"Jawaban"} />
                    <Textarea
                      name={"jawaban"}
                      placeholder={"Masukkan jawaban.."}
                      rows={3}
                      variant={"primary-outline"}
                      value={formData.jawaban}
                      handleChange={handleInputChange}
                      isError={!!errors.jawaban}
                    />
                    <InputError message={errors.jawaban} />
                  </Modal.Body>
                  <Modal.Footer
                    action={modalType === "add_faq" ? "Tambah" : "Ubah"}
                    onAction={
                      modalType === "add_faq" ? handleAddFaq : handleUpdateFaq
                    }
                    onClose={closeModal}
                  ></Modal.Footer>
                </>
              )}

              {modalType === "delete_faq" && (
                <>
                  <Modal.Header title="Hapus FAQ" onClose={closeModal} />
                  <Modal.Body>
                    <p>Apakah Anda yakin ingin menghapus FAQ ini?</p>
                  </Modal.Body>
                  <Modal.Footer
                    action="Hapus"
                    onAction={handleDeleteFaq}
                    onClose={closeModal}
                  />
                </>
              )}
            </Modal>
          </div>

          {/* DocumentList */}
          <FaqAdminList
            faqs={filteredFaqs}
            openModal={openModal}
            handleToggleStatus={handleToggleStatus}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default FaqAdmin;
