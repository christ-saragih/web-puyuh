const ValueCompanyItem = (props) => {
  const { icon, text } = props;

  return (
    <div className="flex flex-col items-center xl:px-14">
      <div className="bg-[#4B241A] rounded-full w-24 h-24 lg:w-28 lg:h-28 p-6 mb-4">
        <img src={icon} alt={icon} className="w-full object-cover" />
      </div>
      <h3 className="flex-grow font-semibold text-center text-xl lg:text-2xl max-w-60 lg:max-w-full mb-2">
        {text}
      </h3>
      {/* <p className="px-8 sm:px-0 font-medium text-lg text-center">
                  Akses investasi yang mudah dijangkau bagi siapa saja
                </p> */}
    </div>
  );
};

export default ValueCompanyItem;
