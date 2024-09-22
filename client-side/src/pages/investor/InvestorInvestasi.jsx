import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import BatchList from "../../components/guest/BatchList";
import GuestLayout from "../../layouts/GuestLayout";
import InvestorLayout from "../../layouts/InvestorLayout";
import { getBatchs } from "../../services/batch.service";

const InvestorInvestasi = () => {
  const [batchs, setBatchs] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    getBatchs((data) => {
      setBatchs(data);
    });
  }, []);

  // Ambil parameter pencarian dan status dari URL
  const searchQuery = searchParams.get("search") || "";
  const statusQuery = searchParams.get("status") || "Semua";

  // Gunakan useMemo untuk memfilter batch secara efisien
  const filteredBatchs = useMemo(() => {
    return batchs.filter((batch) => {
      if (!batch) return false;

      const matchesStatus =
        statusQuery === "Semua" ||
        batch.status.toLowerCase() === statusQuery.toLowerCase();

      const matchesSearch =
        batch.judul &&
        typeof batch.judul === "string" &&
        batch.judul.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [batchs, statusQuery, searchQuery]);

  // Fungsi untuk mengubah parameter pencarian di URL
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      if (value) {
        newParams.set("search", value);
      } else {
        newParams.delete("search");
      }
      return newParams;
    });
  };

  // Fungsi untuk mengubah kategori status di URL
  const handleStatusChange = (status) => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      if (status !== "Semua") {
        newParams.set("status", status);
      } else {
        newParams.delete("status");
      }
      return newParams;
    });
  };

  return (
    <div className="bg-white w-dvw min-h-screen overflow-y-auto py-5 px-6">
      <InvestorLayout>
        <div className="px-4 md:px-16 pb-5 transition-all duration-300 ease-in-out">
          <GuestLayout className="mt-12 md:mt-2">
            <h2 className="font-bold text-2xl md:text-4xl mb-6 text-center md:text-left">
              Ayo berinvestasi sekarang di CV Slamet!
            </h2>

            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
              {/* Input Search */}
              <form className="w-full md:max-w-sm grow flex-1">
                <label
                  htmlFor="search-investment"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <input
                  type="text"
                  id="search-investment"
                  className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Masukkan judul investasi ..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  required
                />
              </form>

              {/* Filter by Status */}
              <div className="flex gap-2 justify-center w-full md:w-auto">
                {/* Dropdown di mobile */}
                <div className="w-full md:hidden">
                  <select
                    className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                    value={statusQuery}
                    onChange={(e) => handleStatusChange(e.target.value)}
                  >
                    <option value="Semua">Semua</option>
                    <option value="Segera">Segera</option>
                    <option value="Proses">Proses</option>
                    <option value="Selesai">Selesai</option>
                  </select>
                </div>

                {/* Tombol filter di desktop */}
                <div className="hidden md:flex gap-2 md:gap-3">
                  <button
                    type="button"
                    className={`${
                      statusQuery === "Semua"
                        ? "bg-[#B87817] text-white"
                        : "bg-white text-[#B87817] border-2 border-[#B87817]"
                    } font-medium rounded-2xl text-sm w-24 py-2 hover:bg-[#B87817] hover:text-white transition-all duration-300`}
                    onClick={() => handleStatusChange("Semua")}
                  >
                    Semua
                  </button>
                  <button
                    type="button"
                    className={`${
                      statusQuery === "Segera"
                        ? "bg-[#5766CE] text-white"
                        : "text-[#5766CE] border-2 border-[#5766CE]"
                    } font-medium rounded-2xl text-sm w-24 py-2 hover:bg-[#5766CE] hover:text-white hover:font-semibold transition-all duration-300`}
                    onClick={() => handleStatusChange("Segera")}
                  >
                    Segera
                  </button>
                  <button
                    type="button"
                    className={`${
                      statusQuery === "Proses"
                        ? "bg-[#B87817] text-white"
                        : "text-[#B87817] border-2 border-[#B87817]"
                    } font-medium rounded-2xl text-sm w-24 py-2 hover:bg-[#B87817] hover:text-white hover:font-semibold transition-all duration-300`}
                    onClick={() => handleStatusChange("Proses")}
                  >
                    Proses
                  </button>
                  <button
                    type="button"
                    className={`${
                      statusQuery === "Selesai"
                        ? "bg-[#138a36] text-white"
                        : "text-[#138a36] border-2 border-[#138a36]"
                    } font-medium rounded-2xl text-sm w-24 py-2 hover:bg-[#138a36] hover:text-white hover:font-semibold transition-all duration-300`}
                    onClick={() => handleStatusChange("Selesai")}
                  >
                    Selesai
                  </button>
                </div>
              </div>
            </div>
            <BatchList batchs={filteredBatchs} />
          </GuestLayout>
        </div>
      </InvestorLayout>
    </div>
  );
};

export default InvestorInvestasi;
