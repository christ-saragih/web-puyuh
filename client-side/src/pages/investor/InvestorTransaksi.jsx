import { useState, useEffect } from "react";
import SidebarInvestor from "../../components/common/SidebarInvestor";
import InputSearch from "../../components/common/InputSearch";
import Dropdown from "../../components/common/Dropdown";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { getTransaksi } from "../../services/transaksi.service";
import { useParams } from "react-router-dom";
import { formatRupiah } from "../../utils/formatRupiah";

const InvestorTransaksi = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [username, setUsername] = useState('');
    const [investorId, setInvestorId] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [transaksi, setTransaksi] = useState([]);
    const [selectedValue, setSelectedValue] = useState("4");
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true); // Add loading state
    const { id } = useParams();
    const options = ["4", "8", "16", "32", "Semua"];
    const navigate = useNavigate();
    const [investors, setInvestors] = useState([]); 

    useEffect(() => {
        refreshToken();
    }, []);

    useEffect(() => {
        if (token) {
            getInvestors();
        }
      }, [token]);

      useEffect(() => {
        if (token) {
          getTransaksi((data) => {
            setTransaksi(data);
            setLoading(false); // Set loading to false when data is fetched
          }, token); // Pass token here
        }
      }, [token]);


    //   menghitung total investasi investor
      const totalInvestasi = transaksi.reduce((total, item) => {
        return total + item.total_investasi;
    }, 0);
      
      

      const refreshToken = async () => {
        try {
          const response = await axios.post('http://localhost:3000/api/auth/investor/refresh-token', {}, { withCredentials: true });
          setToken(response.data.accessToken);
          const decoded = jwtDecode(response.data.accessToken);
          setUsername(decoded.username);
          setInvestorId(decoded.payload.investorId); // Access the investorId property explicitly
          setExpire(decoded.exp);
          console.log("Investor ID from token:", decoded.payload.investorId); // Log investorId from token
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
                    setInvestorId(decoded.investorId);  // Set investorId from the refreshed token
                    setExpire(decoded.exp);
                    console.log("Token refreshed and decoded:", decoded); // Log decoded token after refresh
                    console.log("Investor ID after token refresh:", decoded.investorId); // Log investorId after refresh
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
      } 

    const handleOptionSelect = (option) => {
        setSelectedValue(option);
        setCurrentPage(1);
    };

    return (
        <div className="bg-white w-dvw h-dvh overflow-y-auto py-5 pe-6">
            <SidebarInvestor isHovered={isHovered} setIsHovered={setIsHovered} />
            <div className={`px-8 pb-5 transition-all duration-300 ease-in-out ${isHovered ? "md:ml-60" : "md:ml-28"}`}>
                <div className="flex flex-col">
                    <h1 className="font-quicksand font-bold text-4xl mb-4">Transaksi</h1>
                </div>
                <div className="w-full rounded-xl bg-[#F5F5F7] flex items-center mb-10 shadow-lg">
                    <div className="flex flex-col">
                        <h1 className="text-[1.75rem] font-bold p-4 ml-8">Total Riwayat Investasi</h1>
                        {loading ? ( // Display a loading message while data is being fetched
                            <p className="text-[2rem] font-medium p-4 ml-28">Loading...</p>
                        ) : (
                            <p className="text-[2rem] font-medium p-4 ml-28">{formatRupiah(totalInvestasi)}</p>
                        )}
                    </div>
                </div>
                <div className="w-full rounded-xl bg-[#F5F5F7] flex flex-col mb-10 shadow-lg p-4">
                    <div className="flex flex-row gap-5 mb-6">
                        <Dropdown
                            options={options}
                            label="Tampilkan"
                            onOptionSelect={handleOptionSelect}
                        />

                        <InputSearch
                            handleChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-base text-left text-gray-500">
                            <thead className="bg-white text-sm text-gray-700 uppercase border-b-2">
                                <tr>
                                    <th scope="col" className="px-6 py-3">No</th>
                                    <th scope="col" className="px-6 py-3">Judul</th>
                                    <th scope="col" className="px-6 py-3 text-center">Tanggal Transaksi</th>
                                    <th scope="col" className="px-6 py-3 text-center">Investasi</th>
                                    <th scope="col" className="px-6 py-3 text-center">Status</th>
                                    <th scope="col" className="px-6 py-3 text-center">Pembayaran</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Map transaksi to display each transaction */}
                                {/* {transaksi.length > 0 ? (
                                    transaksi.map((transaction, index) => (
                                        <tr key={transaction.id} className="bg-white border-b hover:bg-gray-50">
                                            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                                {index + 1}
                                            </th>
                                            <td className="px-6 py-4">{transaction.title}</td>
                                            <td className="px-6 py-4 text-center">{transaction.date}</td>
                                            <td className="px-6 py-4 text-center">Rp {transaction.amount}</td>
                                            <td className="px-6 py-4 text-center">{transaction.status}</td>
                                            <td className="px-6 py-4 text-center">
                                                <FontAwesomeIcon icon={faEye} />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-4 text-center">
                                            Tidak ada transaksi ditemukan
                                        </td>
                                    </tr>
                                )} */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvestorTransaksi;
