import { LuBadgeInfo } from "react-icons/lu";
import BatchItem from "./BatchItem";

const BatchList = (props) => {
  const { batchs } = props;

  return (
    <>
      {Array.isArray(batchs) && batchs.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-6 xl:grid-cols-3 xl:gap-x-14 xl:gap-y-8">
          {batchs.map((batch) => (
            <BatchItem
              key={batch.id}
              id={batch.id}
              judul={batch.judul}
              deskripsi={batch.deskripsi}
              gambar={batch.gambar}
              alamat={batch.alamat}
              map={batch.url_map}
              slug={batch.slug}
              penerbit={batch.penerbit}
              dana={batch.penggunaan_dana}
              bagi={batch.bagi_hasil}
              minimum={batch.minimum_investasi}
              maksimum={batch.maksimum_investasi}
              total={batch.total_pendanaan}
              target={batch.target_pendanaan}
              tenor={batch.tenor}
              pembayaran={batch.pembayaran_bagi_hasil}
              pembukaan={batch.tanggal_pembukaan_penawaran}
              penutupan={batch.tanggal_berakhir_penawaran}
              status={batch.status}
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
