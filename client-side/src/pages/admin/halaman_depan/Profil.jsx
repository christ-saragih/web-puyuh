import React, { useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import axios from "axios";

const Profil = () => {
  const [formData, setFormData] = useState({
    judul: "",
    image_background: null,
    deskripsi_tentang_kami: "",
  });

  const [sejarahData, setSejarahData] = useState({
    judul_sejarah: "",
    deskripsi_sejarah: "",
  });

  const [founderData, setFounderData] = useState({
    nama: "",
    jabatan: "",
    deskripsi_founder: "",
    gambar: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [founderImagePreview, setFounderImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      const file = files[0];
      if (name === "image_background") {
        setFormData({ ...formData, [name]: file });
        handleImagePreview(file, setImagePreview);
      } else if (name === "gambar") {
        setFounderData({ ...founderData, [name]: file });
        handleImagePreview(file, setFounderImagePreview);
      }
    } else {
      if (["judul", "deskripsi_tentang_kami"].includes(name)) {
        setFormData({ ...formData, [name]: value });
      } else if (["judul_sejarah", "deskripsi_sejarah"].includes(name)) {
        setSejarahData({ ...sejarahData, [name]: value });
      } else {
        setFounderData({ ...founderData, [name]: value });
      }
    }
  };

  const handleImagePreview = (file, setPreview) => {
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (url, data, headers = {}) => {
    try {
      const response = await axios.post(url, data, { headers });
      console.log("Data saved:", response.data);
    } catch (error) {
      console.error("Error saving data:", error.response ? error.response.data : error.message);
    }
  };

  const handleSubmitTentangKami = () => {
    const form = new FormData();
    form.append("judul", formData.judul);
    form.append("image_background", formData.image_background);
    form.append("deskripsi", formData.deskripsi_tentang_kami);

    handleSubmit("http://localhost:3000/api/tentang-kami", form, {
      "Content-Type": "multipart/form-data",
    });
  };

  const handleSubmitSejarah = () => {
    const form = new FormData();
    form.append("judul", sejarahData.judul_sejarah);
    form.append("deskripsi", sejarahData.deskripsi_sejarah);

    handleSubmit("http://localhost:3000/api/sejarah", form, {
      "Content-Type": "application/json",
    });
  };

  const handleSubmitFounder = () => {
    const form = new FormData();
    form.append("nama", founderData.nama);
    form.append("jabatan", founderData.jabatan);
    form.append("deskripsi", founderData.deskripsi_founder);
    if (founderData.gambar) form.append("gambar", founderData.gambar);

    handleSubmit("http://localhost:3000/api/founder", form, {
      "Content-Type": "multipart/form-data",
    });
  };

  return (
    <AdminLayout title={"Halaman Depan / Profil"}>
      <div className="flex flex-col">
        {/* Tentang Kami */}
        <div className="bg-[#F5F5F7] w-full rounded-2xl shadow-md py-4 px-6">
          <div className="flex justify-between mb-5">
            <h1 className="font-bold text-[#572618] text-xl">Tentang Kami</h1>
            <button
              onClick={handleSubmitTentangKami}
              className="px-6 py-2 bg-[#572618] text-white font-bold rounded-2xl hover:bg-brown-700 transition"
            >
              Simpan
            </button>
          </div>
          {/* Form Fields */}
          <InputField label="Judul" name="judul" onChange={handleChange} />
          <ImageUpload
            label="Gambar Latar Belakang"
            imagePreview={imagePreview}
            onChange={handleChange}
            name="image_background"
          />
          <TextAreaField label="Deskripsi" name="deskripsi_tentang_kami" onChange={handleChange} />
        </div>

        {/* Sejarah */}
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
          {/* Form Fields */}
          <InputField label="Judul" name="judul_sejarah" onChange={handleChange} />
          <TextAreaField label="Deskripsi" name="deskripsi_sejarah" onChange={handleChange} />
        </div>

        {/* Founder */}
        <div className="bg-[#F5F5F7] w-full rounded-2xl shadow-md py-4 px-6 mt-8">
          <div className="w-full flex justify-between mb-5">
            <h3 className="font-bold text-[#572618] text-xl">Pendiri</h3>
            <button
              onClick={handleSubmitFounder}
              className="px-6 py-2 bg-[#572618] text-white font-bold rounded-2xl hover:bg-brown-700 transition"
            >
              Simpan
            </button>
          </div>
          {/* Form Fields */}
          <ImageUpload
            label="Gambar Pendiri"
            imagePreview={founderImagePreview}
            onChange={handleChange}
            name="gambar"
          />
          <InputField label="Nama" name="nama" onChange={handleChange} />
          <InputField label="Jabatan" name="jabatan" onChange={handleChange} />
          <TextAreaField label="Deskripsi" name="deskripsi_founder" onChange={handleChange} />
        </div>
      </div>
    </AdminLayout>
  );
};

// Input Field Component
const InputField = ({ label, name, onChange }) => (
  <div className="mb-4">
    <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
    <input
      type="text"
      name={name}
      onChange={onChange}
      className="bg-white text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900 drop-shadow-lg"
    />
  </div>
);

// TextArea Component
const TextAreaField = ({ label, name, onChange }) => (
  <div className="mb-4">
    <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
    <textarea
      name={name}
      rows="4"
      onChange={onChange}
      className="bg-white text-gray-900 text-sm rounded-lg w-full p-2.5 border-none focus:ring-orange-900 drop-shadow-lg"
    />
  </div>
);

// Image Upload Component
const ImageUpload = ({ label, imagePreview, onChange, name }) => (
  <div className="mb-4">
    <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor={`dropzone-${name}`}
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-100"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" className="max-h-40 mb-2" />
          ) : (
            <>
              <svg
                aria-hidden="true"
                className="w-10 h-10 mb-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16l-4-4m0 0l4-4m-4 4h18M13 7h7v7"
                ></path>
              </svg>
              <p className="mb-2 text-sm text-gray-500">Klik untuk mengunggah gambar</p>
              <p className="text-xs text-gray-500">SVG, PNG, JPG (MAX. 800x400px)</p>
            </>
          )}
        </div>
        <input id={`dropzone-${name}`} type="file" name={name} className="hidden" onChange={onChange} />
      </label>
    </div>
  </div>
);

export default Profil;
