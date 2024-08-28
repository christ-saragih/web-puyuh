import { useState, useEffect } from "react";
import Navbar from "../../components/guest/Navbar";
import Tabs from "../../components/guest/Tabs";
import GuestLayout from "../../layouts/GuestLayout";
import { getDetailInvestasiBySlug } from "../../services/batch.service";
import {
  PiCalendarCheckDuotone,
  PiCalendarDotsDuotone,
  PiMoneyWavyDuotone,
  PiTargetDuotone,
  PiTimerDuotone,
  PiUserBold,
  PiUsersThreeBold,
  PiCalendarXDuotone,
  PiPercent
} from "react-icons/pi";
import { useParams } from "react-router-dom";
import { formatRupiah } from "../../utils/formatRupiah";

const DetailInvestasi = () => {
  const { slug } = useParams();
  const [tab, setTab] = useState(1);
  const [investasi, setInvestasi] = useState(null);

  useEffect(() => {
    // Mengambil detail investasi
    getDetailInvestasiBySlug(slug, (data) => {
      setInvestasi(data);
    });
  }, [slug]);

  // Menangani kasus jika investasi tidak ada
  if (!investasi) {
    return <div>Data artikel tidak ditemukan!</div>;
  }

  // Mengambil total dan target dari objek investasi
  const total = investasi.total_pendanaan;
  const target = investasi.target_pendanaan;

  // Kalkulasi persentase
  const percentage = Math.round((total / target) * 100);
  const bgColor = percentage < 100 ? "#e3a008" : "#057a55";
  const textColor = percentage < 100 ? "#e3a008" : "#057a55";
  const statusText = percentage < 100 ? "terkumpul" : "tercapai";

  return (
    <>
      <Navbar />
      <GuestLayout className="mt-28 lg:mt-32">
        <div className="max-w-3xl mx-auto">
          <div className="h-96 mb-4 rounded-xl overflow-hidden">
            <img
              src={investasi.gambar}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-bold text-3xl mb-1">{investasi.judul}</h2>
              <p className="font-medium text-lg">{investasi.penerbit}</p>
            </div>
            <div className="bg-[#FFA90B] font-semibold text-white text-lg text-center py-1 w-32 rounded-3xl">
              12 hari lagi
            </div>
          </div>

          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="font-bold text-2xl">{formatRupiah(total)}</p>
              <p>dari target dana {formatRupiah(target)}</p>
            </div>
            <div className="bg-[#f8e7d8] font-semibold text-[#B87817] text-lg text-center py-1 w-32 rounded-3xl">
            {investasi.transaksi.length} investor
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full">
            <div className="bg-[#e3a008] font-medium text-blue-100 text-center p-0.5 leading-none rounded-full w-1/2">
              {percentage} %
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
              <p>
                {investasi.deskripsi}<br /> <br />
                <h3 className="text-2xl mb-4 font-semibold">
                  Penggunaan Dana
                </h3>
                {investasi.penggunaan_dana}
              </p>
            </div>

            <div className={tab === 2 ? "block" : "hidden"}>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-16 h-16 p-1">
                    <PiCalendarCheckDuotone className="w-full h-full" />
                  </div>
                  <div>
                    <p className="text-lg font-medium">Tanggal Dibuka</p>
                    <p>{investasi.tanggal_pembukaan_penawaran}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-16 p-1">
                    <PiCalendarXDuotone className="w-full h-full" />
                  </div>
                  <div>
                    <p className="text-lg font-medium">Tanggal Ditutup</p>
                    <p>{investasi.tanggal_berakhir_penawaran}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-16 p-1">
                    <PiTargetDuotone className="w-full h-full" />
                  </div>
                  <div>
                    <p className="text-lg font-medium">Target Pendanaan</p>
                    <p>Rp4.062.500.000</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-16 p-1">
                    <PiPercent className="w-full h-full" />
                  </div>
                  <div>
                    <p className="text-lg font-medium">Bagi Hasil</p>
                    <p>{investasi.bagi_hasil}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-16 p-1">
                    <PiCalendarDotsDuotone className="w-full h-full" />
                  </div>
                  <div>
                    <p className="text-lg font-medium">Tenor</p>
                    <p>{investasi.tenor}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-16 p-1">
                    <PiCalendarCheckDuotone className="w-full h-full" />
                  </div>
                  <div>
                    <p className="text-lg font-medium">Pembayaran Bagi Hasil</p>
                    <p>{investasi.pembayaran_bagi_hasil}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-16 p-2">
                    <PiMoneyWavyDuotone className="w-full h-full" />
                  </div>
                  <div>
                    <p className="text-lg font-medium">Minimum Investasi</p>
                    <p>{investasi.minimum_investasi}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-16 p-2">
                    <PiMoneyWavyDuotone className="w-full h-full" />
                  </div>
                  <div>
                    <p className="text-lg font-medium">Maksimum Investasi</p>
                    <p>{investasi.maksimum_investasi}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={tab === 3 ? "block" : "hidden"}>
              <div className="w-full" dangerouslySetInnerHTML={{ __html: investasi.url_map }} />
              <p>{investasi.alamat}</p>
            </div>

            <div className={tab === 4 ? "block" : "hidden"}>
              <h3 className="text-2xl font-semibold mb-4">Investor ({investasi.transaksi.length})</h3>
              {investasi.transaksi.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {investasi.transaksi.map((item) => (
                    <div key={item.id} className="flex gap-3 items-center">
                      <div className="w-16 h-16 p-1 bg-gray-200 rounded-full p-2">
                        {/* Sesuaikan icon berdasarkan kategori_investor */}
                        {item.kategori_investor === "organisasi" ? (
                          <PiUsersThreeBold className="w-full h-full" />
                        ) : (
                          <PiUserBold className="w-full h-full" />
                        )}
                      </div>
                      <div className="grow">
                        {/* Mengakses nama_lengkap dari item */}
                        <p className="text-lg font-medium">{item.nama_lengkap}</p>
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
        </div>
      </GuestLayout>
    </>
  );
};

export default DetailInvestasi;
