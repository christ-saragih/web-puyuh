import BatchItemInvestor from "./BatchItemInvestor";

const BatchListInvestor = ({ batchs, onBatchClick }) => {
  return (
    <div className="overflow-x-auto w-full md:w-full">
      <div className="flex gap-x-6">
        {Array.isArray(batchs) && batchs.length > 0 ? (
          batchs.filter(batch => batch.status === 'proses').map((batch) => (
            <div key={batch.id} className="flex-shrink-0 w-[20rem]">
              <BatchItemInvestor
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
                onClick={() => onBatchClick(batch.slug)}
              />
            </div>
          ))
        ) : (
          <p>No batches available</p>
        )}
      </div>
    </div>
  );
};

export default BatchListInvestor;