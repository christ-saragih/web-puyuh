import BatchInvestasi from "../../assets/images/batch_investasi.png";
import BatchItemImage from "../../components/guest/BatchItemImage";
import BatchItemBody from "../../components/guest/BatchItemBody";

const CardBatchInvestor = () => {
  const totalInvested = 3200000000; // contoh nilai total investasi yang terkumpul
  const targetAmount = 5000000000; // contoh target dana proyek

  return (
    <div className="w-full md:w-[47%] xl:w-1/3 bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden">
      <BatchItemImage imageUrl={BatchInvestasi} alt={"Batch Investasi"} />

      <BatchItemBody>
        <BatchItemBody.BatchItemTitle
          title={"Sukuk Ijarah Panacea"}
          location={"PT. Panacea Buana Batam"}
          totalInvested={totalInvested}
          targetAmount={targetAmount}
        />
        <BatchItemBody.BatchItemProgressBar
          totalInvested={totalInvested}
          targetAmount={targetAmount}
        />
        <BatchItemBody.BatchItemStatistics
          title={"Target Proyek"}
          value={"Rp2.600.000.000"}
        />
        <BatchItemBody.BatchItemButton />
      </BatchItemBody>
    </div>

    // <div className="max-w-md bg-white border border-gray-200 rounded-2xl shadow overflow-hidden">
    //   <div className="h-48">
    //     <img
    //       className="object-cover w-full h-full object-left-top"
    //       src={BatchInvestasi}
    //       alt=""
    //     />
    //   </div>

    //   <div className="p-5">
    //     <div className="relative">
    //       <h5 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 ">
    //         Sukuk Ijarah Panacea
    //       </h5>
    //       <p className="mb-3 font-normal text-gray-700">
    //         PT. Panacea Buana Batam
    //       </p>
    //       <div className="absolute top-0 right-0 bg-[#22D7A6] font-semibold text-white text-center py-1 w-20 rounded-3xl">
    //         Selesai
    //       </div>
    //     </div>

    //     <div className="w-full bg-gray-200 rounded-full mb-1">
    //       <div className="bg-[#22D7A6] w-[100%] text-xs font-medium text-white text-center p-0.5 leading-none rounded-full">
    //         {" "}
    //         100%
    //       </div>
    //     </div>

    //     <p className="text-sm">
    //       <span className="text-[#22D7A6] font-semibold text-base">
    //         Rp. 5.000.000.000{" "}
    //       </span>
    //       tercapai
    //     </p>

    //     <div className="grid grid-cols-2 gap-3 mt-5 mb-6">
    //       <div className="flex items-center gap-2">
    //         <div className="flex justify-center items-center w-10 h-10 rounded-full">
    //           <PiTargetDuotone className="w-full h-full text-[#4B241A]" />
    //         </div>
    //         <div>
    //           <p className="text-sm">Target Proyek</p>
    //           <p className="font-semibold ">Rp5 miliar</p>
    //         </div>
    //       </div>

    //       <div className="flex items-center gap-2">
    //         <div className="flex justify-center items-center w-10 h-10 rounded-full">
    //           <PiTimerDuotone className="w-full h-full text-[#4B241A]" />
    //         </div>
    //         <div>
    //           <p className="text-sm">Waktu Pendanaan</p>
    //           <p className="font-semibold ">25 hari lagi</p>
    //         </div>
    //       </div>
    //       <div className="flex items-center gap-2">
    //         <div className="flex justify-center items-center w-10 h-10 rounded-full">
    //           <PiCalendarDotsDuotone className="w-full h-full text-[#4B241A]" />
    //         </div>
    //         <div>
    //           <p className="text-sm">Tenor</p>
    //           <p className="font-semibold ">12 bulan</p>
    //         </div>
    //       </div>
    //       <div className="flex items-center gap-2">
    //         <div className="flex justify-center items-center w-10 h-10 rounded-full">
    //           <PiCalendarCheckDuotone className="w-full h-full text-[#4B241A]" />
    //         </div>
    //         <div>
    //           <p className="text-sm">Periode Bagi Hasil</p>
    //           <p className="font-semibold ">per 1 bulan</p>
    //         </div>
    //       </div>
    //     </div>

    //     <div className="flex justify-center">
    //       <a
    //         href="#"
    //         className="flex justify-center items-center w-11/12 py-2 text-lg font-semibold text-center text-white bg-[#4B241A] rounded-3xl shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
    //       >
    //         Investasi Sekarang
    //         <svg
    //           className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
    //           aria-hidden="true"
    //           xmlns="http://www.w3.org/2000/svg"
    //           fill="none"
    //           viewBox="0 0 14 10"
    //         >
    //           <path
    //             stroke="currentColor"
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             strokeWidth="2"
    //             d="M1 5h12m0 0L9 1m4 4L9 9"
    //           />
    //         </svg>
    //       </a>
    //     </div>
    //   </div>
    // </div>

    // <div className="max-w-md bg-white border border-gray-200 rounded-2xl shadow overflow-hidden">
    //   <div className="h-48">
    //     <img
    //       className="object-cover w-full h-full object-left-top"
    //       src={BatchInvestasi}
    //       alt=""
    //     />
    //   </div>

    //   <div className="p-5">
    //     <div className="relative">
    //       <h5 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 ">
    //         Sukuk Ijarah Panacea
    //       </h5>
    //       <p className="mb-3 font-normal text-gray-700">
    //         PT. Panacea Buana Batam
    //       </p>
    //       <div className="absolute top-0 right-0 bg-[#FFA90B] font-semibold text-white text-center py-1 w-20 rounded-3xl">
    //         Proses
    //       </div>
    //     </div>
    //     <div className="w-full bg-gray-200 rounded-full mb-1">
    //       <div className="bg-[#FFA90B] w-[70%] text-xs font-medium text-white text-center p-0.5 leading-none rounded-full">
    //         {" "}
    //         70%
    //       </div>
    //     </div>
    //     <p className="text-sm">
    //       <span className="text-[#FFA90B] font-semibold text-base">
    //         Rp. 2.600.000.000{" "}
    //       </span>
    //       terkumpul
    //     </p>

    //     <div className="grid grid-cols-2 gap-3 mt-5 mb-6">
    //       <div className="flex items-center gap-2">
    //         <div className="flex justify-center items-center w-10 h-10 rounded-full">
    //           <PiTargetDuotone className="w-full h-full text-[#4B241A]" />
    //         </div>
    //         <div>
    //           <p className="text-sm">Target Proyek</p>
    //           <p className="font-semibold ">Rp5 miliar</p>
    //         </div>
    //       </div>
    //       <div className="flex items-center gap-2">
    //         <div className="flex justify-center items-center w-10 h-10 rounded-full">
    //           <PiTimerDuotone className="w-full h-full text-[#4B241A]" />
    //         </div>
    //         <div>
    //           <p className="text-sm">Waktu Pendanaan</p>
    //           <p className="font-semibold ">25 hari lagi</p>
    //         </div>
    //       </div>
    //       <div className="flex items-center gap-2">
    //         <div className="flex justify-center items-center w-10 h-10 rounded-full">
    //           <PiCalendarDotsDuotone className="w-full h-full text-[#4B241A]" />
    //         </div>
    //         <div>
    //           <p className="text-sm">Tenor</p>
    //           <p className="font-semibold ">12 bulan</p>
    //         </div>
    //       </div>
    //       <div className="flex items-center gap-2">
    //         <div className="flex justify-center items-center w-10 h-10 rounded-full">
    //           <PiCalendarCheckDuotone className="w-full h-full text-[#4B241A]" />
    //         </div>
    //         <div>
    //           <p className="text-sm">Periode Bagi Hasil</p>
    //           <p className="font-semibold ">per 1 bulan</p>
    //         </div>
    //       </div>
    //     </div>

    //     <div className="flex justify-center">
    //       <a
    //         href="#"
    //         className="flex justify-center items-center w-11/12 py-2 text-lg font-semibold text-center text-white bg-[#4B241A] rounded-3xl shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
    //       >
    //         Investasi Sekarang
    //         <svg
    //           className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
    //           aria-hidden="true"
    //           xmlns="http://www.w3.org/2000/svg"
    //           fill="none"
    //           viewBox="0 0 14 10"
    //         >
    //           <path
    //             stroke="currentColor"
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             strokeWidth="2"
    //             d="M1 5h12m0 0L9 1m4 4L9 9"
    //           />
    //         </svg>
    //       </a>
    //     </div>
    //   </div>
    // </div>
  );
};

export default CardBatchInvestor;
