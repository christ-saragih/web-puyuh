import { PiUserBold, PiUsersThreeBold } from "react-icons/pi";

const InvestorItem = (props) => {
  const { id, username, kategori_investor, investorBiodata, openModal } = props;

  return (
    <div className="bg-white flex flex-col items-center xl:flex-row px-5 py-6 gap-4 rounded-2xl shadow-lg">
      {investorBiodata?.foto_profil ? (
        <img
          src={investorBiodata.foto_profil}
          alt={investorBiodata.foto_profil}
          className="w-20 h-20 rounded-full "
        />
      ) : (
        <div>
          <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 p-2">
            {kategori_investor === "organisasi" ? (
              <PiUsersThreeBold className="w-full h-full" />
            ) : (
              <PiUserBold className="w-full h-full" />
            )}
          </div>
        </div>
      )}

      <div className="flex flex-col items-center xl:inline truncate">
        <h4 className="font-semibold truncate">
          {username}
        </h4>
        <p className="text-gray-600 mb-2">{kategori_investor}</p>
        <button
          className="font-medium text-start me-2 w-fit text-blue-700 hover:text-blue-800 hover:underline"
          onClick={() => openModal("detail_investor", { id })}
        >
          Profil
        </button>
        <button
          className="font-medium text-start w-fit text-blue-700 hover:text-blue-800 hover:underline"
          onClick={() => openModal("view_transactions", { id })}
        >
          Riwayat
        </button>
      </div>
    </div>
  );
};

export default InvestorItem;
