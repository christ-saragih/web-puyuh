import { useState, useEffect, useRef } from "react";
import SidebarInvestor from "../../components/common/SidebarInvestor";
import CalendarInvestor from "../../components/common/CalendarInvestor";
import CardBagiHasil from "../../components/investor/CardBagiHasil";
import CardBatchInvestor from "../../components/investor/CardBatchInvestor";
import WavingIllustration from "../../assets/images/Illustration waving.svg";
import GrowingMoney from "../../assets/images/Growing Money.svg";
import { MdNotificationsActive } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
// import useAuthInvestor from "../../hooks/useAuthInvestor";
import { apiInvestor } from "../../hooks/useAxiosConfig";
import { formatRupiah } from "../../utils/formatRupiah";
import { getTransaksi } from "../../services/transaksi.service";
import BatchListInvestor from "../../components/investor/BatchListInvestor";
import { getBatchs } from "../../services/batch.service";

const InvestorDashboard = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [investor, setInvestor] = useState(null); // State untuk menyimpan data investor
  const [loading, setLoading] = useState(true); // State untuk loading
  const [transaksi, setTransaksi] = useState([]);
  const navigate = useNavigate();
  const [batchs, setBatchs] = useState([]);

  useEffect(() => {
    getBatchs((data) => {
      setBatchs(data);
    });
  }, []);

  useEffect(() => {
    getTransaksi((data) => {
      setTransaksi(data);
      setLoading(false);
    });
  }, [navigate]);

  const totalInvestasi = transaksi.reduce((total, item) => {
    return total + item.total_investasi;
  }, 0);

  // Fungsi untuk memanggil API dan mengambil data investor
  useEffect(() => {
    const fetchInvestorData = async () => {
      try {
        const response = await apiInvestor.get("/investor"); // Gunakan instance axios
        setInvestor(response.data.data); // Simpan data investor ke state
      } catch (error) {
        console.error("Error fetching investor data:", error);
        if (error.response?.status === 401) {
          navigate("/login"); // Redirect jika tidak otentikasi
        }
      } finally {
        setLoading(false); // Selesai loading
      }
    };

    fetchInvestorData();
  }, [navigate]);

  if (loading) {
    return <p>Loading...</p>; // Tampilkan pesan loading saat data sedang diambil
  }

  return (
    <div className="bg-white w-dvw h-dvh overflow-y-auto py-5 pe-6">
      <SidebarInvestor isHovered={isHovered} setIsHovered={setIsHovered} />
      <div
        className={`px-8 pb-5 transition-all duration-300 ease-in-out ${
          isHovered ? "md:ml-60" : "md:ml-28"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-4">
            <div className="w-full rounded-xl bg-[#F5F5F7] flex items-center px-10 pt-3">
              <div className="w-[70%]">
                <h1 className="text-[2.5rem] font-bold mb-3 text-[#000] leading-none">
                  Halo, {investor?.username}
                </h1>
                <p className="text-[#000]">Senang bertemu dengan Anda 👋</p>
              </div>

              <div className="w-[30%]">
                <img src={WavingIllustration} alt="Waving Illustration" />
              </div>
            </div>

            <div className="w-full rounded-xl bg-[#F5F5F7] flex items-center p-4">
              <div className="flex flex-col">
                <h1 className="text-xl font-bold mb-3 text-[#000]">
                  Total Investasi
                </h1>
                <div className="flex items-center ml-48">
                  <img
                    src={GrowingMoney}
                    alt="Growing Money"
                    className="w-36 h-36"
                  />
                  <h1 className="text-3xl font-bold ml-4 text-[#000]">
                    {formatRupiah(totalInvestasi)}
                  </h1>
                </div>
              </div>
            </div>

            <div className="w-full rounded-xl bg-[#F5F5F7] flex items-center p-4">
              <div className="flex flex-col">
                <h1 className="text-xl font-bold mb-3 text-[#000]">
                  Bagi Hasil
                </h1>
                <div className="flex space-x-4">
                  <CardBagiHasil
                    batch="Batch 1"
                    profit="Rp2.000.000"
                    percentage="2.7%"
                  />
                  <CardBagiHasil
                    batch="Batch 1"
                    profit="Rp2.000.000"
                    percentage="2.7%"
                  />
                </div>
              </div>
            </div>

            <div className="w-[150%] rounded-xl bg-[#F5F5F7] p-4 relative">
              <h1 className="text-xl font-bold mb-3 text-[#000]">
                Investasi yang Sedang Berlangsung
              </h1>

              <div className="relative flex items-center">
                {/* Batch List dengan scroll horizontal */}
                <div className="flex overflow-x-auto gap-10 w-full scrollbar-hide">
                  <BatchListInvestor batchs={batchs} />
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-1 relative">
            <div className="flex items-center gap-5">
              <form className="w-[63%]">
                <label
                  htmlFor="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    className="block w-full p-4 ps-10 text-sm text-gray-900 bg-[#F5F5F7] rounded-xl"
                    placeholder="Cari"
                  />
                </div>
              </form>

              <div className="">
                <MdNotificationsActive className="w-10 h-10 text-gray-500 dark:text-gray-400" />
              </div>

              <div>
                <CgProfile className="w-10 h-10" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full h-[10rem]">
                <CalendarInvestor />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorDashboard;
