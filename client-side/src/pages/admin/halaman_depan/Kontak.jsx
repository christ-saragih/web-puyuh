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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSave = () => {
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
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const isDataEmpty = contacts.length === 0;

    return (
        <AdminLayout title={"Halaman Depan / Kontak"}>
            <div className="flex flex-col ml-5 md:ml-0">
                <div className="bg-[#F5F5F7] w-full rounded-2xl shadow-md py-4 px-6">
                    <div className="w-full flex justify-between mb-5">
                        <h3 className="font-bold text-[#572618] text-xl">
                            Kontak
                        </h3>
                        <Button
                            variant={
                                isDataEmpty || editMode ? "primary" : "update"
                            }
                            value={isDataEmpty || editMode ? "Simpan" : "Ubah"}
                            onClick={
                                isDataEmpty || editMode
                                    ? handleSave
                                    : handleEdit
                            }
                        />
                    </div>

                    <div>
                        <Label htmlFor={"alamat"} value={"Alamat"} />
                        <Textarea
                            name={"alamat"}
                            required
                            rows={3}
                            variant={
                                isDataEmpty || editMode
                                    ? "primary-outline"
                                    : "disabled"
                            }
                            value={formData.alamat}
                            handleChange={handleChange}
                            isDisabled={!isDataEmpty && !editMode}
                        />

                        <Label htmlFor={"map"} value={"Map"} />
                        <Input
                            type={"text"}
                            name={"map"}
                            variant={
                                isDataEmpty || editMode
                                    ? "primary-outline"
                                    : "disabled"
                            }
                            value={formData.map}
                            handleChange={handleChange}
                            isDisabled={!isDataEmpty && !editMode}
                        />

                        <div className="flex items-center justify-center w-full mt-2 mb-4">
                            <div
                                className={`flex flex-col items-center justify-center w-full h-48 border-2 py-10 rounded-2xl overflow-hidden bg-gray-50 shadow ${
                                    isDataEmpty || editMode
                                        ? "border-gray-300"
                                        : "border-gray-50"
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
                            variant={
                                isDataEmpty || editMode
                                    ? "primary-outline"
                                    : "disabled"
                            }
                            value={formData.email}
                            handleChange={handleChange}
                            isDisabled={!isDataEmpty && !editMode}
                        />

                        <Label
                            htmlFor={"nomor_telepon"}
                            value={"Nomor Telepon"}
                        />
                        <Input
                            type={"text"}
                            name={"nomor_telepon"}
                            variant={
                                isDataEmpty || editMode
                                    ? "primary-outline"
                                    : "disabled"
                            }
                            value={formData.nomor_telepon}
                            handleChange={handleChange}
                            isDisabled={!isDataEmpty && !editMode}
                        />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Kontak;
