import { useState, useEffect } from "react";
import SidebarInvestor from "../../components/common/SidebarInvestor";
import InputSearch from "../../components/common/InputSearch";
import Dropdown from "../../components/common/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { getTransaksi } from "../../services/transaksi.service";
import { useParams } from "react-router-dom";
import { formatRupiah } from "../../utils/formatRupiah";
import InvestorLayout from "../../layouts/InvestorLayout";

const InvestorTransaksi = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [token, setToken] = useState("");
    const [expire, setExpire] = useState("");
    const [transaksi, setTransaksi] = useState([]);
    const [selectedValue, setSelectedValue] = useState("4");
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const options = ["4", "8", "16", "32", "Semua"];
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false); // State for controlling modal visibility
    const [selectedTransaction, setSelectedTransaction] = useState(null); // State for storing selected transaction

    useEffect(() => {
        getTransaksi((data) => {
            setTransaksi(data);
            setLoading(false);
        });
    }, [navigate]);

    const totalInvestasi = transaksi.reduce((total, item) => {
        return total + item.total_investasi;
    }, 0);

    const handleOptionSelect = (option) => {
        setSelectedValue(option);
        setCurrentPage(1);
    };

    // Handle showing modal with transaction details
    const handleViewDetails = (transaction) => {
        setSelectedTransaction(transaction);
        setShowModal(true);
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
                    <h1 className="font-quicksand font-bold text-4xl md:mt-1 mt-8 mb-4">
                        Transaksi
                    </h1>
                </div>
                <div className="w-full rounded-xl bg-[#F5F5F7] flex items-center mb-10 shadow-lg">
                    <div className="flex flex-col">
                        <h1 className="text-[1.75rem] font-bold p-4 ml-8">
                            Total Riwayat Investasi
                        </h1>
                        {loading ? (
                            <p className="text-[2rem] font-medium p-4 ml-28">
                                Loading...
                            </p>
                        ) : (
                            <p className="text-[2rem] font-medium p-4 ml-28">
                                {formatRupiah(totalInvestasi)}
                            </p>
                        )}
                    </div>
                </div>
                <div className="w-full rounded-xl bg-[#F5F5F7] flex flex-col mb-10 shadow-lg p-4">
                    <div className="flex flex-row gap-5 mb-6">
                        <Dropdown
                            options={options}
                            label="Tampilkan"
                            onOptionSelect={handleOptionSelect}
                        />
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
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-center"
                                    >
                                        Tanggal Transaksi
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-center"
                                    >
                                        Investasi
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-center"
                                    >
                                        Status
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-center"
                                    >
                                        Pembayaran
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {transaksi.length > 0 ? (
                                    transaksi.map((transaction, index) => (
                                        <tr
                                            key={transaction.id}
                                            className="bg-white border-b hover:bg-gray-50"
                                        >
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium whitespace-nowrap"
                                            >
                                                {index + 1}
                                            </th>
                                            <td className="px-6 py-4">
                                                {transaction.investasi.judul}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {transaction.tanggal_transaksi}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {formatRupiah(
                                                    transaction.total_investasi
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {transaction.status}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <FontAwesomeIcon
                                                    icon={faEye}
                                                    className="cursor-pointer"
                                                    onClick={() =>
                                                        handleViewDetails(
                                                            transaction
                                                        )
                                                    }
                                                />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="px-6 py-4 text-center"
                                        >
                                            Tidak ada transaksi ditemukan
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="relative bg-white p-6 rounded-lg shadow-lg w-2/3">
                            {/* Tombol silang di pojok kanan atas */}
                            <button
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                                onClick={() => setShowModal(false)}
                                style={{ fontSize: "24px", padding: "0.5rem" }}
                            >
                                &times;
                            </button>

                            <h2 className="text-2xl font-bold mb-4">
                                Detail Investasi
                            </h2>
                            {selectedTransaction ? (
                                <div className="space-y-4">
                                    <div>
                                        <p className="font-semibold">
                                            ID Transaksi:
                                        </p>
                                        <p>{selectedTransaction.id}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">
                                            Metode Pembayaran:
                                        </p>
                                        <p>xxx</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">
                                            Nomor Rekening:
                                        </p>
                                        <p>xxxxxxxxxxxxxxxxxx</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold">
                                            Tanggal Transaksi:
                                        </p>
                                        <p>
                                            {
                                                selectedTransaction.tanggal_transaksi
                                            }
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
            </InvestorLayout>
        </div>
    );
};

export default InvestorTransaksi;
