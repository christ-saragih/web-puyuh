import { useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import {
  PiArticleNyTimesBold,
  PiChartLineUpBold,
  PiCircleDuotone,
  PiCircleThin,
  PiUsersBold,
} from "react-icons/pi";
import Logo from "../../assets/images/logo.png";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      <aside
        id="sidebar-multi-level-sidebar"
        className={`ms-2 px-4 py-5 fixed top-0 left-0 z-40 h-screen transition-width duration-300 ease-in-out group ${
          isHovered ? "w-60" : "w-28"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Sidebar"
      >
        <div className="h-full flex flex-col px-3 py-10 bg-[#572618] rounded-2xl shadow-2xl">
          <NavLink to="/" className="flex items-center space-x-3 mb-6">
            <img
              src={Logo}
              className="h-14 w-14 rounded-full me-[2px]"
              alt="Logo"
            />
            <span
              className={`hidden group-hover:block self-center text-xl text-white font-semibold whitespace-nowrap transition-all duration-500 ease-in-out transform ${
                isHovered
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-10 opacity-0"
              }`}
            >
              CV Slamet <br /> Quail Farm
            </span>
          </NavLink>

          <ul className="mx-[5.5px] space-y-2 font-medium">
            <li>
              <a
                href="#"
                className="flex p-2 items-center text-gray-900 rounded-lg bg-[#ffffff1a] hover:bg-[#ffffff1a]"
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
              <button
                type="button"
                className="flex p-2 w-full items-center rounded-lg hover:bg-[#ffffff1a] focus:outline-none"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
              >
                <PiArticleNyTimesBold className="flex-shrink-0 w-7 h-7 text-white " />

                <span
                  className={`hidden group-hover:inline text-white text-lg ms-3 whitespace-nowrap transition-all duration-300 ease-in-out transform ${
                    isHovered
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-10 opacity-0"
                  }`}
                >
                  Konten
                </span>

                <svg
                  className={`text-white ms-3 w-2 h-2 transition-all duration-75 ease-in-out transform grow ${
                    isHovered
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-10 opacity-0"
                  } ${isDropdownOpen ? "rotate-180" : "rotate-0"}`}
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
                id="dropdown-example"
                className={`transition-all duration-300 ease-in-out  ${
                  isDropdownOpen ? "block" : "hidden"
                } py-2 space-y-2`}
              >
                <li>
                  <a
                    href="#"
                    className="flex p-2 items-center text-gray-900 rounded-lg hover:bg-[#ffffff1a]"
                  >
                    {/* kalo dropdown item active */}
                    <PiCircleDuotone className="flex-shrink-0 w-7 h-7 text-white bg-transparent" />
                    {/* <PiCircleThin className="flex-shrink-0 w-7 h-7 text-white bg-transparent" /> */}

                    <span
                      className={`hidden group-hover:inline text-white text-lg flex-1 ms-3 whitespace-nowrap transition-all duration-300 ease-in-out transform ${
                        isHovered
                          ? "translate-x-0 opacity-100"
                          : "-translate-x-10 opacity-0"
                      }`}
                    >
                      Beranda
                    </span>
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="flex p-2 items-center text-gray-900 rounded-lg hover:bg-[#ffffff1a]"
                  >
                    <PiCircleThin className="flex-shrink-0 w-7 h-7 text-white " />

                    <span
                      className={`hidden group-hover:inline text-white text-lg flex-1 ms-3 whitespace-nowrap transition-all duration-300 ease-in-out transform ${
                        isHovered
                          ? "translate-x-0 opacity-100"
                          : "-translate-x-10 opacity-0"
                      }`}
                    >
                      Artikel
                    </span>
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="flex p-2 items-center text-gray-900 rounded-lg hover:bg-[#ffffff1a]"
                  >
                    <PiCircleThin className="flex-shrink-0 w-7 h-7 text-white " />

                    <span
                      className={`hidden group-hover:inline text-white text-lg flex-1 ms-3 whitespace-nowrap transition-all duration-300 ease-in-out transform ${
                        isHovered
                          ? "translate-x-0 opacity-100"
                          : "-translate-x-10 opacity-0"
                      }`}
                    >
                      Tentang Kami
                    </span>
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="flex p-2 items-center text-gray-900 rounded-lg hover:bg-[#ffffff1a]"
                  >
                    <PiCircleThin className="flex-shrink-0 w-7 h-7 text-white " />

                    <span
                      className={`hidden group-hover:inline text-white text-lg flex-1 ms-3 whitespace-nowrap transition-all duration-300 ease-in-out transform ${
                        isHovered
                          ? "translate-x-0 opacity-100"
                          : "-translate-x-10 opacity-0"
                      }`}
                    >
                      FAQ
                    </span>
                  </a>
                </li>
              </ul>
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

      <div
        className={`px-8 py-5 rounded-xl bg-[#F5F5F7] transition-all duration-300 ease-in-out ${
          isHovered ? "md:ml-64" : "md:ml-32"
        }`}
      >
        <h1 className="text-3xl font-semibold">Halaman Dashboard Admin</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi maiores
          earum magni corrupti nesciunt rem eaque neque, debitis molestiae
          distinctio dolorem inventore. Dolores doloremque unde culpa? Sequi
          aperiam rem molestias?
        </p>
      </div>
    </>
  );
};

export default Sidebar;
