import {
    PiCalendarCheckDuotone,
    PiCalendarDotsDuotone,
    PiMoney,
    PiTargetDuotone,
    PiTimerDuotone,
} from "react-icons/pi";

const BatchItemBody = (props) => {
    const { children } = props;
    return <div className="p-3 lg:p-5">{children}</div>;
};

const BatchItemTitle = (props) => {
    const { judul, penerbit, total, target, status } = props;

    // console.log('BatchItemTitle props:', props); // Tambahkan log ini

    const percentage = Math.round((total / target) * 100);

    // Set warna background berdasarkan status
    const bgColor =
        status === "selesai"
            ? "#057a55"
            : percentage < 100
            ? "#e3a008"
            : "#057a55";

    return (
        <div className="relative">
            <h5 className="mb-1 text-xl xl:text-2xl font-bold tracking-tight text-gray-900">
                {judul}
            </h5>
            <p className="mb-3 font-normal text-gray-700">{penerbit}</p>
            <div
                className="absolute top-0 right-0 font-semibold text-white text-center py-1 w-20 rounded-3xl"
                style={{ backgroundColor: bgColor }}
            >
                {status}
            </div>
        </div>
    );
};

const BatchItemProgressBar = (props) => {
    const { total, target } = props;

    const percentage = Math.round((total / target) * 100);
    const bgColor = percentage < 100 ? "#e3a008" : "#057a55";
    const textColor = percentage < 100 ? "#e3a008" : "#057a55";
    const statusText = percentage < 100 ? "terkumpul" : "tercapai";

    return (
        <>
            <div className="w-full bg-gray-200 rounded-full mb-1">
                <div
                    className="text-xs font-medium text-white text-center p-0.5 leading-none rounded-full"
                    style={{
                        width: `${percentage}%`,
                        backgroundColor: bgColor,
                    }}
                >
                    {percentage}%
                </div>
            </div>
            <p className="text-sm">
                <span
                    className="font-semibold text-base"
                    style={{ color: textColor }}
                >
                    {(total || 0).toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                    })}{" "}
                </span>
                {statusText}
            </p>
        </>
    );
};

const StatisticItem = (props) => {
    const {
        Icon,
        titleMinimum,
        valueMinimum,
        titleMaksimum,
        valueMaksimum,
        titlePembukaan,
        valuePembukaan,
        titlePenutupan,
        valuePenutupan,
    } = props;

    return (
        <div className="flex flex-col items-start gap-1 xl:flex-row xl:items-center xl:gap-2">
            <div className="flex justify-center items-center w-10 h-10 rounded-full">
                <Icon className="w-full h-full text-[#4B241A]" />
            </div>
            <div>
                <p className="text-sm">{titleMinimum}</p>
                <p className="text-sm xl:text-base font-semibold">
                    {valueMinimum}
                </p>
                <p className="text-sm">{titleMaksimum}</p>
                <p className="text-sm xl:text-base font-semibold">
                    {valueMaksimum}
                </p>
                <p className="text-sm">{titlePembukaan}</p>
                <p className="text-sm xl:text-base font-semibold">
                    {valuePembukaan}
                </p>
                <p className="text-sm">{titlePenutupan}</p>
                <p className="text-sm xl:text-base font-semibold">
                    {valuePenutupan}
                </p>
            </div>
        </div>
    );
};

const BatchItemStatistics = (props) => {
    const {
        titleMinimum,
        valueMinimum,
        titleMaksimum,
        valueMaksimum,
        titlePembukaan,
        valuePembukaan,
        titlePenutupan,
        valuePenutupan,
    } = props;
    return (
        <div className="grid grid-cols-2 gap-3 mt-5 mb-6">
            <StatisticItem
                Icon={PiMoney}
                titleMinimum={titleMinimum}
                valueMinimum={valueMinimum}
            />
            <StatisticItem
                Icon={PiMoney}
                titleMaksimum={titleMaksimum}
                valueMaksimum={valueMaksimum}
            />
            <StatisticItem
                Icon={PiMoney}
                titlePembukaan={titlePembukaan}
                valuePembukaan={valuePembukaan}
            />
            <StatisticItem
                Icon={PiMoney}
                titlePenutupan={titlePenutupan}
                valuePenutupan={valuePenutupan}
            />
            {/* <StatisticItem Icon={PiCalendarDotsDuotone} title={title} value={value} />
      <StatisticItem
        Icon={PiCalendarCheckDuotone}
        title={title}
        value={value}
      /> */}
        </div>
    );
};

const BatchItemButton = (props) => {
    const { slug } = props;

    return (
        <div className="flex justify-center">
            <a
                href={`/investasi/${slug}`}
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
};

BatchItemBody.BatchItemTitle = BatchItemTitle;
BatchItemBody.BatchItemProgressBar = BatchItemProgressBar;
BatchItemBody.BatchItemStatistics = BatchItemStatistics;
BatchItemBody.BatchItemButton = BatchItemButton;

export default BatchItemBody;
