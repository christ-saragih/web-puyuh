import ScrollToTopButton from "./ScrollToTopButton";
import Navbar from "./Navbar";
import Logo from "../../assets/images/logo.png";
import { getSocialMedia } from "../../services/social-media.service";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const GuestLayouts = (props) => {
  const { children } = props;
  return (
    <div>
      <Navbar />
      {children}

      <ScrollToTopButton />
    </div>
  );
};

const Footer = () => {
  const [socialMedias, setSocialMedias] = useState([]);

  useEffect(() => {
    getSocialMedia((data) => {
      setSocialMedias(data);
    });
  }, []);

  return (
    <footer className="bg-[#4B241A] ">
      <div className="mx-auto w-full max-w-screen-xl px-4 pt-6 pb-4 lg:pt-8 lg:pb-5">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="#" className="flex items-center">
              <img src={Logo} alt="Logo" className="h-16 rounded-full me-3" />
              <span className="self-center text-gray-100 text-2xl font-semibold whitespace-nowrap">
                CV Slamet Quail Farm
              </span>
            </a>
          </div>

          <ul className="flex flex-wrap items-center space-x-4 md:space-x-6 font-medium text-gray-100 sm:mb-0">
            <li>
              <Link to={"/"} className="hover:underline">
                Beranda
              </Link>
            </li>
            <li>
              <Link to={"/investasi"} className="hover:underline">
                Investasi
              </Link>
            </li>
            <li>
              <Link to={"/artikel"} className="hover:underline">
                Artikel
              </Link>
            </li>
            <li>
              <Link to={"/tentang-kami"} className="hover:underline">
                Tentang Kami
              </Link>
            </li>
            <li>
              <Link to={"/faq"} className="hover:underline">
                FAQ
              </Link>
            </li>
          </ul>
        </div>
        <hr className="mt-6 border-[#EFEFEF] sm:mx-auto lg:mt-8 mb-4" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-[#EFEFEF] text-sm sm:text-center">
            © 2024{" "}
            <a href="#" className="hover:underline">
              CV Slamet Quail Farm
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0 space-x-2 md:space-x-4">
            {socialMedias.map((socialMedia) => (
              <Link key={socialMedia.id} to={socialMedia.url} target="_blank">
                <img
                  src={`http://localhost:3000/api/sosial-media/image/${socialMedia.icon}`}
                  alt={socialMedia.nama}
                  className="w-10 h-10 rounded-full"
                />
                <span className="sr-only">{socialMedia.nama}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

GuestLayouts.Footer = Footer;

export default GuestLayouts;