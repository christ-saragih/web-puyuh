import React, { useEffect, useState } from "react";
import Navbar from "../../components/guest/Navbar";
import ImageSlider from "../../components/guest/ImageSlider";
import JumbotronAbout from "../../components/guest/JumbotronAbout";
import dokumen_1 from "../../assets/images/dokumen 1.png";
import dokumen_2 from "../../assets/images/dokumen 2.png";
import dokumen_3 from "../../assets/images/dokumen 3.png";
import GuestLayout from "../../layouts/GuestLayout";
import Footer from "../../components/guest/Footer";
import { getAbouts } from "../../services/about.service";

const About = () => {
  const [abouts, setAbouts] = useState(null);

  useEffect(() => {
    getAbouts((data) => {
      console.log(data);
      setAbouts(data);
    });
  }, []);

  if (!abouts) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <>
      <Navbar />
      {/* jumbotron */}
      <section className="">
        <JumbotronAbout abouts={abouts} />
      </section>
      {/* row 1 */}
      <section className="visi-misi-row">
        <div className="container mx-auto p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* <!-- Column 1: Text --> */}
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-950 mb-4 -ml-5 md:text-[36px]">
                {/* {abouts.judul} */}
                <span className="block text-amber-950 md:text-[35px] mt-5">SUKAHARJA SMART QUAIL FARM</span>
              </h2>
              <p className="font-quicksand font-medium text-[#000000] md:text-[20px] md:mr-44 -ml-5">
                {abouts.tentangkami[0].deskripsi}
              </p>
              {/* <h3 className="text-[24px] font-bold text-[#000000] -ml-5">VISI:</h3>
              <ul className="list-disc list-inside text-[16px] font-medium mb-4 md:mr-36 -ml-5"> */}
                {/* {abouts.visi && abouts.visi.map((item, index) => (
                  <li key={index}>{item}</li>
                ))} */}
              {/* </ul> */}
              {/* <h3 className="text-[24px] font-bold text-[#000000] mb-2 -ml-5">MISI:</h3>
              <ul className="list-disc list-inside text-[16px] font-medium mb-4 md:mr-36 -ml-5"> */}
                {/* {abouts.misi && abouts.misi.map((item, index) => (
                  <li key={index}>{item}</li>
                ))} */}
              {/* </ul> */}
            </div>
            {/* column 2 */}
            <ImageSlider className="custom-height mt-10 md:mt-60" />
          </div>
        </div>
      </section>
      <br />
      <section className="bg-gradient-to-b from-white to-orange-100">
        {/* sejarah */}
        <GuestLayout>
          <div className="flex justify-center mb-4">
            <div>
              <h1 className="text-[35px] font-bold text-[#4B241A] md:ml-16">
                AWAL MULA
                <span className="block md:-ml-14">PERJALANAN KAMI</span>
              </h1>
            </div>
          </div>
          <div className="flex justify-center md:ml-10">
            <div>
              <h2 className="text-[20px] font-quicksand font-medium text-[#000000] md:ml-16 md:mr-24 text-justify indent-14">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
                <span className="block mt-5">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</span>
              </h2>
            </div>
          </div>
        </GuestLayout>
        {/* dokumen */}
        <GuestLayout className="mt-28 flex flex-col items-center">
          <h1 className="text-[35px] font-bold text-[#4B241A]">
            DOKUMEN
          </h1>
          <div className="flex flex-col md:flex-row justify-center mt-28 w-[80%]">
            <div className="flex flex-col items-center w-full md:w-[33%]">
              <img src={dokumen_1} alt="Dokumen 1" />
            </div>
            <div className="flex flex-col items-center w-full md:w-[33%] mt-8 md:mt-0">
              <img src={dokumen_2} alt="Dokumen 2" />
            </div>
            <div className="flex flex-col items-center w-full md:w-[33%] mt-8 md:mt-0">
              <img src={dokumen_3} alt="Dokumen 3" />
            </div>
          </div>
        </GuestLayout>
        <GuestLayout>
          <div className="flex flex-col justify-center mb-4 mt-24">
            <div>
              <h1 className="text-[35px] font-bold text-[#4B241A] ml-0 md:ml-[23rem] lg:ml-[37rem]">
                FOUNDER
              </h1>
            </div>
          </div>
          <div className="mx-4 md:mx-24 rounded-[2rem] bg-white">
            <div className="flex flex-col items-center mt-20">
              <div className="flex flex-col md:flex-row justify-center items-center">
                <div className="flex flex-col items-center md:mr-16 md:ml-28 w-[20%]">
                  <img src="https://via.placeholder.com/150" alt="Avatar" className="w-[150px] h-[150px] rounded-full" />
                </div>
                <div className="flex flex-col md:mr-14 w-[80%] mt-4 md:mt-4">
                  <h3 className="text-xl font-bold text-[#4B241A]">John Doe</h3>
                  <h4 className="mt-1 text-lg font-quicksand font-medium md:text-[24px]">Founder</h4>
                  <p className="font-quicksand font-medium text-[20px] mr-0 md:mr-10 text-justify mb-10">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
                </div>
              </div>
            </div>
          </div>
        </GuestLayout>
        <Footer />
      </section>
    </>
  );
};

export default About;
