import BatchItem from "./BatchItem";

const BatchList = (props) => {
  const { batchs } = props;

  return (
    <div className="grid md:grid-cols-2 gap-x-10 gap-y-6 xl:grid-cols-3 xl:gap-x-14 xl:gap-y-8">
      {Array.isArray(batchs) && batchs.length > 0 ? (
        batchs.map((batch) => (
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
        ))
      ) : (
        <p>No batches available</p>
      )}
    </div>
  );
};

export default BatchList;
