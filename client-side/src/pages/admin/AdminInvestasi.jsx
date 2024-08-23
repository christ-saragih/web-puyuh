import Input from "../../components/common/Input.jsx";
import InputSearch from "../../components/common/InputSearch.jsx";
import Label from "../../components/common/Label.jsx";
import Modal from "../../components/common/Modal.jsx";
import AdminLayout from "../../layouts/AdminLayout.jsx";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { PiPlusCircle } from "react-icons/pi";
import {
  getBatchs,
  addInvestment,
  updateInvestment,
  deleteInvestment,
} from "../../services/batch.service.js";
import BatchList from "../../components/admin/BatchList.jsx";

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
    target_pendanaan: "",
    tenor: "",
    pembayaran_bagi_hasil: "",
    tanggal_pembukaan_penawaran: "",
    tanggal_berakhir_penawaran: "",
  });

  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    getBatchs((data) => {
      setInvestments(data);
    });
  }, []);

  const handleInvestmentImageChange = (e) => {
    const file = e.target.files[0];
    setFormInvestment({ ...formInvestment, gambar: file });
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleInvestmentDescriptionChange = (value) => {
    setFormInvestment({
      ...formInvestment,
      deskripsi: value,
    });
  };

  const handleInvestmentTextChange = (e) => {
    const { name, value } = e.target;
    setFormInvestment({
      ...formInvestment,
      [name]: value,
    });
  };

  const handleAddInvestment = () => {
    const form = new FormData();
    form.append("judul", formInvestment.judul);
    form.append("gambar", formInvestment.gambar);
    form.append("deskripsi", formInvestment.deskripsi);
    form.append("penerbit", formInvestment.penerbit);
    form.append("penggunaan_dana", formInvestment.penggunaan_dana);
    form.append(
      "tanggal_pembukaan_penawaran",
      formInvestment.tanggal_pembukaan_penawaran
    );
    form.append(
      "tanggal_berakhir_penawaran",
      formInvestment.tanggal_berakhir_penawaran
    );
    form.append("target_pendanaan", formInvestment.target_pendanaan);
    form.append("tenor", formInvestment.tenor);
    form.append("pembayaran_bagi_hasil", formInvestment.pembayaran_bagi_hasil);
    form.append("bagi_hasil", formInvestment.bagi_hasil);
    form.append("minimum_investasi", formInvestment.minimum_investasi);
    form.append("maksimum_investasi", formInvestment.maksimum_investasi);
    form.append("alamat", formInvestment.alamat);
    form.append("url_map", formInvestment.url_map);

    addInvestment(form, (response) => {
      setInvestments([response, ...investments]);
      closeModal();
      resetForm();
    });
  };

  const handleUpdateInvestment = () => {
    const form = new FormData();
    form.append("judul", formInvestment.judul);
    if (formInvestment.gambar instanceof File) {
      form.append("gambar", formInvestment.gambar);
    }
    form.append("deskripsi", formInvestment.deskripsi);
    form.append("penerbit", formInvestment.penerbit);
    form.append("penggunaan_dana", formInvestment.penggunaan_dana);
    form.append(
      "tanggal_pembukaan_penawaran",
      formInvestment.tanggal_pembukaan_penawaran
    );
    form.append(
      "tanggal_berakhir_penawaran",
      formInvestment.tanggal_berakhir_penawaran
    );
    form.append("target_pendanaan", formInvestment.target_pendanaan);
    form.append("tenor", formInvestment.tenor);
    form.append("pembayaran_bagi_hasil", formInvestment.pembayaran_bagi_hasil);
    form.append("bagi_hasil", formInvestment.bagi_hasil);
    form.append("minimum_investasi", formInvestment.minimum_investasi);
    form.append("maksimum_investasi", formInvestment.maksimum_investasi);
    form.append("alamat", formInvestment.alamat);
    form.append("url_map", formInvestment.url_map);

    updateInvestment(selectedInvestment.id, form, (updateData) => {
      setInvestments((prevInvestment) =>
        prevInvestment.map((item) =>
          item.id === updateData.id ? updateData : item
        )
      );
      closeModal();
      resetForm();
    });
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  // fungsi modal
  const openModal = (type, investment = null) => {
    setModalType(type);
    setIsModalOpen(true);

    if (type === "update_investment" && investment) {
      setSelectedInvestment(investment);
      setFormInvestment({
        judul: investment.judul,
        deskripsi: investment.deskripsi,
        gambar: investment.gambar,
        alamat: investment.alamat,
        url_map: investment.url_map,
        penerbit: investment.penerbit,
        penggunaan_dana: investment.penggunaan_dana,
        bagi_hasil: investment.bagi_hasil,
        minimum_investasi: investment.minimum_investasi,
        maksimum_investasi: investment.maksimum_investasi,
        target_pendanaan: investment.target_pendanaan,
        tenor: investment.tenor,
        pembayaran_bagi_hasil: investment.pembayaran_bagi_hasil,
        tanggal_pembukaan_penawaran: investment.tanggal_pembukaan_penawaran,
        tanggal_berakhir_penawaran: investment.tanggal_berakhir_penawaran,
      });
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
    });
    setPreviewImage("");
    setSelectedInvestment(null);
  };

  return (
    <AdminLayout title={"Halaman Managemen Investasi"}>
      <div className="flex flex-col">
        <div className="bg-[#F5F5F7] w-full rounded-2xl shadow-md py-4 px-6">
          <div className="flex gap-5 mb-6">
            {/* FITUR SEARCHING */}
            <InputSearch
            // handleChange={(e) => setSearch(e.target.value)}
            />

            <button
              className="flex items-center py-2 px-6 bg-green-800 text-white font-medium rounded-2xl"
              onClick={() => openModal("add_investment")}
            >
              <PiPlusCircle className="w-6 h-6 me-1" />
              <p>Tambah</p>
            </button>

            {/* MODAL */}
            <Modal open={isModalOpen} onClose={closeModal}>
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
                    />
                    <Label htmlFor={"gambar"} value={"Gambar"} />
                    <div className="flex flex-col items-center justify-center w-full py-4 mt-2 mb-4 h-full border-2 rounded-2xl bg-gray-50 shadow border-gray-300">
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
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </div>
                        <input
                          id="gambar"
                          name="gambar"
                          type="file"
                          className="hidden"
                          onChange={handleInvestmentImageChange}
                        />
                      </label>
                    </div>

                    <Label htmlFor={"deskripsi"} value={"Deskripsi"} />
                    <ReactQuill
                      theme="snow"
                      value={formInvestment.deskripsi}
                      onChange={handleInvestmentDescriptionChange}
                    />
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
                        />
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
                        />
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
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor={"target_pendanaan"}
                          value={"Target Pendanaan"}
                        />
                        <Input
                          type={"text"}
                          name={"target_pendanaan"}
                          placeholder={"Masukkan target pendanaan.."}
                          variant={"primary-outline"}
                          value={formInvestment.target_pendanaan}
                          handleChange={handleInvestmentTextChange}
                        />
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
                        />
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
                        />
                      </div>
                      <div>
                        <Label htmlFor={"bagi_hasil"} value={"Bagi Hasil"} />
                        <Input
                          type={"text"}
                          name={"bagi_hasil"}
                          placeholder={"Masukkan bagi hasil.."}
                          variant={"primary-outline"}
                          value={formInvestment.bagi_hasil}
                          handleChange={handleInvestmentTextChange}
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor={"minimum_investasi"}
                          value={"Minimum Investasi"}
                        />
                        <Input
                          type={"text"}
                          name={"minimum_investasi"}
                          placeholder={"Masukkan minimum investasi.."}
                          variant={"primary-outline"}
                          value={formInvestment.minimum_investasi}
                          handleChange={handleInvestmentTextChange}
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor={"maksimum_investasi"}
                          value={"Maksimum Investasi"}
                        />
                        <Input
                          type={"text"}
                          name={"maksimum_investasi"}
                          placeholder={"Masukkan maksimum investasi.."}
                          variant={"primary-outline"}
                          value={formInvestment.maksimum_investasi}
                          handleChange={handleInvestmentTextChange}
                        />
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
                    />
                    <Label htmlFor={"url_map"} value={"URL Map"} />
                    <Input
                      type={"text"}
                      name={"url_map"}
                      placeholder={"Masukkan URL map.."}
                      variant={"primary-outline"}
                      value={formInvestment.url_map}
                      handleChange={handleInvestmentTextChange}
                    />
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
                    <p>Halaman Detail Batch Investasi</p>
                  </Modal.Body>
                  <Modal.Footer
                    action="Hapus"
                    // onAction={handleDeleteInvestment}
                    onClose={closeModal}
                  />
                </>
              )}
            </Modal>
          </div>

          {/* List */}
          <BatchList investments={investments} openModal={openModal} />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminInvestasi;
