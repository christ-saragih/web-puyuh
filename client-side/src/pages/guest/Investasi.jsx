import InputSearch from "../../components/common/InputSearch";
import BatchList from "../../components/guest/BatchList";
import GuestLayouts from "../../layouts/GuestLayouts";
import { getBatchs } from "../../services/batch.service";
import { useState, useEffect } from "react";

const InvestorInvestasi = () => {
  const [batchs, setBatchs] = useState([]);

  useEffect(() => {
    getBatchs((data) => {
      setBatchs(data);
    });
  }, []);

  return (
    <GuestLayouts>
      <div className="w-[90%] mx-auto my-12 lg:my-16">
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
      </div>

      <GuestLayouts.Footer />
    </GuestLayouts>
  );
};

export default InvestorInvestasi;
