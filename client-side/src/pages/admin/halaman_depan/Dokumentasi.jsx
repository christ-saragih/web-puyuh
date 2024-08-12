import { PiPlusCircle } from "react-icons/pi";
import Button from "../../../components/common/Button.jsx";
import Dropdown from "../../../components/common/Dropdown.jsx";
import InputSearch from "../../../components/common/InputSearch.jsx";
import AdminLayout from "../../../layouts/AdminLayout.jsx";
import { getDocumentation } from "../../../services/documentation.service.js";
import { useEffect, useState } from "react";
import DocumentationList from "../../../components/admin/DocumentationList.jsx";

const Dokumentasi = () => {
  const [documentations, setDocumentations] = useState([]);

  useEffect(() => {
    getDocumentation((data) => {
      setDocumentations(data);
    });
  }, []);
  return (
    <AdminLayout title={"Halaman Depan / Dokumentasi"}>
      <div className="flex flex-col">
        <div className="bg-[#F5F5F7] w-full rounded-2xl shadow-md py-4 px-6">
          <div className="flex gap-5 mb-6">
            <Dropdown
              options={[1, 2, 3, 4]}
              label="Tampilkan"
              // onOptionSelect={handleOptionSelect}
            />

            {/* FITUR SEARCHING */}
            <InputSearch
            // handleChange={(e) => setSearch(e.target.value)}
            />

            <button
              className="flex items-center py-2 px-6 bg-green-800 text-white font-medium rounded-2xl"
              onClick={() => openModal("add_sosial_media")}
            >
              <PiPlusCircle className="w-6 h-6 me-1" />
              <p>Tambah</p>
            </button>

            {/* MODAL */}
          </div>

          <DocumentationList documentations={documentations} />


        </div>
      </div>
    </AdminLayout>
  );
};

export default Dokumentasi;
