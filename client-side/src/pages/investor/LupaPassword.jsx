import React, { useState } from 'react';
import Logo from "../../assets/images/logo.svg";
import LupaPasswordImage from "../../assets/images/Forgot password-bro 1.svg";

const LupaPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      console.log('Attempting to send verification email to:', email);
      const response = await fetch('http://localhost:3000/api/auth/investor/request-password-reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      console.log('Server response:', data);

      if (response.ok) {
        setEmailSent(true);
        setSuccessMessage('Verifikasi email telah dikirim. Silakan periksa kotak masuk email Anda.');
      } else {
        setError(data.message || 'Gagal mengirim email verifikasi. Silakan coba lagi.');
        console.error('Error response:', response.status, data);
      }
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi nanti.');
      console.error('Fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Background */}
      <div className="w-full lg:w-[40%] bg-cover bg-center min-h-[200px] lg:min-h-screen" style={{ backgroundImage: `url('/src/assets/images/farm-bg-masuk.jpg')` }}></div>

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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="relative block w-full py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl bg-slate-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm lg:mb-5 lg:px-4"
                  placeholder="Masukkan Email"
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
                <button
                  type="submit"
                  className={`group relative w-full lg:w-[100px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#4B241A] hover:bg-[#381f19] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                      </svg>
                      Loading...
                    </div>
                  ) : (
                    'VERIFIKASI'
                  )}
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
              <h1 className="font-quicksand font-semibold text-xl lg:text-4xl mb-4">Cek Email Anda</h1>
              <p className="text-gray-600 mb-6 text-center">Kami telah mengirimkan tautan verifikasi ke email {email}. Silakan cek email Anda untuk melanjutkan reset password.</p>
              <div className="text-center mt-5">
                <a href="/masuk" className="font-medium text-orange-300">
                  ← Kembali ke Login
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
