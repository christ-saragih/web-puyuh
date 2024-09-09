import { useContext, useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { PiChartLineUpBold } from "react-icons/pi";
import { FaMoneyBill } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";
import { AiOutlineMenu } from "react-icons/ai";
import LogoPutih from "../../assets/images/logo-putih.svg";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const Logout = async () => {
    try {
      await logout();
      navigate("/masuk");
    } catch (error) {
      console.log("Logout gagal", error);
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="fixed top-0 left-0 z-50 bg-[#572618] p-3 w-full flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img src={LogoPutih} className="h-8 ml-4" alt="Logo Putih" />
        <AiOutlineMenu className="text-white w-8 h-8 mr-4" />
      </button>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Sidebar Content */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-[#572618] p-6 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Mobile Sidebar"
      >
        <div className="flex flex-col justify-between h-full">
          <div>
            <NavLink
              to="/"
              className="flex items-center space-x-3 mb-6"
              onClick={() => setIsOpen(false)}
            >
              <img src={LogoPutih} className="h-12 w-12" alt="Logo Putih" />
              <span className="text-xl text-white font-semibold whitespace-nowrap">
                PT Sukaharja <br /> Quail Indonesia
              </span>
            </NavLink>

            <ul className="space-y-4 font-medium">
              <li>
                <NavLink
                  to="/investor/"
                  className="flex p-2 items-center text-gray-900 rounded-lg hover:bg-[#ffffff1a]"
                  onClick={() => setIsOpen(false)}
                >
                  <LuLayoutDashboard className="w-6 h-6 text-white" />
                  <span className="text-white text-lg ml-3">Dashboard</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/investor/investasi"
                  className="flex p-2 items-center text-gray-900 rounded-lg hover:bg-[#ffffff1a]"
                  onClick={() => setIsOpen(false)}
                >
                  <PiChartLineUpBold className="w-6 h-6 text-white" />
                  <span className="text-white text-lg ml-3">Investasi</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/investor/transaksi"
                  className="flex p-2 items-center text-gray-900 rounded-lg hover:bg-[#ffffff1a]"
                  onClick={() => setIsOpen(false)}
                >
                  <FaMoneyBill className="w-6 h-6 text-white" />
                  <span className="text-white text-lg ml-3">Transaksi</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/investor/profil"
                  className="flex p-2 items-center text-gray-900 rounded-lg hover:bg-[#ffffff1a]"
                  onClick={() => setIsOpen(false)}
                >
                  <CgProfile className="w-6 h-6 text-white" />
                  <span className="text-white text-lg ml-3">Profil</span>
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <button
              onClick={() => {
                Logout();
                setIsOpen(false);
              }}
              className="flex p-3 items-center text-gray-900 rounded-lg hover:bg-[#ffffff1a] w-full"
            >
              <IoLogOutOutline className="w-6 h-6 text-white" />
              <span className="text-white text-lg ml-3">Keluar</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default MobileSidebar;
