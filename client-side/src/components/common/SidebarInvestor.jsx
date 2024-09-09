import { useContext } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { PiChartLineUpBold } from "react-icons/pi";
import { FaMoneyBill } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";
import Logo from "../../assets/images/logo.svg";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

const SidebarInvestor = ({ isHovered, setIsHovered }) => {
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
        <aside
            id="sidebar-multi-level-sidebar"
            className={`ms-3 px-4 py-5 fixed top-0 left-0 z-40 h-screen transition-width duration-300 ease-in-out ${
                isHovered ? "w-60" : "w-28"
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            aria-label="Sidebar"
        >
            <div className="h-full flex flex-col justify-between px-3 py-10 bg-[#572618] rounded-2xl">
                <div>
                    <NavLink
                        to="/"
                        className="flex items-center space-x-3 mb-6"
                    >
                        <img
                            src={Logo}
                            className="h-14 w-14 rounded-full me-[2px]"
                            alt="Logo"
                        />
                        <span
                            className={`text-xl text-white font-semibold whitespace-nowrap transition-transform duration-300 ease-in-out transform ${
                                isHovered
                                    ? "opacity-100"
                                    : "opacity-0 translate-x-[-10px]"
                            }`}
                        >
                            CV Slamet <br /> Quail Farm
                        </span>
                    </NavLink>

                    <ul className="mx-[6px] space-y-2 font-medium">
                        <li>
                            <NavLink
                                to="/investor/"
                                className="flex p-2 items-center text-gray-900 rounded-lg hover:bg-[#ffffff1a]"
                            >
                                <LuLayoutDashboard className="flex-shrink-0 w-7 h-7 text-white " />

                                <span
                                    className={`text-white text-lg flex-1 ms-3 whitespace-nowrap transition-transform duration-300 ease-in-out transform ${
                                        isHovered
                                            ? "opacity-100 translate-x-0"
                                            : "opacity-0 translate-x-[-10px]"
                                    }`}
                                >
                                    Dashboard
                                </span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/investor/investasi"
                                className="flex p-2 items-center text-gray-900 rounded-lg hover:bg-[#ffffff1a]"
                            >
                                <PiChartLineUpBold className="flex-shrink-0 w-7 h-7 text-white " />

                                <span
                                    className={`text-white text-lg flex-1 ms-3 whitespace-nowrap transition-transform duration-300 ease-in-out transform ${
                                        isHovered
                                            ? "opacity-100 translate-x-0"
                                            : "opacity-0 translate-x-[-10px]"
                                    }`}
                                >
                                    Investasi
                                </span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/investor/transaksi"
                                className="flex p-2 items-center text-gray-900 rounded-lg hover:bg-[#ffffff1a]"
                            >
                                <FaMoneyBill className="flex-shrink-0 w-7 h-7 text-white " />

                                <span
                                    className={`text-white text-lg flex-1 ms-3 whitespace-nowrap transition-transform duration-300 ease-in-out transform ${
                                        isHovered
                                            ? "opacity-100 translate-x-0"
                                            : "opacity-0 translate-x-[-10px]"
                                    }`}
                                >
                                    Transaksi
                                </span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/investor/profil"
                                className="flex p-2 items-center text-gray-900 rounded-lg hover:bg-[#ffffff1a]"
                            >
                                <CgProfile className="flex-shrink-0 w-7 h-7 text-white" />

                                <span
                                    className={`text-white text-lg flex-1 ms-3 whitespace-nowrap transition-transform duration-300 ease-in-out transform ${
                                        isHovered
                                            ? "opacity-100 translate-x-0"
                                            : "opacity-0 translate-x-[-10px]"
                                    }`}
                                >
                                    Profil
                                </span>
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <div className="mt-4 md:mt-0">
                    <button
                        onClick={Logout}
                        className="flex p-3 items-center text-gray-900 rounded-lg hover:bg-[#ffffff1a] w-full"
                    >
                        <IoLogOutOutline className="flex-shrink-0 w-7 h-7 text-white" />

                        <span
                            className={`text-white text-lg flex-1 ms-3 whitespace-nowrap transition-transform duration-300 ease-in-out transform ${
                                isHovered
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 translate-x-[-10px]"
                            }`}
                        >
                            Keluar
                        </span>
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default SidebarInvestor;
