import DocumentIcon from "../../assets/images/icons/dokumen.svg";
import Input from "../../components/common/Input";
import Label from "../../components/common/Label";
import Button from "../../components/common/Button";
import JumbotronAbout from "../../components/guest/JumbotronAbout";
import ImageSlider from "../../components/guest/ImageSlider";
import GuestLayouts from "../../layouts/GuestLayouts";
import {
  getAbouts,
  getAboutSejarahs,
  getFounder,
} from "../../services/about.service";
import { getDocument } from "../../services/document.service";
import { getContactFrontpage } from "../../services/contact-frontpage.service";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  PiMapPinLine,
  PiMapPinLineFill,
  PiPaperPlaneTilt,
  PiPaperPlaneTiltFill,
  PiPhoneCall,
  PiPhoneCallFill,
} from "react-icons/pi";

const About = () => {
  const [abouts, setAbouts] = useState(null);
  const [sejarah, setSejarah] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [founder, setFounder] = useState([]);
  const [contacts, setContacts] = useState([]);

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

    getContactFrontpage((data) => {
      setContacts(data);
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
            {documents.map(
              (document) =>
                document.status === "aktif" && (
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
                      {document.nama}
                    </p>
                  </Link>
                )
            )}
          </div>
        </div>
        {/* founder */}
        <div className="w-[90%] max-w-6xl mx-auto mt-12 lg:mt-32 pb-16">
          <h1 className="font-bold text-3xl lg:text-4xl mb-4 lg:mb-12 text-center tracking-wide">
            Founder
          </h1>

          <div className=" rounded-[2rem] bg-white">
            {founder.data && founder.data.length > 0 ? (
              founder.data.map((founder) => (
                <div
                  key={founder.id}
                  className="flex flex-col md:flex-row justify-center gap-4 py-4 px-6 lg:gap-8 lg:py-12 lg:px-16"
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
        {/* kontak */}
        <div className="w-[90%] mx-auto mt-12 lg:mt-16 mb-20">
          <div className="grid grid-cols-2 gap-20">
            <div>
              <h1 className="font-bold text-3xl lg:text-4xl tracking-wide mb-1">
                Hubungi Kami
              </h1>
              <p className="mb-8">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum
                nisi, esse
              </p>

              <div className="mb-4 space-y-3">
                <div className="flex items-center gap-2 group w-fit cursor-pointer text-[#572618]">
                  <div className="relative w-5 h-5">
                    <PiPaperPlaneTilt className="absolute w-5 h-5 transition-opacity duration-200 group-hover:opacity-0" />
                    <PiPaperPlaneTiltFill className="absolute w-5 h-5 transition-opacity duration-200 opacity-0 group-hover:opacity-100" />
                  </div>
                  <Link
                    to={`https://mail.google.com/mail/?view=cm&fs=1&to=${contacts.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium transition-all duration-300 group-hover:underline"
                  >
                    Kirimkan pesan via email
                  </Link>
                </div>
                <div className="flex items-center gap-2 group w-fit cursor-pointer text-[#572618]">
                  <div className="relative w-5 h-5">
                    <PiPhoneCall className="absolute w-5 h-5 transition-opacity duration-200 group-hover:opacity-0" />
                    <PiPhoneCallFill className="absolute w-5 h-5 transition-opacity duration-200 opacity-0 group-hover:opacity-100" />
                  </div>
                  <Link
                    to={`tel:${contacts.no_phone}`}
                    className="font-medium transition-all duration-300 group-hover:underline"
                  >
                    Hubungi kami lewat telepon
                  </Link>
                </div>
                <div className="flex items-center gap-2 group w-fit cursor-pointer text-[#572618]">
                  <div className="relative w-5 h-5">
                    <PiMapPinLine className="absolute w-5 h-5 transition-opacity duration-200 group-hover:opacity-0" />
                    <PiMapPinLineFill className="absolute w-5 h-5 transition-opacity duration-200 opacity-0 group-hover:opacity-100" />
                  </div>
                  <Link
                    to={"https://maps.app.goo.gl/w6PRFZiHvueU15P8A"}
                    target="_blank"
                    className="font-medium transition-all duration-300 group-hover:underline"
                  >
                    {contacts.alamat}
                  </Link>
                </div>
              </div>

              <div>
                <div className="grid grid-cols-2 gap-8 pb-2">
                  <div>
                    <Label htmlFor={"nama_depan"} value={"Nama depan"} />
                    <Input
                      type={"text"}
                      name={"nama_depan"}
                      placeholder={"Masukkan nama depan.."}
                      variant={"primary-outline"}
                    />
                  </div>
                  <div>
                    <Label htmlFor={"nama_belakang"} value={"Nama belakang"} />
                    <Input
                      type={"text"}
                      name={"nama_belakang"}
                      placeholder={"Masukkan nama belakang.."}
                      variant={"primary-outline"}
                    />
                  </div>
                </div>
                <div className="pb-2">
                  <Label htmlFor={"email"} value={"Alamat email"} />
                  <Input
                    type={"text"}
                    name={"email"}
                    placeholder={"Masukkan alamat email.."}
                    variant={"primary-outline"}
                  />
                </div>
                <div className="pb-2">
                  <Label htmlFor={"nomor_telepon"} value={"Nomor telepon"} />
                  <Input
                    type={"text"}
                    name={"nomor_telepon"}
                    placeholder={"Masukkan alamat nomor telepon.."}
                    variant={"primary-outline"}
                  />
                </div>
                <Button
                  value="Kirim pesan"
                  className="w-full mt-6 font-semibold "
                />
              </div>
            </div>

            <div
              className="w-full h-full"
              dangerouslySetInnerHTML={{
                __html: contacts.url_map,
              }}
            />
          </div>
        </div>
      </section>

      <GuestLayouts.Footer />
    </GuestLayouts>
  );
};

export default About;
