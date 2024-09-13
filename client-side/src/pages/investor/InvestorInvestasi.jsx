import { useState, useEffect } from "react";
import SidebarInvestor from "../../components/common/SidebarInvestor";
import InputSearch from "../../components/common/InputSearch";
import BatchList from "../../components/guest/BatchList";
import GuestLayout from "../../layouts/GuestLayout";
import { getBatchs } from "../../services/batch.service";
import InvestorLayout from "../../layouts/InvestorLayout";

const InvestorInvestasi = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [batchs, setBatchs] = useState([]);

    useEffect(() => {
        getBatchs((data) => {
            setBatchs(data);
        });
    }, []);

    return (
        <div className="bg-white w-dvw min-h-screen overflow-y-auto py-5 px-6">
            <InvestorLayout>
                <div className="px-4 md:px-16 pb-5 transition-all duration-300 ease-in-out">
                    <GuestLayout className="mt-12 md:mt-2">
                        <h2 className="font-bold text-2xl md:text-4xl mb-6 text-center md:text-left">
                            Ayo berinvestasi sekarang di CV Slamet!
                        </h2>

                        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                            <form className="w-full md:max-w-sm grow">
                                <label
                                    htmlFor="search-investment"
                                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                                >
                                    Search
                                </label>
                                <InputSearch />
                            </form>

                            <div className="flex gap-2 md:gap-3 justify-center">
                                <button
                                    type="button"
                                    className="text-white bg-[#B87817] font-medium rounded-2xl text-sm w-24 py-2 hover:bg-[#B87817] hover:text-[#] transition-all duration-300"
                                >
                                    Semua
                                </button>
                                <button
                                    type="button"
                                    className="text-[#B87817] border-2 border-[#B87817] font-medium rounded-2xl text-sm w-24 py-2 hover:bg-[#B87817] hover:text-white hover:font-semibold transition-all duration-300"
                                >
                                    Terbaru
                                </button>
                                <button
                                    type="button"
                                    className="text-[#B87817] border-2 border-[#B87817] font-medium rounded-2xl text-sm w-24 py-2 hover:bg-[#B87817] hover:text-white hover:font-semibold transition-all duration-300"
                                >
                                    Terlama
                                </button>
                            </div>
                        </div>

                        <BatchList batchs={batchs} />
                    </GuestLayout>
                </div>
            </InvestorLayout>
        </div>
    );
};

export default InvestorInvestasi;
