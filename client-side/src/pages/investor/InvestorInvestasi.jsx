import { useState, useEffect } from "react";
import SidebarInvestor from "../../components/common/SidebarInvestor";
import InputSearch from "../../components/common/InputSearch";
import BatchList from "../../components/guest/BatchList";
import GuestLayout from "../../layouts/GuestLayout";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { getBatchs } from "../../services/batch.service";

const InvestorInvestasi = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');
  const [investors, setInvestors] = useState([]);
  const [batchs, setBatchs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
  }, []);

  useEffect(() => {
    if (token) {
        getInvestors();
    }
  }, [token]);

  useEffect(() => {
    getBatchs((data) => {
      setBatchs(data);
    });
  }, []);
  console.log(batchs);
  

  const refreshToken = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/investor/refresh-token', {}, { withCredentials: true });
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      setUsername(decoded.username);
      setExpire(decoded.exp);
      console.log("Token refreshed:", response.data.accessToken);
    } catch (error) {
      if (error.response) {
        navigate("/masuk");
      }
    }
  };

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
          setUsername(decoded.username);
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
      const response = await axiosJWT.get('http://localhost:3000/api/investor', {
          headers: {
              Authorization: `Bearer ${token}`
          }
      });
      console.log(response.data);
      setInvestors(response.data);
    } catch (error) {
      console.error("Error fetching investors:", error);
    }
  };

  return (
    <div className="bg-white w-dvw h-dvh overflow-y-auto py-5 pe-6">
      <SidebarInvestor isHovered={isHovered} setIsHovered={setIsHovered} />
      <div
        className={`px-8 pb-5 transition-all duration-300 ease-in-out ${
          isHovered ? "md:ml-60" : "md:ml-28"
        }`}
      >
        <GuestLayout className="mt-28 lg:mt-2">
          <h2 className="font-bold text-4xl mb-6">
            Ayo berinvestasi sekarang di CV Slamet!
          </h2>

          <div className="flex justify-between items-center mb-6">
            <form className="max-w-sm grow">
              <label
                htmlFor="search-investment"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <InputSearch />
            </form>

            <div className="flex gap-3">
              <button
                type="button"
                className="text-white bg-[#B87817] font-medium rounded-2xl text-sm w-24 py-2 hover:bg-[#B87817] hover:text-[#]"
              >
                Semua
              </button>
              <button
                type="button"
                className="text-[#B87817] border-2 border-[#B87817] font-medium rounded-2xl text-sm w-24 py-2 hover:bg-[#B87817] hover:text-white hover:font-semibold ease-in-out duration-300"
              >
                Terbaru
              </button>
              <button
                type="button"
                className="text-[#B87817] border-2 border-[#B87817] font-medium rounded-2xl text-sm w-24 py-2 hover:bg-[#B87817] hover:text-white hover:font-semibold ease-in-out duration-300"
              >
                Terlama
              </button>
            </div>
          </div>

          <BatchList batchs={batchs} />
        </GuestLayout>
      </div>
    </div>
  );
};

export default InvestorInvestasi;
