import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from "../../assets/images/logo.svg";
import { apiAdmin } from '../../hooks/useAxiosConfig';

const VerifikasiEmail = () => {
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();
  
    useEffect(() => {
        const verifyEmail = async () => {
            const queryParams = new URLSearchParams(window.location.search);
            const token = queryParams.get('token');
            
            if (!token) {
                setMessage('Token verifikasi tidak ditemukan. Silakan periksa link yang Anda terima melalui email.');
                return;
            }
        
            try {
                console.log('Sending verification request...');
                const response = await apiAdmin.get(`/auth/investor/verify-email?token=${token}`);
        
                console.log('Response status:', response.status);
                console.log('Response data:', response.data);
        
                if (response.status === 200) {
                    console.log('Verification successful');
                    setIsSuccess(true);
                    setMessage('Akun Anda telah berhasil diverifikasi.');
                } else {
                    console.error('Unexpected response status:', response.status);
                    setMessage(response.data.message || 'Gagal memverifikasi email. Silakan coba lagi atau hubungi dukungan.');
                }
            } catch (error) {
                console.error('Error during email verification:', error);
                if (error.response) {
                    console.error('Error response:', error.response.data);
                    setMessage(error.response.data.message || 'Gagal memverifikasi email. Silakan coba lagi atau hubungi dukungan.');
                } else {
                    setMessage('Terjadi kesalahan. Silakan periksa koneksi Anda dan coba lagi.');
                }
            }
        };        
        verifyEmail();
    }, []);

    useEffect(() => {
        console.log('Current message:', message);
        console.log('Is success:', isSuccess);
    }, [message, isSuccess]);
  
    return (
        <div className="flex flex-col lg:flex-row h-screen">
            {/* Background */}
            <div className="w-full lg:w-[40%] bg-cover bg-center min-h-[200px] lg:min-h-screen" style={{ backgroundImage: `url('/src/assets/images/farm-bg-masuk.jpg')` }}>
            </div>
            {/* Content */}
            <div className="w-full lg:w-[60%] p-8 flex flex-col justify-center items-center">
                <div className="flex flex-col items-center lg:flex-row lg:justify-center lg:-ml-[18rem] mb-8">
                    <img src={Logo} alt="Logo" className="w-20 h-20 mr-4" />
                    <h1 className="text-[18px] font-bold text-gray-800">Sukaharja Smart Quail Farm </h1>
                </div>
                <div className="flex flex-col justify-center items-center w-full lg:w-[80%] lg:h-[80%]">
                    <h1 className="font-quicksand font-semibold text-xl lg:text-4xl mb-4">Verifikasi Email</h1>
                    <div className={`text-center mt-4 p-4 rounded-lg ${isSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        <p>{isSuccess ? 'Akun telah berhasil diverifikasi': 'Akun gagal diverifikasi'}</p>
                    </div>
                    <div className="text-center mt-5 text-sm text-[#d0ba7c] hover:text-orange-300">
                        <a href="/masuk" className="font-semibold hover:text-orange-300">
                            ← Kembali ke Halaman Login
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifikasiEmail;