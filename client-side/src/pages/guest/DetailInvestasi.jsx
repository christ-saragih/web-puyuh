import Tabs from "../../components/guest/Tabs";
import Modal from "../../components/common/Modal";
import ModalInvestasi from "../../components/investor/ModalInvestasi";
import GuestLayouts from "../../layouts/GuestLayouts";
import { getDetailInvestasiBySlug } from "../../services/batch.service";
import { formatDate } from "../../utils/formatDate";
import { formatRupiah } from "../../utils/formatRupiah";
import { calculateDaysRemaining } from "../../utils/calculateDaysRemaining";
import { useState, useEffect, useContext, useCallback } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { useNavigate, useParams } from "react-router-dom";
import {
  PiCalendarCheckDuotone,
  PiCalendarDotsDuotone,
  PiMoneyWavyDuotone,
  PiTargetDuotone,
  PiUserBold,
  PiUsersThreeBold,
  PiCalendarXDuotone,
  PiPercent,
} from "react-icons/pi";
import { RiFacebookCircleFill, RiWhatsappFill } from "react-icons/ri";
import { Clipboard, Flowbite } from "flowbite-react";

// Custom Clipboard: Start
const customTheme = {
  clipboard: {
    withIconText: {
      icon: {
        successIcon: "me-1.5 h-3 w-3 text-[#4B241A]",
      },
      label: {
        successText: "text-xs font-semibold text-[#4B241A]",
      },
    },
  },
};
// Custom Clipboard: End

const DetailInvestasi = () => {
  const { user } = useContext(AuthContext);
  const { slug } = useParams();
  const [tab, setTab] = useState(1);
  const [showModal, setShowModal] = useState(false); // State untuk modal
  const [investasi, setInvestasi] = useState(null);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const fetchInvestasiData = useCallback(() => {
    getDetailInvestasiBySlug(slug, (data) => {
      setInvestasi(data);
    });
  }, [slug]);

  useEffect(() => {
    fetchInvestasiData();

    // Set up an interval to fetch data every 30 seconds
    const intervalId = setInterval(fetchInvestasiData, 30000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [fetchInvestasiData]);

  if (!investasi) {
    return <div>Data artikel tidak ditemukan!</div>;
  }

  // Kalkulasi persentase
  const percentage = Math.round(
    (investasi.total_pendanaan / investasi.target_pendanaan) * 100
  );

  // Status investasi
  const statusInfo =
    investasi.status === "segera"
      ? "#5766CE"
      : investasi.status === "proses"
      ? "#FFA90B"
      : "#138a36";

  const getButtonText = () => {
    switch (investasi.status) {
      case "selesai":
        return "Investasi Selesai";
      case "segera":
        return "Investasi Segera Dibuka";
      default:
        return "Investasi Sekarang";
    }
  };

  const handleButtonClick = () => {
    if (investasi.status === "proses") {
      if (user) {
        setShowModal(true);
      } else {
        navigate("/masuk");
      }
    }
    // For "selesai" and "segera" statuses, the button doesn't do anything
  };

  // Modal Share Investment: Start
  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalType("");
    setIsModalOpen(false);
  };
  // Modal Share Investment: End

  // Share Investment: Start
  const shareToWhatsApp = () => {
    const message = `Ayo bergabung dalam peluang investasi yang menarik ini di ${investasi.judul}! 🙌\n\nDukung komunitas dan dapatkan keuntungan dari usaha yang berkembang pesat. Jangan sampai ketinggalan! 🌱\n\nLihat detail lengkapnya dan segera berinvestasi di sini: ${window.location.origin}/investasi/${investasi.slug}`;
    const shareUrl = `https://api.whatsapp.com/send/?text=${encodeURIComponent(
      message
    )}`;
    window.open(shareUrl, "_blank");
  };

  const shareToFacebook = () => {
    const message = `Ayo bergabung dalam peluang investasi yang menarik ini di ${investasi.judul}! 🙌\n\nDukung komunitas dan dapatkan keuntungan dari usaha yang berkembang pesat. Jangan sampai ketinggalan! 🌱\n\nLihat detail lengkapnya dan segera berinvestasi di sini: ${window.location.origin}/investasi/${investasi.slug}`;
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${
      window.location.origin
    }/investasi/${investasi.slug}&quote=${encodeURIComponent(message)}`;
    window.open(shareUrl, "_blank");
  };
  // Share Investment: End

  const handleClosePayment = () => {
    setShowModal(false);
    // Refresh the investment data
    fetchInvestasiData();
  };

  return (
    <GuestLayouts>
      <div className="w-[90%] max-w-3xl mx-auto mt-12 lg:mt-16">
        <div className="h-96 mb-4 rounded-xl overflow-hidden">
          <img
            src={`http://localhost:3000/api/investasi/image/${investasi.gambar}`}
            alt={investasi.gambar}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="font-bold text-3xl mb-1">{investasi.judul}</h2>
            <p className="font-medium text-lg">{investasi.penerbit}</p>
          </div>

          <div
            className=" font-semibold text-white text-lg text-center py-1 min-w-28 px-4 rounded-3xl"
            style={{ backgroundColor: statusInfo }}
          >
            {investasi.status === "proses"
              ? `${calculateDaysRemaining(
                  investasi.tanggal_pembukaan_penawaran,
                  investasi.tanggal_berakhir_penawaran
                )} hari lagi`
              : investasi.status}
          </div>
        </div>

        <div className="flex items-center justify-between mb-2">
          <div>
            <p
              className="font-bold text-2xl"
              style={{
                color: `${
                  investasi.status === "selesai" ? "#138A36" : "#FFA90B"
                }`,
              }}
            >
              {formatRupiah(investasi.total_pendanaan)}
            </p>
            <p>dari target dana {formatRupiah(investasi.target_pendanaan)}</p>
          </div>
          <div className="bg-[#f8e7d8] font-semibold text-[#B87817] text-lg text-center py-1 w-32 rounded-3xl">
            {investasi.transaksi.length} investor
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full">
          <div
            className="bg-[#FFA90B] font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
            style={{
              width: `${percentage}%`,
              backgroundColor: `${
                investasi.status === "selesai" ? "#138A36" : "#FFA90B"
              }`,
            }}
          >
            {percentage}%
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 my-12">
          <a
            href="#"
            className="py-2 text-lg font-semibold text-center text-[#4B241A] border-2 border-[#4B241A] rounded-3xl shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
          >
            Unduh Proposal
          </a>
          <button
            onClick={() => openModal("share_investment")}
            className="py-2 text-lg font-semibold text-center text-[#4B241A] border-2 border-[#4B241A] rounded-3xl shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
          >
            Bagikan Bisnis
          </button>

          <Modal open={isModalOpen} onClose={closeModal} size="sm">
            {modalType === "share_investment" && (
              <>
                <Modal.Header onClose={closeModal}>
                  <div className="flex justify-center w-full px-10">
                    <div className="w-[100%] -mt-16 h-64 overflow-hidden rounded-xl shadow-lg">
                      <img
                        src={`http://localhost:3000/api/investasi/image/${investasi.gambar}`}
                        alt={investasi.gambar}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </Modal.Header>
                <Modal.Body>
                  <div className="flex items-center mt-4 flex-col px-10 pb-5">
                    <h3 className="text-2xl font-semibold text-center mb-5">
                      Bagikan kesempatan investasi dan kembangkan komunitas
                      sosial Anda!
                    </h3>
                    <div className="flex gap-4 items-center mb-6">
                      <button
                        onClick={shareToWhatsApp}
                        className="w-16 h-16 overflow-hidden bg-[#30b945] rounded-full p-4 bg-opacity-10 hover:bg-opacity-20 group transition-all duration-300 ease-in-out"
                      >
                        <RiWhatsappFill className="text-[#30b945] w-full h-full object-cover group-hover:text-opacity-95 transition-all duration-300 ease-in-out" />
                      </button>
                      <button
                        onClick={shareToFacebook}
                        className="w-16 h-16 overflow-hidden bg-[#385398] rounded-full p-4 bg-opacity-10 hover:bg-opacity-20 group transition-all duration-300 ease-in-out"
                      >
                        <RiFacebookCircleFill className="text-[#385398] w-full h-full object-cover group-hover:text-opacity-95 transition-all duration-300 ease-in-out" />
                      </button>
                    </div>
                    <div className="flex flex-col w-full">
                      <p className="text-sm text-gray-600 mb-1">
                        atau salin link
                      </p>

                      <div className="grid w-full">
                        <div className="relative">
                          <label htmlFor="npm-install" className="sr-only">
                            Label
                          </label>
                          <input
                            id="npm-install"
                            type="text"
                            className="col-span-6 block w-full rounded-xl border-none bg-gray-100 px-2.5 py-4 text-sm text-gray-500 cursor-text"
                            value={`http://localhost:5173/investasi/${investasi.slug}`}
                            disabled
                            readOnly
                          />
                          <Flowbite theme={{ theme: customTheme }}>
                            <Clipboard.WithIconText
                              valueToCopy={`http://localhost:5173/investasi/${investasi.slug}`}
                              className="border-none hover:bg-gray-50"
                            />
                          </Flowbite>
                        </div>
                      </div>
                    </div>
                  </div>
                </Modal.Body>
              </>
            )}
          </Modal>
        </div>

        <Tabs tab={tab} setTab={setTab} />

        <div className="mb-32">
          <div className={tab === 1 ? "block" : "hidden"}>
            <div className="format text-black">
              <p
                dangerouslySetInnerHTML={{
                  __html: investasi.deskripsi,
                }}
              ></p>
            </div>

            <h3 className="text-2xl mb-4 font-semibold">Penggunaan Dana</h3>
            {investasi.penggunaan_dana}
          </div>

          <div className={tab === 2 ? "block" : "hidden"}>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <div className="w-16 h-16 p-1">
                  <PiCalendarCheckDuotone className="w-full h-full text-[#4B241A]" />
                </div>
                <div>
                  <p className="text-lg font-medium">Tanggal Dibuka</p>
                  <p>{formatDate(investasi.tanggal_pembukaan_penawaran)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-16 h-16 p-1">
                  <PiCalendarXDuotone className="w-full h-full text-[#4B241A]" />
                </div>
                <div>
                  <p className="text-lg font-medium">Tanggal Ditutup</p>
                  <p>{formatDate(investasi.tanggal_berakhir_penawaran)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-16 h-16 p-1">
                  <PiTargetDuotone className="w-full h-full text-[#4B241A]" />
                </div>
                <div>
                  <p className="text-lg font-medium">Target Pendanaan</p>
                  <p>{formatRupiah(investasi.target_pendanaan)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-16 h-16 p-1">
                  <PiPercent className="w-full h-full text-[#4B241A]" />
                </div>
                <div>
                  <p className="text-lg font-medium">Bagi Hasil</p>
                  <p>{investasi.bagi_hasil}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-16 h-16 p-1">
                  <PiCalendarDotsDuotone className="w-full h-full text-[#4B241A]" />
                </div>
                <div>
                  <p className="text-lg font-medium">Tenor</p>
                  <p>{investasi.tenor}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-16 h-16 p-1">
                  <PiCalendarCheckDuotone className="w-full h-full text-[#4B241A]" />
                </div>
                <div>
                  <p className="text-lg font-medium">Pembayaran Bagi Hasil</p>
                  <p>{investasi.pembayaran_bagi_hasil}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-16 h-16 p-2">
                  <PiMoneyWavyDuotone className="w-full h-full text-[#4B241A]" />
                </div>
                <div>
                  <p className="text-lg font-medium">Minimum Investasi</p>
                  <p>{formatRupiah(investasi.minimum_investasi)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-16 h-16 p-2">
                  <PiMoneyWavyDuotone className="w-full h-full text-[#4B241A]" />
                </div>
                <div>
                  <p className="text-lg font-medium">Maksimum Investasi</p>
                  <p>{formatRupiah(investasi.maksimum_investasi)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className={tab === 3 ? "block" : "hidden"}>
            <div
              className="w-full h-[400px] mb-3"
              dangerouslySetInnerHTML={{
                __html: investasi.url_map,
              }}
            />
            <p>{investasi.alamat}</p>
          </div>

          <div className={tab === 4 ? "block" : "hidden"}>
            <h3 className="text-2xl font-semibold mb-4">
              Investor ({investasi.transaksi.length})
            </h3>
            {investasi.transaksi.length > 0 ? (
              <div className="flex flex-col gap-4">
                {investasi.transaksi
                  .sort((a, b) => b.total_investasi - a.total_investasi)
                  .map((item) => (
                    <div
                      key={item.investorId}
                      className="flex gap-3 items-center"
                    >
                      <div className="w-16 h-16 bg-gray-200 rounded-full p-2">
                        {/* Sesuaikan icon berdasarkan kategori_investor */}
                        {item.kategori_investor === "organisasi" ? (
                          <PiUsersThreeBold className="w-full h-full text-[#4B241A]" />
                        ) : (
                          <PiUserBold className="w-full h-full text-[#4B241A]" />
                        )}
                      </div>
                      <div className="grow">
                        <p className="text-lg font-medium">
                          {item.nama_lengkap}
                        </p>
                        <p>{item.kategori_investor}</p>
                      </div>
                      <div className="bg-[#f8e7d8] font-semibold text-[#B87817] text-lg text-center py-1 min-w-40 max-w-fit rounded-3xl">
                        {formatRupiah(item.total_investasi)}
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <p>Belum ada transaksi.</p>
            )}
          </div>
        </div>
        <div className="fixed bottom-0 left-0 w-full bg-white border-t-2">
          <div className="flex justify-center py-5">
            <button
              onClick={handleButtonClick}
              className={`w-11/12 max-w-md py-2 px-4 text-lg font-semibold text-center text-white rounded-3xl shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] ${
                investasi.status === "selesai"
                  ? "bg-gray-500 cursor-not-allowed"
                  : investasi.status === "segera"
                  ? "bg-[#5766CE] cursor-not-allowed"
                  : "bg-[#4B241A]"
              }`}
              disabled={investasi.status !== "proses"}
            >
              {getButtonText()}
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <ModalInvestasi
          open={showModal}
          closeModal={handleClosePayment}
          investasiId={investasi.id}
          onClosePayment={handleClosePayment}
      />
      )}
    </GuestLayouts>
  );
};

export default DetailInvestasi;
