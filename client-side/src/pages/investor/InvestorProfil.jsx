import { useState, useEffect } from "react";
import SidebarInvestor from "../../components/common/SidebarInvestor";
import VerticalTabProfil from "../../components/investor/VerticalTabProfil";
import profilePicture from "../../assets/images/profile-picture-5.jpg";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const InvestorProfil = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState('');
  const [biodataInvestor, setBiodataInvestor] = useState(null);
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');
  const [investors, setInvestors] = useState([]);
  // const [investors, setInvestors] = useState([]);
  const [kategoriInvestor, setKategoriInvestor] = useState([]); // State untuk menyimpan kategori
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
  }, []);

  useEffect(() => {
    if (token) {
      getInvestors();
    }
  }, [token]);

  const refreshToken = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/investor/refresh-token', {}, { withCredentials: true });
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      setEmail(decoded.email);
      setExpire(decoded.exp);
      console.log("Token refreshed:", response.data.accessToken);
    } catch (error) {
      if (error.response) {
        navigate("/masuk");
      }
    }
  }

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        try {
          const response = await axios.post(
            'http://localhost:3000/api/auth/investor/refresh-token',
            {},
            { withCredentials: true }
          );
          const newAccessToken = response.data.accessToken;
          config.headers.Authorization = `Bearer ${newAccessToken}`;
          setToken(newAccessToken);
          const decoded = jwtDecode(newAccessToken);
          setBiodataInvestor(decoded)
          setEmail(decoded.email);
          setExpire(decoded.exp);
        } catch (error) {
          console.error("Error refreshing token:", error);
          navigate("/investor");
        }
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getInvestors = async () => {
    try {
        // Misalnya, token JWT mengandung informasi user_id dalam payload
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id; // Sesuaikan dengan struktur payload token And
      const response = await axiosJWT.get(`http://localhost:3000/api/investor/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
      console.log(response.data.data.kategori_investor);
      setInvestors(response.data.data);
    } catch (error) {
      console.error("Error fetching investors:", error);
    }
  }

  return (
    <div className="bg-white w-dvw h-dvh overflow-y-auto py-5 pe-6">
      <SidebarInvestor isHovered={isHovered} setIsHovered={setIsHovered} />
      <div className={`px-8 pb-5 transition-all duration-300 ease-in-out ${
        isHovered ? "md:ml-60" : "md:ml-28"
      }`}>
        <div className="flex flex-col">
          <h1 className="font-quicksand text-2xl font-bold mb-5">Profil Investor</h1>
          <div className="w-full rounded-xl bg-[#F5F5F7] flex items-center mb-10">
            <img className="w-20 h-20 rounded m-10" src={profilePicture} alt="Default avatar" />
            <div className="flex flex-col items-center ml-10">
              <button type="button" className="py-2.5 px-5 me-20 text-sm font-quicksand focus:outline-none bg-white rounded-full hover:bg-gray-100 dark:bg-[#D9D9D9] text-[#000] dark:hover:text-white dark:hover:bg-[#572618] mb-5">
                Ganti Foto
              </button>
              <h2 className="font-quicksand text-l text-[#000]">{email}</h2>
              {/* <h1>{investors.kategori_investor}</h1> */}
            </div>
          </div>
          <div className="w-full rounded-xl bg-[#F5F5F7]">
            {/* Pass data kategori investor ke VerticalTabProfil */}
            <VerticalTabProfil getInvestors={getInvestors} investors={investors} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorProfil;
