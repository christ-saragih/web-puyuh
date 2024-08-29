import InvestorItem from "./InvestorItem";

const InvestorList = (props) => {
  const { investors, openModal } = props;
  return (
    <div className="grid grid-cols-3 xl:grid-cols-4 gap-8 xl:gap-12">
      {investors.map((investor) => (
        <InvestorItem key={investor.id} {...investor} openModal={openModal} />
      ))}
    </div>
  );
};

export default InvestorList;
