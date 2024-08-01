import React, { useState } from 'react';
import '../../assets/style/index.css';
import Logo from "../../assets/images/logo.png";
import GuestLayout from '../../layouts/GuestLayout';
import { FiUser } from 'react-icons/fi';
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

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

const Daftar = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registerType, setRegisterType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  const handleRegisterType = (type) => {
    setRegisterType(type);
  };

  return (
    <GuestLayout className="lg:-mb-2">
      <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen w-full">
        {/* Background */}
        <div className="w-full lg:w-1/2 bg-cover bg-center min-h-[300px] lg:min-h-screen lg:-ml-40" style={{ backgroundImage: `url('/src/assets/images/farm-bg-masuk.jpg')` }}>
        </div>
        {/* Form */}
        <div className="w-full lg:w-1/2 lg:-mt-14 p-8">
          <div className="flex items-center justify-center mb-8">
            <img src={Logo} alt="Logo" className="w-20 h-20 mr-4"/>
            <h1 className="text-2xl font-bold text-gray-800">Sukaharja Smart Quail Farm</h1>
          </div>
          <div className="font-quicksand font-bold text-[1.5rem] mb-2">
            <h2>Daftar Akun</h2>
          </div>
          <form onSubmit={handleSubmit} className="min-h-[500px]"> 
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                id="email"
                type="email"
                placeholder="Masukkan Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                id="username"
                type="text"
                placeholder="Buat Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                id="password"
                type="password"
                placeholder="Masukkan Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">Konfirmasi Password</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                id="confirmPassword"
                type="password"
                placeholder="Masukkan Kembali Password yang Telah Dibuat"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <PasswordValidation password={password} confirmPassword={confirmPassword} />
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Daftar Sebagai</label>
            <div className="flex flex-row items-center mb-4 gap-4">
              <button type="button" onClick={() => handleRegisterType('individu')} className="flex flex-col items-center hover:bg-slate-300 border-[4px] border-zinc-950 w-32 py-2 rounded-xl ">
                <FiUser className="w-[34px] h-[35px]"/>
                <p className="font-bold text-[15px]">INDIVIDU</p>
              </button>
              <button type="button" onClick={() => handleRegisterType('badan')} className="flex flex-col items-center hover:bg-slate-300 border-[4px] border-zinc-950 w-32 py-2 rounded-xl ">
                <HiOutlineBuildingOffice2 className="w-[34px] h-[35px]"/>
                <p className="font-bold text-[15px]">BADAN</p>
              </button>
            </div>
            <div className="mb-6">
              <button className="bg-[#4B241A] hover:bg-[#381f19] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="submit">
                Daftar
              </button>
            </div>
          </form>
          <div className="text-center mt-5">
            <a href="/masuk" className="font-medium text-orange-300">
              ← Kembali
            </a>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
}

export default Daftar;