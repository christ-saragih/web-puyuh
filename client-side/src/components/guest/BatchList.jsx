import BatchItem from "./BatchItem";

const BatchList = () => {
  return (
    <div className="grid grid-cols-3 gap-x-14 gap-y-8">
      <BatchItem />
      <BatchItem />
      <BatchItem />
      {/* <BatchItem />
      <BatchItem />
      <BatchItem /> */}
    </div>
  );
};

export default BatchList;
