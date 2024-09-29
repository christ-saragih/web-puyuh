const CardBagiHasil = ({ batch, profit, percentage }) => {
    return (
        <div className="w-100 md:w-64 rounded-xl bg-white shadow-lg overflow-hidden">
            <div className="bg-brown-500 text-[#000] p-6">
                <span className="text-sm font-semibold">{batch}</span>
            </div>
            <div className="p-4">
                <h2 className="text-gray-700 mb-2 text-start font-bold">Keuntungan</h2>
                <p className="text-green-500 text-2xl font-bold mb-2 text-center">{profit}</p>
            </div>
            <div className="bg-yellow-400 p-4">
                <span className="text-gray-700 block text-start font-bold">Persentase Bagi Hasil</span>
                <span className="text-black text-lg font-bold">{percentage}</span>
            </div>
        </div>
    );
  };

export default CardBagiHasil;