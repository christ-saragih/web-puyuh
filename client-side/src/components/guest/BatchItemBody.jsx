import { Link } from "react-router-dom";
import { formatRupiah } from "../../utils/formatRupiah";

const BatchItemBody = (props) => {
  const { children } = props;
  return <div className="p-3 lg:p-5">{children}</div>;
};

const BatchItemTitle = (props) => {
  const { judul, penerbit, status } = props;

  const statusInfo =
    status === "segera"
      ? "#5766CE"
      : status === "proses"
      ? "#FFA90B"
      : "#138a36";

  return (
    <div className="relative">
      <h5 className="text-xl xl:text-2xl font-bold tracking-tight text-gray-900 pr-24 truncate hover:text-clip hover:text-wrap">
        {judul}
      </h5>
      <p className="mb-4 font-normal text-gray-700">{penerbit}</p>
      <div
        className="absolute top-0 right-2 md:right-0 font-semibold text-white text-center py-1 w-20 rounded-3xl"
        style={{ backgroundColor: statusInfo }}
      >
        {status}
      </div>
    </div>
  );
};

const BatchItemProgressBar = (props) => {
  const { total, target, status } = props;

  const percentage = Math.round((total / target) * 100);
  const statusInfo = status === "selesai" ? "#138a36" : "#FFA90B";

  return (
    <>
      <div className="w-[80%] md:w-full bg-gray-200 rounded-full mb-1">
        <div
          className="text-xs font-medium text-white text-center p-0.5 leading-none rounded-full"
          style={{
            width: `${percentage}%`,
            backgroundColor: `${statusInfo}`,
          }}
        >
          {percentage}%
        </div>
      </div>
      <p className="text-sm">
        <span
          className="font-semibold text-base"
          style={{ color: `${statusInfo}` }}
        >
          {formatRupiah(total)}{" "}
        </span>
        terkumpul
      </p>
    </>
  );
};

const BatchItemStatistics = ({ statistics = [] }) => {
  // Pastikan statistics adalah array sebelum melakukan map
  if (!Array.isArray(statistics) || statistics.length === 0) {
    return null; // Mengembalikan null jika statistics kosong atau tidak terdefinisi
  }

  return (
    <div className="grid grid-cols-2 gap-3 mt-5 mb-6">
      {statistics.map((statistic, i) => (
        <div
          key={`${i}-${statistic.title}`}
          className="flex gap-1 md:flex-col md:items-center md:text-center lg:flex-row lg:text-start xl:gap-2"
        >
          <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full shrink-0">
            <statistic.icon className="w-full h-full text-[#4B241A]" />
          </div>
          <div className="flex flex-col truncate">
            <p className="text-sm">{statistic.title}</p>
            <p className="text-sm xl:text-base font-semibold truncate">
              {statistic.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

const BatchItemButton = (props) => {
  const { slug } = props;

  return (
    <div className="flex justify-center mb-2">
      <Link
        to={`/investasi/${slug}`}
        className="flex justify-center items-center w-11/12 py-2 text-lg font-semibold text-center text-white bg-[#4B241A] rounded-3xl shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
      >
        Lihat Detail
        <svg
          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </Link>
    </div>
  );
};

BatchItemBody.BatchItemTitle = BatchItemTitle;
BatchItemBody.BatchItemProgressBar = BatchItemProgressBar;
BatchItemBody.BatchItemStatistics = BatchItemStatistics;
BatchItemBody.BatchItemButton = BatchItemButton;

export default BatchItemBody;
