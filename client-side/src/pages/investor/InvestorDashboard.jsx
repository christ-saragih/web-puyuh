import { useState, useEffect } from "react";


// import SidebarInvestor from "../../components/common/SidebarInvestor";
import CardBagiHasil from "../../components/investor/CardBagiHasil";
import CalendarInvestor from "../../components/common/CalendarInvestor";
// import CardBatchInvestor from "../../components/investor/CardBatchInvestor";
import WavingIllustration from "../../assets/images/Illustration waving.svg";
import GrowingMoney from "../../assets/images/Growing Money.svg";
import { MdNotificationsActive } from "react-icons/md";
// import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { apiInvestor } from "../../hooks/useAxiosConfig";
import { formatRupiah } from "../../utils/formatRupiah";
import { getTransaksi } from "../../services/transaksi.service";
import BatchListInvestor from "../../components/investor/BatchListInvestor";
import { getBatchs } from "../../services/batch.service";
import { formatDate } from "../../utils/formatDate";
import InvestorLayout from "../../layouts/InvestorLayout";
import { Dropdown, Modal } from "flowbite-react";
import { LuChevronDown, LuHome, LuLogOut } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { PiUserBold, PiUsersThreeBold } from "react-icons/pi";

const InvestorDashboard = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [investor, setInvestor] = useState(null); // State untuk menyimpan data investor
  const [loading, setLoading] = useState(true); // State untuk loading
  const [transaksi, setTransaksi] = useState([]);
  const navigate = useNavigate();
  const [batchs, setBatchs] = useState([]);
  const [investasi, setInvestasi] = useState([]);
  const [markedDates, setMarkedDates] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        apiInvestor.post("/notifikasi/notifikasiInvestasi")
        const [investorResponse, transaksiData, batchsData, investasiResponse, notificationsResponse] = await Promise.all([
          apiInvestor.get("/investor"),
          new Promise(resolve => getTransaksi(resolve)),
          new Promise(resolve => getBatchs(resolve)),
          apiInvestor.get("/investasi"),
          apiInvestor.get("/notifikasi/notifikasiInvestasi")
        ]);

        setInvestor(investorResponse.data.data);
        setTransaksi(transaksiData);
        setBatchs(batchsData);
        setInvestasi(investasiResponse.data.data);
        setNotifications(notificationsResponse.data.data); 

        // Filter investasi yang sedang "proses" dan simpan tanggalnya
        const dates = investasiResponse.data.data
          .filter((investment) => investment.status === "proses")
          .map((investment) => new Date(investment.tanggal_berakhir_penawaran));

        setMarkedDates(dates); // Set array tanggal yang ditandai
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response?.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);
  
  const totalInvestasi = transaksi.reduce((total, item) => {
    return total + item.total_investasi;
  }, 0);

  const calculateProfit = (totalInvestasi, percentage) => {
    return totalInvestasi * (percentage / 100);
  };

  const getInvestasiByBatch = () => {
    const investasiByBatch = {};
    transaksi.forEach(t => {
      if (!investasiByBatch[t.investasiId]) {
        investasiByBatch[t.investasiId] = {
          total_investasi: 0,
          batch_id: t.investasiId,
          status: t.status
        };
      }
      investasiByBatch[t.investasiId].total_investasi += t.total_investasi;
    });
    return Object.values(investasiByBatch);
  };

  const investasiByBatch = getInvestasiByBatch();

  // Fungsi untuk mendapatkan investasi yang status-nya "proses"
  const filteredInvestments = investasi.filter(
    (data) => data.status === "proses"
  );

  console.log(filteredInvestments);
  
  const convertedMarkedDates = markedDates.map(dateString => new Date(dateString));

   // Fungsi untuk mendapatkan judul batch
   const getBatchTitle = (batchId) => {
    const batch = batchs.find(b => b.id === batchId);
    return batch ? batch.judul : `${batchId}`;
  };

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
        <div className="fixed top-0 left-0 bottom-0 z-50 md:hidden"></div>

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
            <MdNotificationsActive className="ml-4 w-8 h-8 text-gray-500" onClick={() => setShowNotificationModal(true)} />
            {investor?.investorBiodata?.foto_profil ? (
              <img
                src={`http://locaxlhost:3000/api/biodata-investor/images/${investor.investorBiodata.foto_profil}`}
                alt={investor.investorBiodata.foto_profil}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 p-2">
                {investor?.kategori_investor === "organisasi" ? (
                  <PiUsersThreeBold className="w-full h-full" />
                ) : (
                  <PiUserBold className="w-full h-full" />
                )}
              </div>
            )}
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
              <Dropdown.Item icon={LuHome} as={Link} to={"/"}>
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
                <div className="w-[100%] ml-3 md:w-full h-[25%] rounded-xl bg-[#F5F5F7] flex flex-col md:flex-row items-center p-4 md:p-8">
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

                {/* Grid for Bagi Hasil and Investasi yang Sedang Berlangsung */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-[150%] ml-3 mt-7">
                  {/* Bagi Hasil Section */}
                  <div className="w-full rounded-xl bg-[#F5F5F7] flex flex-col p-4 md:p-8">
                    <h1 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-[#000]">
                      Bagi Hasil
                    </h1>
                    <div className="relative">
                      <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
                        {investasiByBatch.map((inv, index) => {
                          const batchInfo = investasi.find(i => i.id === inv.batch_id);
                          const batchTitle = getBatchTitle(inv.batch_id);
                          return (
                            <div key={index} className="flex-shrink-0 w-64">
                              <CardBagiHasil
                                batch={batchTitle}
                                profit={formatRupiah(calculateProfit(inv.total_investasi, batchInfo?.bagi_hasil || 0))}
                                percentage={`${batchInfo?.bagi_hasil || 0}%`}
                                status={inv.status}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Investasi yang Sedang Berlangsung Section */}
                  <div className="w-full rounded-xl bg-[#F5F5F7] p-4 md:p-8 relative">
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
              </div>

              {/* Calendar and Notification Section */}
              <div className="md:col-span-1 relative">
                <div className="hidden md:flex items-center justify-between  mb-4">
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

                  <MdNotificationsActive className="w-8 h-8 text-gray-500" onClick={() => setShowNotificationModal(true)} />
                  {investor?.investorBiodata?.foto_profil ? (
                    <img
                      src={`http://localhost:3000/api/biodata-investor/images/${investor.investorBiodata.foto_profil}`}
                      alt={investor.investorBiodata.foto_profil}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 p-2">
                      {investor?.kategori_investor === "organisasi" ? (
                        <PiUsersThreeBold className="w-full h-full" />
                      ) : (
                        <PiUserBold className="w-full h-full" />
                      )}
                    </div>
                  )}
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
                      <span className="block text-base">
                        {investor?.username}
                      </span>
                      <span className="block truncate text-sm font-medium">
                        {investor?.email}
                      </span>
                    </Dropdown.Header>
                    <Dropdown.Item icon={LuHome} as={Link} to={"/"}>
                      Beranda
                    </Dropdown.Item>
                    <Dropdown.Item icon={LuLogOut} onClick={Logout}>
                      Keluar
                    </Dropdown.Item>
                  </Dropdown>
                </div>
                <div className="bg-[#F5F5F7] rounded-xl py-2 px-6 mb-7 shadow-md">
                   <CalendarInvestor 
                   markedDates={convertedMarkedDates} 
                   />  
                </div>
                {/* <p className="bg-[#572618] absolute bottom-0 right-7 text-xs text-zinc-50 rounded-xl md:hidden pr-3 pl-3">
                  Gulir untuk melihat keseluruhan kalender
                </p> */}
              </div>

              {/* Notification Modal */}
                <Modal show={showNotificationModal} onClose={() => setShowNotificationModal(false)}>
                  <Modal.Header>Pemberitahuan</Modal.Header>
                  <Modal.Body>
                    <div className="space-y-4">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className="rounded-lg border border-t-4 border-gray-300 border-t-[#fc6a2f] py-2 px-4"
                          >
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="font-semibold text-lg truncate">
                                {notification.judul}
                              </h4>
                              <p className="text-sm font-medium bg-gray-100 px-2 py-1 rounded shrink-0">
                                {formatDate(notification.createdAt)}
                              </p>
                            </div>
                            <p>{`Tanggal Pembukaan ${formatDate(notification.tanggal)}`}</p>
                          </div>
                        ))
                      ) : (
                        <p>Tidak ada pemberitahuan saat ini.</p>
                      )}
                    </div>
                  </Modal.Body>
                </Modal>
            </div>
          </div>
        </div>
      </InvestorLayout>
    </div>
  );
};

export default InvestorDashboard;
