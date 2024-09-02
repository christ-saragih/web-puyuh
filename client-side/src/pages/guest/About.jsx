import React, { useEffect, useState } from "react";
import Navbar from "../../components/guest/Navbar";
import ImageSlider from "../../components/guest/ImageSlider";
import JumbotronAbout from "../../components/guest/JumbotronAbout";
import dokumen_1 from "../../assets/images/dokumen 1.png";
import dokumen_2 from "../../assets/images/dokumen 2.png";
import dokumen_3 from "../../assets/images/dokumen 3.png";
import Footer from "../../components/guest/Footer";
import { getAbouts, getAboutSejarahs } from "../../services/about.service";
import GuestLayouts from "../../layouts/GuestLayouts";

const About = () => {
  const [abouts, setAbouts] = useState(null);
  const [sejarah, setSejarah] = useState([]);

  useEffect(() => {
    getAbouts((data) => {
      setAbouts(data);
    });

    getAboutSejarahs((data) => {
      setSejarah(data);
    });
  }, []);

  if (!abouts || sejarah.length === 0) {
    return <div>Data tentang kami tidak ditemukan!</div>;
  }

  return (
    <GuestLayouts>
      {/* jumbotron */}
      <section>
        <JumbotronAbout abouts={abouts} />
      </section>
      {/* row 1 */}
      <section className="w-[90%] mx-auto mt-12 lg:mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* <!-- Column 1: Text --> */}
          <div className="flex flex-col">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-950 mb-4 md:text-[36px]">
              <span className="block text-amber-950 md:text-[35px] mt-5">
                SUKAHARJA SMART QUAIL FARM
              </span>
            </h2>
            <p className="font-quicksand font-medium text-[#000000] md:text-[20px]">
              {abouts.tentangkami[0].deskripsi}
            </p>
          </div>
          {/* column 2 */}
          <ImageSlider />
        </div>
      </section>
      <section className="bg-gradient-to-b from-white to-orange-100">
        {/* sejarah */}
        <div className="w-[90%] mx-auto mt-12 lg:mt-16 text-center">
          <h1 className="text-[35px] font-bold text-[#4B241A] mb-4">
            {sejarah.sejarah[0].judul}
          </h1>
          <p className="text-[20px] font-quicksand font-medium text-[#000000]">
            {sejarah.sejarah[0].deskripsi}
          </p>
        </div>
        {/* dokumen */}
        <div className="w-[90%] mx-auto mt-12 lg:mt-16">
          <h1 className="text-[35px] text-center font-bold text-[#4B241A]">
            DOKUMEN
          </h1>
          <div className="flex flex-col md:flex-row justify-center mt-28 ">
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
        </div>

        <div className="w-[90%] mx-auto mt-12 lg:mt-16 pb-20">
          <h1 className="text-[35px] font-bold text-[#4B241A] text-center">FOUNDER</h1>

          <div className="mx-4 md:mx-24 rounded-[2rem] bg-white">
            <div className="flex flex-col items-center mt-20">
              <div className="flex flex-col md:flex-row justify-center items-center">
                <div className="flex flex-col items-center md:mr-16 md:ml-28 w-[20%]">
                  <img
                    src="https://via.placeholder.com/150"
                    alt="Avatar"
                    className="w-[150px] h-[150px] rounded-full"
                  />
                </div>
                <div className="flex flex-col md:mr-14 w-[80%] mt-4 md:mt-4">
                  <h3 className="text-xl font-bold text-[#4B241A]">John Doe</h3>
                  <h4 className="mt-1 text-lg font-quicksand font-medium md:text-[24px]">
                    Founder
                  </h4>
                  <p className="font-quicksand font-medium text-[20px] mr-0 md:mr-10 text-justify mb-10">
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam, eaque ipsa quae ab illo inventore veritatis et
                    quasi architecto beatae vitae dicta sunt explicabo. Nemo
                    enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                    aut fugit, sed quia consequuntur magni dolores eos qui
                    ratione voluptatem sequi nesciunt. Neque porro quisquam est,
                    qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
                    velit, sed quia non numquam eius modi tempora incidunt ut
                    labore et dolore magnam aliquam quaerat voluptatem.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GuestLayouts.Footer />
    </GuestLayouts>
  );
};

export default About;
