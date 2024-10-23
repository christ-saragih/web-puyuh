import CalendarAdmin from "../../components/admin/CalendarAdmin";
import AdminLayout from "../../layouts/AdminLayout";
import {
  PiArticleNyTimesBold,
  PiChartLineUpBold,
  PiUsersBold,
} from "react-icons/pi";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors,
} from "chart.js";
import { useEffect, useState } from "react";
import { getBatchs } from "../../services/batch.service";
import { getInvestors } from "../../services/investor.service";
import { getArticles } from "../../services/article.service";
import { formatDate } from "../../utils/formatDate";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

ChartJS.defaults.font.family = "Quicksand, sans-serif";
ChartJS.defaults.font.color = "red";

const AdminDashboard = () => {
  const [investors, setInvestors] = useState([]);
  const [articles, setArticles] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [filteredInvestments, setFilteredInvestments] = useState([]);
  const [selectedTitles, setSelectedTitles] = useState([]);
  const [markedDates, setMarkedDates] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    getBatchs((data) => {
      setInvestments(data);
      setFilteredInvestments(data);
      setSelectedTitles(data.map(inv => inv.judul)); // Initially select all titles
      
      const dates = data
        .filter((investment) => investment.status === "proses")
        .map((investment) => new Date(investment.tanggal_berakhir_penawaran));
      setMarkedDates(dates);
    });
  }, []);

  useEffect(() => {
    getInvestors((data) => {
      setInvestors(data);
    });
  }, []);

  useEffect(() => {
    getArticles((data) => {
      setArticles(data);
    });
  }, []);

  // Filter investments based on selected titles
  useEffect(() => {
    const filtered = investments.filter(inv => selectedTitles.includes(inv.judul));
    setFilteredInvestments(filtered);
  }, [selectedTitles, investments]);

  // Handle title selection
  const handleTitleChange = (title) => {
    setSelectedTitles(prev => {
      if (prev.includes(title)) {
        return prev.filter(t => t !== title);
      } else {
        return [...prev, title];
      }
    });
  };

  // Handle select/deselect all
  const handleSelectAll = () => {
    if (selectedTitles.length === investments.length) {
      setSelectedTitles([]);
    } else {
      setSelectedTitles(investments.map(inv => inv.judul));
    }
  };

  const data = {
    labels: filteredInvestments.map((investment) => investment.judul),
    datasets: [
      {
        type: "bar",
        label: "Total Investasi (Rp)",
        data: filteredInvestments.map((investment) => investment.total_pendanaan),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 0.5)",
        hoverBorderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        yAxisID: "y",
        borderRadius: 8,
      },
      {
        type: "line",
        label: "Total Investor",
        data: filteredInvestments.map((investment) => investment.transaksi.length),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 0.5)",
        hoverBorderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        yAxisID: "y1",
        tension: 0.3,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        type: "linear",
        position: "left",
        title: {
          display: true,
          text: "Total Investasi (Rp)",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        grid: {
          display: false,
        },
      },
      y1: {
        beginAtZero: true,
        type: "linear",
        position: "right",
        title: {
          display: true,
          text: "Total Investor",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        grid: {
          display: false,
        },
        drawOnChartArea: false,
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            family: "Quicksand, sans-serif",
            size: 12,
            weight: "bold",
          },
        },
      },
      title: {
        display: true,
        text: "Grafik Investasi per Batch",
        font: {
          family: "Quicksand, sans-serif",
          size: 18,
        },
      },
    },
  };

  // Get investments with "proses" status
  const processInvestments = investments.filter(
    (investment) => investment.status === "proses"
  );

  return (
    <AdminLayout title={"Halaman Beranda"}>
      <div className="flex gap-10">
        <div className="w-[65%]">
          <div className="bg-[#F5F5F7] rounded-xl py-4 px-6 shadow-md">
            <div className="flex font-semibold py-6">
              <div className="flex w-1/3 justify-center items-center gap-5">
                <div className="bg-white w-14 h-14 p-3 rounded-full overflow-hidden">
                  <PiChartLineUpBold className="w-full h-full" />
                </div>
                <div>
                  <p className="text-lg">Total Investasi</p>
                  <p className="text-2xl">{investments.length}</p>
                </div>
              </div>
              <div className="flex w-1/3 justify-center items-center gap-5 border-gray-300 border-x-2">
                <div className="bg-white w-14 h-14 p-3 rounded-full overflow-hidden">
                  <PiUsersBold className="w-full h-full" />
                </div>
                <div>
                  <p className="text-lg">Total Investor</p>
                  <p className="text-2xl">{investors.length}</p>
                </div>
              </div>
              <div className="flex w-1/3 justify-center items-center gap-5">
                <div className="bg-white w-14 h-14 p-3 rounded-full overflow-hidden">
                  <PiArticleNyTimesBold className="w-full h-full" />
                </div>
                <div>
                  <p className="text-lg">Total Artikel</p>
                  <p className="text-2xl">{articles.length}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#F5F5F7] rounded-xl py-4 px-6 mt-8 shadow-md">
            {/* Dropdown Filter Section */}
            <div className="mb-6 relative">
              <div className="flex items-center gap-4 mb-2">
                <h3 className="font-semibold text-lg">Filter Judul:</h3>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="px-4 py-2 bg-white rounded-md border border-gray-300 hover:bg-gray-50 transition-colors flex justify-between items-center min-w-[200px]"
                >
                  <span className="text-sm">
                    {selectedTitles.length === investments.length
                      ? "Semua Judul"
                      : `${selectedTitles.length} Judul Dipilih`}
                  </span>
                  <svg
                    className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute z-10 mt-1 w-64 bg-white rounded-md shadow-lg border border-gray-200">
                  <div className="p-2 border-b border-gray-200">
                    <button
                      onClick={handleSelectAll}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-md"
                    >
                      {selectedTitles.length === investments.length ? 'Batal Pilih Semua' : 'Pilih Semua'}
                    </button>
                  </div>
                  <div className="max-h-60 overflow-y-auto p-2">
                    {investments.map((investment) => (
                      <label
                        key={investment.id}
                        className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedTitles.includes(investment.judul)}
                          onChange={() => handleTitleChange(investment.judul)}
                          className="form-checkbox h-4 w-4 text-blue-600 rounded"
                        />
                        <span className="text-sm">{investment.judul}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex h-[400px]">
              <Line data={data} options={options} />
            </div>
          </div>
        </div>

        <div className="w-[35%]">
          <div className="bg-[#F5F5F7] rounded-xl py-4 px-6 shadow-md">
            <h1 className="text-3xl font-semibold">Kalender</h1>
            <CalendarAdmin markedDates={markedDates} />
          </div>

          <div className="bg-[#F5F5F7] rounded-xl py-4 px-6 shadow-md mt-5">
            <h3 className="font-semibold text-xl mb-4">Pemberitahuan</h3>

            {processInvestments.length > 0 ? (
              processInvestments.map((investment) => (
                <div
                  key={investment.id}
                  className="rounded-lg border border-t-4 border-gray-300 border-t-[#fc6a2f] py-2 px-4 mb-4"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-lg truncate">
                      {investment.judul}
                    </h4>
                    <p className="text-sm font-medium bg-white px-2 py-1 rounded shrink-0">
                      {formatDate(investment.tanggal_berakhir_penawaran)}
                    </p>
                  </div>
                  <p>{investment.deskripsi.substring(3,90)}...</p>
                </div>
              ))
            ) : (
              <p>Tidak ada pemberitahuan saat ini.</p>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;