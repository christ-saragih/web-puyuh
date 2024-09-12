import ScrollToTopButton from "./ScrollToTopButton";
import Navbar from "./Navbar";
import LogoPutih from "../../assets/images/logo-putih.svg";
import { getSocialMedia } from "../../services/social-media.service";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { guestMenus } from "./MenuList";
import { AuthProvider } from "../../contexts/AuthProvider";

const GuestLayouts = (props) => {
  const { children } = props;
  return (
    <div className="flex flex-col min-h-screen">
      <AuthProvider>
        <Navbar />
      </AuthProvider>
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
      <div className="mx-auto w-full max-w-screen-xl px-4 pt-6 pb-4 lg:pt-8 lg:pb-5 ">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link to={"/"} className="flex items-center">
              <img
                src={LogoPutih}
                alt="Logo Putih"
                className="h-10 sm:h-12 lg:h-14 me-3"
              />
              <span className="self-center text-gray-100 text-xl lg:text-2xl font-semibold whitespace-nowrap">
                PT Sukaharja Quail Indonesia
              </span>
            </Link>
          </div>

          <ul className="flex items-center space-x-4 md:space-x-6 font-medium text-gray-100 sm:mb-0 overflow-auto">
            {guestMenus.map((guestMenus, index) => (
              <li key={`${index}-${guestMenus.text}`} className="min-w-fit">
                <Link to={guestMenus.link} className="hover:underline">
                  {guestMenus.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <hr className="mt-6 border-[#EFEFEF] sm:mx-auto lg:mt-8 mb-4" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-[#EFEFEF] text-sm sm:text-center">
            © 2024{" "}
            <Link to={"/"} className="font-semibold hover:underline">
              PT Sukaharja Quail Indonesia
            </Link>
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
