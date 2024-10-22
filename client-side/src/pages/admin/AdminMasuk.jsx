import Logo from "../../assets/images/logo.svg";
import Label from "../../components/common/Label";
import Input from "../../components/common/Input";
import InputError from "../../components/common/InputError";
import { AuthContext } from "../../contexts/AuthProvider";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const AdminMasuk = () => {
  const { login } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loginAdmin = async () => {
    setError("");
    try {
      await login(
        formik.values.usernameOrEmail,
        formik.values.password,
        "admin"
      );
      navigate("/admin");
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
    onSubmit: loginAdmin,
    validationSchema: validationSchema,
  });

  const handleInputChange = (event) => {
    const { target } = event;
    formik.setFieldValue(target.name, target.value);
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

          <form onSubmit={formik.handleSubmit}>
            <div>
              <Label value={"Username/Email"} htmlFor={"usernameOrEmail"} />
              <Input
                name="usernameOrEmail"
                type="text"
                variant="primary-outline"
                placeholder="Masukkan username/email.."
                handleChange={handleInputChange}
                isError={!!formik.errors.usernameOrEmail}
                isFocused
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
              <div className="flex justify-end">
                <Link
                  to={"/admin/lupa-password"}
                  className=" text-[#4B241A] hover:text-[#381b13] text-right block font-semibold mt-1"
                >
                  Lupa password?
                </Link>
              </div>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="bg-[#4B241A] hover:bg-[#381b13] ease-in-out duration-300 text-white font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline w-full"
              >
                Masuk
              </button>
            </div>
            <InputError message={error} className={"text-center"} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminMasuk;
