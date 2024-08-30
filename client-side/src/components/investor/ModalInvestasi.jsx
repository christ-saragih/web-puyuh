import React, { useState } from "react";
import Modal from "../common/Modal";
import Button from "../common/Button";

const ModalInvestasi = ({ closeModal }) => {
  const [isChecked, setIsChecked] = useState(false); // State untuk checkbox
  const [showError, setShowError] = useState(false); // State untuk menampilkan pesan error

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
    if (e.target.checked) {
      setShowError(false); // Sembunyikan pesan error jika checkbox dicentang
    }
  };

  const handleConfirmClick = () => {
    if (!isChecked) {
      setShowError(true); // Tampilkan pesan error jika checkbox belum dicentang
    } else {
      alert("Investasi Berhasil!");
      setShowError(false); // Reset pesan error jika sudah berhasil
    }
  };

  return (
    <Modal open={true} onClose={closeModal} size="small" className="px-8 py-4">
      <Modal.Header title="Investasi Sekarang" onClose={closeModal} />
      <Modal.Body>
        <div className="flex flex-col gap-4">

          {/* Teks Syarat dan Ketentuan */}
          <div className="overflow-y-auto max-h-40 border-t border-b border-gray-300 py-2">
            <h3 className="font-semibold">KONTRAK PERJANJIAN:</h3>
            <p className="text-sm text-gray-600">
              Dengan melakukan investasi ini, Anda menyetujui ketentuan berikut:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600">
              <li>Investasi ini bersifat jangka panjang dan dapat berubah tergantung kondisi pasar.</li>
              <li>Anda bertanggung jawab atas risiko investasi yang mungkin terjadi.</li>
              <li>Pastikan membaca informasi terkait investasi sebelum melanjutkan.</li>
              <li>Informasi yang diberikan bersifat indikatif dan tidak dapat dianggap sebagai nasihat keuangan.</li>
            </ul>
          </div>

          {/* Checkbox untuk validasi */}
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="agreement" 
              checked={isChecked} 
              onChange={handleCheckboxChange} 
              className="cursor-pointer"
            />
            <label htmlFor="agreement" className="text-sm text-gray-600 cursor-pointer">
              Saya telah membaca dan mengerti isi kontrak perjanjian.
            </label>
          </div>

          {/* Pesan error jika checkbox belum dicentang */}
          {showError && (
            <p className="text-sm text-red-500">
              Anda harus mencentang kotak persetujuan sebelum melanjutkan.
            </p>
          )}

          {/* Pesan Konfirmasi */}
          <p>Apakah Anda yakin ingin melakukan investasi ini?</p>

          <div className="flex justify-end gap-4">
            <Button onClick={closeModal} variant="secondary" value="Batal" />
            <Button 
              onClick={handleConfirmClick} 
              variant="primary" 
              value="Lanjut" 
            />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalInvestasi;
