import React, { useState } from 'react';
import Logo from "../../assets/images/logo.png";
import LupaPasswordImage from "../../assets/images/Forgot password-bro 1.svg";

const LupaPassword = () => {
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate email checking
    setEmailSent(true);
  };

  return (
    <div className="flex flex-col lg:flex-row  h-screen">
      {/* Background */}
      <div className="w-full lg:w-[40%] bg-cover bg-center min-h-[200px] lg:min-h-screen" style={{ backgroundImage: `url('/src/assets/images/farm-bg-masuk.jpg')` }}>
      </div>
      {/* Form */}
      <div className="w-full lg:w-[60%] p-8 flex flex-col justify-center items-center">
        <div className="flex flex-col items-center lg:flex-row lg:justify-center lg:-ml-[18rem] mb-8">
          <img src={Logo} alt="Logo" className="w-20 h-20 mr-4" />
          <h1 className="text-[18px] font-bold text-gray-800">Sukaharja Smart Quail Farm</h1>
        </div>
        <div className="flex flex-col justify-center items-center w-full lg:w-[80%] lg:h-[80%]">
          {!emailSent ? (
            <>
              <img src={LupaPasswordImage} alt="Lupa Password" className="mb-4 w-full max-w-xs lg:max-w-xs" />
              <h1 className="font-quicksand font-semibold text-xl lg:text-4xl mb-4">Lupa Password</h1>
              <form className="w-full mt-8 space-y-6" onSubmit={handleSubmit} method="POST">
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
                <a href="/masuk" className="font-medium text-orange-300">
                  ← Kembali
                </a>
              </div>
            </>
          ) : (
            <>
              <h1 className="font-quicksand font-semibold text-xl lg:text-4xl mb-4">Masukkan Password Baru</h1>
              <form className="w-full mt-8 space-y-6" method="POST">
                <div>
                  <input
                    type="password"
                    required
                    className="relative block w-full py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl bg-slate-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm lg:mb-5 lg:px-4"
                    placeholder="Masukkan Password Baru"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    required
                    className="relative block w-full py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl bg-slate-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm lg:mb-5 lg:px-4"
                    placeholder="Masukkan Kembali Password yang Telah Dibuat"
                  />
                </div>
                <ul className="text-red-500 text-sm list-disc pl-5 space-y-1">
                  <li>Mengandung setidaknya 8 karakter atau lebih</li>
                  <li>Mengandung setidaknya satu huruf besar</li>
                  <li>Mengandung setidaknya satu huruf kecil</li>
                  <li>Mengandung setidaknya satu simbol (@!$%*?&)</li>
                </ul>
                <button
                  type="submit"
                  className="group relative w-full lg:w-[100px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#4B241A] hover:bg-[#381f19] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  LANJUT
                </button>
              </form>
              <div className="text-center mt-5">
                <a href="/masuk" className="font-medium text-orange-300">
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

export default LupaPassword;
