import Navbar from "../../components/guest/Navbar";
import Tabs from "../../components/guest/Tabs";
import ModalInvestasi from "../../components/investor/ModalInvestasi";
import GuestLayout from "../../layouts/GuestLayout";
import { getDetailInvestasiBySlug } from "../../services/batch.service";
import { formatDate } from "../../utils/formatDate";
import { formatRupiah } from "../../utils/formatRupiah";
import { calculateDaysRemaining } from "../../utils/calculateDaysRemaining";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  PiCalendarCheckDuotone,
  PiCalendarDotsDuotone,
  PiMoneyWavyDuotone,
  PiTargetDuotone,
  PiUserBold,
  PiUsersThreeBold,
  PiCalendarXDuotone,
  PiPercent,
  PiCaretDoubleUpBold,
} from "react-icons/pi";

const DetailInvestasi = () => {
  const { slug } = useParams();
  const [tab, setTab] = useState(1);
  const [investasi, setInvestasi] = useState(null);
  const [showModal, setShowModal] = useState(false); // State untuk modal
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    getDetailInvestasiBySlug(slug, (data) => {
      setInvestasi(data);
    });

    // Fungsi untuk memonitor posisi scroll
    const handleScroll = () => {
      if (window.scrollY > 100) {
        // Tombol muncul setelah scroll 300px
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, [slug]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

  return (
    <>
      <Navbar />
      <GuestLayout className="mt-28 lg:mt-32">
        <div className="max-w-3xl mx-auto">
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
            <a
              href="#"
              className="py-2 text-lg font-semibold text-center text-[#4B241A] border-2 border-[#4B241A] rounded-3xl shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
            >
              Bagikan Bisnis
            </a>
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
                className="w-full mb-3"
                dangerouslySetInnerHTML={{ __html: investasi.url_map }}
              />
              <p>{investasi.alamat}</p>
            </div>

            <div className={tab === 4 ? "block" : "hidden"}>
              <h3 className="text-2xl font-semibold mb-4">
                Investor ({investasi.transaksi.length})
              </h3>
              {investasi.transaksi.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {investasi.transaksi.map((item) => (
                    <div key={item.id} className="flex gap-3 items-center">
                      <div className="w-16 h-16 p-1 bg-gray-200 rounded-full p-2">
                        {/* Sesuaikan icon berdasarkan kategori_investor */}
                        {item.kategori_investor === "organisasi" ? (
                          <PiUsersThreeBold className="w-full h-full text-[#4B241A]" />
                        ) : (
                          <PiUserBold className="w-full h-full text-[#4B241A]" />
                        )}
                      </div>
                      <div className="grow">
                        {/* Mengakses nama_lengkap dari item */}
                        <p className="text-lg font-medium">
                          {item.nama_lengkap}
                        </p>
                        <p>{item.kategori_investor}</p>
                      </div>
                      <div className="bg-[#f8e7d8] font-semibold text-[#B87817] text-lg text-center py-1 min-w-40 max-w-fit rounded-3xl">
                        {/* Format total_investasi menggunakan formatRupiah */}
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
                onClick={() => setShowModal(true)}
                className="w-11/12 max-w-md py-2 px-4 text-lg font-semibold text-center text-white bg-[#4B241A] rounded-3xl shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
              >
                Investasi Sekarang
              </button>
            </div>
          </div>
        </div>
      </GuestLayout>
      {showModal && (
        <ModalInvestasi
          open={showModal}
          closeModal={() => setShowModal(false)}
        />
      )}

      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 sm:bottom-5 right-4 p-3 bg-[#4B241A] text-white rounded-full shadow-md hover:bg-[#381d15] hover:bottom-[100px] sm:hover:bottom-6 transition-all ease-in-out duration-300"
        >
          <PiCaretDoubleUpBold size={20} />
        </button>
      )}
    </>
  );
};

export default DetailInvestasi;
