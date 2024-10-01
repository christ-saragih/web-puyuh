import { useEffect, useState } from "react";
import Button from "../../../components/common/Button.jsx";
import Input from "../../../components/common/Input.jsx";
import Label from "../../../components/common/Label.jsx";
import Textarea from "../../../components/common/Textarea.jsx";
import AdminLayout from "../../../layouts/AdminLayout";
import {
  getContactFrontpage,
  saveContactFrontpage,
} from "../../../services/contact-frontpage.service.js";

const Kontak = () => {
  const [contacts, setContacts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    alamat: "",
    map: "",
    email: "",
    nomor_telepon: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getContactFrontpage((data) => {
      setContacts(data);
      if (data) {
        setFormData({
          alamat: data.alamat || "",
          map: data.url_map || "",
          email: data.email || "",
          nomor_telepon: data.no_phone || "",
        });
      }
    });
  }, []);

  // Input Validations: Start
  const validateForm = () => {
    let newErrors = {};
    if (!formData.alamat.trim()) {
      newErrors.alamat = "Alamat wajib diisi";
    }
    if (!formData.map.trim()) {
      newErrors.map = "Map wajib diisi";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email wajib diisi";
    }
    if (!formData.nomor_telepon.trim()) {
      newErrors.nomor_telepon = "Nomor telepon wajib diisi";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidIndonesianPhoneNumber = (phoneNumber) => {
    // Regex untuk nomor telepon Indonesia
    // Menerima format: +628xxxxxxxxxx, 08xxxxxxxxxx, atau 628xxxxxxxxxx
    // Minimal 10 digit, maksimal 14 digit (termasuk kode negara)
    const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{8,11}$/;
    return phoneRegex.test(phoneNumber);
  };

  const getErrorMessage = (fieldName) => {
    const fieldNames = {
      alamat: "Alamat",
      map: "Map",
      email: "Email",
      nomor_telepon: "Nomor telepon",
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

  const handleChange = (e) => {
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
    } else if (name === "email" && !isValidEmail(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]:
          "Email tidak valid. Harap masukkan email yang benar (contoh: admin@example.test)",
      }));
    } else if (
      name === "nomor_telepon" &&
      !isValidIndonesianPhoneNumber(value)
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]:
          "Nomor telepon tidak valid. Harap masukkan nomor telepon yang benar (contoh: 08123456789)",
      }));
    } else {
      clearError(name);
    }
  };

  const handleSave = () => {
    if (validateForm()) {
      const dataToSend = {
        alamat: formData.alamat,
        url_map: formData.map,
        email: formData.email,
        no_phone: formData.nomor_telepon,
      };

      saveContactFrontpage(dataToSend, (newData) => {
        setContacts([newData]);
        setEditMode(false);
      });
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const isDataEmpty = !contacts;

  return (
    <AdminLayout title={"Halaman Depan / Kontak"}>
      <div className="flex flex-col ml-5 md:ml-0">
        <div className="bg-[#F5F5F7] w-full rounded-2xl shadow-md py-4 px-6">
          <div className="w-full flex justify-between mb-5">
            <h3 className="font-bold text-[#572618] text-xl">Kontak</h3>
            <Button
              variant={isDataEmpty || editMode ? "primary" : "update"}
              value={isDataEmpty || editMode ? "Simpan" : "Ubah"}
              onClick={isDataEmpty || editMode ? handleSave : handleEdit}
            />
          </div>

          <div>
            <Label htmlFor={"alamat"} value={"Alamat"} />
            <Textarea
              name={"alamat"}
              placeholder={"Masukkan alamat.."}
              required
              rows={3}
              variant={isDataEmpty || editMode ? "primary-outline" : "disabled"}
              value={formData.alamat}
              handleChange={handleChange}
              isDisabled={!isDataEmpty && !editMode}
              isError={!!errors.alamat}
              errorMessage={errors.alamat}
            />

            <Label htmlFor={"map"} value={"Map"} />
            <Input
              type={"text"}
              name={"map"}
              placeholder={"Masukkan map.."}
              variant={isDataEmpty || editMode ? "primary-outline" : "disabled"}
              value={formData.map}
              handleChange={handleChange}
              isDisabled={!isDataEmpty && !editMode}
              isError={!!errors.map}
              errorMessage={errors.map}
            />

            <div className="flex items-center justify-center w-full mt-2 mb-4">
              <div
                className={`flex flex-col items-center justify-center w-full h-48 border-2 py-10 rounded-2xl overflow-hidden bg-gray-50 shadow ${
                  isDataEmpty || editMode ? "border-gray-300" : "border-gray-50"
                }`}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: formData.map,
                  }}
                />
              </div>
            </div>

            <Label htmlFor={"email"} value={"Email"} />
            <Input
              type={"text"}
              name={"email"}
              placeholder={"Masukkan email.."}
              variant={isDataEmpty || editMode ? "primary-outline" : "disabled"}
              value={formData.email}
              handleChange={handleChange}
              isDisabled={!isDataEmpty && !editMode}
              isError={!!errors.email}
              errorMessage={errors.email}
            />

            <Label htmlFor={"nomor_telepon"} value={"Nomor Telepon"} />
            <Input
              type={"text"}
              name={"nomor_telepon"}
              placeholder={"Masukkan nomor telepon.."}
              variant={isDataEmpty || editMode ? "primary-outline" : "disabled"}
              value={formData.nomor_telepon}
              handleChange={handleChange}
              isDisabled={!isDataEmpty && !editMode}
              isError={!!errors.nomor_telepon}
              errorMessage={errors.nomor_telepon}
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Kontak;
