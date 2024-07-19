import { useState } from "react";
import BatchInvestasi from "../../assets/images/batch_investasi.png";
import Navbar from "../../components/guest/Navbar";
import Tabs from "../../components/guest/Tabs";
import GuestLayout from "../../layouts/GuestLayout";
import {
  PiCalendarCheckDuotone,
  PiCalendarDotsDuotone,
  PiMoneyWavyDuotone,
  PiTargetDuotone,
  PiTimerDuotone,
  PiUserBold,
  PiUsersThreeBold,
  PiUsersThreeDuotone,
} from "react-icons/pi";

const DetailInvestasi = () => {
  const [tab, setTab] = useState(1);

  return (
    <>
      <Navbar />
      <GuestLayout className="mt-28 lg:mt-32">
        <div className="max-w-3xl mx-auto">
          <div className="h-96 mb-4 rounded-xl overflow-hidden">
            <img
              src={BatchInvestasi}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-bold text-3xl mb-1">Sukuk Ijarah Panacea</h2>
              <p className="font-medium text-lg">PT. Panacea Buana Batam</p>
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
                <b>Investasi Saham Bisnis Emado's Shawarma Cibubur</b> <br />{" "}
                <br />
                Berinvestasi melalui saham bisnis Emado's Shawarma Cibubur
                merupakan salah satu cara untuk mendapatkan potensi keuntungan
                dan dividen yang menarik. Emado's Shawarma merupakan sebuah
                brand yang didirikan pada tahun 2018 oleh Chef asal Palestina
                bernama Emad Al Amad. Emado’s Shawarma dikenal sebagai restoran
                yang menawarkan menu khas Timur Tengah dengan harga yang relatif
                terjangkau. <br /> <br /> Saat ini Emado’s Shawarma telah
                memiliki lebih dari 90 outlet yang tersebar di pulau Jawa,
                Indonesia. Salah satunya, Emado akan melakukan take over
                outletnya yang berlokasi di Jl. Alternatif Cibubur, Nagrak,
                Kecamatan Gunung Putri, Kabupaten Bogor, Jawa Barat. Outlet ini
                merupakan salah satu dari Top 3 Best Performance Outlet Emados’s
                Shawarma di seluruh Indonesia. <br /> <br />
                Kerennya, outlet Emado’s Shawarma Cibubur mudah ditemukan karena
                berada persis di pinggir Jalan Alternatif Cibubur. Outlet ini
                terdiri dari bangunan dua lantai dengan total luas sebesar 760
                m2. Total seat capacity di outlet ini mencapai 70 seat yang
                terbagi menjadi 44 seat di lantai satu dan 26 seat di lantai
                dua. <br /> <br />
                <b>
                  Simulasi keuntungan berinvestasi Emado's Shawarma Cibubur
                  melalui Bizhare
                </b>{" "}
                <br /> <br />
                Investasi saham bisnis Emado's Shawarma Cibubur melalui Bizhare
                bisa dimulai dengan nominal Rp 50.000 per lembar
                sahamnya. Keuntungan Anda akan berfluktuasi tergantung dari
                kinerja saham tersebut. Tentunya keuntungan tersebut akan
                bertambah besar ketika Anda nominal investasi Anda lebih besar.{" "}
                <br /> <br />
                <b>
                  Dapatkan Poin dan XP dengan Investasi di Emado's Shawarma
                  Cibubur melalui Bizhare
                </b>{" "}
                <br /> <br />
                Investasi saham bisnis Emado's Shawarma Cibubur melalui Bizhare
                akan memberi Anda keuntungan bukan hanya dari dividen, namun
                Anda juga bisa mendapatkan Poin dan XP. Semakin besar jumlah
                investasi Anda maka jumlah XP yang Anda dapatkan akan semakin
                besar. Anda juga akan mendapatkan Poin dengan berinvestasi.
                Semakin cepat dan besar investasi Anda, maka Poin yang Anda
                dapatkan semakin besar. Jadi tunggu apa lagi, investasi sekarang
                juga untuk mendapatkan XP dan Poin sebanyak-banyaknya!
              </p>
            </div>

            <div className={tab === 2 ? "block" : "hidden"}>
              <div className="grid grid-cols-2 gap-3">
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
                    <PiTimerDuotone className="w-full h-full" />
                  </div>
                  <div>
                    <p className="text-lg font-medium">Waktu Pendanaan</p>
                    <p>12 hari lagi</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-16 p-1">
                    <PiCalendarDotsDuotone className="w-full h-full" />
                  </div>
                  <div>
                    <p className="text-lg font-medium">Tenor</p>
                    <p>12 bulan</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-16 p-1">
                    <PiCalendarCheckDuotone className="w-full h-full" />
                  </div>
                  <div>
                    <p className="text-lg font-medium">Periode Bagi Hasil</p>
                    <p>per 1 bulan</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-16 p-2">
                    <PiMoneyWavyDuotone className="w-full h-full" />
                  </div>
                  <div>
                    <p className="text-lg font-medium">Minimum Investasi</p>
                    <p>Rp500.000</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={tab === 3 ? "block" : "hidden"}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.7116708630515!2d106.7675797745358!3d-6.558035064108204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c5dce5b6ebd3%3A0x7ba6ffb5d199befe!2sSekolah%20Tinggi%20Pariwisata%20Bogor!5e0!3m2!1sid!2sid!4v1721285167172!5m2!1sid!2sid"
                height="350"
                allowfullscreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full rounded-xl mb-4 mt-8"
              ></iframe>

              <p>
                Lokasi: JL. GIPSI, KOLONCUCU, NO. 11, Desa/Kelurahan Toboleu,
                Kec. Kota Ternate Utara, Kota Ternate, Provinsi Maluku Utara,
                Kode Pos: 97726
              </p>
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
