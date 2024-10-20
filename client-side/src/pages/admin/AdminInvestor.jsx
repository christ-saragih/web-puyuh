import Label from "../../components/common/Label";
import Input from "../../components/common/Input";
import Modal from "../../components/common/Modal";
import InvestorList from "../../components/admin/InvestorList.jsx";
import AdminLayout from "../../layouts/AdminLayout";
import {
  getInvestors,
  getInvestorById,
  verifyInvestorProfile,
} from "../../services/investor.service.js";
import { getTransactionsByInvestor } from "../../services/transaksi.service.js";
import { formatDate } from "../../utils/formatDate.js";
import { formatRupiah } from "../../utils/formatRupiah.js";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PiUserBold, PiUsersThreeBold } from "react-icons/pi";
import { LuCheck, LuX } from "react-icons/lu";
import { Tabs } from "flowbite-react";

const AdminInvestor = () => {
  const [investors, setInvestors] = useState([]);
  const [formInvestor, setFormInvestor] = useState({
    username: "",
    email: "",
    kategori_investor: "",
    isVerifiedProfile: false,
    investorBiodata: {
      jk: "",
      tempat_lahir: "",
      tanggal_lahir: "",
      no_hp: "",
    },
    investorAlamat: {
      alamat: "",
      provinsi: "",
      kota: "",
      kecamatan: "",
      kelurahan: "",
      kode_pos: "",
    },
    investorIdentitas: {
      no_ktp: "",
      foto_ktp: "",
      no_npwp: "",
      foto_npwp: "",
      selfie_ktp: "",
    },
    investorDataPendukung: {
      latar_pendidikan: "",
      sumber_penghasilan: "",
      jumlah_penghasilan: "",
      bidang_usaha: "",
      tujuan_investasi: "",
      no_sid: "",
      tanggal_pembuatan_sid: "",
    },
  });
  const [selectedInvestor, setSelectedInvestor] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [filteredInvestors, setFilteredInvestors] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isVerifying, setIsVerifying] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  useEffect(() => {
    getInvestors((data) => {
      setInvestors(data);
    });
  }, []);

  const handleVerifyInvestor = () => {
    if (selectedInvestor) {
      setIsVerifying(true);

      setTimeout(() => {
        verifyInvestorProfile(selectedInvestor.id, () => {
          setIsVerifying(false);
          // Update the local state to reflect the change
          setFormInvestor((prevState) => ({
            ...prevState,
            isVerifiedProfile: true,
          }));

          // Update the investors list
          setInvestors((prevInvestors) =>
            prevInvestors.map((investor) =>
              investor.id === selectedInvestor.id
                ? { ...investor, isVerifiedProfile: true }
                : investor
            )
          );
        });
      }, 1500);
    }
  };

  // Search: Start
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    if (searchQuery) {
      const filtered = investors.filter((investor) =>
        investor.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredInvestors(filtered);
    } else {
      setFilteredInvestors(investors);
    }
  }, [searchQuery, investors]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    if (value) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };
  // Search: End

  // Modal: Start
  const openModal = (type, investor = null) => {
    setModalType(type);
    setIsModalOpen(true);
    if (type === "detail_investor" && investor) {
      setSelectedInvestor(investor);

      getInvestorById(investor.id, (investorData) => {
        setFormInvestor({
          ...investorData,
        });
      });
    }

    if (type === "view_transactions" && investor) {
      setSelectedInvestor(investor);

      getTransactionsByInvestor(investor.id, (transaction) => {
        setTransactions(transaction);
      });
    }
  };

  const closeModal = () => {
    setModalType("");
    setIsModalOpen(false);
  };
  // Modal: End

  return (
    <AdminLayout title={"Halaman Managemen Investor"}>
      <div className="bg-[#F5F5F7] w-full rounded-2xl shadow-md py-4 px-6">
        <div className="flex mb-6">
          <div className="max-w-md grow">
            <div className="flex rounded-2xl shadow">
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-1 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>

                <input
                  type="text"
                  className="block p-2.5 w-full z-20 ps-11 text-gray-900 bg-gray-50 rounded-2xl  border border-gray-300 focus:ring-[#B87817] focus:border-[#B87817] focus:outline-none"
                  placeholder="Masukkan username investor ..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e)}
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <InvestorList investors={filteredInvestors} openModal={openModal} />
        </div>

        {/* START: Modal detail profil investor */}
        <Modal
          open={isModalOpen}
          onClose={closeModal}
          size={modalType === "view_transactions" ? "lg" : ""}
        >
          {modalType === "detail_investor" && (
            <>
              <Modal.Header onClose={closeModal}>
                <div className="flex items-center justify-between w-9/12 mx-auto">
                  <div className="flex items-center mt-2 gap-4">
                    {formInvestor.investorBiodata?.foto_profil ? (
                      <img
                        src={formInvestor.investorBiodata.foto_profil}
                        alt={formInvestor.investorBiodata.foto_profil}
                        className="w-24 h-24 rounded-full"
                      />
                    ) : (
                      <div>
                        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 p-3">
                          {formInvestor.kategori_investor === "organisasi" ? (
                            <PiUsersThreeBold className="w-full h-full" />
                          ) : (
                            <PiUserBold className="w-full h-full" />
                          )}
                        </div>
                      </div>
                    )}
                    <div>
                      <h3 className="text-2xl font-semibold text-[#572618]">
                        {formInvestor.investorBiodata?.nama_lengkap}
                      </h3>
                      <p>{formInvestor.kategori_investor}</p>
                    </div>
                  </div>

                  <div>
                    <button
                      className={`py-2 px-3 rounded-2xl font-medium text-white text-sm border-2 ${
                        formInvestor.isVerifiedProfile
                          ? "bg-green-500 border-green-500"
                          : "border-[#572618] bg-[#572618] hover:text-[#4B241A] hover:bg-white hover:border-[#4B241A]"
                      } ease-in-out duration-300`}
                      onClick={handleVerifyInvestor}
                      disabled={formInvestor.isVerifiedProfile || isVerifying}
                    >
                      {formInvestor.isVerifiedProfile
                        ? "Terverifikasi"
                        : isVerifying
                        ? "Memverifikasi..."
                        : "Verifikasi Investor"}
                    </button>
                  </div>
                </div>
              </Modal.Header>

              <Modal.Body className="md:pb-5 mt-2">
                <Tabs aria-label="Pills" variant="pills">
                  <Tabs.Item active title="Biodata">
                    <Label value={"Username"} />
                    <Input
                      variant={"disabled"}
                      value={formInvestor.username}
                      isDisabled={true}
                    />
                    <Label value={"Email"} />
                    <Input
                      variant={"disabled"}
                      value={formInvestor.email}
                      isDisabled={true}
                    />
                    <Label value={"Jenis Kelamin"} />
                    <Input
                      variant={"disabled"}
                      value={formInvestor.investorBiodata?.jk}
                      isDisabled={true}
                    />
                    <Label value={"Tempat Lahir"} />
                    <Input
                      variant={"disabled"}
                      value={formInvestor.investorBiodata?.tempat_lahir}
                      isDisabled={true}
                    />
                    <Label value={"Tanggal Lahir"} />
                    <Input
                      variant={"disabled"}
                      value={formatDate(
                        formInvestor.investorBiodata?.tanggal_lahir
                      )}
                      isDisabled={true}
                    />
                    <Label value={"Nomor Telepon"} />
                    <Input
                      variant={"disabled"}
                      value={formInvestor.investorBiodata?.no_hp}
                      isDisabled={true}
                    />
                  </Tabs.Item>
                  <Tabs.Item title="Alamat">
                    <Label value={"Alamat sesuai KTP"} />
                    <Input
                      variant={"disabled"}
                      value={formInvestor.investorAlamat?.alamat}
                      isDisabled={true}
                    />
                    <Label value={"Provinsi"} />
                    <Input
                      variant={"disabled"}
                      value={formInvestor.investorAlamat?.provinsi}
                      isDisabled={true}
                    />
                    <Label value={"Kabupaten/Kota"} />
                    <Input
                      variant={"disabled"}
                      value={formInvestor.investorAlamat?.kota}
                      isDisabled={true}
                    />
                    <Label value={"Kecamatan"} />
                    <Input
                      variant={"disabled"}
                      value={formInvestor.investorAlamat?.kecamatan}
                      isDisabled={true}
                    />
                    <Label value={"Kelurahan"} />
                    <Input
                      variant={"disabled"}
                      value={formInvestor.investorAlamat?.kelurahan}
                      isDisabled={true}
                    />
                    <Label value={"Kode Pos"} />
                    <Input
                      variant={"disabled"}
                      value={formInvestor.investorAlamat?.kode_pos}
                      isDisabled={true}
                    />
                  </Tabs.Item>
                  <Tabs.Item title="Identitas">
                    <Label value={"Nomor KTP"} />
                    <Input
                      variant={"disabled"}
                      value={formInvestor.investorIdentitas?.no_ktp}
                      isDisabled={true}
                    />
                    <Label value={"Foto KTP"} />
                    <div className="flex justify-center w-full h-48 mt-2 mb-4 py-2 border-gray-50 border-2 bg-gray-50 rounded-2xl shadow overflow-hidden">
                      <img
                        src={formInvestor.investorIdentitas?.foto_ktp}
                        alt=""
                        className="h-full w-[40%] object-cover rounded-lg"
                      />
                    </div>
                    <Label value={"Nomor NPWP"} />
                    <Input
                      variant={"disabled"}
                      value={formInvestor.investorIdentitas?.no_npwp}
                      isDisabled={true}
                    />
                    <Label value={"Foto NPWP"} />
                    <div className="flex justify-center w-full h-48 mt-2 mb-4 py-2 border-gray-50 border-2 bg-gray-50 rounded-2xl shadow overflow-hidden">
                      <img
                        src={formInvestor.investorIdentitas?.foto_npwp}
                        alt=""
                        className="h-full w-[40%] object-cover rounded-lg"
                      />
                    </div>
                    <Label value={"Foto Selfi dengan KTP"} />
                    <div className="flex justify-center w-full h-48 mt-2 mb-4 py-2 border-gray-50 border-2 bg-gray-50 rounded-2xl shadow overflow-hidden">
                      <img
                        src={formInvestor.investorIdentitas?.selfie_ktp}
                        alt=""
                        className="h-full w-[40%] object-cover rounded-lg"
                      />
                    </div>
                  </Tabs.Item>
                  <Tabs.Item title="Pendukung">
                    <Label value={"Latar Belakang Pendidikan"} />
                    <Input
                      variant={"disabled"}
                      value={
                        formInvestor.investorDataPendukung?.latar_pendidikan
                      }
                      isDisabled={true}
                    />
                    <Label value={"Sumber Penghasilan"} />
                    <Input
                      variant={"disabled"}
                      value={
                        formInvestor.investorDataPendukung?.sumber_penghasilan
                      }
                      isDisabled={true}
                    />
                    <Label value={"Jumlah Penghasilan"} />
                    <Input
                      variant={"disabled"}
                      value={
                        formInvestor.investorDataPendukung?.jumlah_penghasilan
                      }
                      isDisabled={true}
                    />
                    <Label value={"Bidang Usaha"} />
                    <Input
                      variant={"disabled"}
                      value={formInvestor.investorDataPendukung?.bidang_usaha}
                      isDisabled={true}
                    />
                    <Label value={"Tujuang Investasi"} />
                    <Input
                      variant={"disabled"}
                      value={
                        formInvestor.investorDataPendukung?.tujuan_investasi
                      }
                      isDisabled={true}
                    />
                    <Label value={"Nomor SID"} />
                    <Input
                      variant={"disabled"}
                      value={formInvestor.investorDataPendukung?.no_sid}
                      isDisabled={true}
                    />
                    <Label value={"Tanggal Pembuatan SID"} />
                    <Input
                      variant={"disabled"}
                      value={formatDate(
                        formInvestor.investorDataPendukung
                          ?.tanggal_pembuatan_sid
                      )}
                      isDisabled={true}
                    />
                  </Tabs.Item>
                </Tabs>
              </Modal.Body>

              <Modal.Footer buttonLabel={"Kembali"} onClose={closeModal} />
            </>
          )}

          {modalType === "view_transactions" && (
            <>
              <Modal.Header
                title={`Riwayat Transaksi ${
                  transactions[0]?.investor?.investorBiodata?.nama_lengkap
                    ? transactions[0].investor.investorBiodata.nama_lengkap
                    : ""
                }`}
                onClose={closeModal}
              ></Modal.Header>

              <Modal.Body className="md:pb-5">
                <table className="w-full text-base text-left ">
                  <thead className="bg-white text-sm text-gray-800 uppercase border-b-2">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        No
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Judul
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Jumlah Investasi
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Metode Pembayaran
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Tanggal
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction, index) => (
                      <tr
                        key={transaction.id}
                        className="bg-white font-medium text-gray-600 border-b hover:bg-gray-50"
                      >
                        <td
                          scope="row"
                          className="px-6 py-4 whitespace-nowrap "
                        >
                          {1 + index++}
                        </td>
                        <td className="px-6 py-4">
                          {transaction.investasi.judul}
                        </td>
                        <td className="px-6 py-4">
                          {formatRupiah(transaction.total_investasi)}
                        </td>
                        <td className="px-6 py-4">
                          <p>BCA</p>
                          <p className="text-sm text-gray-500 font-normal">
                            **** **** **** 6969
                          </p>
                        </td>
                        {/* <td className="px-6 py-4">
                          <div className="bg-[#e7f3ea] text-[#138A36] items-center justify-center rounded-3xl py-1 px-3 flex gap-1">
                            <LuCheck className="-ms-[3px] w-4 h-4" />
                            <p className="font-medium">{transaction.status}</p>
                          </div>
                          <div className="bg-[#FCE8EA] text-[#E71D36] items-center justify-center rounded-3xl py-1 px-3 flex gap-1">
                            <LuX className="-ms-[3px] w-4 h-4" />
                            <p className="font-medium">Gagal</p>
                          </div>
                        </td> */}
                        <td className="px-6 py-4">
                          {formatDate(transaction.tanggal_transaksi)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Modal.Body>

              <Modal.Footer buttonLabel={"Kembali"} onClose={closeModal} />
            </>
          )}
        </Modal>
        {/* END: Modal detail profil investor */}
      </div>
    </AdminLayout>
  );
};

export default AdminInvestor;
