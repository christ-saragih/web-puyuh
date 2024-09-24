import Alert from "../common/Alert";
import InvestorItem from "./InvestorItem";
import { LuBadgeInfo } from "react-icons/lu";

const InvestorList = (props) => {
  const { investors, openModal } = props;
  return (
    <>
      {Array.isArray(investors) && investors.length > 0 ? (
        <div className="grid grid-cols-3 xl:grid-cols-4 gap-8 xl:gap-12">
          {investors.map((investor) => (
            <InvestorItem
              key={investor.id}
              {...investor}
              openModal={openModal}
            />
          ))}
        </div>
      ) : (
        <Alert
          Icon={LuBadgeInfo}
          message={"Tidak ada investor yang tersedia."}
          type={"info"}
        />
      )}
    </>
  );
};

export default InvestorList;
