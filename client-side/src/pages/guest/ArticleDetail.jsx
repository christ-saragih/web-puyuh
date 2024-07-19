import { PiUserCircleFill, PiUserFill } from "react-icons/pi";
import Navbar from "../../components/guest/Navbar";
import GuestLayout from "../../layouts/GuestLayout";
import DetailArtikel from "../../assets/images/article/detail-artikel.png";
import DetailArtikel2 from "../../assets/images/article/detail-artikel2.png";
import Footer from "../../components/guest/Footer";
import { LiaUserEditSolid } from "react-icons/lia";

const ArticleDetail = () => {
  return (
    <>
      <Navbar />
      <GuestLayout className="mt-28 lg:mt-32">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center items-center gap-3">
            <div className="w-12 h-12 bg-[#F5F5F5] text-slate-800 p-2 rounded-full">
              <LiaUserEditSolid className="w-full h-full ml-[2px]" />
            </div>
            <div>
              <p className="font-semibold text-xl text-[#3E3232]">
                Bennefit Christy Saragih
              </p>
              <p className="text-[#3E3232] opacity-90">19 Juli 2024</p>
            </div>
          </div>

          <div className="text-center my-8">
            <h2 className="font-bold text-3xl mb-6">
              10 Pilihan Wisata Indonesia Terbaik Buat Berpetualang Bersama
              Teman-Teman
            </h2>
          </div>

          <div className="flex justify-center gap-3">
            <div className="bg-[#f8e7d8] font-semibold text-[#B87817] text-lg text-center py-1 min-w-32 max-w-fit px-2 rounded-3xl">
              #investasi
            </div>
            <div className="bg-[#f8e7d8] font-semibold text-[#B87817] text-lg text-center py-1 min-w-32 max-w-fit px-2 rounded-3xl">
              #puyuh
            </div>
            <div className="bg-[#f8e7d8] font-semibold text-[#B87817] text-lg text-center py-1 min-w-32 max-w-fit px-2 rounded-3xl">
              #cvslamet
            </div>
          </div>
        </div>

        <div className="px-16 h-[30rem] mt-16 mb-8">
          <img
            src={DetailArtikel2}
            alt="Artikel"
            className="rounded-3xl w-full h-full object-cover"
          />
        </div>

        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl mb-4 font-semibold">
            Investasi Saham Bisnis Emado's Shawarma Cibubur
          </h3>
          <p>
            Berinvestasi melalui saham bisnis Emado's Shawarma Cibubur merupakan
            salah satu cara untuk mendapatkan potensi keuntungan dan dividen
            yang menarik. Emado's Shawarma merupakan sebuah brand yang didirikan
            pada tahun 2018 oleh Chef asal Palestina bernama Emad Al Amad.{" "}
            <br />
            <br />
            Emado’s Shawarma dikenal sebagai restoran yang menawarkan menu khas
            Timur Tengah dengan harga yang relatif terjangkau. Emado’s Shawarma
            dikenal sebagai restoran yang menawarkan menu khas Timur Tengah
            dengan harga yang relatif terjangkau.
            <br />
            <br />
          </p>

          <h3 className="text-2xl mb-4 font-semibold">List</h3>
          <p>
            Investasi saham bisnis Emado's Shawarma Cibubur melalui Bizhare bisa
            dimulai dengan nominal Rp 50.000 per lembar sahamnya. Keuntungan
            Anda akan berfluktuasi tergantung dari kinerja saham tersebut.{" "}
            <br /> <br />{" "}
          </p>
          <ul className="space-y-1 list-disc list-inside ml-2">
            <li>This is unordered list</li>
            <li>This is unordered list</li>
            <li>This is unordered list</li>
          </ul>
          <br />

          <p>
            Investasi saham bisnis Emado's Shawarma Cibubur melalui Bizhare bisa
            dimulai dengan nominal Rp 50.000 per lembar sahamnya. Keuntungan
            Anda akan berfluktuasi tergantung dari kinerja saham tersebut.
            <br />
            <br />
            Investasi saham bisnis Emado's Shawarma Cibubur melalui Bizhare bisa
            dimulai dengan nominal Rp 50.000 per lembar sahamnya. Keuntungan
            Anda akan berfluktuasi tergantung dari kinerja saham tersebut.
          </p>
        </div>
      </GuestLayout>

      <Footer />
    </>
  );
};

export default ArticleDetail;
