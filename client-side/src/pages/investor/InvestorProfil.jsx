import { useState, useEffect } from "react";
import SidebarInvestor from "../../components/common/SidebarInvestor";
import VerticalTabProfil from "../../components/investor/VerticalTabProfil";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { apiInvestor } from "../../hooks/useAxiosConfig";
import InvestorLayout from "../../layouts/InvestorLayout";

const InvestorProfil = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [investor, setInvestor] = useState(null); // State untuk menyimpan data investor
    const [selectedPhoto, setSelectedPhoto] = useState(null); // State untuk menyimpan file gambar yang diunggah
    const [photoKey, setPhotoKey] = useState(Date.now()); // State tambahan untuk memaksa re-render gambar
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

        const formData = new FormData();
        formData.append("foto_profil", selectedPhoto);

        try {
            const response = await apiInvestor.post(`/biodata-investor`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            // Update data investor untuk langsung menampilkan foto baru tanpa refresh
            setInvestor((prevInvestor) => ({
                ...prevInvestor,
                investorBiodata: {
                    ...prevInvestor.investorBiodata,
                    foto_profil: response.data.foto_profil, // Set foto profil baru
                },
            }));

            // Reset selectedPhoto setelah berhasil upload
            setSelectedPhoto(null);

            // Paksa re-render gambar baru dengan mengubah photoKey
            setPhotoKey(Date.now());

        } catch (error) {
            console.error("Error updating profile photo:", error);
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
                    <div className="flex flex-col">
                        <h1 className="font-quicksand text-2xl font-bold md:mt-1 mt-8 mb-5">
                            Profil Investor
                        </h1>
                        <div className="w-full rounded-xl bg-[#F5F5F7] flex flex-col md:flex-row items-center mb-10 p-4 md:p-0">
                            <img
                                key={photoKey} // Menggunakan photoKey untuk memaksa re-render gambar
                                className="w-16 h-16 md:w-20 md:h-20 rounded mb-4  md:mb-6 md:mb-0 md:m-10"
                                src={
                                    selectedPhoto
                                        ? URL.createObjectURL(selectedPhoto) // Preview sebelum disimpan
                                        : `http://localhost:3000/api/biodata-investor/images/${investor?.investorBiodata?.foto_profil}` // Foto dari data investor
                                }
                                alt="Profile avatar"
                            />
                            <div className="flex flex-col items-center md:items-start ml-0 md:ml-10">
                                <label
                                    htmlFor="photoUpload"
                                    className="py-2 px-4 md:px-5 text-sm font-quicksand focus:outline-none bg-white rounded-full hover:bg-gray-100 dark:bg-[#D9D9D9] text-[#000] dark:hover:text-white dark:hover:bg-[#572618] mb-3 md:mb-5 cursor-pointer"
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
                                        className="py-2 px-4 md:px-5 text-sm font-quicksand focus:outline-none bg-blue-500 text-white rounded-full hover:bg-blue-600 dark:bg-[#00509E] dark:hover:bg-[#00376B] mb-3 md:mb-5"
                                    >
                                        Simpan Foto
                                    </button>
                                )}
                                <h2 className="font-quicksand text-sm md:text-l text-[#000] text-center md:text-left">
                                    {investor?.email}
                                </h2>
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
        </div>
    );
};

export default InvestorProfil;
