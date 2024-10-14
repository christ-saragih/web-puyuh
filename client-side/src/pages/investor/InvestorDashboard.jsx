import { useState, useEffect } from "react";


// import SidebarInvestor from "../../components/common/SidebarInvestor";
import CardBagiHasil from "../../components/investor/CardBagiHasil";
import CalendarInvestor from "../../components/common/CalendarInvestor";
// import CardBatchInvestor from "../../components/investor/CardBatchInvestor";
import WavingIllustration from "../../assets/images/Illustration waving.svg";
import GrowingMoney from "../../assets/images/Growing Money.svg";
import { MdNotifications } from "react-icons/md";
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
import ProfileCompletenessIndicator from "../../components/investor/ProfileCompletenessIndicator";


const InvestorDashboard = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [investor, setInvestor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [transaksi, setTransaksi] = useState([]);
  const navigate = useNavigate();
  const [batchs, setBatchs] = useState([]);
  const [investasi, setInvestasi] = useState([]);
  const [markedDates, setMarkedDates] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const { logout } = useContext(AuthContext);
  const [markedDatesInfo, setMarkedDatesInfo] = useState([]);
  const [flashMessages, setFlashMessages] = useState({
    urgent: [],
    upcoming: []
  });
  const [profileCompleteness, setProfileCompleteness] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          investorResponse, 
          transaksiData, 
          batchsData, 
          investasiResponse, 
          notificationsResponse
        ] = await Promise.all([
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
  
        const unreadCount = notificationsResponse.data.data.filter(notif => notif.status == 0).length;
        setUnreadNotifications(unreadCount);
  
        const dates = investasiResponse.data.data
          .filter((investment) => investment.status === "proses")
          .map((investment) => new Date(investment.tanggal_berakhir_penawaran));
  
        setMarkedDates(dates);

        const investmentInfo = investasiResponse.data.data
          .filter((investment) => investment.status === "proses")
          .map((investment) => ({
            date: new Date(investment.tanggal_berakhir_penawaran),
            batchTitle: getBatchTitle(investment.judul)
          }));

        setMarkedDatesInfo(investmentInfo);

        checkUpcomingInvestments(investasiResponse.data.data);

        const completeness = calculateProfileCompleteness(investorResponse.data.data);
        setProfileCompleteness(completeness);
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

    const intervalId = setInterval(() => {
      checkUpcomingInvestments(investasi);
    }, 3600000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [navigate]);

  const calculateProfileCompleteness = (investorData) => {
    let completed = 0;
    const totalFields = 4; // biodata, alamat, identitas, pendukung

    if (investorData.investorBiodata) completed++;
    if (investorData.investorAlamat) completed++;
    if (investorData.investorIdentitas) completed++;
    if (investorData.investorDataPendukung) completed++;

    console.log(investorData.investorIdentitas);
    

    return Math.round((completed / totalFields) * 100);
  };

  const checkUpcomingInvestments = (investments) => {
    const now = new Date();
    const urgentMessages = [];
    const upcomingMessages = [];
    
    investments.forEach(investment => {
      const openingDate = new Date(investment.tanggal_pembukaan_penawaran);
      const daysUntilOpening = Math.ceil((openingDate - now) / (1000 * 60 * 60 * 24));
      
      if (daysUntilOpening === 1) {
        upcomingMessages.push(`Investasi ${investment.judul} akan dibuka dalam 1 hari.`);
      } else if (daysUntilOpening >= 3 && daysUntilOpening <= 7) {
        upcomingMessages.push(`Investasi ${investment.judul} akan dibuka dalam ${daysUntilOpening} hari.`);
      }
    });
  
    setFlashMessages({
      urgent: urgentMessages,
      upcoming: upcomingMessages
    });
  };

  const handleNotificationClick = async () => {
    setShowNotificationModal(true);
    setUnreadNotifications(0);
  
    try {
      // Update notification status
      await apiInvestor.put("/notifikasi/notifikasiInvestasi/ubahStatus");
      
      // Refresh notifications after status update
      const updatedNotificationsResponse = await apiInvestor.get("/notifikasi/notifikasiInvestasi");
      setNotifications(updatedNotificationsResponse.data.data);
    } catch (error) {
      console.error("Error updating notification status:", error);
    }
  };
  
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

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleBatchClick = (slug) => {
    console.log(`Navigating to batch ${slug}`);
    navigate(`/investasi/${slug}`);
  };


  return (
    <div className="bg-white w-dvw min-h-screen overflow-y-auto md:py-5 py-14 pe-6 relative">
      <InvestorLayout>
        {/* Sidebar untuk tampilan mobile */}
        <div className="fixed top-0 left-0 bottom-0 z-50 md:hidden"></div>

        {/* Header untuk Mobile */}
        <div className="bottom-0 left-0 right-0 z-40 md:hidden flex items-center justify-between p-4">
        <ProfileCompletenessIndicator completeness={profileCompleteness} />
          <div className="flex items-center space-x-4">
            <MdNotifications className="ml-4 w-8 h-8 text-gray-500" onClick={() => setShowNotificationModal(true)} />
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
            className={`px-4 py-1 transition-all duration-300 ease-in-out ${
              isHovered ? "md:ml-60" : "md:ml-28"
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 h-full">
              <div className="md:col-span-2 space-y-12 flex flex-col">
                {/* Welcome Section */}
                {/* Flash Message */}
                {/* Urgent Flash Messages */}
                  {flashMessages.urgent.length > 0 && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-1 mb-4 md:ml-3 md:mb-1 md:max-w-[1000px] rounded-lg" role="alert">
                      <p className="font-bold">Pengingat</p>
                      {flashMessages.urgent.map((message, index) => (
                        <p key={index}>{message}</p>
                      ))}
                    </div>
                  )}

                  {/* Upcoming Flash Messages */}
                  {flashMessages.upcoming.length > 0 && (
                    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 md:ml-3 md:mb-1 md:max-w-[1000px] rounded-lg" role="alert">
                      <p className="font-bold">Pengingat</p>
                      {flashMessages.upcoming.map((message, index) => (
                        <p key={index}>{message}</p>
                      ))}
                    </div>
                  )}
                <div className="w-[100%] ml-3 md:w-full rounded-xl bg-[#F5F5F7] flex flex-col md:flex-row items-center px-4 py-3 md:px-10 md:mb-3">
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
                <div className="w-[100%] ml-3 md:w-full h-[25%] rounded-xl bg-[#F5F5F7] flex flex-col md:flex-row items-center p-4 md:p-8 md:py-7">
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
                  <div className="w-full rounded-xl bg-[#F5F5F7] flex flex-col p-4 md:p-8 min-h-[400px] max-h-[600px]">
                    <h1 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-[#000]">
                      Bagi Hasil
                    </h1>
                    <div className="relative flex-grow flex flex-col justify-center">
                      <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide h-full">
                        {investasiByBatch.length > 0 ? (
                          investasiByBatch.map((inv, index) => {
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
                          })
                        ) : (
                          <div className="flex items-center justify-center w-full h-full">
                            <p className="text-gray-500">Tidak ada data bagi hasil saat ini.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Investasi yang Sedang Berlangsung Section */}
                  <div className="w-full rounded-xl bg-[#F5F5F7] flex flex-col p-4 md:p-8 min-h-[250px] max-h-[400px]">
                    <h1 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-[#000]">
                      Investasi yang Sedang Berlangsung
                    </h1>
                    <div className="relative flex items-center h-full">
                      <div className="flex overflow-x-auto gap-4 md:gap-10 w-full scrollbar-hide">
                        {batchs.length > 0 ? (
                          <BatchListInvestor 
                            batchs={batchs} 
                            onBatchClick={(slug) => {
                              console.log(`BatchListInvestor onClick called with slug: ${slug}`);
                              handleBatchClick(slug);
                            }}  
                          />
                        ) : (
                          <div className="flex items-center justify-center w-full h-full">
                            <p className="text-gray-500">Tidak ada investasi yang sedang berlangsung.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Calendar and Notification Section */}
              <div className="md:col-span-1">
                <div className="hidden md:flex items-center justify-end mb-4">
                  <ProfileCompletenessIndicator completeness={profileCompleteness}/>
                  <div className="relative">
                    <MdNotifications 
                      className="w-8 h-8 text-gray-500 cursor-pointer mr-8" 
                      onClick={handleNotificationClick} 
                    />
                    {unreadNotifications > 0 && (
                      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full mr-8">
                        {unreadNotifications}
                      </span>
                    )}
                  </div>
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
                        <LuChevronDown className="w-5 h-5 ml-1" />
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
                <div className="bg-[#F5F5F7] rounded-xl py-2 px-6 mb-7 shadow-md max-h-[600px] overflow-y-auto">
                   <CalendarInvestor 
                   markedDatesInfo={markedDatesInfo} 
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
                              <h4 className="font-semibold text-lg">
                                {notification.judul}
                              </h4>
                              <p className="text-sm font-medium bg-gray-100 px-2 py-1 rounded shrink-0">
                                {formatDate(notification.createdAt)}
                              </p>
                            </div>
                            {/* <p>{`Tanggal Pembukaan ${formatDate(notification.tanggal)}`}</p> */}
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
