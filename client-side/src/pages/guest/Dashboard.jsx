import Navbar from "../../components/guest/Navbar";
import Footer from "../../components/guest/Footer";
import GuestLayout from "../../layouts/GuestLayout";
import JumbotronImage from "../../assets/images/burung-puyuh.svg";
import InklusiKeuangan from "../../assets/images/icons/inklusi-keuangan.svg";
import PertumbuhanEksponensial from "../../assets/images/icons/pertumbuhan-eksponensial.svg";
import BerdampakSosial from "../../assets/images/icons/berdampak-sosial.svg";
import TemukanStartup from "../../assets/images/temukan-startup.svg";
import BeliSaham from "../../assets/images/beli-saham.svg";
import JualSaham from "../../assets/images/jual-dipasar.svg";
import BagiHasil from "../../assets/images/bagi-hasil.svg";
import BatchList from "../../components/guest/BatchList";
import ArticleItem from "../../components/guest/ArticleItem";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <GuestLayout className="mt-28 lg:mt-32 -mb-0">
        <div className="w-full lg:w-[80%] mb-10">
          {/* <h1 className="font-bold text-4xl lg:text-5xl text-[#2B2B2B] lg:leading-[60px]">
            Wujudkan Ekosistem Pendanaan & Investasi yang Inklusif &
            Berdampak Nyata
          </h1> */}

          <h1 className="font-bold text-4xl lg:text-5xl text-[#2B2B2B] lg:leading-[60px]">
            Wujudkan Ekosistem Pendanaan &{" "}
            <span className="text-[#B87817]"> Investasi</span> yang Inklusif &
            Berdampak
            <span className="text-[#B87817]"> Nyata</span>
          </h1>
        </div>

        <div className="flex flex-col items-center gap-12 mb-20 md:flex-row lg:mb-0">
          <div className="w-full lg:w-1/2 flex flex-col gap-12">
            <p className="text-[#2B2B2B] text-2xl">
              FundEx, platform securities crowdfunding untuk pendanaan dan
              investasi bisnis serta proyek potensial di Indonesia. FundEx,
              platform securities crowdfunding untuk pendanaan dan investasi
              bisnis serta.
            </p>
            <div className="hidden lg:flex justify-center lg:gap-10">
              <button className="bg-[#4B241A] w-1/2 py-3 rounded-3xl shadow-[0_6px_6px_0_rgba(0,0,0,0.25)] font-semibold text-[#EFEFEF] text-2xl">
                Investasi Sekarang
              </button>
              <button className="bg-[#4B241A] w-1/2 py-3 rounded-3xl shadow-[0_6px_6px_0_rgba(0,0,0,0.25)] font-semibold text-[#EFEFEF] text-2xl">
                FundEx Sharia
              </button>
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center">
            <img src={JumbotronImage} alt="" className="w-[26rem]" />
          </div>
        </div>

        <div className="flex justify-center gap-6 lg:justify-start lg:gap-10 lg:-mt-40 lg:hidden">
          <button className="bg-[#4B241A] w-1/2 lg:w-3/12 py-3 rounded-3xl shadow-[0_6px_6px_0_rgba(0,0,0,0.25)] font-semibold text-[#EFEFEF] text-2xl">
            Investasi Sekarang
          </button>
          <button className="bg-[#4B241A] w-1/2 lg:w-3/12 py-3 rounded-3xl shadow-[0_6px_6px_0_rgba(0,0,0,0.25)] font-semibold text-[#EFEFEF] text-2xl">
            FundEx Sharia
          </button>
        </div>
      </GuestLayout>

      <GuestLayout className="w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-full h-124 md:h-[148px]"
        >
          <path
            fill="#FAEFE4"
            fillOpacity="1"
            d="M0,320L120,293.3C240,267,480,213,720,213.3C960,213,1200,267,1320,293.3L1440,320L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
          ></path>
        </svg>

        <div className="bg-[#FAEFE4]">
          <div className="w-[90%] mx-auto pt-10 pb-20">
            <h1 className="font-bold text-center text-4xl mb-16">
              <span className="text-[#B87817]">Nilai </span> Lorem
            </h1>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-4">
              <div className="flex flex-col items-center xl:px-14">
                <div className="bg-[#4B241A] rounded-full w-28 h-28 p-6 mb-4">
                  <img
                    src={InklusiKeuangan}
                    alt="Inklusi Keuangan"
                    className="w-20 h-w-20 object-cover"
                  />
                </div>
                <h3 className="flex-grow font-semibold text-2xl mb-2">
                  Inklusi Keuangan
                </h3>
                <p className="px-8 sm:px-0 font-medium text-lg text-center">
                  Akses investasi yang mudah dijangkau bagi siapa saja
                </p>
              </div>
              <div className="flex flex-col items-center xl:px-14">
                <div className="bg-[#4B241A] rounded-full w-28 h-w-28 p-6 mb-4">
                  <img
                    src={PertumbuhanEksponensial}
                    alt="Pertumbuhan Eksponensial"
                    className="w-20 h-w-20 object-cover"
                  />
                </div>
                <h3 className="flex-grow font-semibold text-center text-2xl mb-2">
                  Pertumbuhan Eksponensial
                </h3>
                <p className="px-8 sm:px-0 font-medium text-lg text-center">
                  Investasi yang tumbuh dengan cepat dan signifikan
                </p>
              </div>
              <div className="flex flex-col items-center xl:px-14">
                <div className="bg-[#4B241A] rounded-full w-28 h-w-28 p-6 mb-4">
                  <img
                    src={BerdampakSosial}
                    alt="Berdampak Sosial"
                    className="w-20 h-w-20 object-cover"
                  />
                </div>
                <h3 className="flex-grow font-semibold text-2xl mb-2">
                  Berdampak Sosial
                </h3>
                <p className="px-8 sm:px-0 font-medium text-lg text-center">
                  Investasi yang memberikan dampak positif bagi masyarakat
                </p>
              </div>
            </div>
          </div>
        </div>
      </GuestLayout>

      <GuestLayout className="-mb-0">
        <div className="mb-6 ">
          <h2 className="font-bold text-3xl mb-1">
            Penawaran <span className="text-[#B87817]">Saat Ini</span>
          </h2>
          <p className="font-medium text-lg text-[#6E6565]">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <BatchList />

        <div className="flex justify-center mt-10 mb-3">
          <button className="bg-[#4B241A] w-8/12 md:w-1/3 xl:w-1/5 py-3 rounded-[2rem] shadow-[0_6px_6px_0_rgba(0,0,0,0.25)] font-semibold text-[#EFEFEF] text-2xl">
            Lihat Semua
          </button>
        </div>
      </GuestLayout>

      <GuestLayout className="w-full -mb-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-full h-124 md:h-[148px]"
        >
          <path
            fill="#FAEFE4"
            fillOpacity="1"
            d="M0,160L48,176C96,192,192,224,288,208C384,192,480,128,576,96C672,64,768,64,864,85.3C960,107,1056,149,1152,154.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>

        <div className="bg-[#FAEFE4] pb-3">
          <div className="mb-3 text-center">
            <h2 className="font-bold text-3xl mb-1">
              Cara <span className="text-[#B87817]">Berinvestasi</span>
            </h2>
            <p className="font-medium text-lg text-[#6E6565]">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
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
                <h3 className="font-semibold text-3xl">
                  Temukan Startup{" "}
                  <span className="text-[#B87817]">Menarik</span>
                </h3>
                <p className="text-lg">
                  Anda dapat melakukan analisis dan penilaian terhadap
                  portofolio startup dari prospektus yang kami sediakan.
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
                <h3 className="font-semibold text-3xl">
                  Beli Saham <span className="text-[#B87817]">Startup</span>
                </h3>
                <p className="text-lg">
                  Tentukan jumlah saham yang ingin dibeli. Setelah penawaran
                  mencapai target, saham menjadi milik Anda.
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
                <h3 className="font-semibold text-3xl">
                  Jual di <span className="text-[#B87817]">Pasar Sekunder</span>
                </h3>
                <p className="text-lg">
                  Setelah satu tahun, Anda dapat menjual saham di Pasar Sekunder
                  yang diselenggarakan setiap 6 bulan.
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center gap-6 ">
              <div className="">
                <img src={BagiHasil} alt="" className="w-52 h-52" />
              </div>
              <div className="flex flex-col item-center text-center gap-3">
                <h3 className="font-semibold text-3xl">
                  Dapatkan <span className="text-[#B87817]">Bagi Hasil</span>
                </h3>
                <p className="text-lg w-[80%] mx-auto">
                  Setelah proyek selesai, Anda berhak mendapatkan pengembalian
                  dana dan bagi hasil dari keuntungan proyek.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <button className="bg-[#4B241A] w-8/12 md:w-1/3 xl:w-1/5 py-3 rounded-[2rem] shadow-[0_6px_6px_0_rgba(0,0,0,0.25)] font-semibold text-[#EFEFEF] text-2xl">
              Mulai Investasi
            </button>
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
      </GuestLayout>

      <GuestLayout>
        <div className="mb-6">
          <h2 className="font-bold text-3xl mb-1">
            Baca Artikel Terbaru <span className="text-[#B87817]">Kami</span>
          </h2>
          <p className="font-medium text-lg text-[#6E6565]">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>

        <ArticleItem />

        <div className="flex justify-center mt-10">
          <button className="bg-[#4B241A] w-8/12 md:w-1/3 xl:w-1/5 py-3 rounded-[2rem] shadow-[0_6px_6px_0_rgba(0,0,0,0.25)] font-semibold text-[#EFEFEF] text-2xl">
            Lihat Semua
          </button>
        </div>
      </GuestLayout>

      <Footer />
    </>
  );
};

export default Dashboard;
