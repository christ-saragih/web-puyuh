import Logo from "../../assets/images/logo.svg";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider.jsx";
import Label from "../../components/common/Label.jsx";
import Input from "../../components/common/Input.jsx";

const Masuk = () => {
  const { login } = useContext(AuthContext);
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(usernameOrEmail, password, "investor");
      navigate("/investor");
    } catch (error) {
      setError("Username/Email atau password salah");
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen w-full">
        {/* Background */}
        <div
          className="w-full lg:w-1/2 bg-cover bg-center min-h-[300px] lg:min-h-screen"
          style={{
            backgroundImage: `url('/src/assets/images/farm-bg-masuk.jpg')`,
          }}
        ></div>

        <div className="w-full lg:w-1/2">
          {/* Form */}
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
            <div className="flex items-center justify-center mb-8">
              <img
                src={Logo}
                alt="Logo"
                className="w-12 h-12 sm:w-14 sm:h-14 mr-4"
              />
              <h1 className="text-3xl font-bold text-gray-800">
                Sukaharja Smart Quail Farm
              </h1>
            </div>
            <div className="font-quicksand font-bold text-2xl">
              <h2>Selamat Datang 👋</h2>
            </div>
            <div>
              <Label
                value={"Username atau Email"}
                htmlFor={"usernameOrEmail"}
              />
              <Input
                name="usernameOrEmail"
                type="text"
                variant="primary-outline"
                placeholder="Masukkan username atau email.."
                value={usernameOrEmail}
                handleChange={(e) => setUsernameOrEmail(e.target.value)}
              />
            </div>
            <div>
              <Label value={"Password"} htmlFor={"password"} />
              <Input
                name="password"
                type="password"
                variant="primary-outline"
                placeholder="Masukkan password.."
                value={password}
                handleChange={(e) => setPassword(e.target.value)}
              />
              <Link
                to="/lupa-password"
                className=" text-[#4B241A] hover:text-[#381b13] text-right block font-semibold mt-1"
              >
                Lupa password?
              </Link>
            </div>
            <div className="mt-6 mb-2">
              <button
                type="submit"
                className="bg-[#4B241A] hover:bg-[#381b13] ease-in-out duration-300 text-white font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline w-full"
              >
                Masuk
              </button>
            </div>
          </form>
          
          {error && <p className="text-red-600 text-center mt-1">{error}</p>}


          <div className="text-center">
            <span className="text-gray-600">Belum punya akun? </span>
            <Link
              to="/daftar"
              className="text-[#4B241A] hover:text-[#381b13] font-semibold"
            >
              Daftar
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Masuk;
