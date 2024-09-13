import { PiPlusCircle } from "react-icons/pi";
import Dropdown from "../../../components/common/Dropdown";
import InputSearch from "../../../components/common/InputSearch.jsx";
import AdminLayout from "../../../layouts/AdminLayout";
import FaqAdminList from "../../../components/admin/FaqList.jsx";
import {
  getFaqs,
  addFaq,
  updateFaq,
  deleteFaq,
} from "../../../services/faq.service.js";
import { useEffect, useState } from "react";
import Modal from "../../../components/common/Modal.jsx";
import Label from "../../../components/common/Label.jsx";
import Input from "../../../components/common/Input.jsx";
import Textarea from "../../../components/common/Textarea.jsx";

const FaqAdmin = () => {
  const [faqs, setFaqs] = useState([]);
  const [formData, setFormData] = useState({
    pertanyaan: "",
    jawaban: "",
    status: "",
  });
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddFaq = () => {
    const dataToSend = {
      pertanyaan: formData.pertanyaan,
      jawaban: formData.jawaban,
      status: "tidak-aktif",
    };

    addFaq(dataToSend, (newData) => {
      setFaqs([...faqs, newData]);
      closeModal();
      resetForm();
    });
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
      resetForm();
    });
  };

  const handleDeleteFaq = () => {
    deleteFaq(selectedFaq.id, () => {
      setFaqs(faqs.filter((faq) => faq.id !== selectedFaq.id));
      closeModal();
    });
  };

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
  };

  const resetForm = () => {
    setFormData({
      pertanyaan: "",
      jawaban: "",
    });
    setSelectedFaq(null);
  };

  // TODO: - Membuat status faq terupdate berdasarkan toggle button
  // status: 'aktif' & 'tidak-aktif'
  // isChecked-nya true, maka status aktif, sebaliknya..

  useEffect(() => {
    getFaqs((data) => {
      setFaqs(data);
    });
  }, []);

  return (
    <AdminLayout title={"Halaman Depan / Faq"}>
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
                      className={"mt-1 mb-4"}
                      value={formData.pertanyaan}
                      handleChange={handleInputChange}
                    />
                    <Label htmlFor={"jawaban"} value={"Jawaban"} />
                    <Textarea
                      name={"jawaban"}
                      placeholder={"Masukkan jawaban.."}
                      rows={3}
                      variant={"primary-outline"}
                      value={formData.jawaban}
                      handleChange={handleInputChange}
                    />
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
          <FaqAdminList faqs={faqs} openModal={openModal} />
        </div>
      </div>
    </AdminLayout>
  );
};

export default FaqAdmin;
