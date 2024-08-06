import { useEffect, useState } from "react";
import Sidebar from "../../../components/common/Sidebar";
import AdminNavbar from "../../../components/admin/AdminNavbar";
import AdminContentLayout from "../../../layouts/AdminContentLayout";
import Label from "../../../components/common/Label";
import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";
import {
  getDashboardFrontpage,
  addDashboardFrontpage,
} from "../../../services/dashboard-frontpage.service";

const Utama = () => {
  const [dashboardFrontpage, setDashboardFrontpage] = useState({
    nama_header: "",
    nama_subheader: "",
    image_header: "",
  });
  const [isEditing, setIsEditing] = useState(true); // Diaktifkan untuk penambahan data
  const [formData, setFormData] = useState({
    nama_header: "",
    nama_subheader: "",
    image_header: null,
  });

  useEffect(() => {
    getDashboardFrontpage((response) => {
      if (response.data && response.data.length > 0) {
        setDashboardFrontpage(response.data[0]);
        setFormData({
          nama_header: response.data[0].nama_header || "",
          nama_subheader: response.data[0].nama_subheader || "",
          image_header: null,
        });
        setIsEditing(false); // Nonaktifkan mode editing jika data sudah ada
      }
    });
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image_header: e.target.files[0] });
  };

  const handleSaveClick = () => {
    const form = new FormData();
    form.append("nama_header", formData.nama_header);
    form.append("nama_subheader", formData.nama_subheader);
    if (formData.image_header) {
      form.append("image_header", formData.image_header);
    }

    // Debugging FormData
    for (let [key, value] of form.entries()) {
      console.log(key, value);
    }

    if (isDataEmpty) {
      // Jika data kosong, maka kita menambahkan data baru
      addDashboardFrontpage(
        form,
        (newData) => {
          setDashboardFrontpage(newData);
          setFormData({
            nama_header: newData.nama_header,
            nama_subheader: newData.nama_subheader,
            image_header: null,
          });
          setIsEditing(false);
          alert("Data berhasil disimpan!");
        },
        (error) => {
          console.error("Gagal menyimpan data:", error);
          alert("Gagal menyimpan data, coba lagi.");
        }
      );
    } else {
      // Jika data ada, maka kita hanya mengupdate state
      setDashboardFrontpage(formData);
      setIsEditing(false);
      alert("Data berhasil diperbarui!");
    }
  };

  const isDataEmpty =
    !dashboardFrontpage.nama_header &&
    !dashboardFrontpage.nama_subheader &&
    !dashboardFrontpage.image_header;

  const [isHovered, setIsHovered] = useState(false);

  // PROBLEM:
  // - Kalo udah nambahin data harus direfresh
  // - edit data belum bisa
  // - saat edit gambar, gambar yang sebelumnya tidak muncul

  return (
    <div className="bg-white w-dvw h-dvh overflow-y-auto py-5 pe-6">
      <Sidebar isHovered={isHovered} setIsHovered={setIsHovered} />

      <AdminContentLayout isHovered={isHovered} setIsHovered={setIsHovered}>
        <div className="flex flex-col gap-8">
          <AdminNavbar />

          <div className="bg-[#F5F5F7] w-full rounded-2xl shadow-md py-4 px-6">
            <div className="flex justify-end">
              {isDataEmpty ? (
                <Button value={"Simpan"} onClick={handleSaveClick} />
              ) : !isEditing ? (
                <Button
                  value={"Ubah"}
                  variant={"update"}
                  onClick={handleEditClick}
                />
              ) : (
                <Button value={"Simpan"} onClick={handleSaveClick} />
              )}
            </div>

            <Label value={"Gambar Header"} />
            <div className="flex items-center justify-center w-full mt-1 mb-4">
              {!isEditing ? (
                <div className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-50 rounded-2xl overflow-hidden bg-gray-50 shadow">
                  <img
                    src={`http://localhost:3000/api/beranda/image/${dashboardFrontpage.image_header}`}
                    alt="Header"
                    className="w-full h-full object-contain py-3"
                  />
                </div>
              ) : (
                <>
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 rounded-2xl cursor-pointer bg-gray-50 shadow"
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
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">
                          Unggah gambar di sini
                        </span>
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </>
              )}
            </div>

            <Label value={"Judul"} />
            <Input
              type={"text"}
              name={"nama_header"}
              placeholder={"Masukkan judul.."}
              variant={isEditing ? "primary-outline" : "disabled"}
              value={formData.nama_header || ""}
              handleChange={handleInputChange}
              isDisabled={isDataEmpty ? false : !isEditing}
            />

            <Label value={"Sub Judul"} />
            <Input
              type={"text"}
              name={"nama_subheader"}
              placeholder={"Masukkan sub judul.."}
              variant={isEditing ? "primary-outline" : "disabled"}
              value={formData.nama_subheader || ""}
              handleChange={handleInputChange}
              isDisabled={isDataEmpty ? false : !isEditing}
            />
          </div>
        </div>
      </AdminContentLayout>
    </div>
  );
};

export default Utama;
