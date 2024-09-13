import BatchList from "../../components/guest/BatchList";
import GuestLayouts from "../../layouts/GuestLayouts";
import { getBatchs } from "../../services/batch.service";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Dropdown } from "flowbite-react";

const InvestorInvestasi = () => {
  const [batchs, setBatchs] = useState([]);
  const [filteredBatchs, setFilteredBatchs] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    getBatchs((data) => {
      setBatchs(data);
      setFilteredBatchs(data);
    });
  }, []);

  // Ambil parameter pencarian dan status dari URL
  const searchQuery = searchParams.get("search") || "";
  const statusQuery = searchParams.get("status") || "Semua Status";

  useEffect(() => {
    let filtered = batchs;

    // Filter berdasarkan status
    if (statusQuery && statusQuery !== "Semua Status") {
      filtered = filtered.filter(
        (batch) => batch.status.toLowerCase() === statusQuery.toLowerCase()
      );
    }

    // Filter berdasarkan judul investasi
    if (searchQuery) {
      filtered = filtered.filter((batch) =>
        batch.judul.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredBatchs(filtered);
  }, [searchQuery, statusQuery, batchs]);

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
      if (status !== "Semua Status") {
        newParams.set("status", status);
      } else {
        newParams.delete("status");
      }
      return newParams;
    });
  };

  return (
    <GuestLayouts>
      <div className="w-[90%] mx-auto my-12 lg:my-16 grow">
        <h2 className="font-bold text-center text-3xl lg:text-4xl mb-6 tracking-wide">
          Ayo berinvestasi sekarang di PT Sukaharja!
        </h2>

        <div className="mb-10 sm:mb-14 lg:mb-16">
          <div className="max-w-lg mx-auto">
            <div className="flex flex-col items-center rounded-2xl gap-y-3 sm:shadow sm:flex-row">
              <div className="flex-shrink-0 w-full sm:w-fit ">
                <Dropdown label={statusQuery} dismissOnClick={false}>
                  <Dropdown.Item
                    onClick={() => handleStatusChange("Semua Status")}
                  >
                    Semua Status
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleStatusChange("Segera")}>
                    Segera
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleStatusChange("Proses")}>
                    Proses
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleStatusChange("Selesai")}>
                    Selesai
                  </Dropdown.Item>
                </Dropdown>
              </div>

              <div className="relative w-full">
                <div className="absolute inset-y-0 start-1 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>

                <input
                  type="text"
                  className="block p-2.5 w-full z-20 ps-11 text-gray-900 bg-gray-50 rounded-2xl sm:rounded-s-none sm:border-s-gray-50 sm:border-s-2 border border-gray-300 focus:ring-[#B87817] focus:border-[#B87817] focus:outline-none shadow sm:shadow-none"
                  placeholder="Masukkan judul investasi ..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e)}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tampilkan batch yang sudah difilter */}
        <BatchList batchs={filteredBatchs} />
      </div>

      <GuestLayouts.Footer />
    </GuestLayouts>
  );
};

export default InvestorInvestasi;
