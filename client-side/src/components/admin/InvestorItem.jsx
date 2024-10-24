import { Dropdown, Tooltip } from "flowbite-react";
import ToggleButton from "../common/ToggleButton";
import {
  PiDotsThreeOutlineBold,
  PiFolderUser,
  PiMoneyWavy,
  PiUserBold,
  PiUsersThreeBold,
} from "react-icons/pi";

const InvestorItem = (props) => {
  const {
    id,
    username,
    kategori_investor,
    investorBiodata,
    openModal,
    isVerifiedProfile,
    handleToggleStatus,
  } = props;

  return (
    <div className="relative bg-white flex flex-col items-center px-5 py-6 rounded-2xl shadow-lg card-investor">
      <Tooltip
        content={
          isVerifiedProfile ? "Batalkan Verifikasi" : "Verifikasi Investor"
        }
        placement="top"
      >
        <ToggleButton
          isChecked={isVerifiedProfile}
          handleToggleStatus={() => handleToggleStatus(id, isVerifiedProfile)}
        />
      </Tooltip>

      {investorBiodata?.foto_profil ? (
        <div className="w-24 h-24 rounded-full overflow-hidden mb-2">
          <img
            src={investorBiodata.foto_profil}
            alt={investorBiodata.foto_profil}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 p-2">
          {kategori_investor === "organisasi" ? (
            <PiUsersThreeBold className="w-full h-full" />
          ) : (
            <PiUserBold className="w-full h-full" />
          )}
        </div>
      )}

      <h4 className="font-semibold truncate">{username}</h4>
      <p className="text-gray-600 mb-2">{kategori_investor}</p>

      <div className="absolute top-5 right-5 cursor-pointer duration-300 hover:shadow-lg rounded-full">
        <Dropdown
          label=""
          dismissOnClick={false}
          renderTrigger={() => (
            <div className="border border-gray-300 rounded-full p-[6px]">
              <PiDotsThreeOutlineBold className="text-gray-400" />
            </div>
          )}
          placement="right-end"
        >
          <Dropdown.Item
            icon={PiFolderUser}
            onClick={() => openModal("detail_investor", id)}
          >
            Profil
          </Dropdown.Item>
          <Dropdown.Item
            icon={PiMoneyWavy}
            onClick={() => openModal("view_transactions", id)}
          >
            Transaksi
          </Dropdown.Item>
        </Dropdown>
      </div>
    </div>
  );
};

export default InvestorItem;
