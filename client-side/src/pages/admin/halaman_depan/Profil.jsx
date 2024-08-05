import React, { useState } from "react";
import Sidebar from "../../../components/common/Sidebar";
import AdminNavbar from "../../../components/admin/AdminNavbar";
import axios from "axios";

const Profil = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [formData, setFormData] = useState({
        judul: '',
        image_background: null,
        deskripsi: ''
    });
    const [imagePreview, setImagePreview] = useState(null); // State untuk pratinjau gambar

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files && files[0]) {
            setFormData({ ...formData, [name]: files[0] });

            // Membaca file dan mengatur URL pratinjau
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(files[0]);
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async () => {
        const form = new FormData();
        form.append("judul", formData.judul);
        form.append("image_background", formData.image_background);
        form.append("deskripsi", formData.deskripsi);

        try {
            const { data } = await axios.post('http://localhost:3000/api/tentang-kami', form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="bg-white w-dvw h-dvh overflow-y-auto py-5 pe-6">
            <Sidebar isHovered={isHovered} setIsHovered={setIsHovered} />
            <div className={`px-8 pb-5 transition-all duration-300 ease-in-out ${isHovered ? "md:ml-60" : "md:ml-28"}`}>
                <div className="flex flex-col px-5">
                    <AdminNavbar />
                    <div className="w-full rounded-xl bg-[#F5F5F7] mt-10 flex flex-col py-5">
                        <div className="flex flex-row justify-between px-10">
                            <h1 className="font-quicksand font-bold text-[#572618] text-xl">Tentang Kami</h1>
                            <button onClick={handleSubmit} className="px-6 py-2 bg-[#572618] text-white font-bold rounded-2xl hover:bg-brown-700 transition">
                                Simpan
                            </button>
                        </div>
                        <div className="px-10 py-5">
                            <label htmlFor="input-judul" className="block mb-2 text-sm font-medium text-gray-900">Judul :</label>
                            <input type="text" id="input-judul" onChange={handleChange} name="judul" className="bg-white text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900 drop-shadow-lg" />
                        </div>
                        <div className="px-10">
                            <label htmlFor="dropzone-file" className="block mb-2 text-sm font-medium text-gray-900">Gambar Latar Belakang :</label>
                            <div className="flex items-center justify-center w-full">
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 dark:border-gray-600 dark:hover:border-gray-500">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                        </svg>
                                        {imagePreview ? (
                                            <img src={imagePreview} alt="Pratinjau" className="max-h-40 mb-2" />
                                        ) : (
                                            <>
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Klik untuk mengunggah</span> atau seret dan jatuhkan</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG atau GIF (MAKS. 800x400px)</p>
                                            </>
                                        )}
                                    </div>
                                    <input id="dropzone-file" onChange={handleChange} type="file" name="image_background" className="hidden" />
                                </label>
                            </div>
                        </div>
                        <div className="px-10">
                            <label htmlFor="deskripsi-input" className="block mb-2 text-sm font-medium text-gray-900">Deskripsi :</label>
                            <textarea type="text" id="deskripsi-input" name="deskripsi" onChange={handleChange} className="bg-white text-gray-900 text-sm rounded-lg w-full h-48 p-2.5 border-none focus:ring-orange-900 drop-shadow-lg" />
                        </div>
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    );
};

export default Profil;
