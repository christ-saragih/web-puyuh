import { calculateDaysRemaining } from "../../utils/calculateDaysRemaining";
import { formatRupiah } from "../../utils/formatRupiah";
import {
  PiCalendarCheckDuotone,
  PiCalendarDotsDuotone,
  PiTargetDuotone,
  PiTimerDuotone,
} from "react-icons/pi";
import BatchItemImage from "../guest/BatchItemImage";
import BatchItemBody from "../guest/BatchItemBody";

const BatchItemInvestor = ({
  id,
  judul,
  deskripsi,
  gambar,
  alamat,
  map,
  slug,
  penerbit,
  dana,
  bagi,
  minimum,
  maksimum,
  total,
  target,
  tenor,
  pembayaran,
  pembukaan,
  penutupan,
  status,
  onClick
}) => {

  const handleClick = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    onClick();
  };

  const daysRemaining =
    status !== "selesai"
      ? `${calculateDaysRemaining(pembukaan, penutupan)} hari lagi`
      : "-";

  const listStatistics = [
    {
      icon: PiTargetDuotone,
      title: "Target Proyek",
      value: `${formatRupiah(target)}`,
    },
    {
      icon: PiTimerDuotone,
      title: "Waktu Pendanaan",
      value: `${daysRemaining}`,
    },
    {
      icon: PiCalendarDotsDuotone,
      title: "Tenor",
      value: `${tenor}`,
    },
    {
      icon: PiCalendarCheckDuotone,
      title: "Periode Bagi Hasil",
      value: `${pembayaran}`,
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden h-[19rem] flex flex-col" onClick={handleClick}
    role="button"
    tabIndex={0}
    onKeyPress={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        onClick();
      }
    }}>
      {/* Tetapkan tinggi tetap dan gunakan flexbox */}
      <BatchItemImage gambar={gambar} className="h-[5rem] w-full object-cover" />
      <BatchItemBody className="flex flex-col justify-between p-4">
        <BatchItemBody.BatchItemTitle
          judul={judul}
          penerbit={penerbit}
          status={status}
        />
        <BatchItemBody.BatchItemProgressBar
          total={total}
          target={target}
          status={status}
        />
        {/* <BatchItemBody.BatchItemStatistics statistics={listStatistics} /> */}
        {/* <BatchItemBody.BatchItemButton slug={slug} /> */}
      </BatchItemBody>
    </div>
  );
};

export default BatchItemInvestor;
