import React, { useState } from "react";
import SidebarInvestor from "../../components/common/SidebarInvestor";
import VerticalTabProfil from "../../components/investor/VerticalTabProfil";
import profilePicture from "../../assets/images/profile-picture-5.jpg";

const InvestorProfil = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="bg-white w-dvw h-dvh overflow-y-auto py-5 pe-6">
            <SidebarInvestor isHovered={isHovered} setIsHovered={setIsHovered} />
            <div className={`px-8 pb-5 transition-all duration-300 ease-in-out ${
                isHovered ? "md:ml-60" : "md:ml-28"
                }`}>
                    <div className="flex flex-col">
                        <h1>Profil Investor</h1>
                        <div className="w-full rounded-xl bg-[#F5F5F7] flex items-center mb-10">
                            <img className="w-20 h-20 rounded m-10" src={profilePicture} alt="Default avatar"/>
                            <div className="flex flex-col items-center ml-10">
                                <button type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-quicksand focus:outline-none bg-white rounded-full hover:bg-gray-100 dark:bg-[#D9D9D9] text-[#000]  dark:hover:text-white dark:hover:bg-[#572618] mb-5">ganti foto</button>
                                <h2 className="font-quicksand text-l text-[#000]">example@gmail.com</h2>
                            </div>
                        </div>
                        <div className="w-full rounded-xl bg-[#F5F5F7]">
                            <VerticalTabProfil />
                        </div>
                    </div>

            </div>
        </div>
    )
};

export default InvestorProfil;
