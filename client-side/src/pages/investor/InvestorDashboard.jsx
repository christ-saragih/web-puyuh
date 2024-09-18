import { useState, useEffect } from "react";
import SidebarInvestor from "../../components/common/SidebarInvestor";
import CalendarInvestor from "../../components/common/CalendarInvestor";
import CardBagiHasil from "../../components/investor/CardBagiHasil";
import CardBatchInvestor from "../../components/investor/CardBatchInvestor";
import WavingIllustration from "../../assets/images/Illustration waving.svg";
import GrowingMoney from "../../assets/images/Growing Money.svg";
import { MdNotificationsActive } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { apiInvestor } from "../../hooks/useAxiosConfig";
import { formatRupiah } from "../../utils/formatRupiah";
import { getTransaksi } from "../../services/transaksi.service";
import BatchListInvestor from "../../components/investor/BatchListInvestor";
import { getBatchs } from "../../services/batch.service";
import InvestorLayout from "../../layouts/InvestorLayout";
import { Dropdown } from "flowbite-react";
import { LuChevronDown, LuHome, LuLogOut } from "react-icons/lu";
import { Link} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";

const InvestorDashboard = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [investor, setInvestor] = useState(null); // State untuk menyimpan data investor
  const [loading, setLoading] = useState(true); // State untuk loading
  const [transaksi, setTransaksi] = useState([]);
  const navigate = useNavigate();
  const [batchs, setBatchs] = useState([]);
  const { logout } = useContext(AuthContext);

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

  const Logout = async () => {
    try {
      await logout();

      navigate("/masuk");
    } catch (error) {
      console.log("Logout gagal", error);
    }
  };

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
    <div className="bg-white w-dvw min-h-screen overflow-y-auto md:py-5 py-14 pe-6 relative">
      <InvestorLayout>
        {/* Sidebar untuk tampilan mobile */}
        <div className="fixed top-0 left-0 bottom-0 z-50 md:hidden">
        </div>

        {/* Header untuk Mobile */}
        <div className="bottom-0 left-0 right-0 z-40 md:hidden flex items-center justify-between p-4">
          <form className="flex items-center w-[70%]">
            <input
              type="search"
              className="block w-full p-2 pl-10 text-sm text-gray-900 bg-[#F5F5F7] rounded-xl"
              placeholder="Cari"
            />
          </form>
          <div className="flex items-center space-x-4">
            <MdNotificationsActive className="ml-4 w-8 h-8 text-gray-500" />
            <img
                  src={ `http://localhost:3000/api/biodata-investor/images/${investor?.investorBiodata.foto_profil}`}
                  alt="Default Profile"
                  className="w-10 h-10 rounded-full"
                />
            <Dropdown
                  label=""
                  dismissOnClick={false}
                  placement="bottom-start"
                  renderTrigger={() => (
                    <span className="cursor-pointer">
                      <LuChevronDown className="w-5 h-5 -ml-4" />
                    </span>
                  )}
                >
                  <Dropdown.Header>
                    <span className="block text-base">{investor?.username}</span>
                    <span className="block truncate text-sm font-medium">
                      {investor?.email}
                    </span>
                  </Dropdown.Header>
                  <Dropdown.Item
                    icon={LuHome}
                    as={Link}
                    to={"/"}
                  >
                    Beranda
                  </Dropdown.Item>
                  <Dropdown.Item icon={LuLogOut} onClick={Logout}>
                    Keluar
                  </Dropdown.Item>
                </Dropdown>
          </div>
        </div>

        {/* Konten utama */}
        <div className="md:pt-0">
          <div
            className={`px-4 pb-5 transition-all duration-300 ease-in-out ${
              isHovered ? "md:ml-60" : "md:ml-28"
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="md:col-span-2 space-y-7">
                {/* Welcome Section */}
                <div className="w-[100%] ml-3 md:w-full rounded-xl bg-[#F5F5F7] flex flex-col md:flex-row items-center px-4 py-3 md:px-10">
                  <div className="w-full md:w-[70%] mb-4 md:mb-0">
                    <h1 className="text-2xl md:text-[2.5rem] font-bold mb-2 md:mb-3 text-[#000] leading-none">
                      Halo, {investor?.username}
                    </h1>
                    <p className="text-[#000]">Senang bertemu dengan Anda 👋</p>
                  </div>

                  <div className="w-full md:w-[30%]">
                    <img
                      src={WavingIllustration}
                      alt="Waving Illustration"
                      className="w-32 md:w-auto mx-auto"
                    />
                  </div>
                </div>

                {/* Total Investasi Section */}
                <div className="w-[100%] ml-3 md:w-full rounded-xl bg-[#F5F5F7] flex flex-col md:flex-row items-center p-4 md:p-8">
                  <div className="flex flex-col w-full">
                    <h1 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-[#000]">
                      Total Investasi
                    </h1>
                    <div className="flex items-center justify-center md:justify-start space-x-4">
                      <img
                        src={GrowingMoney}
                        alt="Growing Money"
                        className="w-24 h-24 md:w-36 md:h-36"
                      />
                      <h1 className="text-2xl md:text-3xl font-bold ml-2 text-[#000]">
                        {formatRupiah(totalInvestasi)}
                      </h1>
                    </div>
                  </div>
                </div>

                {/* Bagi Hasil Section */}
                <div className="w-[100%] ml-3 md:w-full rounded-xl bg-[#F5F5F7] flex flex-col md:flex-row items-center p-4 md:p-8">
                  <div className="flex flex-col w-full">
                    <h1 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-[#000]">
                      Bagi Hasil
                    </h1>
                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 ml-1">
                      <CardBagiHasil
                        batch="Batch 1"
                        profit="Rp2.000.000"
                        percentage="2.7%"
                      />
                      <CardBagiHasil
                        batch="Batch 2"
                        profit="Rp1.500.000"
                        percentage="2.5%"
                      />
                    </div>
                  </div>
                </div>

                {/* Investasi yang Sedang Berlangsung Section */}
                <div className="w-[100%] ml-3 md:w-[151%] md:rounded-xl rounded-xl bg-[#F5F5F7] p-4 md:p-8 relative">
                  <h1 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-[#000]">
                    Investasi yang Sedang Berlangsung
                  </h1>

                  <div className="relative flex items-center">
                    <div className="flex overflow-x-auto gap-4 md:gap-10 w-full scrollbar-hide">
                      <BatchListInvestor batchs={batchs} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Calendar and Notification Section */}
              <div className="md:col-span-1 relative">
                <div className="hidden md:flex items-center justify-between gap-5 mb-4">
                  <form className="w-full md:w-[63%]">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center ps-3 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-500"
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
                        className="block w-full p-2 pl-10 text-sm text-gray-900 bg-[#F5F5F7] rounded-xl"
                        placeholder="Cari"
                      />
                    </div>
                  </form>

                  <MdNotificationsActive className="w-8 h-8 text-gray-500" />
                <img
                  src={ `http://localhost:3000/api/biodata-investor/images/${investor?.investorBiodata.foto_profil}`}
                  alt="Default Profile"
                  className="w-10 h-10 rounded-full"
                />
                <Dropdown
                  label=""
                  dismissOnClick={false}
                  placement="bottom-start"
                  renderTrigger={() => (
                    <span className="cursor-pointer">
                      <LuChevronDown className="w-5 h-5 -ml-4" />
                    </span>
                  )}
                >
                  <Dropdown.Header>
                    <span className="block text-base">{investor?.username}</span>
                    <span className="block truncate text-sm font-medium">
                      {investor?.email}
                    </span>
                  </Dropdown.Header>
                  <Dropdown.Item
                    icon={LuHome}
                    as={Link}
                    to={"/"}
                  >
                    Beranda
                  </Dropdown.Item>
                  <Dropdown.Item icon={LuLogOut} onClick={Logout}>
                    Keluar
                  </Dropdown.Item>
                </Dropdown>
                </div>
                <div className="relative w-full h-100 ml-3 md:h-auto md:overflow-hidden overflow-x-scroll">
                  <div className="w-[330px] h-[200px] md:w-full md:h-full">
                    <CalendarInvestor />
                  </div>
                </div>
                <p className="bg-[#572618] absolute bottom-0 right-7 text-xs text-zinc-50 rounded-xl md:hidden pr-3 pl-3">
                    Gulir untuk melihat keseluruhan kalender 
                  </p>
              </div>
            </div>
          </div>
        </div>
      </InvestorLayout>
    </div>
  );
};

export default InvestorDashboard;
