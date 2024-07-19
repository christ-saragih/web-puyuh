import '../../assets/style/index.css';
import Logo from "../../assets/images/logo.png";
import GuestLayout from '../../layouts/GuestLayout';

const Masuk = () => {
  return (
    <GuestLayout className="lg:-mb-2">
      <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen w-full">
        {/* Background */}
        <div className="w-full lg:w-1/2 bg-cover bg-center min-h-[300px] lg:min-h-screen lg:-ml-40" style={{ backgroundImage: `url('/src/assets/images/farm-bg-masuk.jpg')` }}>
        </div>
        {/* Form */}
        <div className="w-full lg:w-1/2 p-8">
          <div className="flex items-center justify-center mb-8">
            <img src={Logo} alt="Logo" className="w-20 h-20 mr-4"/>
            <h1 className="text-2xl font-bold text-gray-800">Sukaharja Smart Quail Farm</h1>
          </div>
          <div className="font-quicksand font-bold text-[1.5rem] mb-2">
            <h2>Selamat Datang</h2>
          </div>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Masukkan Email"/>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Masukkan Password"/>
              <a href="/lupa-password" className="text-sm text-right block text-orange-600 mt-1">Lupa Password?</a>
            </div>
            <div className="mb-6">
              <button className="bg-[#4B241A] hover:bg-[#381f19] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="button">
                Masuk
              </button>
            </div>
            <div className="text-center">
              <span className="text-gray-700">Belum Punya Akun? </span>
              <a href="/daftar" className="text-orange-600 font-bold">Daftar</a>
            </div>
          </form>
        </div>
      </div>
    </GuestLayout>
  );
}

export default Masuk;