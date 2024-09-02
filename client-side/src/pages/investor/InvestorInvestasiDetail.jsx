import { useState, useEffect } from "react";
import BatchInvestasi from "../../assets/images/batch_investasi.png";
// import Navbar from "../../components/guest/Navbar";
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
  PiPercent,
} from "react-icons/pi";
import { useParams } from "react-router-dom";

const DetailInvestasi = () => {
  const { id } = useParams();
  const { slug } = useParams();
  const [tab, setTab] = useState(1);
  const [investasi, setInvestasi] = useState(null);

  useEffect(() => {
    getDetailInvestasiBySlug(slug, (data) => {
      setInvestasi(data);
    });
  }, [slug]);

  if (!investasi) {
    return <div>Data artikel tidak ditemukan!</div>;
  }

  return (
    <>
      {/* <Navbar /> */}
      <GuestLayout className="mt-28 lg:mt-32">
        {/* <p>detail: {id}</p> */}
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
              <p className="font-bold text-2xl">Rp540.050.000</p>
              <p>dari target dana Rp4.062.500.000</p>
            </div>
            <div className="bg-[#f8e7d8] font-semibold text-[#B87817] text-lg text-center py-1 w-32 rounded-3xl">
              16 investor
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full">
            <div className="bg-[#e3a008] font-medium text-blue-100 text-center p-0.5 leading-none rounded-full w-1/2">
              {" "}
              50%
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
                {/* <h3 className="text-2xl mb-4 font-semibold">
                  Investasi Saham Bisnis Emado's Shawarma Cibubur
                </h3>{" "} */}
                {investasi.deskripsi}
                <br /> <br />
                <h3 className="text-2xl mb-4 font-semibold">
                  Penggunaan Dana
                </h3>{" "}
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
              <div
                className="w-full"
                dangerouslySetInnerHTML={{ __html: investasi.url_map }}
              />
              <p>{investasi.alamat}</p>
            </div>

            <div className={tab === 4 ? "block" : "hidden"}>
              <h3 className="text-2xl font-semibold mb-4">Investor (16)</h3>

              <div className="flex flex-col gap-4">
                <div className="flex gap-3 items-center">
                  <div className="w-16 h-16 p-1 bg-gray-200 rounded-full p-2">
                    <PiUsersThreeBold className="w-full h-full" />
                  </div>
                  <div className="grow">
                    <p className="text-lg font-medium">PT Anak Kereta BSN</p>
                    <p>Organisasi</p>
                  </div>
                  <div className="bg-[#f8e7d8] font-semibold text-[#B87817] text-lg text-center py-1 min-w-40 max-w-fit rounded-3xl">
                    Rp1.430.060.000
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="w-16 h-16 p-1 bg-gray-200 rounded-full p-2">
                    <PiUserBold className="w-full h-full" />
                  </div>
                  <div className="grow">
                    <p className="text-lg font-medium">
                      Bennefit Christy Saragih
                    </p>
                    <p>Individu</p>
                  </div>
                  <div className="bg-[#f8e7d8] font-semibold text-[#B87817] text-lg text-center py-1 min-w-40 max-w-fit rounded-3xl">
                    Rp700.000.000
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="w-16 h-16 p-1 bg-gray-200 rounded-full p-2">
                    <PiUserBold className="w-full h-full" />
                  </div>
                  <div className="grow">
                    <p className="text-lg font-medium">Jonathon Sicina</p>
                    <p>Individu</p>
                  </div>
                  <div className="bg-[#f8e7d8] font-semibold text-[#B87817] text-lg text-center py-1 min-w-40 max-w-fit rounded-3xl">
                    Rp667.000.000
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="w-16 h-16 p-1 bg-gray-200 rounded-full p-2">
                    <PiUserBold className="w-full h-full" />
                  </div>
                  <div className="grow">
                    <p className="text-lg font-medium">Iqbal Salim</p>
                    <p>Individu</p>
                  </div>
                  <div className="bg-[#f8e7d8] font-semibold text-[#B87817] text-lg text-center py-1 min-w-40 max-w-fit rounded-3xl">
                    Rp500.000
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className=" fixed bottom-0 left-1/2 transform -translate-x-1/2 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-center md:p-6">
            <a
              href="#"
              className="max-w-3xl w-full py-2 text-xl font-semibold text-center text-white bg-[#4B241A] rounded-3xl shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
            >
              Beli Saham
            </a>
          </div>
        </div>
      </GuestLayout>
    </>
  );
};

export default DetailInvestasi;
