import { PiPlusCircle } from "react-icons/pi";
import Dropdown from "../../../components/common/Dropdown.jsx";
import InputSearch from "../../../components/common/InputSearch.jsx";
import AdminLayout from "../../../layouts/AdminLayout.jsx";
import DocumentList from "../../../components/admin/DocumentList.jsx";

const Dokumen = () => {
  return (
    <AdminLayout title={"Halaman Depan / Dokumen"}>
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
              // onClick={() => openModal("add_documentation")}
            >
              <PiPlusCircle className="w-6 h-6 me-1" />
              <p>Tambah</p>
            </button>

            {/* MODAL */}
          </div>

          {/* DocumentList */}
          <DocumentList />
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dokumen;
