import React, { useEffect, useState } from "react";
import Modal from "../common/Modal";
import Button from "../common/Button";
import { apiInvestor } from "../../hooks/useAxiosConfig";

const insertSnapScript = () => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
        script.setAttribute(
            "data-client-key",
            "SB-Mid-client-NNnpK_GkF7c5LAHP"
        );
        script.onload = () => resolve();
        document.body.appendChild(script);
    });
};

const ModalInvestasi = ({ closeModal, investasiId, onClosePayment }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [showError, setShowError] = useState(false);
    const [totalInvestasi, setTotalInvestasi] = useState("");
    const [inputError, setInputError] = useState("");
    const [verificationError, setVerificationError] = useState("");
    const [formattedInvestasi, setFormattedInvestasi] = useState("");

    useEffect(() => {
        insertSnapScript();
    }, []);

    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const handleTotalInvestasiChange = (e) => {
        const value = e.target.value.replace(/\./g, ""); // Hapus semua titik yang ada
        
        if (value === "" || /^\d+$/.test(value)) { // Cek apakah input kosong atau hanya berisi angka
            setTotalInvestasi(value);
            if (value) {
                setFormattedInvestasi(formatNumber(value));
            } else {
                setFormattedInvestasi("");
            }
            setInputError("");
        }
    };

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
        if (e.target.checked) {
            setShowError(false);
        }
    };

    const handleConfirmClick = async () => {
        if (!isChecked) {
            setShowError(true);
        } else if (!totalInvestasi || isNaN(totalInvestasi) || totalInvestasi <= 0) {
            setInputError("Masukkan total investasi yang valid.");
        } else {
            try {
                setShowError(false);
                setInputError("");
                setVerificationError("");

                const response = await apiInvestor.post(`/transaksi/${investasiId}`, {
                    total_investasi: parseInt(totalInvestasi),
                });

                const snapToken = response.data.token;

                window.snap.pay(snapToken.token, {
                    onSuccess: function (result) {
                        alert("Pembayaran Berhasil!");
                        console.log(result);
                        onClosePayment();
                    },
                    onPending: function (result) {
                        alert("Menunggu Pembayaran...");
                        console.log(result);
                        onClosePayment();
                    },
                    onError: function (result) {
                        alert("Pembayaran Gagal.");
                        console.log(result);
                        onClosePayment();
                    },
                    onClose: function () {
                        alert("Anda menutup pembayaran.");
                        onClosePayment();
                    },
                });
            } catch (error) {
                console.error("Terjadi kesalahan:", error);
                if (error.response && error.response.data && error.response.data.message) {
                    setVerificationError(error.response.data.message);
                } else {
                    setInputError("Terjadi kesalahan saat memproses transaksi.");
                }
            }
        }
    };

    return (
        <Modal
            open={true}
            onClose={closeModal}
            size="small"
            className="px-8 py-4"
        >
            <Modal.Header title="Investasi Sekarang" onClose={closeModal} />
            <Modal.Body>
                <div className="flex flex-col gap-4">
                    <div className="overflow-y-auto max-h-40 border-t border-b border-gray-300 py-2">
                        <h3 className="font-semibold">KONTRAK PERJANJIAN:</h3>
                        <p className="text-sm text-gray-600">
                            Dengan melakukan investasi ini, Anda menyetujui
                            ketentuan berikut:
                        </p>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                            <li>
                                Investasi ini bersifat jangka panjang dan dapat
                                berubah tergantung kondisi pasar.
                            </li>
                            <li>
                                Anda bertanggung jawab atas risiko investasi
                                yang mungkin terjadi.
                            </li>
                            <li>
                                Pastikan membaca informasi terkait investasi
                                sebelum melanjutkan.
                            </li>
                            <li>
                                Informasi yang diberikan bersifat indikatif dan
                                tidak dapat dianggap sebagai nasihat keuangan.
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col">
                        <label
                            htmlFor="totalInvestasi"
                            className="text-sm text-gray-600"
                        >
                            Total Investasi
                        </label>
                        <input
                            type="text"
                            id="totalInvestasi"
                            value={formattedInvestasi}
                            onChange={handleTotalInvestasiChange}
                            placeholder="Masukkan total investasi"
                            className="border border-gray-300 px-3 py-2 rounded-md"
                        />
                        {inputError && (
                            <p className="text-sm text-red-500">{inputError}</p>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="agreement"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                            className="cursor-pointer"
                        />
                        <label
                            htmlFor="agreement"
                            className="text-sm text-gray-600 cursor-pointer"
                        >
                            Saya telah membaca dan mengerti isi kontrak
                            perjanjian.
                        </label>
                    </div>

                    {showError && (
                        <p className="text-sm text-red-500">
                            Anda harus mencentang kotak persetujuan sebelum
                            melanjutkan.
                        </p>
                    )}

                    <p>Apakah Anda yakin ingin melakukan investasi ini?</p>

                    {verificationError && (
                        <p className="text-sm text-red-500">{verificationError}</p>
                    )}

                    <div className="flex justify-end gap-4">
                        <Button
                            onClick={closeModal}
                            variant="secondary"
                            value="Batal"
                        />
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