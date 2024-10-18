import Logo from "../../assets/images/logo.svg";
import Label from "../../components/common/Label";
import Input from "../../components/common/Input";
import InputError from "../../components/common/InputError";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

const PasswordValidation = ({ password, confirmPassword }) => {
  const hasMinLength = password.length >= 8;
  const hasNumber = /[0-9]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasSymbol = /[^\w]/.test(password);
  const passwordsMatch = password === confirmPassword;
  const showValidation = password.length > 0;

  const ValidationItem = ({ condition, text }) => (
    <div className="flex items-center">
      <div
        className={`rounded-full p-0.5 fill-current mr-1 ${
          condition ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"
        }`}
      >
        <svg
          className="w-3 h-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {condition ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          )}
        </svg>
      </div>
      <span
        className={`text-sm ${condition ? "text-green-500" : "text-red-500"}`}
      >
        {text}
      </span>
    </div>
  );

  return (
    showValidation && (
      <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
        <ValidationItem
          condition={hasMinLength}
          text={
            hasMinLength ? "Panjang minimal tercapai" : "Minimal 8 karakter"
          }
        />
        <ValidationItem
          condition={hasNumber}
          text={hasNumber ? "Mengandung angka" : "Minimal 1 angka"}
        />
        <ValidationItem
          condition={hasUppercase}
          text={
            hasUppercase ? "Mengandung huruf besar" : "Minimal 1 huruf besar"
          }
        />
        <ValidationItem
          condition={hasLowercase}
          text={
            hasLowercase ? "Mengandung huruf kecil" : "Minimal 1 huruf kecil"
          }
        />
        <ValidationItem
          condition={hasSymbol}
          text={hasSymbol ? "Mengandung simbol" : "Minimal 1 simbol"}
        />
        <ValidationItem
          condition={passwordsMatch}
          text={passwordsMatch ? "Password cocok" : "Password tidak cocok"}
        />
      </div>
    )
  );
};

const ErrorModal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-xl max-w-sm">
        <h3 className="text-lg font-bold mb-2 text-red-600">Registrasi Gagal</h3>
        <p className="mb-4">{message}</p>
        <button
          onClick={onClose}
          className="bg-red-500 hover:bg-red-700 text-white font-bold float-end py-2 px-4 rounded"
        >
          Tutup
        </button>
      </div>
    </div>
  );
};

const Daftar = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const registerUser = async () => {
    setIsLoading(true);

    try {
      const { username, email, password, kategori_investor } = formik.values;

      const payload = {
        username,
        email,
        password,
        kategori_investor,
      };

      await axios.post(
        "http://localhost:3000/api/auth/investor/regis",
        payload
      );
      navigate("/verifikasi");
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
        setShowErrorModal(true);
      } else {
        setErrorMessage("Terjadi kesalahan jaringan. Silakan coba lagi nanti.");
        setShowErrorModal(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const closeErrorModal = () => {
    setShowErrorModal(false);
    setErrorMessage("");
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(
        "Email tidak valid. Harap masukkan email yang benar (contoh: user@example.test)"
      )
      .required("Email wajib diisi"),
    username: Yup.string()
      .min(2, "Username harus terdiri dari minimal 2 karakter")
      .required("Username wajib diisi"),
    password: Yup.string()
      .min(8, "Password harus terdiri dari minimal 8 karakter")
      .matches(/[0-9]/, "Password harus terdiri dari minimal 1 angka")
      .matches(/[A-Z]/, "Password harus terdiri dari minimal 1 huruf besar")
      .matches(/[a-z]/, "Password harus terdiri dari minimal 1 huruf kecil")
      .matches(
        /[^\w]/,
        "Password harus mengandung minimal satu simbol (@!$%*?&)"
      )
      .required("Password wajib diisi"),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password")],
        "Konfirmasi password harus cocok dengan password"
      )
      .required("Konfirmasi password wajib diisi"),
    kategori_investor: Yup.string()
      .oneOf(["individu", "organisasi"], "Pilih kategori investor yang valid")
      .required("Pilih kategori investor"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      kategori_investor: "",
    },
    onSubmit: registerUser,
    validationSchema: validationSchema,
  });

  const handleInputChange = (event) => {
    const { target } = event;
    formik.setFieldValue(target.name, target.value);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row items-center justify-end min-h-screen w-full">
        {/* Background */}
        <div
          className="fixed top-0 left-0 w-1/2 h-screen bg-cover bg-center"
          style={{
            backgroundImage: `url('/src/assets/images/farm-bg-masuk.jpg')`,
          }}
        ></div>
        {/* Form */}
        <div className="w-full lg:w-1/2 py-8">
          <div className="max-w-xl mx-auto">
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
            <div className="font-bold text-2xl">
              <h2>Daftar Akun</h2>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div>
                <Label value={"Email"} htmlFor={"email"} />
                <Input
                  name="email"
                  type="email"
                  variant="primary-outline"
                  placeholder="Masukkan email.."
                  handleChange={handleInputChange}
                  isError={!!formik.errors.email}
                />
                <InputError message={formik.errors.email} />
              </div>
              <div>
                <Label value={"Username"} htmlFor={"username"} />
                <Input
                  name="username"
                  type="text"
                  variant="primary-outline"
                  placeholder="Masukkan username.."
                  handleChange={handleInputChange}
                  isError={!!formik.errors.username}
                />
                <InputError message={formik.errors.username} />
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
                {formik.errors.password &&
                formik.errors.password.includes("Password wajib diisi") ? (
                  <InputError message={formik.errors.password} />
                ) : null}
              </div>
              <div>
                <Label
                  value={"Konfirmasi Password"}
                  htmlFor={"confirmPassword"}
                />
                <Input
                  name="confirmPassword"
                  type="password"
                  variant="primary-outline"
                  placeholder="Masukkan konfirmasi password.."
                  handleChange={handleInputChange}
                  isError={!!formik.errors.confirmPassword}
                />
                {formik.errors.confirmPassword &&
                formik.errors.confirmPassword.includes(
                  "Konfirmasi password wajib diisi"
                ) ? (
                  <InputError message={formik.errors.confirmPassword} />
                ) : null}
              </div>

              <PasswordValidation
                password={formik.values.password}
                confirmPassword={formik.values.confirmPassword}
              />

              <Label value={"Daftar Sebagai"} htmlFor={"kategori_investor"} />
              <div className="flex flex-row items-center gap-4">
                <button
                  type="button"
                  onClick={() =>
                    formik.setFieldValue("kategori_investor", "individu")
                  }
                  className={`flex flex-col items-center border-[4px] w-32 py-2 rounded-xl ${
                    formik.values.kategori_investor === "individu"
                      ? "bg-slate-300 border-black"
                      : "hover:bg-slate-300 border-zinc-950"
                  }`}
                >
                  <FiUser className="w-[34px] h-[35px]" />
                  <p className="font-bold text-[15px]">INDIVIDU</p>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    formik.setFieldValue("kategori_investor", "organisasi")
                  }
                  className={`flex flex-col items-center border-[4px] w-32 py-2 rounded-xl ${
                    formik.values.kategori_investor === "organisasi"
                      ? "bg-slate-300 border-black"
                      : "hover:bg-slate-300 border-zinc-950"
                  }`}
                >
                  <HiOutlineBuildingOffice2 className="w-[34px] h-[35px]" />
                  <p className="font-bold text-[15px]">ORGANISASI</p>
                </button>
              </div>
              <InputError message={formik.errors.kategori_investor} />

              <div className="mt-6 mb-2">
                <button
                  className={`bg-[#4B241A] hover:bg-[#381b13] ease-in-out duration-300 text-white font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline w-full flex justify-center items-center ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Mengirim...
                    </>
                  ) : (
                    "Daftar"
                  )}
                </button>
              </div>
            </form>

            <div className="text-center">
              <span className="text-gray-600">Sudah punya akun? </span>
              <Link
                to="/masuk"
                className="text-[#4B241A] hover:text-[#3a1c15] font-semibold"
              >
                Masuk
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ErrorModal
        isOpen={showErrorModal}
        onClose={closeErrorModal}
        message={errorMessage}
      />
    </>
  );
};

export default Daftar;
