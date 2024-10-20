import { useEffect, useState } from "react";
import { Dropdown, Tooltip } from "flowbite-react";
import {
  PiCalendarCheck,
  PiCalendarDots,
  PiClockCountdown,
  PiDotsThreeOutlineVerticalBold,
  PiEyeBold,
  PiNotePencilBold,
  PiTrashBold,
  PiUserBold,
  PiUserCircleFill,
  PiUsersThreeBold,
} from "react-icons/pi";
import { calculateDaysRemaining } from "../../utils/calculateDaysRemaining";
import { formatRupiah } from "../../utils/formatRupiah";

const BatchItem = (props) => {
  const {
    id,
    judul,
    deskripsi,
    gambar,
    alamat,
    url_map,
    slug,
    penerbit,
    penggunaan_dana,
    bagi_hasil,
    minimum_investasi,
    maksimum_investasi,
    total_pendanaan,
    target_pendanaan,
    tenor,
    pembayaran_bagi_hasil,
    tanggal_pembukaan_penawaran,
    tanggal_berakhir_penawaran,
    status,
    transaksi = [],
    openModal,
  } = props;

  const [percentage, setPercentage] = useState(0);

  const daysRemaining = calculateDaysRemaining(
    tanggal_pembukaan_penawaran,
    tanggal_berakhir_penawaran
  );

  // mengambil total investor
  const totalInvestor = transaksi.length;

  useEffect(() => {
    setPercentage(Math.round((total_pendanaan / target_pendanaan) * 100));
  }, [total_pendanaan, target_pendanaan]);

  return (
    <div className="bg-white rounded-2xl shadow-lg flex flex-col">
      <img
        src={`http://localhost:3000/api/investasi/image/${gambar}`}
        alt={gambar}
        className="h-44 w-full object-cover rounded-t-2xl rounded-b-xl shadow"
      />
      <div className="p-4 flex flex-col grow">
        <div className="relative flex flex-col items-center mb-5 px-6 text-center grow">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 leading-tight px-2">
            {judul}
          </h2>
          <p className="font-medium text-gray-700 mb-3">{penerbit}</p>
          <div className="flex -space-x-2">
            {/* 3 investor dengan investasi tertinggi */}
            {transaksi
              .sort((a, b) => b.total_investasi - a.total_investasi)
              .slice(0, 3)
              .map((investor) => (
                <Tooltip
                  key={investor.investorId}
                  content={investor.nama_lengkap}
                  placement="bottom"
                >
                  <div className="h-10 w-10 bg-gray-200 rounded-full overflow-hidden border-[3px] border-white p-1">
                    {investor.foto_profil ? (
                      <img
                        src={investor.foto_profil}
                        alt={investor.nama_lengkap}
                        className="w-full h-full"
                      />
                    ) : investor.kategori_investor === "organisasi" ? (
                      <PiUsersThreeBold className="w-full h-full" />
                    ) : (
                      <PiUserBold className="w-full h-full" />
                    )}
                  </div>
                </Tooltip>
              ))}
          </div>

          <div className="absolute top-[2px] right-0 cursor-pointer">
            <Dropdown
              label=""
              dismissOnClick={false}
              renderTrigger={() => (
                <div className="border rounded-full p-[6px]">
                  <PiDotsThreeOutlineVerticalBold />
                </div>
              )}
              placement="right-end"
            >
              <Dropdown.Item
                icon={PiEyeBold}
                onClick={() => openModal("detail_investment", { slug })}
              >
                Detail
              </Dropdown.Item>
              <Dropdown.Item
                icon={PiNotePencilBold}
                onClick={() =>
                  openModal("update_investment", {
                    id,
                    judul,
                    deskripsi,
                    gambar,
                    alamat,
                    url_map,
                    penerbit,
                    penggunaan_dana,
                    bagi_hasil,
                    minimum_investasi,
                    maksimum_investasi,
                    target_pendanaan,
                    tenor,
                    pembayaran_bagi_hasil,
                    tanggal_pembukaan_penawaran,
                    tanggal_berakhir_penawaran,
                  })
                }
              >
                Ubah
              </Dropdown.Item>
              <Dropdown.Item
                icon={PiTrashBold}
                onClick={() => openModal("delete_investment", { id })}
              >
                Hapus
              </Dropdown.Item>
            </Dropdown>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <p>Dana Terkumpul</p>
            <p
              className={`font-semibold text-lg ${
                status === "selesai" ? "text-[#138a36]" : "text-yellow-400"
              }`}
            >
              {formatRupiah(total_pendanaan === null ? 0 : total_pendanaan)}
            </p>
          </div>

          <div className="bg-gray-200 rounded-full">
            <div
              className="text-xs font-medium text-white text-center p-0.5 leading-none rounded-full"
              style={{
                width: `${percentage}%`,
                backgroundColor: `${
                  status === "selesai" ? "#138a36" : "#e3a008"
                }`,
              }}
            >
              {percentage}%
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1 text-slate-700">
            <PiUserCircleFill className="w-6 h-6" />
            {/* total investor */}
            <p className="font-medium">
              {totalInvestor > 0 ? totalInvestor : 0} investor
            </p>
          </div>

          {status === "segera" ? (
            <div className="bg-[#eeeffa] text-[#5766CE] items-center justify-center rounded-3xl py-1 px-3 flex gap-1">
              <PiCalendarDots className="-ms-[3px] w-5 h-5" />
              <p className="font-medium">Segera</p>
            </div>
          ) : status === "selesai" ? (
            <div className="bg-[#e7f3ea] text-[#138A36] items-center justify-center rounded-3xl py-1 px-3 flex gap-1">
              <PiCalendarCheck className="-ms-[3px] w-5 h-5" />
              <p className="font-medium">Selesai</p>
            </div>
          ) : (
            <div className="bg-[#fff6e6] text-[#FFA90B] items-center justify-center rounded-3xl py-1 px-3 flex gap-1">
              <PiClockCountdown className="-ms-[3px] w-5 h-5" />
              <p className="font-medium">{daysRemaining} hari</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BatchItem;
