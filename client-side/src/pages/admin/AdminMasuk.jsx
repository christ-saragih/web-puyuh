import { useState, useContext } from "react";
import "../../assets/style/index.css";
import Logo from "../../assets/images/logo.svg";
import GuestLayout from "../../layouts/GuestLayout";
import { useNavigate } from "react-router-dom";
import { AuthAdminContext } from "../../contexts/AuthAdminProvider";

const AdminMasuk = () => {
    const { login } = useContext(AuthAdminContext);
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await login(usernameOrEmail, password);

            navigate("/admin");
        } catch (error) {
            setError("Username/Email atau password salah");
        }
    };

    return (
        <GuestLayout>
            {/* background */}
            <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-[#4B241A]"></div>
            {/* form */}
            <div className="relative flex flex-col items-center justify-center min-h-screen w-full z-10">
                <div className="w-full lg:w-1/2 p-8 bg-white rounded-lg">
                    <div className="flex items-center justify-center mb-8">
                        <img src={Logo} alt="Logo" className="w-20 h-20 mr-4" />
                        <h1 className="text-2xl font-bold text-gray-800">
                            Sukaharja Smart Quail Farm
                        </h1>
                    </div>
                    <div className="font-quicksand font-bold text-[1.5rem] mb-2">
                        <h2>Selamat Datang, Admin</h2>
                    </div>
                    {/* Login Failed */}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="usernameOrEmail"
                            >
                                Username/Email
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="usernameOrEmail"
                                name="usernameOrEmail"
                                type="text"
                                placeholder="Masukkan username/email.."
                                value={usernameOrEmail}
                                onChange={(e) =>
                                    setUsernameOrEmail(e.target.value)
                                }
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Masukkan password.."
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <a
                                href="/admin/lupa-password"
                                className="text-sm text-right block text-orange-600 mt-1"
                            >
                                Lupa Password?
                            </a>
                        </div>
                        <div className="mb-6">
                            <button
                                className="bg-[#4B241A] hover:bg-[#381f19] text-white font-bold py-2 px-4 mb-2 rounded focus:outline-none focus:shadow-outline w-full"
                                type="submit"
                            >
                                Masuk
                            </button>
                            {/* {loginFailed && (
                                <p className="text-red-600">{loginFailed}</p>
                            )} */}
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
};
export default AdminMasuk;
