import Admin from "../../assets/images/admin.svg";
import Logo from "../../assets/images/logo.svg";
import { Link, NavLink } from "react-router-dom";
import { guestMenus } from "./MenuList";
import MenuItem from "./MenuItem";
import { useState } from "react";
import { Dropdown } from "flowbite-react";
import { LuChevronDown, LuHome, LuLogOut } from "react-icons/lu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white w-full z-50 top-0 start-0 shadow-md shadow-[#4B241A] rounded-b-2xl">
      <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto lg:px-14 py-2">
        <NavLink
          to="/"
          className="flex items-center space-x-3 ms-6 md:ms-10 lg:ms-0 py-2"
        >
          <img src={Logo} className="h-10 sm:h-12 lg:h-14" alt="Logo" />
          <span className="hidden xl:block self-center text-2xl font-semibold whitespace-nowrap">
            PT Sukaharja Quail Indonesia
          </span>
        </NavLink>

        <div className="hidden lg:flex lg:items-center lg:order-2 gap-2 space-x-3 lg:space-x-0 ">

          {/* Tampilan saat user sudah login */}
          {/* <img src={Admin} alt="..." className="w-10 h-10" />

          <Dropdown
            label=""
            dismissOnClick={false}
            placement="bottom-start"
            renderTrigger={() => (
              <span>
                <LuChevronDown className="w-5 h-5" />
              </span>
            )}
          >
            <Dropdown.Header>
              <span className="block text-base">Bennefit Christy Saragih</span>
              <span className="block truncate text-sm font-medium">
                bennefit@gmail.com
              </span>
            </Dropdown.Header>
            <Dropdown.Item icon={LuHome}>Dashboard</Dropdown.Item>
            <Dropdown.Item
              icon={LuLogOut}
              // onClick={HandleLogout}
            >
              Keluar
            </Dropdown.Item>
          </Dropdown> */}

          {/* Tampilan saat user belum login */}
          <Link to="/masuk">
            <button
              type="button"
              className="text-[#4B241A] bg-white border-2 border-[#4B241A] font-medium rounded-xl w-24 py-2 text-center hover:font-semibold hover:text-white hover:bg-[#4B241A] ease-in-out duration-300"
            >
              Masuk
            </button>
          </Link>
          <Link to="/daftar">
            <button
              type="button"
              className="text-white bg-[#4B241A] border-2 border-[#4B241A] font-medium rounded-xl w-24 py-2 text-center hover:font-semibold hover:text-[#4B241A] hover:bg-white hover:border-[#4B241A] ease-in-out duration-300"
            >
              Daftar
            </button>
          </Link>
        </div>

        <button
          onClick={handleToggle}
          type="button"
          className="inline-flex items-center p-2 me-4 md:me-8 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
          aria-controls="navbar-sticky"
          aria-expanded={isOpen}
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

        <div
          className={`items-center justify-between w-full lg:flex lg:w-auto lg:order-1 ${
            isOpen ? "block" : "hidden"
          }`}
          id="navbar-sticky"
        >
          <div className="flex justify-center gap-3 mt-4 py-4 bg-gray-50 lg:hidden">
            <Link to="/masuk">
              <button
                type="button"
                className="text-[#4B241A] bg-white border-2 border-[#4B241A] font-medium rounded-xl w-24 py-2 text-center hover:font-semibold hover:text-white hover:bg-[#4B241A] ease-in-out duration-300"
              >
                Masuk
              </button>
            </Link>
            <Link to="/daftar">
              <button
                type="button"
                className="text-white bg-[#4B241A] border-2 border-[#4B241A] font-medium rounded-xl w-24 py-2 text-center hover:font-semibold hover:text-[#4B241A] hover:bg-white hover:border-[#4B241A] ease-in-out duration-300"
              >
                Daftar
              </button>
            </Link>
          </div>
          <ul className="flex flex-col p-4 lg:p-0 lg:space-x-2 lg:flex-row lg:mt-0 lg:border-0">
            {guestMenus.map((guestMenu, index) => (
              <MenuItem key={`${index}-${guestMenu.text}`} {...guestMenu} />
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
