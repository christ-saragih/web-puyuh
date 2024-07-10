import React from "react";
import Logo from "../../assets/images/logo.png";

const Navbar = () => {
  return (
    <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-2">
        <a href="" className="flex items-center space-x-3">
          <img src={Logo} className="h-16" alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            CV Slamet Quail Farm
          </span>
        </a>
        <div className="flex md:order-2 gap-2 space-x-3 md:space-x-0">
          <button
            type="button"
            className="text-[#4B241A] bg-white border-2 border-[#4B241A] font-medium rounded-xl w-24 py-2 text-center"
          >
            Masuk
          </button>
          <button
            type="button"
            className="text-white bg-[#4B241A] font-medium rounded-xl w-24 py-2 text-center"
          >
            Daftar
          </button>
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-4 md:flex-row md:mt-0 md:border-0 md:bg-white">
            <li>
              <a
                href="#"
                className="block py-2 px-3 font-semibold text-[#4B241A] rounded-border-bottom rounded-xl md:py-2 md:px-5"
                aria-current="page"
              >
                Beranda
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 font-semibold text-[#81655e] rounded-xl md:py-2 md:px-5"
              >
                Investasi
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 font-semibold text-[#81655e] rounded-xl md:py-2 md:px-5"
              >
                Artikel
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 font-semibold text-[#81655e] rounded-xl md:py-2 md:px-5"
              >
                Tentang Kami
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
