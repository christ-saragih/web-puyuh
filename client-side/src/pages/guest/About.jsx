import { useEffect, useState } from "react";
import ImageSlider from "../../components/guest/ImageSlider";
import JumbotronAbout from "../../components/guest/JumbotronAbout";
import DocumentIcon from "../../assets/images/icons/dokumen.svg";
import {
  getAbouts,
  getAboutSejarahs,
  getFounder,
} from "../../services/about.service";
import GuestLayouts from "../../layouts/GuestLayouts";
import { getDocument } from "../../services/document.service";
import { Link } from "react-router-dom";

const About = () => {
  const [abouts, setAbouts] = useState(null);
  const [sejarah, setSejarah] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [founder, setFounder] = useState([]);

  useEffect(() => {
    getAbouts((data) => {
      setAbouts(data);
    });

    getAboutSejarahs((data) => {
      setSejarah(data);
    });

    getDocument((data) => {
      setDocuments(data);
    });

    getFounder((data) => {
      setFounder(data);
    });
  }, []);

  console.log(founder);

  console.log("DATA TENTANG KAMI");
  console.log(abouts);

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          {/* <!-- Column 1: Text --> */}
          <div className="flex flex-col">
            <h2 className="font-bold text-3xl lg:text-4xl mb-2 lg:mb-4 tracking-wide">
              SUKAHARJA SMART QUAIL FARM
            </h2>
            <p className="font-quicksand font-medium text-[#000000] md:text-lg">
              {abouts.deskripsi}
            </p>
          </div>
          {/* column 2 */}
          <ImageSlider />
        </div>
      </section>
      <section className="bg-gradient-to-b from-white to-orange-100">
        {/* sejarah */}
        <div className="w-[90%] mx-auto  lg:px-20 mt-12 lg:mt-32 text-center">
          <h1 className="font-bold text-3xl lg:text-4xl text-center tracking-wide mb-2 lg:mb-4">
            {sejarah.judul}
          </h1>
          <p className="text-lg font-quicksand font-medium text-[#000000]">
            {sejarah.deskripsi}
          </p>
        </div>
        {/* dokumen */}
        <div className="w-[90%] mx-auto mt-12 lg:mt-32 ">
          <h1 className="font-bold text-3xl lg:text-4xl text-center tracking-wide mb-8 lg:mb-14">
            Dokumen
          </h1>

          <div className="flex flex-col items-center gap-6 lg:flex-row lg:gap-0 lg:items-start lg:justify-evenly">
            {documents.map((document) => (
              <Link
                key={document.id}
                to={`http://localhost:3000/api/dokumen-frontpage/file/${document.file}`}
                target="_blank"
                className="relative inline-block cursor-pointer"
              >
                <img
                  src={DocumentIcon}
                  alt={document.file}
                  className="block w-44 lg:w-full "
                />

                <p className="absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 m-0 font-semibold text-2xl text-center px-2">
                  {document.nama} dokumen
                </p>
              </Link>
            ))}
          </div>
        </div>

        <div className="w-[90%] max-w-6xl mx-auto mt-12 lg:mt-32 pb-16">
          <h1 className="font-bold text-3xl lg:text-4xl mb-4 lg:mb-12 text-center tracking-wide">
            Founder
          </h1>

          <div className=" rounded-[2rem] bg-white">
            {founder.data && founder.data.length > 0 ? (
              founder.data.map((founder) => (
                <div
                  key={founder.id}
                  className="flex flex-col md:flex-row justify-center gap-4 py-4 px-8 lg:gap-8 lg:py-12 lg:px-16"
                >
                  <div className="flex flex-col items-center lg:items-start">
                    <div className="w-[120px] h-[120px] lg:w-[150px] lg:h-[150px] rounded-full  overflow-hidden mt-2">
                      <img
                        src={`http://localhost:3000/api/founder/image/${founder.gambar}`}
                        alt={founder.nama}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-2xl text-center lg:text-start font-bold text-[#4B241A] uppercase">
                      {founder.nama}
                    </h3>
                    <h4 className="mb-1 text-lg text-center lg:text-start font-quicksand font-base md:text-xl">
                      {founder.jabatan}
                    </h4>
                    <p className="font-quicksand font-medium text-lg">
                      {founder.deskripsi}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center">Data founder tidak ditemukan</div>
            )}
          </div>
        </div>
      </section>

      <GuestLayouts.Footer />
    </GuestLayouts>
  );
};

export default About;
