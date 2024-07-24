import { useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import {
  PiArticleNyTimesBold,
  PiChartLineUpBold,
  PiUsersBold,
} from "react-icons/pi";
import Logo from "../../assets/images/logo.png";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <aside
      id="sidebar-multi-level-sidebar"
      className={`ms-3 px-4 py-5 fixed top-0 left-0 z-40 h-screen transition-width duration-300 ease-in-out group ${
        isHovered ? "w-60" : "w-28"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Sidebar"
    >
      <div className="h-full flex flex-col px-3 py-10 bg-[#572618] rounded-2xl">
        <NavLink to="/" className="flex items-center space-x-3 mb-6">
          <img
            src={Logo}
            className="h-14 w-14 rounded-full me-[2px]"
            alt="Logo"
          />
          <span
            className={`hidden group-hover:block self-center text-xl text-white font-semibold whitespace-nowrap transition-all duration-300 ease-in-out transform ${
              isHovered
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            CV Slamet <br /> Quail Farm
          </span>
        </NavLink>

        <ul className="mx-[6px] space-y-2 font-medium">
          <li>
            <a
              href="#"
              className="flex p-2 items-center text-gray-900 rounded-lg hover:bg-[#ffffff1a]"
            >
              <LuLayoutDashboard className="flex-shrink-0 w-7 h-7 text-white " />

              <span
                className={`hidden group-hover:inline text-white text-lg flex-1 ms-3 whitespace-nowrap transition-all duration-300 ease-in-out transform ${
                  isHovered
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-10 opacity-0"
                }`}
              >
                Dashboard
              </span>
            </a>
          </li>

          <li>
            <a
              href="#"
              className="flex p-2 items-center text-gray-900 rounded-lg hover:bg-[#ffffff1a]"
            >
              <PiArticleNyTimesBold className="flex-shrink-0 w-7 h-7 text-white " />

              <span
                className={`hidden group-hover:inline text-white text-lg flex-1 ms-3 whitespace-nowrap transition-all duration-300 ease-in-out transform ${
                  isHovered
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-10 opacity-0"
                }`}
              >
                Konten
              </span>
            </a>
          </li>

          <li>
            <a
              href="#"
              className="flex p-2 items-center text-gray-900 rounded-lg hover:bg-[#ffffff1a]"
            >
              <PiChartLineUpBold className="flex-shrink-0 w-7 h-7 text-white " />

              <span
                className={`hidden group-hover:inline text-white text-lg flex-1 ms-3 whitespace-nowrap transition-all duration-300 ease-in-out transform ${
                  isHovered
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-10 opacity-0"
                }`}
              >
                Investasi
              </span>
            </a>
          </li>

          <li>
            <a
              href="#"
              className="flex p-2 items-center text-gray-900 rounded-lg hover:bg-[#ffffff1a]"
            >
              <PiUsersBold className="flex-shrink-0 w-7 h-7 text-white" />

              <span
                className={`hidden group-hover:inline text-white text-lg flex-1 ms-3 whitespace-nowrap transition-all duration-300 ease-in-out transform ${
                  isHovered
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-10 opacity-0"
                }`}
              >
                Pengguna
              </span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
