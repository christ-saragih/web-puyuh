import { useState } from "react";
import GuestLayout from '../../layouts/GuestLayout.jsx';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import js-cookie
import '../../assets/style/index.css';
import Logo from "../../assets/images/logo.png";

const Masuk = () => {
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: ""
  });

  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:3000/api/auth/investor/login', formData, {withCredentials:true});

      // Simpan token di cookie dengan js-cookie
      // Cookies.set('token', token, { expires: 7, secure: true, sameSite: 'strict' });

      navigate("/investor"); // Arahkan ke halaman investor setelah login
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response); // Log detailed error response
        setMsg(error.response.data.msg || "An error occurred"); // Display error message
      } else {
        console.error("Error message:", error.message); // Log other types of errors
        setMsg("An error occurred"); // Display a generic error message
      }
    }
  };

  return (
    <GuestLayout className="lg:-mb-2">
      <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen w-full">
        {/* Background */}
        <div className="w-full lg:w-1/2 bg-cover bg-center min-h-[300px] lg:min-h-screen lg:-ml-40" style={{ backgroundImage: `url('/src/assets/images/farm-bg-masuk.jpg')` }}>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full lg:w-1/2 p-8">
          <div className="flex items-center justify-center mb-8">
            <img src={Logo} alt="Logo" className="w-20 h-20 mr-4" />
            <h1 className="text-2xl font-bold text-gray-800">Sukaharja Smart Quail Farm</h1>
          </div>
          <div className="font-quicksand font-bold text-[1.5rem] mb-2">
            <h2>Selamat Datang</h2>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="usernameOrEmail">Username or Email</label>
            <input
              type="text"
              id="usernameOrEmail"
              name="usernameOrEmail"
              placeholder="Masukkan Username atau Email"
              value={formData.usernameOrEmail}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Masukkan Password"
              value={formData.password}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <a href="/lupa-password" className="text-sm text-right block text-orange-600 mt-1">Lupa Password?</a>
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="bg-[#4B241A] hover:bg-[#381f19] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              // onClick={handleSubmit}
            >
              Masuk
            </button>
          </div>
          <div className="text-center">
            <span className="text-gray-700">Belum Punya Akun? </span>
            <a href="/daftar" className="text-orange-600 font-bold">Daftar</a>
          </div>
          {msg && <div className="mt-4 text-red-600">{msg}</div>}
        </form>
      </div>
    </GuestLayout>
  );
};

export default Masuk;
