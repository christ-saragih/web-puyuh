import { useState } from "react";
import Sidebar from "./Sidebar";
import MobileSidebar from "./MobileSidebar";

const InvestorLayout = (props) => {
    const { title, children } = props;
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="bg-white w-vw h-full overflow-hidden py-3">
            {/* Sidebar for Desktop */}
            <div className="hidden lg:block">
                <Sidebar isHovered={isHovered} setIsHovered={setIsHovered} />
            </div>

            {/* MobileSidebar for Mobile */}
            <div className="lg:hidden">
                <MobileSidebar isHovered={isHovered} setIsHovered={setIsHovered} />
            </div>

            {/* Main content section */}
            <div
                className={`transition-all duration-300 ease-in-out ${
                    isHovered ? "md:ml-[10rem]" : "md:ml-5"
                }`}
            >
                <div className="flex flex-col gap-8">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default InvestorLayout;
