import { NavLink } from "react-router-dom";
import Logo from "../../assets/images/logo.png";

const Navbar = () => {
  return (
    <nav className="bg-white fixed w-full z-20 top-0 start-0 shadow-md shadow-[#4B241A] rounded-b-2xl">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-2">
        <NavLink to="/" className="flex items-center space-x-3">
          <img src={Logo} className="h-16" alt="Logo" />
          <span className="hidden xl:block self-center text-2xl font-semibold whitespace-nowrap">
            CV Slamet Quail Farm
          </span>
        </NavLink>
        <div className="flex md:order-2 gap-2 space-x-3 md:space-x-0">
          <a href="/masuk">
            <button
              type="button"
              className="text-[#4B241A] bg-white border-2 border-[#4B241A] font-medium rounded-xl w-24 py-2 text-center hover:font-semibold hover:text-white hover:bg-[#4B241A] ease-in-out duration-300"
            >
              Masuk
            </button>
          </a>
          <a href="/daftar">
            <button
              type="button"
              className="text-white bg-[#4B241A] border-2 border-[#4B241A] font-medium rounded-xl w-24 py-2 text-center hover:font-semibold hover:text-[#4B241A] hover:bg-white hover:border-[#4B241A] ease-in-out duration-300"
            >
              Daftar
            </button>
          </a>
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
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
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
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "block py-2 px-3 font-semibold text-[#4B241A] menu-item-active rounded-xl md:py-2 md:px-5"
                    : "block py-2 px-3 font-medium text-[#81655e] rounded-xl md:py-2 md:px-5 menu-item"
                }
              >
                Beranda
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/investasi"
                className={({ isActive }) =>
                  isActive
                    ? "block py-2 px-3 font-semibold text-[#4B241A] menu-item-active rounded-xl md:py-2 md:px-5"
                    : "block py-2 px-3 font-medium text-[#81655e] rounded-xl md:py-2 md:px-5 menu-item"
                }
              >
                Investasi
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/artikel"
                className={({ isActive }) =>
                  isActive
                    ? "block py-2 px-3 font-semibold text-[#4B241A] menu-item-active rounded-xl md:py-2 md:px-5"
                    : "block py-2 px-3 font-medium text-[#81655e] rounded-xl md:py-2 md:px-5 menu-item"
                }
              >
                Artikel
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tentang-kami"
                className={({ isActive }) =>
                  isActive
                    ? "block py-2 px-3 font-semibold text-[#4B241A] menu-item-active rounded-xl md:py-2 md:px-5"
                    : "block py-2 px-3 font-medium text-[#81655e] rounded-xl md:py-2 md:px-5 menu-item"
                }
              >
                Tentang Kami
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
