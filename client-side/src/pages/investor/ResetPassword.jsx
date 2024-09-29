import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Logo from "../../assets/images/logo.svg";

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

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [token, setToken] = useState('');
  
    const navigate = useNavigate();
  
    useEffect(() => {
      // Ambil query string dari URL
      const queryParams = new URLSearchParams(window.location.search);
      
      // Dapatkan nilai parameter 'token'
      const tokenFromUrl = queryParams.get('token');
      
      // Set nilai token ke state
      if (tokenFromUrl) {
        setToken(tokenFromUrl);
        console.log('Token extracted from URL:', tokenFromUrl);
      } else {
        console.error('Token not found in URL');
      }
    }, []); // Empty dependency array means this effect runs once after initial render
  
      
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Password input:', password);
    console.log('Confirm password input:', confirmPassword);
    console.log('Token:', token);
  
    if (!password || password.trim() === '') {
      setErrorMessage('Password cannot be empty');
      return;
    }
  
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
  
    if (!token || token.trim() === '') {
      setErrorMessage('Invalid reset token. Please try requesting a new password reset.');
      return;
    }
  
    try {
      console.log('Sending password reset request...');
      const requestPayload = {
        newPassword: password.trim(),
        token: token.trim()
      };
      console.log('Request payload:', requestPayload);
  
      const response = await fetch('http://localhost:3000/api/auth/investor/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestPayload),
      });
  
      console.log('Response status:', response.status);
  
      if (response.ok) {
        const data = await response.json();
        console.log('Password reset successful:', data);
        setSuccessMessage('Password has been successfully reset. You will directed to login');
        setErrorMessage('');
        setTimeout(() => {
          navigate('/masuk');
        }, 3000);
      } else {
        const errorData = await response.json();
        console.error('Server error response:', errorData);
        setErrorMessage(errorData.message || 'Failed to reset password. Please try again.');
      }
    } catch (error) {
      console.error('Error during password reset:', error);
      setErrorMessage('Something went wrong. Please check your connection and try again.');
    }
  };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  
    const handleConfirmPasswordChange = (e) => {
      setConfirmPassword(e.target.value);
    };
  
    return (
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Background */}
        <div className="w-full lg:w-[40%] bg-cover bg-center min-h-[200px] lg:min-h-screen" style={{ backgroundImage: `url('/src/assets/images/farm-bg-masuk.jpg')` }}>
        </div>
        {/* Form */}
        <div className="w-full lg:w-[60%] p-8 flex flex-col justify-center items-center">
          <div className="flex flex-col items-center lg:flex-row lg:justify-center lg:-ml-[18rem] mb-8">
            <img src={Logo} alt="Logo" className="w-20 h-20 mr-4" />
            <h1 className="text-[18px] font-bold text-gray-800">Sukaharja Smart Quail Farm </h1>
          </div>
          <div className="flex flex-col justify-center items-center w-full lg:w-[80%] lg:h-[80%]">
            <h1 className="font-quicksand font-semibold text-xl lg:text-4xl mb-4">Masukkan Password Baru</h1>
            <form className="w-full mt-8 space-y-6" onSubmit={handleSubmit} method="POST">
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
              {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
              {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#d0ba7c] hover:bg-[#bead6b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Kirim
                </button>
              </div>
            </form>
            <div className="text-center mt-5 text-sm text-[#d0ba7c] hover:text-orange-300">
              <a href="/auth/investor/masuk" className="font-semibold hover:text-orange-300">
                ← Kembali
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default ResetPassword;
