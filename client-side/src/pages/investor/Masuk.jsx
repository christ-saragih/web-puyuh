import Logo from "../../assets/images/logo.svg";
import Label from "../../components/common/Label.jsx";
import Input from "../../components/common/Input.jsx";
import InputError from "../../components/common/InputError.jsx";
import { AuthContext } from "../../contexts/AuthProvider.jsx";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const Masuk = () => {
  const { login } = useContext(AuthContext);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    try {
      await login(
        formik.values.usernameOrEmail,
        formik.values.password,
        "investor"
      );
      navigate("/investor");
    } catch (error) {
      setError("Username/Email atau password salah");
    }
  };

  const validationSchema = Yup.object().shape({
    usernameOrEmail: Yup.string().required("Username atau email wajib diisi"),
    password: Yup.string().required("Password wajib diisi"),
  });

  const formik = useFormik({
    initialValues: {
      usernameOrEmail: "",
      password: "",
    },
    onSubmit: handleLogin,
    validationSchema: validationSchema,
  });

  const handleInputChange = (event) => {
    const { target } = event;
    formik.setFieldValue(target.name, target.value);
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
          <form onSubmit={formik.handleSubmit} className="max-w-xl mx-auto">
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
                handleChange={handleInputChange}
                isError={!!formik.errors.usernameOrEmail}
              />
              <InputError message={formik.errors.usernameOrEmail} />
            </div>
            <div>
              <Label value={"Password"} htmlFor={"password"} />
              <Input
                name="password"
                type="password"
                variant="primary-outline"
                placeholder="Masukkan password.."
                handleChange={handleInputChange}
                isError={!!formik.errors.password}
              />
              <InputError message={formik.errors.password} />
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
