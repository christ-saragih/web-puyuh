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

// Register Chart.js components
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

  useEffect(() => {
    getBatchs((data) => {
      setInvestments(data);
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

  const [markedDate, setMarkedDate] = useState(null);

  // Fungsi untuk mendapatkan tanggal dari database (simulasi API)
  useEffect(() => {
    const fetchMarkedDate = async () => {
      // Simulasi API call, misalnya tanggal yang ditandai adalah 25 September 2024
      const fetchedDate = new Date('2024-09-25');
      setMarkedDate(fetchedDate);
    };

    fetchMarkedDate();
  }, []);

  const data = {
    labels: investments.map((investment) => investment.judul), // Nama batch investasi
    datasets: [
      {
        type: "bar",
        label: "Total Investasi (Rp)",
        data: investments.map((investment) => investment.total_pendanaan), // Total investasi per batch
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 0.5)",
        hoverBorderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        yAxisID: "y", // Ini untuk sumbu Y kiri
        borderRadius: 8,
      },
      {
        type: "line",
        label: "Total Investor",
        data: investments.map((investment) => investment.transaksi.length), // Total investor per batch
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 0.5)",
        hoverBorderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        yAxisID: "y1", // Ini untuk sumbu Y kanan
        tension: 0.3,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        grid: {
          display: false, // Menghilangkan grid lines pada sumbu X
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
          display: false, // Menghilangkan grid lines pada sumbu Y1
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
          display: false, // Menghilangkan grid lines pada sumbu Y1
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
          family: "Quicksand, sans-serif", // Ubah font family di sini
          size: 18, // Ukuran font judul
        },
      },
    },
  };

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
            <div className="flex h-[400px]">
              <Line data={data} options={options} />
            </div>
          </div>
        </div>

        <div className="w-[35%]">
          <div className="bg-[#F5F5F7] rounded-xl py-4 px-6 shadow-md">
            <h1 className="text-3xl font-semibold">Kalender</h1>
            <CalendarAdmin markedDate={markedDate} />
          </div>

          <div className="bg-[#F5F5F7] rounded-xl py-4 px-6 shadow-md mt-5">
            <h3 className="font-semibold text-xl mb-4">Pemberitahuan</h3>
            <div className="rounded-lg border border-t-4 border-gray-300 border-t-[#fc6a2f] py-2 px-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-lg">Lorem ipsum dolor sit</h4>
                <p className="text-sm bg-white px-2 py-1 rounded">
                  25 September 2024
                </p>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia,
                eius repudiandae saepe dolores cumque voluptatibus?
              </p>
            </div>
          </div>
        </div>


      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
