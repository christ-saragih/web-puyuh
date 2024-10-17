import DocumentIcon from "../../assets/images/icons/dokumen.svg";
import Label from "../../components/common/Label";
import Input from "../../components/common/Input";
import Textarea from "../../components/common/Textarea";
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
import { useFormik } from "formik";
import * as Yup from "yup";
import InputError from "../../components/common/InputError";
import '../../assets/style/quill-content.css';

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

  // Validasi schema menggunakan Yup
  const validationSchema = Yup.object().shape({
    nama_depan: Yup.string()
      .min(2, "Nama depan harus terdiri dari minimal 2 karakter")
      .required("Nama depan wajib diisi"),
    nama_belakang: Yup.string().min(
      2,
      "Nama belakang harus terdiri dari minimal 2 karakter"
    ),
    email: Yup.string()
      .email("Email tidak valid. Harap masukkan email yang benar (contoh: user@example.test)")
      .required("Alamat email wajib diisi"),
    pesan: Yup.string()
      .min(10, "Pesan harus terdiri dari minimal 10 karakter")
      .required("Pesan wajib diisi"),
  });

  const sendToWhatsApp = (values) => {
    const whatsappNumber = "6282269075325";
    const message = `Halo, saya ${values.nama_depan} ${values.nama_belakang}.\nEmail: ${values.email}.\n\nPesan: ${values.pesan}`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank");
  };

  const formik = useFormik({
    initialValues: {
      nama_depan: "",
      nama_belakang: "",
      email: "",
      pesan: "",
    },
    onSubmit: sendToWhatsApp,
    validationSchema: validationSchema,
  });

  const handleInputChange = (event) => {
    const { target } = event;
    formik.setFieldValue(target.name, target.value);
  };

  if (!abouts || sejarah.length === 0) {
    return <div>Data tentang kami tidak ditemukan!</div>;
  }

  console.log(formik.errors);

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
              {abouts.judul}
            </h2>
            <div className="format px-11 min-w-full">
              <p
              dangerouslySetInnerHTML={{
                __html: abouts.deskripsi,
              }}
              >
              </p>
            </div>
          </div>
          {/* column 2 */}
          <ImageSlider />
        </div>
      </section>
      <section className="bg-gradient-to-b from-white to-orange-100">
        {/* sejarah */}
        <div className="w-[90%] mx-auto  lg:px-20 mt-12 lg:mt-32 text-justify">
          <h1 className="font-bold text-3xl lg:text-4xl text-center tracking-wide mb-2 lg:mb-4">
            {sejarah.judul}
          </h1>
            <div className="format px-11 min-w-full">
              <p
              dangerouslySetInnerHTML={{
                __html: sejarah.deskripsi,
              }}
              >
              </p>
            </div>
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

              <form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-2 gap-8 pb-2">
                  <div>
                    <Label htmlFor={"nama_depan"} value={"Nama depan"} />
                    <Input
                      type={"text"}
                      name={"nama_depan"}
                      placeholder={"Masukkan nama depan.."}
                      variant={"primary-outline"}
                      handleChange={handleInputChange}
                      isError={!!formik.errors.nama_depan}
                    />
                    <InputError message={formik.errors.nama_depan} />
                  </div>
                  <div>
                    <Label htmlFor={"nama_belakang"} value={"Nama belakang"} />
                    <Input
                      type={"text"}
                      name={"nama_belakang"}
                      placeholder={"Masukkan nama belakang.."}
                      variant={"primary-outline"}
                      handleChange={handleInputChange}
                      isError={!!formik.errors.nama_belakang}
                    />
                    <InputError message={formik.errors.nama_belakang} />
                  </div>
                </div>
                <div className="pb-2">
                  <Label htmlFor={"email"} value={"Alamat email"} />
                  <Input
                    type={"text"}
                    name={"email"}
                    placeholder={"Masukkan alamat email.."}
                    variant={"primary-outline"}
                    handleChange={handleInputChange}
                    isError={!!formik.errors.email}
                  />
                  <InputError message={formik.errors.email} />
                </div>
                <div className="pb-2">
                  <Label htmlFor={"pesan"} value={"Pesan"} />
                  <Textarea
                    name={"pesan"}
                    placeholder={"Masukkan pesan.."}
                    rows={3}
                    variant={"primary-outline"}
                    handleChange={handleInputChange}
                    isError={!!formik.errors.pesan}
                  />
                  <InputError message={formik.errors.pesan} />
                </div>
                <Button
                  value="Kirim pesan"
                  className="w-full mt-6 font-semibold "
                />
              </form>
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
