import Admin from "../../assets/images/admin.svg";
import { Dropdown } from "flowbite-react";
import { useEffect, useState, useContext } from "react";
import { PiBackspaceBold, PiUserBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { apiAdmin } from "../../hooks/useAxiosConfig";
import { AuthAdminContext } from "../../contexts/AuthAdminProvider";

// import { useLoginAdmin } from "../../hooks/useLoginAdmin";
// import { logoutAdmin } from "../../services/authAdmin.service";

const Navbar = (props) => {
    const { logout } = useContext(AuthAdminContext);
    const { title } = props;
    const [admin, setAdmin] = useState(null); // State untuk menyimpan data admin
    const [loading, setLoading] = useState(true); // State untuk loading
    const navigate = useNavigate();

    // Fungsi untuk memanggil API dan mengambil data admin
    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const response = await apiAdmin.get("/admin"); // Gunakan instance axios

                setAdmin(response.data.data); // Simpan data admin ke state
            } catch (error) {
                console.error("Error fetching admin data:", error);
                if (error.response?.status === 401) {
                    navigate("/login"); // Redirect jika tidak otentikasi
                }
            } finally {
                setLoading(false); // Selesai loading
            }
        };

        fetchAdminData();
    }, [navigate]);

    if (loading) {
        return <p>Loading...</p>; // Tampilkan pesan loading saat data sedang diambil
    }

    const HandleLogout = async () => {
        try {
            await logout();

            navigate("/admin/masuk");
        } catch (error) {
            console.log("Logout gagal", error);
        }
    };

    return (
        <nav className=" bg-[#F5F5F7] rounded-2xl shadow-md">
            <div className="w-full flex flex-wrap justify-between items-center py-4 px-6">
                <h1 className="text-3xl font-semibold">{title}</h1>

                <button
                    data-collapse-toggle="navbar-default"
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-default"
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
                <div
                    className="hidden w-full md:flex md:items-center md:w-auto md:gap-4"
                    id="navbar-default"
                >
                    <img src={Admin} alt="" className="w-12 h-12" />
                    <div>
                        <p className="font-poppins font-medium text-lg text-black">
                            {admin?.username}
                        </p>
                        <p className="font-poppins text-slate-700">
                            {admin?.email}
                        </p>
                    </div>
                    <Dropdown
                        label=""
                        dismissOnClick={false}
                        placement="bottom-start"
                        renderTrigger={() => (
                            <svg
                                className="w-6 h-6 text-gray-800 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m19 9-7 7-7-7"
                                />
                            </svg>
                        )}
                    >
                        <Dropdown.Item icon={PiUserBold}>Profil</Dropdown.Item>
                        <Dropdown.Item
                            icon={PiBackspaceBold}
                            onClick={HandleLogout}
                        >
                            Keluar
                        </Dropdown.Item>
                    </Dropdown>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
