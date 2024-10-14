import { useState, useEffect } from "react";
import SidebarInvestor from "../../components/common/SidebarInvestor";
import VerticalTabProfil from "../../components/investor/VerticalTabProfil";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { apiInvestor } from "../../hooks/useAxiosConfig";
import InvestorLayout from "../../layouts/InvestorLayout";

const InvestorProfil = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [investor, setInvestor] = useState(null); 
    const [selectedPhoto, setSelectedPhoto] = useState(null); 
    const [photoKey, setPhotoKey] = useState(Date.now()); 
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [password, setPassword] = useState(""); 
    const [confirmPassword, setConfirmPassword] = useState(""); // State untuk konfirmasi password
    const [passwordError, setPasswordError] = useState(""); 
    const [confirmPasswordError, setConfirmPasswordError] = useState(""); // State untuk error konfirmasi password
    const [showPhotoSaveMessage, setShowPhotoSaveMessage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showPasswordChangeMessage, setShowPasswordChangeMessage] = useState(false);
    const [isPasswordChanging, setIsPasswordChanging] = useState(false);
    const navigate = useNavigate();

    // Fungsi untuk memanggil API dan mengambil data investor
    useEffect(() => {
        getInvestors();
    }, [navigate]);

    const getInvestors = async () => {
        try {
            const response = await apiInvestor.get(`/investor`);
            setInvestor(response.data.data);
        } catch (error) {
            console.error("Error fetching investors:", error);
        }
    };

    // Fungsi untuk mengganti foto profil
    const handleChangePhoto = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedPhoto(file); // Simpan foto yang dipilih untuk preview
        }
    };

    // Fungsi untuk menyimpan foto profil yang baru
    const handleSavePhoto = async () => {
        if (!selectedPhoto) return;

        setIsLoading(true);
        const formData = new FormData();
        formData.append("foto_profil", selectedPhoto);

        try {
            const response = await apiInvestor.post(`/biodata-investor`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setInvestor((prevInvestor) => ({
                ...prevInvestor,
                investorBiodata: {
                    ...prevInvestor.investorBiodata,
                    foto_profil: response.data.foto_profil,
                },
            }));

            setSelectedPhoto(null);
            setPhotoKey(Date.now());

            // Show the success message
            setShowPhotoSaveMessage(true);

            // Refresh the page after a short delay
            setTimeout(() => {
                window.location.reload();
            }, 1500); // 1.5 seconds delay before refresh

        } catch (error) {
            console.error("Error updating profile photo:", error);
            setShowPhotoSaveMessage(false);
        } finally {
            setIsLoading(false);
        }
    };

     // Fungsi untuk validasi password
     const validatePassword = (password) => {
        const symbolRegex = /[@!$%*?&]/;
        if (password.length < 8) {
            return "Password harus memiliki minimal 8 karakter.";
        }
        if (!symbolRegex.test(password)) {
            return "Password harus memiliki salah satu simbol @!$%*?&.";
        }
        return ""; // Tidak ada error
    };

    // Fungsi untuk menangani perubahan password
    const handleChangePassword = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        const error = validatePassword(newPassword);
        setPasswordError(error);
    };

    const handleChangeConfirmPassword = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);

        if (newConfirmPassword !== password) {
            setConfirmPasswordError("Password tidak cocok.");
        } else {
            setConfirmPasswordError("");
        }
    };

    // Fungsi untuk membuka modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Fungsi untuk menutup modal
    const closeModal = () => {
        setIsModalOpen(false);
        setPassword(""); // Reset password
        setPasswordError(""); // Reset error
    };

    const handleSavePassword = async () => {
        if (passwordError || confirmPasswordError) return;
    
        setIsPasswordChanging(true);
        try {
            await apiInvestor.post(`http://localhost:3000/api/investor/ubah-password`, {
                newPassword: password,
            });
            closeModal();
            setShowPasswordChangeMessage(true);
            
            // Hide the message after 3 seconds
            setTimeout(() => {
                setShowPasswordChangeMessage(false);
            }, 3000);
        } catch (error) {
            console.error("Error updating password:", error);
        } finally {
            setIsPasswordChanging(false);
        }
    };

    return (
        <div className="bg-white w-dvw min-h-screen overflow-y-auto py-5 pe-6">
            <InvestorLayout>
                <div
                    className={`px-8 pb-5 transition-all duration-300 ease-in-out ${
                        isHovered ? "md:ml-60" : "md:ml-28"
                    }`}
                >
                    {/* Add the pop-up message */}
                    {showPhotoSaveMessage && (
                        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
                            Foto berhasil disimpan!
                        </div>
                    )}

                     {/* Add the password change message */}
                     {showPasswordChangeMessage && (
                        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
                            Password berhasil diubah!
                        </div>
                    )}
                    <div className="flex flex-col">
                        <h1 className="font-quicksand text-2xl font-bold md:mt-1 mt-8 mb-5">
                            Profil Investor
                        </h1>
                        <div className="w-full rounded-xl bg-[#F5F5F7] flex flex-col md:flex-row items-center mb-10 p-4 md:p-0">
                            <div className="md:flex-col flex flex-col items-center p-6">
                                <img
                                    key={photoKey} // Menggunakan photoKey untuk memaksa re-render gambar
                                    className="w-16 h-16 md:w-20 md:h-20 rounded mb-4 md:mb-6"
                                    src={
                                        selectedPhoto
                                            ? URL.createObjectURL(selectedPhoto) // Preview sebelum disimpan
                                            : `http://localhost:3000/api/biodata-investor/images/${investor?.investorBiodata?.foto_profil}` // Foto dari data investor
                                    }
                                    alt="Profile avatar"
                                />
                                <div className="flex flex-col items-center">
                                    <label
                                        htmlFor="photoUpload"
                                        className="py-2 px-4 text-sm font-quicksand focus:outline-none bg-white rounded-full hover:bg-[#572618] hover:text-white text-[#000] mb-3 cursor-pointer"
                                    >
                                        Ganti Foto
                                    </label>
                                    <input
                                        id="photoUpload"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleChangePhoto}
                                    />
                                   {selectedPhoto && (
                                        <button
                                            onClick={handleSavePhoto}
                                            className="py-2 px-5 text-sm font-quicksand focus:outline-none bg-[#572618] text-white rounded-full hover:bg-blue-600"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? 'Menyimpan...' : 'Simpan Foto'}
                                        </button>
                                    )}
                                </div>
                            </div>
                             {/* Add the pop-up message */}
                                {showPhotoSaveMessage && (
                                    <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
                                        Foto berhasil disimpan! Halaman akan direfresh...
                                    </div>
                                )}
                            <div className="flex flex-col items-center md:items-start ml-0 md:ml-10">
                                <h2 className="font-quicksand text-xl text-sm md:text-l text-[#000] text-center md:text-left md:mb-10">
                                    {investor?.email}
                                </h2>
                                <div className={`mb-4 px-3 py-1 rounded-full text-sm ${
                                    investor?.isVerifiedProfile 
                                    ? "bg-green-100 text-green-800" 
                                    : "bg-yellow-100 text-yellow-800"
                                }`}>
                                    {investor?.isVerifiedProfile ? "Terverifikasi" : "Belum Terverifikasi"}
                                </div>
                                <button
                                    onClick={openModal}
                                    className="py-2 px-5 text-sm font-quicksand focus:outline-none bg-[#572618] text-white rounded-full hover:bg-blue-600"
                                >
                                    Ubah Password
                                </button>
                            </div>
                        </div>

                        <div className="w-full rounded-xl bg-[#F5F5F7]">
                            {/* Pass data kategori investor ke VerticalTabProfil */}
                            <VerticalTabProfil
                                getInvestors={getInvestors}
                                investors={investor}
                            />
                        </div>
                    </div>
                </div>
            </InvestorLayout>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-xl font-quicksand font-bold mb-4">
                            Ubah Password
                        </h2>
                        <input
                            type="password"
                            value={password}
                            onChange={handleChangePassword}
                            placeholder="Masukkan password baru"
                            className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none"
                        />
                        {passwordError && (
                            <p className="text-red-500 text-sm mb-4">{passwordError}</p>
                        )}
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={handleChangeConfirmPassword}
                            placeholder="Konfirmasi password baru"
                            className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none"
                        />
                        {confirmPasswordError && (
                            <p className="text-red-500 text-sm mb-4">{confirmPasswordError}</p>
                        )}
                        <div className="flex justify-end space-x-4">
                            <button
                                className="py-2 px-4 text-sm font-quicksand bg-gray-400 text-white rounded-full hover:bg-gray-500"
                                onClick={closeModal}
                            >
                                Batal
                            </button>
                            <button
                                className="py-2 px-4 text-sm font-quicksand bg-[#572618] text-white rounded-full hover:bg-blue-600"
                                onClick={handleSavePassword}
                                disabled={!!passwordError || !!confirmPasswordError || isPasswordChanging}
                            >
                                {isPasswordChanging ? 'Menyimpan...' : 'Simpan'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InvestorProfil;
