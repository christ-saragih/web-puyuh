import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { LuLayoutDashboard } from 'react-icons/lu';
import { PiNotebookBold, PiCircleDuotone, PiCircleThin, PiArticleNyTimesBold, PiChartLineUpBold, PiUsersBold } from 'react-icons/pi';
import LogoPutih from '../../assets/images/logo-putih.svg';

const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState({});

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (section) => {
    setIsDropdownOpen((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  return (
    <>
      {/* Hamburger button */}
      <div className="flex justify-between items-center p-4 bg-[#572618] text-white fixed top-0 left-0 w-full z-20 lg:hidden">
        <img src={LogoPutih} alt="Logo" className="h-10 w-10" />
        <button onClick={toggleMenu}>
          {isMenuOpen ? <FiX className="text-3xl" /> : <FiMenu className="text-3xl" />}
        </button>
      </div>

      {/* Sidebar that slides in from the left */}
      <aside
        className={`fixed top-0 left-0 z-30 h-full w-64 bg-[#572618] shadow-lg transition-transform transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
      >
        <div className="h-full overflow-y-auto py-10 px-3">
          <NavLink to="/admin" className="flex items-center space-x-3 mb-6">
            <img src={LogoPutih} className="h-10 w-10" alt="Logo Putih" />
            <span className="text-xl text-white font-semibold whitespace-nowrap">
              PT Sukaharja Quail Indonesia
            </span>
          </NavLink>

          <ul className="space-y-2 font-medium">
            <li>
              <NavLink
                to="/admin"
                end
                className={({ isActive }) =>
                  isActive
                    ? "flex p-2 items-center text-gray-900 rounded-lg bg-[#ffffff1a]"
                    : "flex p-2 items-center text-gray-900 rounded-lg hover:bg-[#ffffff1a]"
                }
              >
                <LuLayoutDashboard className="w-7 h-7 text-white" />
                <span className="text-white text-lg ms-3">Dashboard</span>
              </NavLink>
            </li>
            <li>
            <button
            type="button"
            className={`flex p-2 w-full items-center rounded-lg focus:outline-none ${
                isDropdownOpen.halaman_depan ? "text-gray-900 bg-[#ffffff1a]" : "text-gray-900 hover:bg-[#ffffff1a]"
            }`}
            onClick={() => toggleDropdown("halaman_depan")}
            >
            <PiNotebookBold className="flex-shrink-0 w-7 h-7 text-white " />
            <span
                className="text-white text-lg ms-3 whitespace-nowrap transition-all duration-300 ease-in-out"
            >
                Halaman Depan
            </span>
            <svg
                className={`text-white ms-3 w-2 h-2 transition-all duration-75 ease-in-out transform ${
                isDropdownOpen.halaman_depan ? "rotate-180" : "rotate-0"
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
            >
                <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
                />
            </svg>
            </button>
            <ul
            className={`transition-transform duration-300 ease-in-out ${
                isDropdownOpen.halaman_depan ? "block" : "hidden"
            } pt-2 space-y-2`}
            >
                <li>
                  <NavLink
                    to="/admin/halaman-depan/utama"
                    className="flex p-2 items-center text-gray-900 rounded-lg hover:bg-[#ffffff1a]"
                  >
                    {({ isActive }) => (
                      <>
                        {isActive ? (
                          <PiCircleDuotone className="flex-shrink-0 w-7 h-7 text-white bg-transparent" />
                        ) : (
                          <PiCircleThin className="flex-shrink-0 w-7 h-7 text-white bg-transparent" />
                        )}
                        <span className="text-white text-lg flex-1 ms-3 whitespace-nowrap">
                          Utama
                        </span>
                      </>
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/halaman-depan/profil"
                    className="flex p-2 items-center text-gray-900 rounded-lg hover:bg-[#ffffff1a]"
                  >
                    {({ isActive }) => (
                      <>
                        {isActive ? (
                          <PiCircleDuotone className="flex-shrink-0 w-7 h-7 text-white bg-transparent" />
                        ) : (
                          <PiCircleThin className="flex-shrink-0 w-7 h-7 text-white bg-transparent" />
                        )}
                        <span className="text-white text-lg flex-1 ms-3 whitespace-nowrap">
                          Profil
                        </span>
                      </>
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/halaman-depan/kontak"
                    className="flex p-2 items-center text-gray-900 rounded-lg hover:bg-[#ffffff1a]"
                  >
                    {({ isActive }) => (
                      <>
                        {isActive ? (
                          <PiCircleDuotone className="flex-shrink-0 w-7 h-7 text-white bg-transparent" />
                        ) : (
                          <PiCircleThin className="flex-shrink-0 w-7 h-7 text-white bg-transparent" />
                        )}
                        <span className="text-white text-lg flex-1 ms-3 whitespace-nowrap">
                          Kontak
                        </span>
                      </>
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/halaman-depan/media-sosial"
                    className="flex p-2 items-center text-gray-900 rounded-lg hover:bg-[#ffffff1a]"
                  >
                    {({ isActive }) => (
                      <>
                        {isActive ? (
                          <PiCircleDuotone className="flex-shrink-0 w-7 h-7 text-white bg-transparent" />
                        ) : (
                          <PiCircleThin className="flex-shrink-0 w-7 h-7 text-white bg-transparent" />
                        )}
                        <span className="text-white text-lg flex-1 ms-3 whitespace-nowrap">
                          Media Sosial
                        </span>
                      </>
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/halaman-depan/dokumentasi"
                    className="flex p-2 items-center text-gray-900 rounded-lg hover:bg-[#ffffff1a]"
                  >
                    {({ isActive }) => (
                      <>
                        {isActive ? (
                          <PiCircleDuotone className="flex-shrink-0 w-7 h-7 text-white bg-transparent" />
                        ) : (
                          <PiCircleThin className="flex-shrink-0 w-7 h-7 text-white bg-transparent" />
                        )}
                        <span className="text-white text-lg flex-1 ms-3 whitespace-nowrap">
                          Dokumentasi
                        </span>
                      </>
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/halaman-depan/dokumen"
                    className="flex p-2 items-center text-gray-900 rounded-lg hover:bg-[#ffffff1a]"
                  >
                    {({ isActive }) => (
                      <>
                        {isActive ? (
                          <PiCircleDuotone className="flex-shrink-0 w-7 h-7 text-white bg-transparent" />
                        ) : (
                          <PiCircleThin className="flex-shrink-0 w-7 h-7 text-white bg-transparent" />
                        )}
                        <span className="text-white text-lg flex-1 ms-3 whitespace-nowrap">
                          Dokumen
                        </span>
                      </>
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/halaman-depan/faq"
                    className="flex p-2 items-center text-gray-900 rounded-lg hover:bg-[#ffffff1a]"
                  >
                    {({ isActive }) => (
                      <>
                        {isActive ? (
                          <PiCircleDuotone className="flex-shrink-0 w-7 h-7 text-white bg-transparent" />
                        ) : (
                          <PiCircleThin className="flex-shrink-0 w-7 h-7 text-white bg-transparent" />
                        )}
                        <span className="text-white text-lg flex-1 ms-3 whitespace-nowrap">
                          FAQ
                        </span>
                      </>
                    )}
                  </NavLink>
                </li>
              </ul>
            </li>
            {/* Other main menu items */}
            <li>
              <NavLink
                to="/admin/produk"
                className={({ isActive }) =>
                  isActive
                    ? "flex p-2 items-center text-gray-900 rounded-lg bg-[#ffffff1a]"
                    : "flex p-2 items-center text-gray-900 rounded-lg hover:bg-[#ffffff1a]"
                }
              >
                <PiArticleNyTimesBold className="w-7 h-7 text-white" />
                <span className="text-white text-lg ms-3">Produk</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/laporan"
                className={({ isActive }) =>
                  isActive
                    ? "flex p-2 items-center text-gray-900 rounded-lg bg-[#ffffff1a]"
                    : "flex p-2 items-center text-gray-900 rounded-lg hover:bg-[#ffffff1a]"
                }
              >
                <PiChartLineUpBold className="w-7 h-7 text-white" />
                <span className="text-white text-lg ms-3">Laporan</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/pengguna"
                className={({ isActive }) =>
                  isActive
                    ? "flex p-2 items-center text-gray-900 rounded-lg bg-[#ffffff1a]"
                    : "flex p-2 items-center text-gray-900 rounded-lg hover:bg-[#ffffff1a]"
                }
              >
                <PiUsersBold className="w-7 h-7 text-white" />
                <span className="text-white text-lg ms-3">Pengguna</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>

      {/* Overlay when sidebar is open */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10"
          onClick={toggleMenu}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
