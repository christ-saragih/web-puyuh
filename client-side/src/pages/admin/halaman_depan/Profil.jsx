import React, { useState } from "react";
import Sidebar from "../../../components/common/Sidebar";
import AdminNavbar from "../../../components/admin/AdminNavbar";

const Profil = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="bg-white w-dvw h-dvh overflow-y-auto py-5 pe-6">
            <Sidebar isHovered={isHovered} setIsHovered={setIsHovered} />
            <div className={`px-8 pb-5 transition-all duration-300 ease-in-out ${
                isHovered ? "md:ml-60" : "md:ml-28"
                }`}>
                <div className="flex flex-col px-5">
                    <AdminNavbar />
                    <div className="w-full rounded-xl bg-[#F5F5F7] mt-10 flex flex-col py-5">
                        <div className="flex flex-row">
                            <h1 className="font-quicksand font-bold text-[#572618] text-3xl px-10">TENTANG KAMI</h1>
                            <button className="px-6 py-2 bg-[#572618] text-white font-bold rounded-md hover:bg-brown-700 transition ml-[50rem]">
                                Simpan
                            </button>
                        </div>
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}

export default Profil;