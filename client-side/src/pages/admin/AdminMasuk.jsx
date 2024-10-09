import Logo from "../../assets/images/logo.svg";
import Input from "../../components/common/Input";
import Label from "../../components/common/Label";
import { AuthContext } from "../../contexts/AuthProvider";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminMasuk = () => {
  const { login } = useContext(AuthContext);
  const [formLogin, setFormLogin] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormLogin({
      ...formLogin,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(formLogin.usernameOrEmail, formLogin.password, "admin");
      navigate("/admin");
    } catch (error) {
      setError("Username/Email atau password salah");
    }
  };

  return (
    <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-[#4B241A]">
      <div className="relative flex flex-col items-center justify-center mx-auto min-h-screen w-[90%] lg:w-full z-10">
        <div className="w-full lg:w-1/2 p-8 bg-white rounded-lg">
          <div className="flex items-center justify-center mb-10">
            <img
              src={Logo}
              alt="Logo"
              className="w-12 h-12 sm:w-14 sm:h-14 mr-4"
            />
            <h1 className="font-bold text-2xl sm:text-3xl text-gray-800">
              PT Sukaharja Smart Quail Farm
            </h1>
          </div>
          <div className="font-quicksand font-bold text-xl sm:text-[1.5rem] mb-4">
            <h2>Selamat Datang, Admin 👋</h2>
          </div>
          {/* Login Failed */}
          <form onSubmit={handleSubmit}>
            <div>
              <Label value={"Username/Email"} htmlFor={"usernameOrEmail"} />
              <Input
                name="usernameOrEmail"
                type="text"
                variant="primary-outline"
                placeholder="Masukkan username/email.."
                value={formLogin.usernameOrEmail}
                handleChange={handleChange}
              />
            </div>
            <div>
              <Label value={"Password"} htmlFor={"password"} />
              <Input
                name="password"
                type="password"
                variant="primary-outline"
                placeholder="Masukkan password.."
                value={formLogin.password}
                handleChange={handleChange}
              />
              <div className="flex justify-end">
                <Link
                  to={"/admin/lupa-password"}
                  className="w-fit text-sm block text-red-600 hover:underline"
                >
                  Lupa Password?
                </Link>
              </div>
            </div>
            <div className="mt-4">
              <button
                className="bg-[#4B241A] hover:bg-[#381f19] text-white font-bold py-2 px-4 mb-2 rounded-2xl shadow focus:outline-none focus:shadow-outline w-full"
                type="submit"
              >
                Masuk
              </button>
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminMasuk;
