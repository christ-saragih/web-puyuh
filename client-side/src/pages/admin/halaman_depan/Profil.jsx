import React, { useState, useEffect, useCallback } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import axios from "axios";
import { getAbouts, getAboutSejarahs, getFounder } from "../../../services/about.service";

import { getFounders, addFounder, updateFounder, deleteFounder } from "../../../services/founder.service";
import Label from "../../../components/common/Label";
import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";
import { apiAdmin } from "../../../hooks/useAxiosConfig";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

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

  const [founders, setFounders] = useState([]);
  const [formFounder, setFormFounder] = useState({
    nama: "",
    jabatan: "",
    deskripsi: "",
    gambar: null,
  })
  const [showFormFounder, setShowFormFounder] = useState(false);
  const [selectedFounder, setSelectedFounder] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  
  const [founderData, setFounderData] = useState([]);
  const [editMode, setEditMode] = useState({
    tentangKami: false,
    sejarah: false,
    founder: false,
  });

  const [currentFounderIndex, setCurrentFounderIndex] = useState(null);
  const [actionType, setActionType] = useState("create");
  
  const [imagePreview, setImagePreview] = useState(null);
  const [imagePreviewFounder, setImagePreviewFounder] = useState({});
  const [imagePreviewForm, setImagePreviewForm] = useState(null);


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

  useEffect(() => {
    // Mengambil data founder dan URL gambar
    getFounders(async (data) => {
      setFounders(data);
  
      // Ambil preview gambar untuk setiap founder
      const previews = {};
      for (const founder of data) {
        if (founder.gambar) {
          try {
            const imageUrl = `http://localhost:3000/api/founder/image/${founder.gambar}`;
            previews[founder.id] = imageUrl;
          } catch (error) {
            console.error(`Error fetching image for founder with id ${founder.id}:`, error);
          }
        }
      }
      setImagePreviewFounder(previews);
    });
  }, []);

  const handleToggleFormFounder = () => {
    setShowFormFounder(!showFormFounder);
  }

  const handleFounderInputChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'gambar' && files.length > 0) {
      const file = files[0];
      setImagePreviewForm(URL.createObjectURL(file)); // Set preview URL
      setFormFounder({ ...formFounder, [name]: file });
    } else {
      setFormFounder({ ...formFounder, [name]: value });
    }
  };
  

  const handleAddFounder = () => {
    const form = new FormData();
    form.append("nama", formFounder.nama);
    form.append("jabatan", formFounder.jabatan);
    form.append("deskripsi", formFounder.deskripsi);
    form.append("gambar", formFounder.gambar);
    

    addFounder(form, (response) => {
      setFounders([response, ...founders]);
    });
  };

  const handleEditFounder = (founder) => {
    setSelectedFounder(founder.id);
    setIsEditing(true);
    setFormFounder({
      nama: founder.nama,
      jabatan: founder.jabatan,
      deskripsi: founder.deskripsi,
      gambar: founder.gambar
    });
  };

  // Fungsi untuk menangani update founder
  const handleUpdateFounders = (id) => {
    const form = new FormData();
    form.append("nama", formFounder.nama);
    form.append("jabatan", formFounder.jabatan);
    form.append("deskripsi", formFounder.deskripsi);
    if (formFounder.gambar instanceof File) {
      form.append("gambar", formFounder.gambar);
    }

    // Update founder API
    updateFounder(id, form, (updateData) => {
      setFounders((prevFounders) =>
        prevFounders.map((item) =>
          item.id === updateData.id ? updateData : item
        )
      );
    });

    // Reset state setelah penyimpanan
    setIsEditing(false);
    setSelectedFounder(null);
  };

 
  const handleChange = (name, index = null, editor = null) => {
    // Handling ReactQuill input
    if (editor) {
      const value = editor.getHTML();
      
      if (["deskripsi_tentang_kami", "deskripsi_sejarah"].includes(name)) {
        if (name === "deskripsi_tentang_kami") {
          setFormData(prevData => ({ ...prevData, [name]: value }));
        } else {
          setSejarahData(prevData => ({ ...prevData, [name]: value }));
        }
      } else if (name === "deskripsi_founder" && index !== null) {
        const updatedFounderData = [...founderData];
        updatedFounderData[index] = {
          ...updatedFounderData[index],
          [name]: value,
        };
        setFounderData(updatedFounderData);
      }
      return;
    }
  
    // Handling standard HTML input
    const { value, files } = name.target;
    const inputName = name.target.name;
  
    if (files && files[0]) {
      const file = files[0];
      if (inputName === "image_background") {
        setFormData(prevData => ({ ...prevData, [inputName]: file }));
        handleImagePreview(file, setImagePreview);
      } else if (inputName === "gambar" && index !== null) {
        const updatedFounderData = [...founderData];
        updatedFounderData[index] = {
          ...updatedFounderData[index],
          gambar: file,
          gambarPreview: URL.createObjectURL(file),
        };
        setFounderData(updatedFounderData);
      }
    } else {
      if (["judul", "deskripsi_tentang_kami"].includes(inputName)) {
        setFormData(prevData => ({ ...prevData, [inputName]: value }));
      } else if (["judul_sejarah", "deskripsi_sejarah"].includes(inputName)) {
        setSejarahData(prevData => ({ ...prevData, [inputName]: value }));
      } else if (inputName === "nama" || inputName === "jabatan" || inputName === "deskripsi_founder") {
        if (index === null) {
          setFounderData(prevData => [
            ...prevData,
            {
              nama: inputName === "nama" ? value : "",
              jabatan: inputName === "jabatan" ? value : "",
              deskripsi_founder: inputName === "deskripsi_founder" ? value : "",
              gambar: null,
              gambarPreview: null,
            },
          ]);
        } else {
          const updatedFounderData = [...founderData];
          updatedFounderData[index] = {
            ...updatedFounderData[index],
            [inputName]: value,
          };
          setFounderData(updatedFounderData);
        }
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

  const handleSubmitUpdate = async (url, data, headers = {}) => {
    try {
      const response = await axios.put(url, data, { headers }); // Menggunakan PUT untuk update data
      console.log("Data updated:", response.data);
    } catch (error) {
      console.error("Error updating data:", error.response ? error.response.data : error.message);
    }
  };
  

  const handleCreateFounder = async () => {
    const newFounderIndex = founderData.length - 1;
    const newFounder = founderData[newFounderIndex];
    const form = new FormData();
    form.append("nama", newFounder.nama);
    form.append("jabatan", newFounder.jabatan);
    form.append("deskripsi", newFounder.deskripsi_founder);
    if (newFounder.gambar) form.append("gambar", newFounder.gambar);
  
    await handleSubmit("http://localhost:3000/api/founder", form, {
      "Content-Type": "multipart/form-data",
    });
  
    // Clear and refresh
    setFounderData((prevData) => [
      ...prevData.slice(0, -1), // Remove the newly added founder data
      newFounder,
    ]);
    setEditMode((prevMode) => ({ ...prevMode, founder: false }));
  };
  

  const handleUpdateFounder = async (index) => {
    const form = new FormData();
    const founder = founderData[index];
    form.append("nama", founder.nama);
    form.append("jabatan", founder.jabatan);
    form.append("deskripsi", founder.deskripsi_founder);
    if (founder.gambar) form.append("gambar", founder.gambar);
  
    try {
      await handleSubmitUpdate(`http://localhost:3000/api/founder/${founder.id}`, form, {
        "Content-Type": "multipart/form-data",
      });
  
      // Update state to reflect the changes
      setFounderData((prevData) => {
        const newData = [...prevData];
        newData[index] = founder;
        return newData;
      });
      setEditMode((prevMode) => ({ ...prevMode, founder: false }));
    } catch (error) {
      // Handle any error that occurred during update
      console.error("Failed to update founder:", error);
    }
  };
  

  const handleDeleteFounder = async (id) => {
    try {
      await deleteFounder(id); // Tunggu hingga operasi penghapusan selesai
  
      // Langsung memperbarui state founders
      setFounders((prevData) => {
        const updatedData = prevData.filter((founder) => founder.id !== id);
        console.log("Updated Founder Data:", updatedData); // Debugging log
        return updatedData;
      });
      
    } catch (error) {
      console.error("Error deleting founder:", error); // Menangani error jika ada
    }
  };
  
  


  const handleEdit = (section, index = null) => {
    if (section === "founder") {
      if (index === null) {
        // Menambahkan founder baru
        setFounderData((prevData) => [
          ...prevData,
          { nama: "", jabatan: "", deskripsi_founder: "", gambar: null, gambarPreview: null },
        ]);
        setCurrentFounderIndex(founderData.length); // Menetapkan index founder baru
      } else {
        setCurrentFounderIndex(index); // Mengatur index jika mengedit founder yang ada
      }
      setEditMode((prevMode) => ({ ...prevMode, [section]: true }));
      setActionType(index === null ? "create" : "update");
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

  const handleSaveTentangKami = async () => {
    const form = new FormData();
    form.append("judul", formData.judul);
    form.append("deskripsi", formData.deskripsi_tentang_kami);
    if (formData.image_background) form.append("image_background", formData.image_background);

    try {
        // Menggunakan instance apiAdmin untuk mengirimkan request
        await apiAdmin.post("/tentang-kami", form, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        // Reset edit mode after save
        setEditMode((prevMode) => ({ ...prevMode, tentangKami: false }));
    } catch (error) {
        console.error("Error saving Tentang Kami:", error);
    }
};
  
const handleSaveSejarah = async () => {
  const form = new FormData();
  console.log("Data sebelum dikirim:", sejarahData); 
  form.append("judul", sejarahData.judul_sejarah);
  form.append("deskripsi", sejarahData.deskripsi_sejarah);

  try {
      // Menggunakan instance apiAdmin untuk mengirimkan request
      await apiAdmin.post("/sejarah", form, {
          headers: {
              "Content-Type": "application/json",
          },
      });

      // Reset edit mode after save
      setEditMode((prevMode) => ({ ...prevMode, sejarah: false }));
  } catch (error) {
      console.error("Error saving Sejarah:", error);
  }
};
  

  return (
    <AdminLayout title={"Halaman Depan / Profil"}>
      <div className="flex flex-col -mt-10 md:ml-0 ml-7 p-4 md:p-6 lg:p-8">
        {/* Tentang Kami */}
        <Section
          title="Profil"
          formData={formData}
          editMode={editMode.tentangKami}
          handleEdit={() => handleEdit("tentangKami")}
          handleSave={() => handleSaveTentangKami()}  // Panggil handleSaveTentangKami
          handleChange={handleChange}
          imagePreview={imagePreview}
          imageFieldName="image_background"
          textAreaFieldName="deskripsi_tentang_kami"
        />
  
        <Section
          title="Sejarah"
          formData={sejarahData}
          editMode={editMode.sejarah}
          handleEdit={() => handleEdit("sejarah")}
          handleSave={() => handleSaveSejarah()}  // Panggil handleSaveSejarah
          handleChange={handleChange}
          textAreaFieldName="deskripsi_sejarah"
        />
  
        {/* Founder */}
        <div className="bg-[#F5F5F7] w-full rounded-2xl shadow-md py-4 px-6 mt-8">
          <div className="flex flex-col md:flex-row md:justify-between mb-5">
            <h1 className="font-bold text-[#572618] text-xl mb-2 md:mb-0">Founder</h1>
            <button
              onClick={handleToggleFormFounder}
              className="px-6 py-2 bg-[#572618] text-white font-bold rounded-2xl hover:bg-brown-700 transition"
            >
              {showFormFounder ? "Tutup Form" : "Tambah Founder"}
            </button>
          </div>
  
          {showFormFounder && (
            <div className="mb-6">
              <Label htmlFor={"nama"} value={"Nama Founder"} />
              <Input
                type={"text"}
                name={"nama"}
                placeholder={"Masukkan nama founder.."}
                variant={"primary-outline"}
                handleChange={handleFounderInputChange}
              />
  
              <Label htmlFor={"jabatan"} value={"Jabatan Founder"} />
              <Input
                type={"text"}
                name={"jabatan"}
                placeholder={"Masukkan jabatan founder.."}
                variant={"primary-outline"}
                handleChange={handleFounderInputChange}
              />
  
              <Label htmlFor={"deskripsi"} value={"Deskripsi Founder"} />
              <TextAreaField
                type={"text"}
                name={"deskripsi"}
                placeholder={"Masukkan deskripsi.."}
                variant={"primary-outline"}
                onChange={handleFounderInputChange}
              />
  
              <Label htmlFor={"gambar"} value={"Gambar Founder"} />
              <Input
                type={"file"}
                name={"gambar"}
                placeholder={"Masukkan gambar founder.."}
                variant={"primary-outline"}
                handleChange={handleFounderInputChange}
              />
  
              {/* Display image preview */}
              {imagePreviewForm && (
                <div className="mt-3 mb-5">
                  <p>Preview Gambar:</p>
                  <img
                    src={imagePreviewForm}
                    alt="Preview Founder"
                    className="h-32 w-32 object-cover rounded-lg"
                  />
                </div>
              )}
  
              <Button value={"Simpan"} onClick={handleAddFounder} />
            </div>
          )}
  
          <div className="mt-10 mb-8">
            {founders.map((founder) => (
              <div key={founder.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
                <Label htmlFor={"nama"} value={"Nama Founder"} />
                <Input
                  type={"text"}
                  name={"nama"}
                  variant={selectedFounder === founder.id ? "primary-outline" : "disabled"}
                  value={selectedFounder === founder.id ? formFounder.nama : founder.nama}
                  isDisabled={selectedFounder !== founder.id}
                  handleChange={(e) =>
                    setFormFounder({ ...formFounder, nama: e.target.value })
                  }
                />
  
                <Label htmlFor={"jabatan"} value={"Jabatan Founder"} />
                <Input
                  type={"text"}
                  name={"jabatan"}
                  variant={selectedFounder === founder.id ? "primary-outline" : "disabled"}
                  value={selectedFounder === founder.id ? formFounder.jabatan : founder.jabatan}
                  isDisabled={selectedFounder !== founder.id}
                  handleChange={(e) =>
                    setFormFounder({ ...formFounder, jabatan: e.target.value })
                  }
                />
  
                <Label htmlFor={"deskripsi"} value={"Deskripsi Founder"} />
                <TextAreaField
                  type={"text"}
                  name={"deskripsi"}
                  variant={selectedFounder === founder.id ? "primary-outline" : "disabled"}
                  value={selectedFounder === founder.id ? formFounder.deskripsi : founder.deskripsi}
                  isDisabled={selectedFounder !== founder.id}
                  onChange={(e) =>
                    setFormFounder({ ...formFounder, deskripsi: e.target.value })
                  }
                />
  
                <Label htmlFor={"gambar"} value={"Gambar Founder"} />
                <Input
                  type={"file"}
                  name={"gambar"}
                  variant={selectedFounder === founder.id ? "primary-outline" : "disabled"}
                  isDisabled={selectedFounder !== founder.id}
                  handleChange={(e) => {
                    const file = e.target.files[0];
                    setFormFounder({ ...formFounder, gambar: file });
                    setImagePreview(URL.createObjectURL(file)); // Set image preview URL
                  }}
                />
  
                {/* Display image preview */}
                {imagePreviewFounder[founder.id] && (
                  <div className="mt-3 mb-5">
                    <p>Preview Gambar:</p>
                    <img
                      src={imagePreviewFounder[founder.id]}
                      alt="Preview Founder"
                      className="h-32 w-32 object-cover rounded-lg"
                    />
                  </div>
                )}
  
                <Button className={"mr-5"} value={"Hapus"} variant={"delete"} onClick={() => handleDeleteFounder(founder.id)} />
  
                {selectedFounder === founder.id && isEditing ? (
                  <Button value={"Simpan"} onClick={() => handleUpdateFounders(founder.id)} />
                ) : (
                  <Button variant={"update"} value={"Ubah"} onClick={() => handleEditFounder(founder)} />
                )}
              </div>
            ))}
          </div>
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
}) => {
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'align': [] }],
      ['blockquote', 'code-block'],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'color',
    'background',
    'script',
    'list',
    'bullet',
    'indent',
    'direction',
    'align',
    'blockquote',
    'code-block',
    'link',
    'image',
    'video'
  ];

  return (
    <div className="bg-[#F5F5F7] w-full rounded-2xl shadow-md py-4 px-6 mt-8">
      <div className="flex justify-between mb-5">
        <h1 className="font-bold text-[#572618] text-xl">{title}</h1>
        <button
          onClick={editMode ? handleSave : handleEdit}
          className={`px-6 py-2 font-bold rounded-2xl transition ${
            !editMode
              ? "text-white border-2 border-yellow-400 bg-yellow-400 hover:font-semibold hover:text-yellow-400 hover:bg-white hover:border-yellow-400 ease-in-out duration-300"
              : "bg-[#572618] text-white hover:bg-brown-700"
          }`}
        >
          {editMode ? "Simpan" : "Ubah"}
        </button>
      </div>

      {["Profil", "Sejarah"].includes(title) && (
        <InputField
          label={`Judul ${title}`}
          name={title === "Profil" ? "judul" : "judul_sejarah"}
          value={title === "Profil" ? formData.judul : formData.judul_sejarah}
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

      <div className="mb-4">
        <label htmlFor={textAreaFieldName} className="block text-[#572618] font-semibold mb-2">
          {`Deskripsi ${title}`}
        </label>
        <div className={`
          border rounded-md overflow-hidden transition-colors duration-300
          ${editMode 
            ? 'border-yellow-400 bg-white' 
            : 'border-gray-300 bg-gray-100'
          }
        `}>
          <ReactQuill
            id={textAreaFieldName}
            value={formData[textAreaFieldName] || ""}
            onChange={(content, delta, source, editor) => 
              handleChange(textAreaFieldName, null, editor)
            }
            modules={modules}
            formats={formats}
            readOnly={!editMode}
            className={`
              ${!editMode && 'quill-readonly'}
            `}
          />
        </div>
      </div>
    </div>
  );
};

export default Profil;
