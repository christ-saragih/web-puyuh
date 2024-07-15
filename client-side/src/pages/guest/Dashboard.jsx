import Navbar from "../../components/guest/Navbar";
import Footer from "../../components/guest/Footer";
import GuestLayout from "../../layouts/GuestLayout";
import JumbotronImage from "../../assets/images/burung-puyuh.svg";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <GuestLayout>
        <div className="w-full lg:w-[80%] mb-10">
          <h1 className="font-bold text-4xl lg:text-5xl text-[#2B2B2B] leading-tight">
            Wujudkan Ekosistem Pendanaan &{" "}
            <span className="text-[#B87817]"> Ivestasi</span> yang Inklusif &
            Berdampak
            <span className="text-[#B87817]"> Nyata</span>
          </h1>
        </div>

        <div className="flex flex-col items-center gap-12 mb-20 md:flex-row">
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
      <Footer />
    </>
  );
};

export default Dashboard;
