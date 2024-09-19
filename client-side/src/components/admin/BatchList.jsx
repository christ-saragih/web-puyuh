import BatchItem from "./BatchItem";
import { LuBadgeInfo } from "react-icons/lu";

const BatchList = (props) => {
  const { investments, openModal } = props;
  return (
    <>
      {Array.isArray(investments) && investments.length > 0 ? (
        <div className="grid grid-cols-3 gap-x-14 gap-y-12">
          {investments.map((investment) => (
            <BatchItem
              key={investment.id}
              {...investment}
              openModal={openModal}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center ">
          <div
            className="flex items-center w-full max-w-xl px-4 py-3 mb-4 text-sm sm:text-base text-[#5766CE] rounded-2xl bg-[#EEEFFA] border border-[#ccd1f0] shadow"
            role="alert"
          >
            <div className="bg-[#5766CE] rounded-xl w-9 h-9 p-[6px] me-2 ">
              <LuBadgeInfo className="w-full h-full text-white object-cover" />
            </div>

            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">Pemberitahuan!</span> Tidak ada
              investasi yang tersedia.
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BatchList;
