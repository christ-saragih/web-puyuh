import BatchList from "../../components/guest/BatchList";
import Footer from "../../components/guest/Footer";
import Navbar from "../../components/guest/Navbar";
import GuestLayout from "../../layouts/GuestLayout";

const Investasi = () => {
  return (
    <>
      <Navbar />
      <GuestLayout className="mt-28 lg:mt-32">
        <h2 className="font-bold text-4xl mb-6">
          Ayo berinvestasi sekarang di CV Slamet!
        </h2>

        <div className="flex justify-between items-center mb-6">
          <form className="max-w-sm grow">
            <label
              htmlFor="search-investment"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="search-investment"
                className="block w-full px-4 py-2 ps-10 text-sm text-gray-900 bg-gray-50 border-gray-300 border-2 rounded-2xl focus:ring-[#B87817] focus:border-[#B87817] focus:outline-none"
                placeholder="Masukkan pencarian.."
                required
              />
              {/* <button
              type="submit"
              className="text-white absolute end-2.5  bottom-2.5 bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2"
            >
              Cari
            </button> */}
            </div>
          </form>

          <div className="flex gap-3">
            <button
              type="button"
              className="text-white bg-[#B87817] font-medium rounded-2xl text-sm w-24 py-2 hover:bg-[#B87817] hover:text-[#]"
            >
              Semua
            </button>
            <button
              type="button"
              className="text-[#B87817] border-2 border-[#B87817] font-medium rounded-2xl text-sm w-24 py-2 hover:bg-[#B87817] hover:text-white hover:font-semibold ease-in-out duration-300"
            >
              Terbaru
            </button>
            <button
              type="button"
              className="text-[#B87817] border-2 border-[#B87817] font-medium rounded-2xl text-sm w-24 py-2 hover:bg-[#B87817] hover:text-white hover:font-semibold ease-in-out duration-300"
            >
              Terlama
            </button>
          </div>
        </div>

        <BatchList />
      </GuestLayout>

      <Footer />
    </>
  );
};

export default Investasi;
