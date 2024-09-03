import Admin from "../../assets/images/admin.svg";
import { Dropdown } from "flowbite-react";
import { useEffect, useState } from "react";
import { PiBackspaceBold, PiUserBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../hooks/useAxiosConfig";

// import { useLoginAdmin } from "../../hooks/useLoginAdmin";
// import { logoutAdmin } from "../../services/authAdmin.service";

const Navbar = (props) => {
    const { title } = props;
    const [admin, setAdmin] = useState(null); // State untuk menyimpan data admin
    const [loading, setLoading] = useState(true); // State untuk loading
    const navigate = useNavigate();

    // Fungsi untuk memanggil API dan mengambil data admin
    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const response = await axiosInstance.get("/admin"); // Gunakan instance axios
                console.log(response.data.data);

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

    // const dataAdmin = useLoginAdmin();

    // const handleLogout = () => {
    //   logoutAdmin((success, err) => {
    //     if (success) {
    //       // Hapus accessToken dari localStorage

    //       window.location.href = "/admin/masuk";
    //     } else {
    //       console.error("Gagal logout: ", err);
    //     }
    //   });
    // };

    return (
        <nav className=" bg-[#F5F5F7] rounded-2xl shadow-md">
            <div className="w-full flex flex-wrap justify-between items-center py-4 px-6">
                <h1 className="text-3xl font-semibold">{title}</h1>
                {/* <div>
          <h1 className="text-3xl font-semibold mb-2">Konten Artikel</h1>
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li className="inline-flex items-center">
                <a
                  href="#"
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3 me-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                  </svg>
                  Home
                </a>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <a
                    href="#"
                    className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                  >
                    Projects
                  </a>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg
                    className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                    Flowbite
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div> */}

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
                            // onClick={handleLogout}
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
