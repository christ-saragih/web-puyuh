import React, { useState, useEffect } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import axios from "axios";
import { getAbouts, getAboutSejarahs, getFounder } from "../../../services/about.service";

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

  const [founderData, setFounderData] = useState([]);
  
  const [editMode, setEditMode] = useState({
    tentangKami: false,
    sejarah: false,
    founder: false,
  });

  const [currentFounderIndex, setCurrentFounderIndex] = useState(null);
  const [actionType, setActionType] = useState("create");

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    getAbouts((data) => {
      setFormData({
        judul: data.judul || "",
        image_background: data.image_background || "",
        deskripsi_tentang_kami: data.deskripsi || "",
      });
      setImagePreview(
        `http://localhost:3000/api/tentang-kami/image/${data.image_background}`
      );
    });

    getAboutSejarahs((data) => {
      setSejarahData({
        judul_sejarah: data.judul || "",
        deskripsi_sejarah: data.deskripsi || "",
      });
    });

    getFounder((data) => {
      const foundersData = data.data.map((founder) => ({
        nama: founder.nama || "",
        jabatan: founder.jabatan || "",
        deskripsi_founder: founder.deskripsi || "",
        gambar: founder.gambar || null,
        gambarPreview: `http://localhost:3000/api/founder/image/${founder.gambar}`,
        id: founder.id || null,
      }));
      setFounderData(foundersData);
    });
  }, []);

  const handleChange = (e, index = null) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      const file = files[0];
      if (name === "image_background") {
        setFormData({ ...formData, [name]: file });
        handleImagePreview(file, setImagePreview);
      } else if (name === "gambar") {
        const updatedFounderData = [...founderData];
        updatedFounderData[index] = {
          ...updatedFounderData[index],
          gambar: file,
        };
        setFounderData(updatedFounderData);
      }
    } else {
      if (["judul", "deskripsi_tentang_kami"].includes(name)) {
        setFormData({ ...formData, [name]: value });
      } else if (["judul_sejarah", "deskripsi_sejarah"].includes(name)) {
        setSejarahData({ ...sejarahData, [name]: value });
      } else {
        const updatedFounderData = [...founderData];
        updatedFounderData[index] = {
          ...updatedFounderData[index],
          [name]: value,
        };
        setFounderData(updatedFounderData);
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

  const handleCreateFounder = async () => {
    const form = new FormData();
    const newFounder = founderData[founderData.length - 1];
    form.append("nama", newFounder.nama);
    form.append("jabatan", newFounder.jabatan);
    form.append("deskripsi", newFounder.deskripsi_founder);
    if (newFounder.gambar) form.append("gambar", newFounder.gambar);

    await handleSubmit("http://localhost:3000/api/founder", form, {
      "Content-Type": "multipart/form-data",
    });

    // Clear and refresh
    setFounderData((prevData) => [...prevData, newFounder]);
    setEditMode((prevMode) => ({ ...prevMode, founder: false }));
  };

  const handleUpdateFounder = async (index) => {
    const form = new FormData();
    const founder = founderData[index];
    form.append("nama", founder.nama);
    form.append("jabatan", founder.jabatan);
    form.append("deskripsi", founder.deskripsi_founder);
    if (founder.gambar) form.append("gambar", founder.gambar);

    await handleSubmit(`http://localhost:3000/api/founder/${founder.id}`, form, {
      "Content-Type": "multipart/form-data",
    });

    // Update state to reflect the changes
    setFounderData((prevData) => {
      const newData = [...prevData];
      newData[index] = founder;
      return newData;
    });
    setEditMode((prevMode) => ({ ...prevMode, founder: false }));
  };

  const handleDeleteFounder = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/founder/${id}`);
      setFounderData((prevData) => prevData.filter(founder => founder.id !== id));
    } catch (error) {
      console.error("Error deleting founder:", error.response ? error.response.data : error.message);
    }
  };

  const handleEdit = (section, index = null) => {
    if (section === "founder" && index !== null) {
      setEditMode((prevMode) => ({ ...prevMode, [section]: true }));
      setCurrentFounderIndex(index);
      setActionType("update");
    } else {
      setEditMode((prevMode) => ({ ...prevMode, [section]: true }));
      setActionType("create");
    }
  };

  const handleSave = async () => {
    if (actionType === "create") {
      await handleCreateFounder();
    } else if (actionType === "update") {
      await handleUpdateFounder(currentFounderIndex);
    }
  };

  return (
    <AdminLayout title={"Halaman Depan / Profil"}>
      <div className="flex flex-col">
        {/* Tentang Kami */}
        <Section
          title="Tentang Kami"
          formData={formData}
          editMode={editMode.tentangKami}
          handleEdit={() => handleEdit("tentangKami")}
          handleSave={() => handleSave()}
          handleChange={handleChange}
          imagePreview={imagePreview}
          imageFieldName="image_background"
          textAreaFieldName="deskripsi_tentang_kami"
        />

        {/* Sejarah */}
        <Section
          title="Sejarah"
          formData={sejarahData}
          editMode={editMode.sejarah}
          handleEdit={() => handleEdit("sejarah")}
          handleSave={() => handleSave()}
          handleChange={handleChange}
          textAreaFieldName="deskripsi_sejarah"
        />

        {/* Founder */}
        <div className="bg-[#F5F5F7] w-full rounded-2xl shadow-md py-4 px-6 mt-8">
          <div className="flex justify-between mb-5">
            <h1 className="font-bold text-[#572618] text-xl">Founder</h1>
            <button
              onClick={() => handleEdit("founder")}
              className="px-6 py-2 bg-[#572618] text-white font-bold rounded-2xl hover:bg-brown-700 transition"
            >
              Tambah Founder
            </button>
          </div>

          {editMode.founder && actionType === "create" && (
            <div className="mb-8">
              <InputField
                label="Nama Founder"
                name="nama"
                value={founderData[founderData.length - 1]?.nama || ""}
                onChange={(e) => handleChange(e)}
                isDisabled={!editMode.founder}
              />

              <InputField
                label="Jabatan Founder"
                name="jabatan"
                value={founderData[founderData.length - 1]?.jabatan || ""}
                onChange={(e) => handleChange(e)}
                isDisabled={!editMode.founder}
              />

              <ImageUpload
                label="Gambar Founder"
                name="gambar"
                onChange={(e) => handleChange(e)}
              />

              <TextAreaField
                label="Deskripsi Founder"
                name="deskripsi_founder"
                value={founderData[founderData.length - 1]?.deskripsi_founder || ""}
                onChange={(e) => handleChange(e)}
                isDisabled={!editMode.founder}
              />

              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
              >
                Tambah Founder
              </button>
            </div>
          )}

          {founderData.map((founder, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4 mb-4">
              {editMode.founder && currentFounderIndex === index && actionType === "update" ? (
                <>
                  <InputField
                    label="Nama Founder"
                    name="nama"
                    value={founder.nama}
                    onChange={(e) => handleChange(e, index)}
                    isDisabled={!editMode.founder}
                  />

                  <InputField
                    label="Jabatan Founder"
                    name="jabatan"
                    value={founder.jabatan}
                    onChange={(e) => handleChange(e, index)}
                    isDisabled={!editMode.founder}
                  />

                  <ImageUpload
                    label="Gambar Founder"
                    name="gambar"
                    onChange={(e) => handleChange(e, index)}
                  />

                  <TextAreaField
                    label="Deskripsi Founder"
                    name="deskripsi_founder"
                    value={founder.deskripsi_founder}
                    onChange={(e) => handleChange(e, index)}
                    isDisabled={!editMode.founder}
                  />

                  <button
                    onClick={() => handleSave()}
                    className="px-4 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition mr-2"
                  >
                    Simpan
                  </button>

                  <button
                    onClick={() => handleDeleteFounder(founder.id)}
                    className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition"
                  >
                    Hapus
                  </button>
                </>
              ) : (
                <>
                  <p className="font-bold text-[#572618]">{founder.nama}</p>
                  <p>{founder.jabatan}</p>
                  <p>{founder.deskripsi_founder}</p>
                  {founder.gambar && (
                    <div className="w-24 h-24 rounded-md overflow-hidden mb-4">
                      <img
                        src={founder.gambarPreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <button
                    onClick={() => handleEdit("founder", index)}
                    className="px-4 py-2 bg-[#572618] text-white font-bold rounded-lg hover:bg-brown-700 transition"
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

const InputField = ({ label, name, value, onChange, isDisabled }) => (
  <div className="mb-4">
    <label className="block text-[#572618] font-semibold mb-2">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      disabled={isDisabled}
      className={`w-full px-4 py-2 rounded-md shadow-sm ${
        isDisabled
          ? "bg-gray-100 cursor-not-allowed"
          : "bg-white border border-gray-300"
      } focus:outline-none focus:border-brown-500 transition`}
    />
  </div>
);

const TextAreaField = ({ label, name, value, onChange, isDisabled }) => (
  <div className="mb-4">
    <label className="block text-[#572618] font-semibold mb-2">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      disabled={isDisabled}
      rows="4"
      className={`w-full px-4 py-2 rounded-md shadow-sm ${
        isDisabled
          ? "bg-gray-100 cursor-not-allowed"
          : "bg-white border border-gray-300"
      } focus:outline-none focus:border-brown-500 transition`}
    />
  </div>
);

const ImageUpload = ({ label, name, onChange }) => (
  <div className="mb-4">
    <label className="block text-[#572618] font-semibold mb-2">{label}</label>
    <input
      type="file"
      name={name}
      onChange={onChange}
      accept="image/*"
      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
    />
  </div>
);

const Section = ({
  title,
  formData,
  editMode,
  handleEdit,
  handleSave,
  handleChange,
  imagePreview,
  imageFieldName,
  textAreaFieldName,
  includeFields = [],
}) => (
  <div className="bg-[#F5F5F7] w-full rounded-2xl shadow-md py-4 px-6 mt-8">
    <div className="flex justify-between mb-5">
      <h1 className="font-bold text-[#572618] text-xl">{title}</h1>
      <button
        onClick={editMode ? handleSave : handleEdit}
        className="px-6 py-2 bg-[#572618] text-white font-bold rounded-2xl hover:bg-brown-700 transition"
      >
        {editMode ? "Simpan" : "Ubah"}
      </button>
    </div>

    {["Tentang Kami", "Sejarah"].includes(title) && (
      <InputField
        label={`Judul ${title}`}
        name={title === "Tentang Kami" ? "judul" : "judul_sejarah"}
        value={title === "Tentang Kami" ? formData.judul : formData.judul_sejarah}
        onChange={handleChange}
        isDisabled={!editMode}
      />
    )}

    {includeFields.includes("nama") && (
      <InputField
        label="Nama Founder"
        name="nama"
        value={formData.nama || ""}
        onChange={handleChange}
        isDisabled={!editMode}
      />
    )}

    {includeFields.includes("jabatan") && (
      <InputField
        label="Jabatan Founder"
        name="jabatan"
        value={formData.jabatan || ""}
        onChange={handleChange}
        isDisabled={!editMode}
      />
    )}

    {imagePreview && (
      <div className="w-80 h-56 rounded-md overflow-hidden mb-4">
        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
      </div>
    )}

    {editMode && imageFieldName && (
      <ImageUpload
        label={`Gambar ${title}`}
        name={imageFieldName}
        onChange={handleChange}
      />
    )}

    <TextAreaField
      label="Deskripsi"
      name={textAreaFieldName}
      value={formData[textAreaFieldName] || ""}
      onChange={handleChange}
      isDisabled={!editMode}
    />
  </div>
);

export default Profil;
