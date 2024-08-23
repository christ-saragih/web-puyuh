import { useEffect, useState } from "react";
import Admin from "../../assets/images/admin.svg";
import BatchInvestasi from "../../assets/images/batch_investasi.png";
import { Dropdown } from "flowbite-react";
import {
  PiCalendarCheck,
  PiClockCountdown,
  PiDotsThreeOutlineVerticalBold,
  PiEyeBold,
  PiNotePencilBold,
  PiTrashBold,
  PiUserCircleFill,
} from "react-icons/pi";

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
    openModal,
  } = props;

  const [daysRemaining, setDaysRemaining] = useState(0);

  useEffect(() => {
    // Parsing tanggal
    const pembukaanDate = new Date(tanggal_pembukaan_penawaran);
    const berakhirDate = new Date(tanggal_berakhir_penawaran);

    // Menghitung selisih waktu dalam milidetik
    const timeDiff = berakhirDate - pembukaanDate;

    // Mengonversi milidetik ke hari
    const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    // Set state untuk waktu yang tersisa
    setDaysRemaining(days);
  }, [tanggal_pembukaan_penawaran, tanggal_berakhir_penawaran]);

  return (
    <div className="bg-white rounded-2xl shadow-lg">
      <img
        src={`http://localhost:3000/api/investasi/image/${gambar}`}
        alt={gambar}
        className="h-44 w-full object-cover rounded-t-2xl rounded-b-xl shadow"
      />
      <div className="p-4 flex flex-col">
        <div className="relative flex flex-col items-center mb-5 px-6 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 leading-tight px-2">
            {judul}
          </h2>
          <p className="font-medium text-gray-700 mb-3">{penerbit}</p>
          <div className="flex -space-x-2">
            <img
              src={Admin}
              alt="investor"
              className="h-8 w-8 rounded-full border-2 border-white"
            />
            <img
              src={Admin}
              alt="investor"
              className="h-8 w-8 rounded-full border-2 border-white"
            />
            <img
              src={Admin}
              alt="investor"
              className="h-8 w-8 rounded-full border-2 border-white"
            />
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
                onClick={() => openModal("detail_investment")}
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
            <p className="font-semibold text-lg text-[#e3a008]">
              Rp{total_pendanaan === (undefined || null) ? 0 : total_pendanaan}
            </p>
          </div>

          <div className="bg-gray-200 rounded-full">
            <div
              className="text-xs font-medium text-white text-center p-0.5 leading-none rounded-full"
              style={{
                width: "25%",
                backgroundColor: "#e3a008",
              }}
            >
              25%
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1 text-slate-700">
            <PiUserCircleFill className="w-6 h-6" />
            <p className="font-medium">10 investor</p>
          </div>

          {daysRemaining > 0 ? (
            <div className="bg-[#fff5e3] text-[#FFA90B] items-center justify-center rounded-3xl py-1 px-3 flex gap-1">
              <PiClockCountdown className="-ms-[3px] w-5 h-5" />
              <p className="font-medium">{daysRemaining} hari</p>
            </div>
          ) : (
            <div className="bg-green-100 text-green-600 items-center justify-center rounded-3xl py-1 px-3 flex gap-1">
              <PiCalendarCheck className="-ms-[3px] w-5 h-5" />
              <p className="font-medium">Selesai</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BatchItem;
