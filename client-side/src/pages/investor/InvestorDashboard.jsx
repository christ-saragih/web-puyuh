import React, { useState } from "react";
import SidebarInvestor from "../../components/common/SidebarInvestor";
import CalendarInvestor from "../../components/common/CalendarInvestor"
import CardBagiHasil from "../../components/investor/CardBagiHasil";
import CardBatchInvestor from "../../components/investor/CardBatchInvestor";
import WavingIllustration from "../../assets/images/Illustration waving.svg";
import GrowingMoney from "../../assets/images/Growing Money.svg";
import { MdNotificationsActive } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

const InvestorDashboard = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="bg-white w-dvw h-dvh overflow-y-auto py-5 pe-6">
      <SidebarInvestor isHovered={isHovered} setIsHovered={setIsHovered} />
      <div
        className={`px-8 pb-5 transition-all duration-300 ease-in-out ${
          isHovered ? "md:ml-60" : "md:ml-28"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-4">
            <div className="w-full rounded-xl bg-[#F5F5F7] flex items-center">
              <div className="flex flex-col items-center ml-10">
                <h1 className="text-[2.5rem] font-bold mb-3 text-[#000]">Hello, Investor!</h1>
                <p className="text-[#000]">Senang Bertemu Anda</p>
              </div>
              <img src={WavingIllustration} alt="Waving Illustration" className="w-[15rem] h-[15rem] mt-4 ml-56 -mb-[1.6rem]" />
            </div>
            <div className="w-full rounded-xl bg-[#F5F5F7] flex items-center p-4">
              <div className="flex flex-col">
                <h1 className="text-xl font-bold mb-3 text-[#000]">Total Investasi</h1>
                <div className="flex items-center ml-48">
                  <img src={GrowingMoney} alt="Growing Money" className="w-36 h-36" />
                  <h1 className="text-3xl font-bold ml-4 text-[#000]">Rp. 1.000.000</h1>
                </div>
              </div>
            </div>
            <div className="w-full rounded-xl bg-[#F5F5F7] flex items-center p-4">
              <div className="flex flex-col">
                <h1 className="text-xl font-bold mb-3 text-[#000]">Bagi Hasil</h1>
                <div className="flex space-x-4">
                  <CardBagiHasil batch="Batch 1" profit="Rp2.000.000" percentage="2.7%"/>
                  <CardBagiHasil batch="Batch 1" profit="Rp2.000.000" percentage="2.7%"/>
                </div>
              </div>
            </div>
            <div className="w-[151%] rounded-xl bg-[#F5F5F7] flex items-center p-4">
              <div className="flex flex-col">
                <h1 className="text-xl font-bold mb-3 text-[#000]">Investasi yang Sedang Berlangsung</h1>
                <div className="flex w-[115%] gap-10">
                  <CardBatchInvestor/>
                  <CardBatchInvestor/>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-1 relative">
            <div className="flex items-center gap-5">
              <form className="w-[63%]">
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                  </div>
                  <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 bg-[#F5F5F7] rounded-xl" placeholder="Cari"/>
                </div>
              </form>

              <div className="">
                <MdNotificationsActive className="w-10 h-10 text-gray-500 dark:text-gray-400"/>
              </div>

              <div>
              <CgProfile className="w-10 h-10" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full h-[10rem]">
                <CalendarInvestor />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorDashboard;