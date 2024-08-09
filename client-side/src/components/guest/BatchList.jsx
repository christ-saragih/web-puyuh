import BatchItem from "./BatchItem";

const BatchList = () => {
  return (
    <div className="flex justify-center flex-wrap gap-x-10 gap-y-6 xl:gap-x-14 xl:gap-y-8 xl:flex-nowrap">
      <BatchItem />
      <BatchItem />
      <BatchItem className={"col-span-2 text-center"}/>
      {/* <BatchItem />
      <BatchItem /> */}
    </div>
  );
};

export default BatchList;
