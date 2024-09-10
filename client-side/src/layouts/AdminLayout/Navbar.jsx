import Admin from "../../assets/images/admin.svg";
import { useEffect, useState, useContext, useRef } from "react";
import { PiBackspaceBold, PiUserBold } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { apiAdmin } from "../../hooks/useAxiosConfig";
import { AuthContext } from "../../contexts/AuthProvider";
import { Dropdown } from "flowbite-react";

const Navbar = (props) => {
  const { logout } = useContext(AuthContext);
  const { title } = props;
  const [admin, setAdmin] = useState(null); // State untuk menyimpan data admin
  const [loading, setLoading] = useState(true); // State untuk loading
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State untuk toggle menu pop-up
  const navigate = useNavigate();
  const menuRef = useRef(null); // Ref untuk elemen modal pop-up

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

  const HandleLogout = async () => {
    try {
      await logout();
      navigate("/admin/masuk");
    } catch (error) {
      console.log("Logout gagal", error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle state untuk membuka atau menutup pop-up
  };

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsMenuOpen(false); // Jika klik di luar modal, tutup modal
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside); // Cleanup saat komponen di-unmount
  }, [isMenuOpen]);

  if (loading) {
    return <p>Loading...</p>; // Tampilkan pesan loading saat data sedang diambil
  }

  return (
    <>
      {/* Navbar */}
      <nav className="bg-[#F5F5F7] ml-6 md:ml-0 rounded-2xl shadow-md md:mt-0 mt-16">
        <div className="w-full flex justify-between items-center py-4 px-6">
          <h1 className="text-xl md:text-3xl font-semibold">{title}</h1>

          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-default"
            aria-expanded={isMenuOpen}
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

          {/* Konten untuk desktop */}
          <div className="hidden md:flex md:items-center md:gap-4">
            <img src={Admin} alt="Admin" className="w-12 h-12" />
            <div>
              <p className="font-poppins font-medium text-lg text-black">
                {admin?.username}
              </p>
              <p className="font-poppins text-slate-700">{admin?.email}</p>
            </div>

            {/* Dropdown untuk desktop */}
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
              <Dropdown.Item icon={PiUserBold} as={Link} to={"/admin/profil"}>
                Profil
              </Dropdown.Item>
              <Dropdown.Item icon={PiBackspaceBold} onClick={HandleLogout}>
                Keluar
              </Dropdown.Item>
            </Dropdown>
          </div>

          {/* Pop-up menu kecil untuk mobile */}
          {isMenuOpen && (
            <div
              ref={menuRef} // Tambahkan ref pada elemen modal
              className="fixed top-16 right-4 z-50 w-64 bg-white shadow-lg rounded-lg p-4 mobile-menu"
              style={{ maxHeight: "80vh", overflowY: "auto" }}
            >
              <img src={Admin} alt="Admin" className="w-12 h-12 mb-4 mx-auto" />
              <div className="text-center">
                <p className="font-poppins font-medium text-lg text-black">
                  {admin?.username}
                </p>
                <p className="font-poppins text-slate-700">{admin?.email}</p>
              </div>
              <div className="mt-6">
                <button
                  className="block w-full text-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  // onClick={HandleLogout}
                >
                  <PiUserBold className="mr-1 inline-block" />
                  Profil
                </button>
                <button
                  className="block w-full text-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  onClick={HandleLogout}
                >
                  <PiBackspaceBold className="mr-1 inline-block" />
                  Keluar
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
