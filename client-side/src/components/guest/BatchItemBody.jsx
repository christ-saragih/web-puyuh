import {
  PiCalendarCheckDuotone,
  PiCalendarDotsDuotone,
  PiTargetDuotone,
  PiTimerDuotone,
} from "react-icons/pi";

const BatchItemBody = (props) => {
  const { children } = props;
  return <div className="p-3 lg:p-5">{children}</div>;
};

const BatchItemTitle = (props) => {
  const { title, location, totalInvested, targetAmount } = props;

  const percentage = Math.round((totalInvested / targetAmount) * 100);
  const bgColor = percentage < 100 ? "#e3a008" : "#057a55";
  const statusText = percentage < 100 ? "Proses" : "Selesai";

  return (
    <div className="relative">
      <h5 className="mb-1 text-xl xl:text-2xl font-bold tracking-tight text-gray-900 ">
        {title}
      </h5>
      <p className="mb-3 font-normal text-gray-700">{location}</p>
      <div
        className="absolute top-0 right-0 font-semibold text-white text-center py-1 w-20 rounded-3xl"
        style={{ backgroundColor: bgColor }}
      >
        {statusText}
      </div>
    </div>
  );
};

const BatchItemProgressBar = (props) => {
  const { totalInvested, targetAmount } = props;

  const percentage = Math.round((totalInvested / targetAmount) * 100);
  const bgColor = percentage < 100 ? "#e3a008" : "#057a55";
  const textColor = percentage < 100 ? "#e3a008" : "#057a55";
  const statusText = percentage < 100 ? "terkumpul" : "tercapai";

  return (
    <>
      <div className="w-full bg-gray-200 rounded-full mb-1">
        <div
          className="text-xs font-medium text-white text-center p-0.5 leading-none rounded-full"
          style={{ width: `${percentage}%`, backgroundColor: bgColor }}
        >
          {percentage}%
        </div>
      </div>
      <p className="text-sm">
        <span className="font-semibold text-base" style={{ color: textColor }}>
          Rp
          {totalInvested.toLocaleString("id-ID", {
            styles: "currency",
            currency: "USD",
          })}{" "}
        </span>
        {statusText}
      </p>
    </>
  );
};

const StatisticItem = (props) => {
  const { Icon, title, value } = props;

  return (
    <div className="flex flex-col items-start gap-1 xl:flex-row xl:items-center xl:gap-2">
      <div className="flex justify-center items-center w-10 h-10 rounded-full">
        <Icon className="w-full h-full text-[#4B241A]" />
      </div>
      <div>
        <p className="text-sm">{title}</p>
        <p className="text-sm xl:text-base font-semibold">{value}</p>
      </div>
    </div>
  );
};

const BatchItemStatistics = (props) => {
  const { title, value } = props;
  return (
    <div className="grid grid-cols-2 gap-3 mt-5 mb-6">
      <StatisticItem Icon={PiTargetDuotone} title={title} value={value} />
      <StatisticItem Icon={PiTimerDuotone} title={title} value={value} />
      <StatisticItem Icon={PiCalendarDotsDuotone} title={title} value={value} />
      <StatisticItem
        Icon={PiCalendarCheckDuotone}
        title={title}
        value={value}
      />
    </div>
  );
};

const BatchItemButton = () => (
  <div className="flex justify-center">
    <a
      href="/investor/investasi/detail/1"
      className="flex justify-center items-center w-11/12 py-2 text-lg font-semibold text-center text-white bg-[#4B241A] rounded-3xl shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
    >
      Investasi Sekarang
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
    </a>
  </div>
);

BatchItemBody.BatchItemTitle = BatchItemTitle;
BatchItemBody.BatchItemProgressBar = BatchItemProgressBar;
BatchItemBody.BatchItemStatistics = BatchItemStatistics;
BatchItemBody.BatchItemButton = BatchItemButton;

export default BatchItemBody;
