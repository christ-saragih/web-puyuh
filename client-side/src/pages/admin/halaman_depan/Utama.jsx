import Label from "../../../components/common/Label";
import Input from "../../../components/common/Input";
import InputError from "../../../components/common/InputError";
import Button from "../../../components/common/Button";
import AdminLayout from "../../../layouts/AdminLayout";
import {
  getDashboardFrontpage,
  saveDashboardFrontpage,
} from "../../../services/dashboard-frontpage.service";
import { useEffect, useState } from "react";


const Utama = () => {
  const [dashboardFrontpage, setDasboardFrontpage] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    judul: "",
    subJudul: "",
    gambar: null,
  });
  const [previewImage, setPreviewImage] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getDashboardFrontpage((data) => {
      setDasboardFrontpage(data);

      if (data) {
        setFormData({
          judul: data.judul || "",
          subJudul: data.subJudul || "",
          gambar: data.gambar || "",
        });
        // Set preview image dari data yang ada
        setPreviewImage(
          `http://localhost:3000/api/beranda/image/${data.gambar}`
        );
      }
    });
  }, []);

  // Input Validations: Start
  const validateForm = () => {
    let newErrors = {};
    if (!formData.judul.trim()) {
      newErrors.judul = "Judul wajib diisi";
    }
    if (!formData.subJudul.trim()) {
      newErrors.subJudul = "Sub judul wajib diisi";
    }
    if (!formData.gambar) {
      newErrors.gambar = "Gambar wajib diunggah";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getErrorMessage = (fieldName) => {
    const fieldNames = {
      judul: "Judul",
      subJudul: "Sub judul",
    };

    return `${fieldNames[fieldName] || fieldName} wajib diisi`;
  };

  const clearError = (fieldName) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[fieldName];
      return newErrors;
    });
  };
  // Input Validations: End

  // UPSERT: Start
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (!value.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: getErrorMessage(name),
      }));
    } else {
      clearError(name);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = [
        "image/svg+xml",
        "image/png",
        "image/jpeg",
        "image/jpg",
      ];
      if (validTypes.includes(file.type)) {
        setFormData({ ...formData, gambar: file });
        setPreviewImage(URL.createObjectURL(file));
        clearError("gambar");
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          gambar: "Gambar harus berupa SVG, PNG, JPG, atau JPEG",
        }));
        e.target.value = null;
      }
    }
  };

  const handleInputSave = () => {
    if (validateForm()) {
      const dataToSend = new FormData();
      dataToSend.append("judul", formData.judul);
      dataToSend.append("subJudul", formData.subJudul);
      if (formData.gambar) {
        dataToSend.append("gambar", formData.gambar);
      }

      saveDashboardFrontpage(dataToSend, (newData) => {
        setDasboardFrontpage([newData]);
        setEditMode(false);
        setPreviewImage(
          `http://localhost:3000/api/beranda/image/${newData.gambar}`
        );
      });
    }
  };

  const handleInputEdit = () => {
    setEditMode(true);
  };
  // UPSERT: End

  const isDataEmpty = !dashboardFrontpage;

  return (
    <AdminLayout title={"Halaman Depan / Utama"}>
      <div className="bg-[#F5F5F7] w-full rounded-2xl shadow-md ml-3 md:ml-0 py-4 px-6 sm:px-4">
        <div className="flex justify-end">
          <Button
            variant={isDataEmpty || editMode ? "primary" : "update"}
            value={isDataEmpty || editMode ? "Simpan" : "Ubah"}
            onClick={
              isDataEmpty || editMode ? handleInputSave : handleInputEdit
            }
            className="w-full md:w-auto"
          />
        </div>

        <Label htmlFor={"gambar_header"} value={"Gambar Header"} />
        <div className="mb-4">
          <div
            className={`flex flex-col items-center justify-center w-full py-4 h-full border-2 rounded-2xl bg-gray-50 shadow ${
              !isDataEmpty && !editMode
                ? "border-gray-50"
                : errors.gambar
                ? "border-red-500"
                : "border-gray-300"
            }`}
          >
            {/* Preview gambar yang dipilih */}
            {previewImage && (
              <div className={`w-full sm:w-80 h-56 rounded-md overflow-hidden`}>
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {isDataEmpty || editMode ? (
              <>
                <label
                  htmlFor="gambar_header"
                  className={`flex flex-col items-center justify-center w-full cursor-pointer ${
                    !previewImage ? "h-56" : "mt-3"
                  }`}
                >
                  <div className={`flex flex-col items-center justify-center`}>
                    <div className="flex items-center gap-2 mb-2">
                      <svg
                        className="w-8 h-8 text-gray-500"
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
                      <p className="text-sm text-gray-500">
                        <span className="font-semibold">
                          Unggah gambar di sini
                        </span>
                      </p>
                    </div>
                    <p className="text-xs text-gray-500">
                      SVG, PNG, JPG atau JPEG
                    </p>
                  </div>
                  <input
                    id="gambar_header"
                    type="file"
                    className="hidden"
                    onChange={handleImageChange}
                    accept=".svg,.png,.jpg,.jpeg"
                  />
                </label>
              </>
            ) : (
              ""
            )}
          </div>
          <InputError message={errors.gambar} />
        </div>

        <Label htmlFor={"judul"} value={"Judul"} />
        <Input
          type={"text"}
          name={"judul"}
          placeholder={"Masukkan judul.."}
          variant={isDataEmpty || editMode ? "primary-outline" : "disabled"}
          value={formData.judul}
          handleChange={handleTextChange}
          isDisabled={!isDataEmpty && !editMode}
          isError={!!errors.judul}
        />
        <InputError message={errors.judul} />

        <Label htmlFor={"subJudul"} value={"Sub Judul"} />
        <Input
          type={"text"}
          name={"subJudul"}
          placeholder={"Masukkan sub judul.."}
          variant={isDataEmpty || editMode ? "primary-outline" : "disabled"}
          value={formData.subJudul}
          handleChange={handleTextChange}
          isDisabled={!isDataEmpty && !editMode}
          isError={!!errors.subJudul}
        />
         <InputError message={errors.subJudul} />
      </div>
    </AdminLayout>
  );
};

export default Utama;
