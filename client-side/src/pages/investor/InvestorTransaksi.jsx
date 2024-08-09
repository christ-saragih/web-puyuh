import React, { useState } from "react";
import SidebarInvestor from "../../components/common/SidebarInvestor";
import Input from "../../components/common/Input";
import InputSearch from "../../components/common/InputSearch";
import Dropdown from "../../components/common/Dropdown";
import Label from "../../components/common/Label";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const InvestorTransaksi = () => {
    const [isHovered, setIsHovered] = useState(false);
    const options = ["4", "8", "16", "32", "Semua"];
    // const [selectedValue, setSelectedValue] = useState("4");
    // const [currentPage, setCurrentPage] = useState(1);
    // const [search, setSearch] = useState("");

    const handleOptionSelect = (option) => {
        setSelectedValue(option);
        setCurrentPage(1);
      };

    return (
        <div className="bg-white w-dvw h-dvh overflow-y-auto py-5 pe-6">
            <SidebarInvestor isHovered={isHovered} setIsHovered={setIsHovered} />
            <div className={`px-8 pb-5 transition-all duration-300 ease-in-out ${
                isHovered ? "md:ml-60" : "md:ml-28"
                }`}>
                    <div className="flex flex-col">
                        <h1 className="font-quicksand font-bold text-4xl mb-4">Transaksi</h1>
                    </div>
                    <div className="w-full rounded-xl bg-[#F5F5F7] flex items-center mb-10 shadow-lg">
                        <div className="flex flex-col">
                            <h1 className="text-[1.75rem] font-bold p-4 ml-8">Total Riwayat Investasi</h1>
                            <p className="text-[2rem] font-medium p-4 ml-28">Rp 2.000.000.000</p>
                        </div>
                    </div>
                    <div className="w-full rounded-xl bg-[#F5F5F7] flex flex-col mb-10 shadow-lg p-4">
                        <div className="flex flex-row gap-5 mb-6">
                            <Dropdown
                                options={options}
                                label="Tampilkan"
                                onOptionSelect={handleOptionSelect}
                            />

                            {/* FITUR SEARCHING */}
                            <InputSearch
                                handleChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-base text-left text-gray-500">
                                <thead className="bg-white text-sm text-gray-700 uppercase border-b-2">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                        No
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                        Judul
                                        </th>

                                        <th scope="col" className="px-6 py-3 text-center">
                                        Tanggal Transaksi
                                        </th>

                                        <th scope="col" className="px-6 py-3 text-center">
                                        Investasi
                                        </th>
                                        
                                        <th scope="col" className="px-6 py-3 text-center">
                                        Status
                                        </th>

                                        <th scope="col" className="px-6 py-3 text-center">
                                        Pembayaran
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white border-b hover:bg-gray-50">
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium  whitespace-nowrap "
                                        >
                                            1
                                        </th>

                                        <td className="px-6 py-4">
                                            Batch 1
                                        </td>

                                        <td className="px-6 py-4 text-center">
                                            29 Juli 2024 09:38
                                        </td>

                                        <td className="px-6 py-4 text-center">
                                            Rp 200.000.000
                                        </td>

                                        <td className="px-6 py-4 text-center">
                                            Selesai
                                        </td>

                                        <td className="px-6 py-4 text-center">
                                            <FontAwesomeIcon icon={faEye} />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
            </div>
        </div>
    )
};

export default InvestorTransaksi;
