import BatchItem from "./BatchItem";

const BatchList = (props) => {
  const { investments, openModal } = props;
  return (
    <div className="grid grid-cols-3 gap-x-14 gap-y-12">
      {/* Item */}

      {investments.map((investment) => (
        <BatchItem key={investment.id} {...investment} openModal={openModal}/>
      ))}
    </div>
  );
};

export default BatchList;
