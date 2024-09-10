import Label from "../../../components/common/Label";
import Input from "../../../components/common/Input";
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
    nama_header: "",
    nama_subheader: "",
    image_header: null,
  });

  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    getDashboardFrontpage((data) => {
      setDasboardFrontpage(data);

      if (data) {
        setFormData({
          nama_header: data.nama_header || "",
          nama_subheader: data.nama_subheader || "",
          image_header: data.image_header || "",
        });
        // Set preview image dari data yang ada
        setPreviewImage(
          `http://localhost:3000/api/beranda/image/${data.image_header}`
        );
      }
    });
  }, []);

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image_header: file,
      });
      setPreviewImage(URL.createObjectURL(file)); // Set preview image dari file yang dipilih
    }
  };

  const handleInputSave = () => {
    const dataToSend = new FormData();
    dataToSend.append("nama_header", formData.nama_header);
    dataToSend.append("nama_subheader", formData.nama_subheader);
    if (formData.image_header) {
      dataToSend.append("image_header", formData.image_header);
    }

    saveDashboardFrontpage(dataToSend, (newData) => {
      setDasboardFrontpage([newData]);
      setEditMode(false);
      setPreviewImage(
        `http://localhost:3000/api/beranda/image/${newData.image_header}`
      );
    });
  };

  const handleInputEdit = () => {
    setEditMode(true);
  };

  const isDataEmpty = !dashboardFrontpage;

  return (
    <AdminLayout title={"Halaman Depan / Utama"}>
      <div className="bg-[#F5F5F7] w-full rounded-2xl shadow-md ml-3 md:ml-0 py-4 px-6 sm:px-4">
        <div className="flex justify-end md:justify-end mb-4">
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
        <div
          className={`flex flex-col items-center justify-center w-full py-4 mt-2 mb-4 h-full border-2 rounded-2xl bg-gray-50 shadow ${
            !isDataEmpty && !editMode ? "border-gray-50 " : "border-gray-300"
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
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="gambar_header"
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </>
          ) : (
            ""
          )}
        </div>

        <Label htmlFor={"nama_header"} value={"Judul"} />
        <Input
          type={"text"}
          name={"nama_header"}
          placeholder={"Masukkan judul.."}
          variant={isDataEmpty || editMode ? "primary-outline" : "disabled"}
          value={formData.nama_header}
          handleChange={handleTextChange}
          isDisabled={!isDataEmpty && !editMode}
          className="w-full"
        />
        <Label htmlFor={"nama_subheader"} value={"Sub Judul"} />
        <Input
          type={"text"}
          name={"nama_subheader"}
          placeholder={"Masukkan sub judul.."}
          variant={isDataEmpty || editMode ? "primary-outline" : "disabled"}
          value={formData.nama_subheader}
          handleChange={handleTextChange}
          isDisabled={!isDataEmpty && !editMode}
          className="w-full"
        />
      </div>
    </AdminLayout>
  );
};

export default Utama;
