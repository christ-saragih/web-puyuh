import Button from "../../../components/common/Button.jsx";
import Dropdown from "../../../components/common/Dropdown";
import Input from "../../../components/common/Input.jsx";
import InputSearch from "../../../components/common/InputSearch";
import Label from "../../../components/common/Label.jsx";
import Textarea from "../../../components/common/Textarea.jsx";
import AdminLayout from "../../../layouts/AdminLayout.jsx";

const Profil = () => {
  return (
    <AdminLayout title={"Halaman Depan / Profil"}>
      <div className="bg-[#F5F5F7] w-full rounded-2xl shadow-md py-4 px-6">
        <div className="w-full flex justify-between mb-5">
          <h3 className="font-semibold text-[#572618] text-2xl">
            Tentang Kami
          </h3>
          <Button value={"Simpan"} />
        </div>

        <div>
          <Label htmlFor={"judul"} value={"Judul"} />
          <Input type={"text"} name={"judul"} variant={"primary-outline"} />

          <Label value={"Gambar Header"} />
          <div className="flex items-center justify-center w-full mt-1 mb-4">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 rounded-2xl cursor-pointer bg-gray-50  shadow"
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
                  <span className="font-semibold">Unggah gambar di sini</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                //   onChange={handleFileChange}
              />
            </label>
          </div>

          <Label htmlFor={"deskripsi"} value={"Deskripsi"} />
          <Textarea
            id={"deskripsi"}
            required
            rows={4}
            variant={"primary-outline"}
          />
        </div>
      </div>
      <div className="bg-[#F5F5F7] w-full rounded-2xl shadow-md py-4 px-6">
        <div className="w-full flex justify-between mb-5">
          <h3 className="font-semibold text-[#572618] text-2xl">Sejarah</h3>
          <Button value={"Simpan"} />
        </div>

        <div>
          <Label htmlFor={"judul"} value={"Judul"} />
          <Input type={"text"} name={"judul"} variant={"primary-outline"} />

          <Label htmlFor={"deskripsi"} value={"Deskripsi"} />
          <Textarea
            id={"deskripsi"}
            required
            rows={4}
            variant={"primary-outline"}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default Profil;
