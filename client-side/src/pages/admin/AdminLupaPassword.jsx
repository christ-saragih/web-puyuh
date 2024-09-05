import React, { useState } from 'react';
import Logo from "../../assets/images/logo.svg";
import LupaPasswordImage from "../../assets/images/Forgot password-bro 1.svg";

const PasswordValidation = ({ password, confirmPassword }) => {
  const hasMinLength = password.length >= 8;
  const hasSymbol = /[@!$%*?&]/.test(password);
  const passwordsMatch = password === confirmPassword;
  const showValidation = password.length > 0;

  return (
    showValidation && (
      <div className="flex flex-wrap justify-start mt-3 ml-4 p-1">
        <div className="flex items-center mr-2">
          <div
            className={`rounded-full p-0.5 fill-current ${
              passwordsMatch
                ? 'bg-green-200 text-green-700'
                : 'bg-red-200 text-red-700'
            }`}
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {passwordsMatch ? (
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
            className={`font-medium text-xs ml-1 ${
              passwordsMatch ? 'text-green-700' : 'text-red-700'
            }`}
          >
            {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
          </span>
        </div>
        <div className="flex items-center mr-2">
          <div
            className={`rounded-full p-0.5 fill-current ${
              hasMinLength ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'
            }`}
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {hasMinLength ? (
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
            className={`font-medium text-xs ml-1 ${
              hasMinLength ? 'text-green-700' : 'text-red-700'
            }`}
          >
            {hasMinLength ? 'Min length reached' : 'At least 8 characters required'}
          </span>
        </div>
        <div className="flex items-center">
          <div
            className={`rounded-full p-0.5 fill-current ${
              hasSymbol ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'
            }`}
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {hasSymbol ? (
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
            className={`font-medium text-xs ml-1 ${
              hasSymbol ? 'text-green-700' : 'text-red-700'
            }`}
          >
            {hasSymbol ? 'Contains a symbol' : 'One symbol required (@!$%*?&)'}
          </span>
        </div>
      </div>
    )
  );
};

const AdminLupaPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate email checking
    setEmailSent(true);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <div className="flex lg:flex-row h-screen">
      {/* Form */}
      <div className="w-full lg:w-full flex flex-col p-16 justify-center items-center">
        <div className="flex flex-col items-center lg:flex-row lg:justify-center mb-8">
          <img src={Logo} alt="Logo" className="w-20 h-20 mr-4" />
          <h1 className="text-[18px] font-bold text-gray-800">Sukaharja Smart Quail Farm</h1>
        </div>
        <div className="flex flex-col justify-center items-center w-full lg:w-[80%] lg:h-[80%]">
          {!emailSent ? (
            <>
              <img src={LupaPasswordImage} alt="Lupa Password" className="mb-4 w-full max-w-xs lg:max-w-xs" />
              <h1 className="font-quicksand font-semibold text-xl lg:text-4xl mb-4">Lupa Password</h1>
              <form className="w-[60%] mt-8 space-y-6" onSubmit={handleSubmit} method="POST">
                <input
                  type="email"
                  required
                  className="relative block w-full py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl bg-slate-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm lg:mb-5 lg:px-4"
                  placeholder="Masukkan Email"
                />
                <button
                  type="submit"
                  className="group relative w-full lg:w-[100px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#4B241A] hover:bg-[#381f19] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  LANJUT
                </button>
              </form>
              <div className="text-center mt-5">
                <a href="/admin/masuk" className="font-medium text-orange-300">
                  ← Kembali
                </a>
              </div>
            </>
          ) : (
            <>
              <h1 className="font-quicksand font-semibold text-xl lg:text-4xl mb-4">Masukkan Password Baru</h1>
              <form className="w-full mt-8 space-y-6 lg:px-28" method="POST">
                <div>
                  <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    className="relative block w-full py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl bg-slate-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm lg:mb-5 lg:px-4"
                    placeholder="Masukkan Password Baru"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    required
                    className="relative block w-full py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl bg-slate-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm lg:mb-5 lg:px-4"
                    placeholder="Masukkan Kembali Password yang Telah Dibuat"
                  />
                </div>
                <PasswordValidation password={password} confirmPassword={confirmPassword} />
                <button
                  type="submit"
                  className="group relative w-full lg:w-[100px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#4B241A] hover:bg-[#381f19] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  LANJUT
                </button>
              </form>
              <div className="text-center mt-5">
                <a href="/admin/lupa-password" className="font-medium text-orange-300">
                  ← Kembali
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLupaPassword;
