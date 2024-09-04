import { useEffect, useState } from "react";
import ImageSlider from "../../components/guest/ImageSlider";
import JumbotronAbout from "../../components/guest/JumbotronAbout";
import DocumentIcon from "../../assets/images/icons/dokumen.svg";
import { getAbouts, getAboutSejarahs, getFounder } from "../../services/about.service";
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
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-950 mb-4 md:text-[36px]">
              <span className="block text-amber-950 md:text-4xl mt-5">
                SUKAHARJA SMART QUAIL FARM
              </span>
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
        <div className="w-[90%] mx-auto px-20 mt-12 lg:mt-32 text-center">
          <h1 className="text-4xl font-bold text-[#4B241A] mb-4">
            {sejarah.judul}
          </h1>
          <p className="text-lg font-quicksand font-medium text-[#000000]">
            {sejarah.deskripsi}
          </p>
        </div>
        {/* dokumen */}
        <div className="w-[90%] mx-auto mt-12 lg:mt-32">
          <h1 className="text-4xl text-center font-bold text-[#4B241A] mb-10">
            DOKUMEN
          </h1>

          <div className="flex justify-evenly">
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
                  className="block w-full"
                />

                <p className="absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 m-0 font-semibold text-2xl text-center">
                  {document.nama}
                </p>
              </Link>
            ))}
          </div>
        </div>

        <div className="w-[90%] mx-auto mt-12 lg:mt-32 pb-16">
          <h1 className="text-4xl font-bold text-[#4B241A] text-center mb-10">
            FOUNDER
          </h1>

          <div className="mx-4 md:mx-24 rounded-[2rem] bg-white">
          {founder.data && founder.data.length > 0 ? (
              founder.data.map((founder) => (
                <div key={founder.id} className="flex flex-col items-center mb-10">
                  <div className="flex flex-col md:flex-row justify-center items-center">
                    <div className="flex flex-col items-center md:mr-16 md:ml-28 w-[20%]">
                      <img
                        src={`http://localhost:3000/api/founder/image/${founder.gambar}`}
                        alt={founder.nama}
                        className="w-[150px] h-[150px] rounded-full"
                      />
                    </div>
                    <div className="flex flex-col md:mr-14 w-[80%] mt-4 md:mt-4">
                      <h3 className="text-xl font-bold text-[#4B241A]">{founder.nama}</h3>
                      <h4 className="mt-1 text-lg font-quicksand font-medium md:text-[24px]">
                        {founder.jabatan}
                      </h4>
                      <p className="font-quicksand font-medium text-lg mr-0 md:mr-10 text-justify mb-10">
                        {founder.deskripsi}
                      </p>
                    </div>
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
