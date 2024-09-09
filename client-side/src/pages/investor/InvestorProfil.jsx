import { useState, useEffect } from "react";
import SidebarInvestor from "../../components/common/SidebarInvestor";
import VerticalTabProfil from "../../components/investor/VerticalTabProfil";
import profilePicture from "../../assets/images/profile-picture-5.jpg";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { apiInvestor } from "../../hooks/useAxiosConfig";
import InvestorLayout from "../../layouts/InvestorLayout";

const InvestorProfil = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [investor, setInvestor] = useState(null); // State untuk menyimpan data investor
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

    return (
        <div className="bg-white w-dvw min-h-screen overflow-y-auto py-5 pe-6">
            <InvestorLayout>
            <div
                className={`px-8 pb-5 transition-all duration-300 ease-in-out ${
                    isHovered ? "md:ml-60" : "md:ml-28"
                }`}
            >
                <div className="flex flex-col">
                    <h1 className="font-quicksand text-2xl font-bold mb-5">
                        Profil Investor
                    </h1>
                    <div className="w-full rounded-xl bg-[#F5F5F7] flex items-center mb-10">
                        <img
                            className="w-20 h-20 rounded m-10"
                            src={profilePicture}
                            alt="Default avatar"
                        />
                        <div className="flex flex-col items-center ml-10">
                            <button
                                type="button"
                                className="py-2.5 px-5 me-20 text-sm font-quicksand focus:outline-none bg-white rounded-full hover:bg-gray-100 dark:bg-[#D9D9D9] text-[#000] dark:hover:text-white dark:hover:bg-[#572618] mb-5"
                            >
                                Ganti Foto
                            </button>
                            <h2 className="font-quicksand text-l text-[#000]">
                                {investor?.email}
                            </h2>
                            {/* <h1>{investors.kategori_investor}</h1> */}
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
