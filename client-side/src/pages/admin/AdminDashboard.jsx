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
import { Calendar } from "rsuite";

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
    const data = {
        labels: ["Batch 1", "Batch 2", "Batch 3", "Batch 4", "Batch 5"], // Nama batch investasi
        datasets: [
            {
                type: "bar",
                label: "Total Investasi (Rp)",
                data: [50000000, 100000000, 75000000, 120000000, 90000000], // Total investasi per batch
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
                data: [30, 45, 40, 50, 35], // Total investor per batch
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
                                    <p className="text-2xl">35</p>
                                </div>
                            </div>
                            <div className="flex w-1/3 justify-center items-center gap-5 border-gray-300 border-x-2">
                                <div className="bg-white w-14 h-14 p-3 rounded-full overflow-hidden">
                                    <PiUsersBold className="w-full h-full" />
                                </div>
                                <div>
                                    <p className="text-lg">Total Investor</p>
                                    <p className="text-2xl">190</p>
                                </div>
                            </div>
                            <div className="flex w-1/3 justify-center items-center gap-5">
                                <div className="bg-white w-14 h-14 p-3 rounded-full overflow-hidden">
                                    <PiArticleNyTimesBold className="w-full h-full" />
                                </div>
                                <div>
                                    <p className="text-lg">Total Artikel</p>
                                    <p className="text-2xl">12</p>
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

                <div className="bg-[#F5F5F7] w-[35%] rounded-xl py-4 px-6 shadow-md">
                    <h1 className="text-3xl font-semibold">Kalender</h1>
                    <Calendar />
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
