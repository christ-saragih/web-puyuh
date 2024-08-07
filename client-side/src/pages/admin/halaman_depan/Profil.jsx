import React, { useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout.jsx";
import axios from "axios";

const Profil = () => {
  const [formData, setFormData] = useState({
    judul: "",
    image_background: null,
    deskripsi: "",
  });

  const [sejarahData, setSejarahData] = useState({
    judul: "",
    deskripsi: "",
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setFormData({ ...formData, [name]: files[0] });
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleChangeSejarah = (e) => {
    const { name, value } = e.target;
    setSejarahData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    const form = new FormData();
    form.append("judul", formData.judul);
    form.append("image_background", formData.image_background);
    form.append("deskripsi", formData.deskripsi);

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/tentang-kami",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Tentang Kami data:", data);
    } catch (err) {
      console.error("Error Tentang Kami:", err.response ? err.response.data : err.message);
    }
  };

  const handleSubmitSejarah = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/sejarah",
        sejarahData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Sejarah data:", data);
    } catch (err) {
      console.error("Error Sejarah:", err.response ? err.response.data : err.message);
    }
  };

  return (
    <AdminLayout title={"Halaman Depan / Profil"}>
      <div className="flex flex-col">
        <div className="bg-[#F5F5F7] w-full rounded-2xl shadow-md py-4 px-6">
          <div className="flex flex-row justify-between mb-5">
            <h1 className="font-bold text-[#572618] text-xl">Tentang Kami</h1>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-[#572618] text-white font-bold rounded-2xl hover:bg-brown-700 transition"
            >
              Simpan
            </button>
          </div>
          <div className="mb-4">
            <label
              htmlFor="input-judul"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Judul
            </label>
            <input
              type="text"
              id="input-judul"
              onChange={handleChange}
              name="judul"
              className="bg-white text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900 drop-shadow-lg"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="dropzone-file"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Gambar Latar Belakang
            </label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 dark:border-gray-600 dark:hover:border-gray-500"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Pratinjau"
                      className="max-h-40 mb-2"
                    />
                  ) : (
                    <>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">
                          Klik untuk mengunggah
                        </span>{" "}
                        atau seret dan jatuhkan
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG atau GIF (MAKS. 800x400px)
                      </p>
                    </>
                  )}
                </div>
                <input
                  id="dropzone-file"
                  onChange={handleChange}
                  type="file"
                  name="image_background"
                  className="hidden"
                />
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="deskripsi-input"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Deskripsi
            </label>
            <textarea
              type="text"
              id="deskripsi-input"
              name="deskripsi"
              onChange={handleChange}
              className="bg-white text-gray-900 text-sm rounded-lg w-full h-48 p-2.5 border-none focus:ring-orange-900 drop-shadow-lg"
            />
          </div>
        </div>

        {/* sejarah */}
        <div className="bg-[#F5F5F7] w-full rounded-2xl shadow-md py-4 px-6 mt-8">
          <div className="w-full flex justify-between mb-5">
            <h3 className="font-bold text-[#572618] text-xl">Sejarah</h3>
            <button
              onClick={handleSubmitSejarah}
              className="px-6 py-2 bg-[#572618] text-white font-bold rounded-2xl hover:bg-brown-700 transition"
            >
              Simpan
            </button>
          </div>

          <div>
            <label htmlFor="judul-sejarah" className="block mb-2 text-sm font-medium text-gray-900">
              Judul
            </label>
            <input
              type="text"
              name="judul"
              id="judul-sejarah"
              onChange={handleChangeSejarah}
              className="bg-white text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900 drop-shadow-lg"
            />

            <label htmlFor="deskripsi-sejarah" className="block mb-2 text-sm font-medium text-gray-900">
              Deskripsi
            </label>
            <textarea
              id="deskripsi-sejarah"
              name="deskripsi"
              required
              rows={4}
              onChange={handleChangeSejarah}
              className="bg-white text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900 drop-shadow-lg"
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Profil;
