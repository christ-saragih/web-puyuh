import Button from "../../../components/common/Button.jsx";
import Input from "../../../components/common/Input.jsx";
import Label from "../../../components/common/Label.jsx";
import Textarea from "../../../components/common/Textarea.jsx";
import AdminLayout from "../../../layouts/AdminLayout.jsx";

const Kontak = () => {
  return (
    <AdminLayout title={"Halaman Depan / Kontak"}>
      <div className="flex flex-col">
        <div className="bg-[#F5F5F7] w-full rounded-2xl shadow-md py-4 px-6">
          <div className="w-full flex justify-between mb-5">
            <h3 className="font-bold text-[#572618] text-xl">Kontak</h3>
            <Button value={"Simpan"} />
          </div>

          <div>
            <Label htmlFor={"alamat"} value={"Alamat"} />
            <Textarea
              id={"alamat"}
              required
              rows={3}
              variant={"primary-outline"}
            />

            <Label htmlFor={"map"} value={"Map"} />
            <Input type={"text"} name={"map"} variant={"primary-outline"} />
            {/* Tampilkan saat data map sudah ada */}
            {/* <div className="flex items-center justify-center w-full mt-2 mb-4">
              <div className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-50 rounded-2xl overflow-hidden bg-gray-50 shadow">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.711670863042!2d106.7675797745358!3d-6.558035064108204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c5dce5b6ebd3%3A0x7ba6ffb5d199befe!2sSekolah%20Tinggi%20Pariwisata%20Bogor!5e0!3m2!1sid!2sid!4v1723001701318!5m2!1sid!2sid"
                  allowfullscreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-[600px] h-full object-contain py-3"
                ></iframe>
              </div>
            </div> */}

            <Label htmlFor={"email"} value={"Email"} />
            <Input type={"text"} name={"email"} variant={"primary-outline"} />

            <Label htmlFor={"nomor_telepon"} value={"Nomor Telepon"} />
            <Input
              type={"text"}
              name={"nomor_telepon"}
              variant={"primary-outline"}
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Kontak;
