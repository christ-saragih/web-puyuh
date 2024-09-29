import Alert from "../common/Alert";
import InvestorItem from "./InvestorItem";

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
        <div className="flex justify-center">
          <Alert message={"Tidak ada investor yang tersedia."} type={"info"} />
        </div>
      )}
    </>
  );
};

export default InvestorList;
