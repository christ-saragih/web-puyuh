import Admin from "../../assets/images/admin.svg";
import Logo from "../../assets/images/logo.svg";
import MenuItem from "./MenuItem";
import { guestMenus } from "./MenuList";
import { AuthContext } from "../../contexts/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { LuChevronDown, LuHome, LuLogOut } from "react-icons/lu";
import { Dropdown } from "flowbite-react";
import { getAdmin } from "../../services/admin.service";
import { getInvestor } from "../../services/investor.service";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [investor, setInvestor] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log("Logout gagal", error);
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        getAdmin((data) => {
          setAdmin(data);
        });
      } else if (user.role === "investor") {
        getInvestor((data) => {
          setInvestor(data);
        });
      }
    }
  }, [user]);

  const UserProfileImage = () => (
    <>
      {user.role === "admin" && admin && admin.adminBiodata?.foto_profil ? (
        <img
          src={admin.adminBiodata.foto_profil}
          alt={admin.adminBiodata.foto_profil}
          className="w-10 h-10 rounded-full"
        />
      ) : user.role === "investor" &&
        investor &&
        investor.investorBiodata?.foto_profil ? (
        <img
          src={`http://localhost:3000/api/biodata-investor/images/${investor.investorBiodata.foto_profil}`}
          alt={investor.investorBiodata.foto_profil}
          className="w-10 h-10 rounded-full"
        />
      ) : (
        <img
          src={Admin}
          alt="Default Profile"
          className="w-10 h-10 rounded-full"
        />
      )}
    </>
  );

  return (
    <nav className="bg-white w-full z-20 top-0 start-0 shadow-md shadow-[#4B241A] rounded-b-2xl">
      <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto lg:px-14 py-2">
        {/* Logo and Brand Name */}
        <div className="flex items-center space-x-3 ms-6 md:ms-10 lg:ms-0 py-2">
          <NavLink to="/" className="flex items-center space-x-3">
            <img src={Logo} className="h-10 sm:h-12 lg:h-14" alt="Logo" />
            <span className="hidden xl:block self-center text-2xl font-semibold whitespace-nowrap">
              PT Sukaharja Quail Indonesia
            </span>
          </NavLink>
        </div>

        {/* User Profile and Menu Toggle for Mobile */}
        <div className="flex items-center lg:order-2">
          {user && (
            <div className="flex items-center space-x-2 mr-4 lg:mr-0">
              <UserProfileImage />
              <Dropdown
                label=""
                dismissOnClick={false}
                placement="bottom-end"
                renderTrigger={() => (
                  <span className="cursor-pointer">
                    <LuChevronDown className="w-5 h-5" />
                  </span>
                )}
              >
                <Dropdown.Header>
                  <span className="block text-base">{user.username}</span>
                  <span className="block truncate text-sm font-medium">
                    {user.email}
                  </span>
                </Dropdown.Header>
                <Dropdown.Item
                  icon={LuHome}
                  as={Link}
                  to={user.role === "admin" ? "/admin" : "/investor"}
                >
                  Dashboard
                </Dropdown.Item>
                <Dropdown.Item icon={LuLogOut} onClick={handleLogout}>
                  Keluar
                </Dropdown.Item>
              </Dropdown>
            </div>
          )}
          <button
            onClick={handleToggle}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
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
        </div>

        {/* Menu Items and Login/Register Buttons */}
        <div
          className={`items-center justify-between w-full lg:flex lg:w-auto lg:order-1 ${
            isOpen ? "block" : "hidden"
          }`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 lg:p-0 lg:space-x-2 lg:flex-row lg:mt-0 lg:border-0">
            {guestMenus.map((guestMenu, index) => (
              <MenuItem key={`${index}-${guestMenu.text}`} {...guestMenu} />
            ))}
          </ul>
          {!user && (
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
          )}
        </div>

        {/* Login/Register Buttons for Desktop */}
        {!user && (
          <div className="hidden lg:flex lg:items-center lg:order-2 gap-2 space-x-3 lg:space-x-0">
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
        )}
      </div>
    </nav>
  );
};

export default Navbar;
