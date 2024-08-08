import React, { useState } from "react";
import SidebarInvestor from "../../components/common/SidebarInvestor";
import GambarInvestasi from "../../assets/images/GambarInvestasi.svg";

const InvestorProfil = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="bg-white w-full h-full overflow-y-auto py-5 px-6">
            <SidebarInvestor isHovered={isHovered} setIsHovered={setIsHovered} />
            <div className={`transition-all duration-300 ease-in-out ${isHovered ? "md:ml-60" : "md:ml-28"}`}>
                <div className="p-2">
                    <div className="flex flex-col w-full bg-[#F5F5F7] p-6 rounded-xl mb-5 ">
                        <div className="flex flex-row mb-10">
                            <img
                                src={GambarInvestasi}
                                alt="Investment"
                                className="w-full max-w-lg h-auto rounded-md mr-5"
                            />
                            <div className="flex flex-col gap-2 flex-1">
                                <h4 className="text-[2.3rem] font-bold">Batch 1</h4>
                                <div className="bg-white rounded-xl p-7 mb-4">
                                    <p className="text-gray-600 p-1">PT. Panacea Buana Batam</p>
                                    <p className="text-gray-700 font-semibold p-2">
                                        Tanggal Dibuka
                                        <span className="block font-light">12 Agustus 2024</span>
                                    </p>
                                    <p className="text-gray-700 font-semibold p-2">
                                        Tanggal Ditutup
                                        <span className="block font-light">12 Desember 2024</span>
                                    </p>
                                    <p className="text-gray-700 font-semibold p-2">
                                        Total Pendanaan
                                        <span className="block font-light">Rp 2.000.000.000,-</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="text-lg font-bold">Rp540.050.000</p>
                            <p className="text-gray-600 text-sm">dari target dana Rp4.062.500.000,-</p>
                            <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                                <div 
                                    className="bg-[#FFA90B] text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                                    style={{ width: `${45}%` }}
                                >
                                    {45}%
                                </div>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <span className="bg-orange-100 text-orange-500 text-sm px-2 py-1 rounded-md">12 hari lagi</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-full bg-[#F5F5F7] p-4 rounded-xl">
                        <div className="flex space-x-4">
                            {/* Kartu 1 */}
                            <div className="bg-white p-4 shadow-md rounded-md w-1/2">
                                <h3 className="text-lg font-bold mb-2">Minimum Investasi</h3>
                                <p>Rp 1.000.000,-</p>
                                <h3 className="text-lg font-bold mb-2">Maksimum Investasi</h3>
                                <p>Rp 10.000.000,-</p>
                                <h3 className="text-lg font-bold mb-2">Bagi Hasil</h3>
                                <p>15%</p>
                            </div>
                            
                            {/* Kartu 2 */}
                            <div className="bg-white p-4 shadow-md rounded-md w-1/2">
                                <h3 className="text-lg font-bold mb-2">Tenor</h3>
                                <p>5 Bulan</p>
                                <h3 className="text-lg font-bold mb-2">Pembayaran Bagi Hasil</h3>
                                <p>per Bulan</p>
                                <h3 className="text-lg font-bold mb-2">Penggunaan Dana</h3>
                                <p>Pembangunan kandang baru di Cisarua, Jawa Barat</p>
                            </div>
                        </div>
                        {/* Tombol Investasi */}
                        <div className="flex justify-center mt-4">
                            <button className="px-6 py-2 bg-[#572618] text-white font-bold rounded-md hover:bg-brown-700 transition">
                                Investasi Sekarang
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvestorProfil;
