import "../../assets/style/index.css";
import Logo from "../../assets/images/logo.png";
import GuestLayout from "../../layouts/GuestLayout";
import { loginAdmin } from "../../services/authAdmin.service";
import { useEffect, useRef, useState } from "react";

const AdminMasuk = () => {
  const [loginFailed, setLoginFailed] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    const data = {
      usernameOrEmail: event.target.usernameOrEmail.value,
      password: event.target.password.value,
    };

    loginAdmin(data, (status, res) => {
      if (status) {
        // localStorage.setItem("accessToken", res);
        window.location.href = "/admin";
      } else {
        setLoginFailed(res.response.data.message);
      }
    });
  };

  const usernameOrEmailRef = useRef(null);

  useEffect(() => {
    usernameOrEmailRef.current.focus();
  }, []);

  return (
    <GuestLayout>
      {/* background */}
      <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-[#4B241A]"></div>
      {/* form */}
      <div className="relative flex flex-col items-center justify-center min-h-screen w-full z-10">
        <div className="w-full lg:w-1/2 p-8 bg-white rounded-lg">
          <div className="flex items-center justify-center mb-8">
            <img src={Logo} alt="Logo" className="w-20 h-20 mr-4" />
            <h1 className="text-2xl font-bold text-gray-800">
              Sukaharja Smart Quail Farm
            </h1>
          </div>
          <div className="font-quicksand font-bold text-[1.5rem] mb-2">
            <h2>Selamat Datang, Admin</h2>
          </div>
          {/* Login Failed */}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="usernameOrEmail"
              >
                Username/Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="usernameOrEmail"
                name="usernameOrEmail"
                type="text"
                placeholder="Masukkan username/email.."
                ref={usernameOrEmailRef}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                name="password"
                type="password"
                placeholder="Masukkan password.."
              />
              <a
                href="/admin/lupa-password"
                className="text-sm text-right block text-orange-600 mt-1"
              >
                Lupa Password?
              </a>
            </div>
            <div className="mb-6">
              <button
                className="bg-[#4B241A] hover:bg-[#381f19] text-white font-bold py-2 px-4 mb-2 rounded focus:outline-none focus:shadow-outline w-full"
                type="submit"
              >
                Masuk
              </button>
              {loginFailed && <p className="text-red-600">{loginFailed}</p>}
            </div>
          </form>
        </div>
      </div>
    </GuestLayout>
  );
};

export default AdminMasuk;
