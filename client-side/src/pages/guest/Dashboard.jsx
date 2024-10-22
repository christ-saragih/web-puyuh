import TemukanStartup from "../../assets/images/temukan-startup.svg";
import BeliSaham from "../../assets/images/beli-saham.svg";
import JualSaham from "../../assets/images/jual-dipasar.svg";
import BagiHasil from "../../assets/images/bagi-hasil.svg";
import ArticleList from "../../components/common/ArticleList";
import BatchList from "../../components/guest/BatchList";
import ValueCompanyItem from "../../components/guest/ValueCompanyItem";
import { companyValues } from "../../components/guest/ValueCompanyList";
import GuestLayouts from "../../layouts/GuestLayouts";
import { getDashboardFrontpage } from "../../services/dashboard-frontpage.service";
import { getArticles } from "../../services/article.service";
import { getBatchs } from "../../services/batch.service";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [dashboardFrontpage, setDashboardFrontpage] = useState([]);
  const [articles, setArticles] = useState([]);
  const [batchs, setBatchs] = useState([]);

  useEffect(() => {
    getDashboardFrontpage((data) => {
      setDashboardFrontpage(data);
    });
  }, []);

  useEffect(() => {
    getArticles((data) => {
      // mengambil 4 artikel
      setArticles(data.slice(0, 4));
    });
  }, []);

  useEffect(() => {
    getBatchs((data) => {
      setBatchs(data);
    });
  }, []);

  // String yang diambil dari database
  const headerText = dashboardFrontpage?.judul || "";

  // Memodifikasi string untuk menambahkan span dengan style berbeda
  const modifiedHeaderText = headerText
    .replace("Besar", '<span class="text-[#d67026]">Besar</span>')
    .replace("Kecil", '<span class="text-[#d67026]">Kecil</span>');

  return (
    <GuestLayouts>
      <div className="w-[90%] mx-auto mt-12 lg:mt-16">
        <div className="flex flex-col items-center gap-10 mb-20 md:flex-row lg:mb-0">
          <div className="w-full lg:w-1/2 flex flex-col">
            <h1
              className="font-bold text-4xl lg:text-5xl text-[#2B2B2B] lg:leading-[60px] tracking-wide"
              dangerouslySetInnerHTML={{ __html: modifiedHeaderText }}
            />
            <p className="text-[#2B2B2B] text-xl lg:text-2xl mt-6 mb-12 lg:leading-normal">
              {dashboardFrontpage?.subJudul}
            </p>
            <div className="hidden lg:flex justify-center lg:gap-10">
              <Link to={"/investasi"} className="btn-primary-large w-full">
                Lihat Investasi
              </Link>
              <Link to={"/tentang-kami"} className="btn-primary-large w-full">
                Tentang SQI
              </Link>
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src={`http://localhost:3000/api/beranda/image/${dashboardFrontpage?.gambar}`}
              alt=""
              className="w-[26rem]"
            />
          </div>
        </div>

        {/* Jumbotron button for mobile */}
        <div className="flex justify-center gap-4 lg:hidden">
          <Link
            to={"/investasi"}
            className="btn-primary-large w-full flex items-center justify-center"
          >
            Lihat Investasi
          </Link>
          <Link
            to={"/tentang-kami"}
            className="btn-primary-large w-full flex items-center justify-center"
          >
            Tentang SQI
          </Link>
        </div>
      </div>

      <div className="w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-full h-124 md:h-[148px]"
        >
          <path
            fill="#FAEFE4"
            fillOpacity="1"
            d="M0,320L120,276.16C240,232.9,480,145.7,720,146.3C960,146.7,1200,233,1320,276.16L1440,320L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
          ></path>
        </svg>

        <div className="bg-[#FAEFE4]">
          <div className="w-[90%] mx-auto pb-12 lg:pb-16">
            <h2 className="font-bold text-center text-3xl lg:text-4xl mb-1 tracking-wide">
              <span className="text-[#d67026]">Nilai-Nilai </span> PT SQI
            </h2>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-4 mt-14">
              {companyValues.map((companyValue, index) => (
                <ValueCompanyItem
                  key={`${index}-${companyValue.text}`}
                  {...companyValue}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-[90%] mx-auto mt-12 lg:mt-16">
        <div className="mb-6 ">
          <h2 className="font-bold text-3xl lg:text-4xl mb-1 tracking-wide">
            Penawaran <span className="text-[#d67026]">Saat Ini</span>
          </h2>
          <p className="font-medium text-lg text-[#6E6565]">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <BatchList batchs={batchs} />

        <div className="flex justify-center mt-10 mb-3">
          <Link
            to={"/investasi"}
            className="btn-primary-large w-[180px] md:w-1/3 xl:w-1/5"
          >
            Lihat Semua
          </Link>
        </div>
      </div>

      <div className="w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-full h-124 md:h-[148px]"
        >
          <path
            fill="#FAEFE4"
            fillOpacity="1"
            d="M0,160L48,176C96,192,192,240,288,224C384,208,480,160,576,128C672,96,768,96,864,106.7C960,117,1056,149,1152,154.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>

        <div className="bg-[#FAEFE4] pb-3">
          <div className="mb-3 text-center">
            <h2 className="font-bold text-3xl lg:text-4xl mb-1 tracking-wide">
              Cara <span className="text-[#d67026]">Berinvestasi</span>
            </h2>
            <p className="font-medium text-lg  text-[#6E6565]">
              Pelajari cara berinvestasi di
            </p>
          </div>

          <div className="grid mx-auto gap-10 grid-row-4 w-full md:w-8/12 md:gap-6 xl:w-7/12">
            <div className="flex flex-col gap-6 md:flex-row-reverse justify-center items-center md:gap-14 ">
              <img
                src={TemukanStartup}
                alt=""
                className="w-40 h-40 md:w-56 md:h-56"
              />

              <div className="w-[80%] text-center sm:text-left sm:w-fit flex flex-col gap-3">
                <h3 className="font-semibold text-2xl lg:text-3xl">
                  Pelajari <span className="text-[#d67026]">Keuntungannya</span>
                </h3>
                <p className="text-lg">
                  Telusuri keuntungan yang bisa didapat dari berinvestasi di PT
                  Sukaharja Quail
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-6  justify-center items-center md:flex-row md:gap-14 ">
              <img
                src={BeliSaham}
                alt=""
                className="w-40 h-40 md:w-56 md:h-56"
              />

              <div className="w-[80%] text-center sm:text-left sm:w-fit flex flex-col gap-3">
                <h3 className="font-semibold text-2xl lg:text-3xl">
                  Pilih <span className="text-[#d67026]">Kloter</span>
                </h3>
                <p className="text-lg">
                  Pilih kloter yang terbuka untuk investasi dan masukan jumlah
                  keuntungan yang diinginkan.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-6 md:flex-row-reverse justify-center items-center md:gap-14 ">
              <img
                src={JualSaham}
                alt=""
                className="w-40 h-40 md:w-56 md:h-56"
              />

              <div className="w-[80%] text-center sm:text-left sm:w-fit flex flex-col gap-3">
                <h3 className="font-semibold text-2xl lg:text-3xl">
                  Lengkapi <span className="text-[#d67026]">Dokumen</span>
                </h3>
                <p className="text-lg">
                  Unggah dokumen yang dibutuhkan untuk memulai proses investasi.
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center gap-6 ">
              <div className="">
                <img
                  src={BagiHasil}
                  alt=""
                  className="w-40 h-40 md:w-56 md:h-56"
                />
              </div>
              <div className="flex flex-col item-center text-center gap-3">
                <h3 className="font-semibold text-2xl lg:text-3xl">
                  Dapatkan <span className="text-[#d67026]">Bagi Hasil</span>
                </h3>
                <p className="text-lg mx-auto">
                  Nikmati bagi hasil yang diberikan tiap bulannya
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <Link
              to={"/investasi"}
              className="btn-primary-large w-[190px] md:w-1/3 xl:w-1/5"
            >
              Mulai Investasi
            </Link>
          </div>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-full h-124 md:h-[148px]"
        >
          <path
            fill="#FAEFE4"
            fillOpacity="1"
            d="M0,160L48,138.7C96,117,192,75,288,85.3C384,96,480,160,576,165.3C672,171,768,117,864,85.3C960,53,1056,43,1152,58.7C1248,75,1344,117,1392,138.7L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div>

      <div className="w-[90%] mx-auto mb-12 lg:mb-16">
        <div className="mb-6">
          <h2 className="font-bold text-3xl lg:text-4xl mb-1 tracking-wide">
            Baca Artikel Terbaru <span className="text-[#d67026]">Kami</span>
          </h2>
          <p className="font-medium text-lg text-[#6E6565]">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>

        <ArticleList articles={articles} />

        <div className="flex justify-center mt-10">
          <Link
            to={"/artikel"}
            className="btn-primary-large w-[180px] md:w-1/3 xl:w-1/5"
          >
            Lihat Semua
          </Link>
        </div>
      </div>
      <GuestLayouts.Footer />
    </GuestLayouts>
  );
};

export default Dashboard;
