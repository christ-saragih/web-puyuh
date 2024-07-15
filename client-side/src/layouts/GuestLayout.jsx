const GuestLayout = (props) => {
  const { children, className = "" } = props;
  return <div className={"w-[90%] mx-auto mb-32 mt-28 lg:mt-32" + className}>{children}</div>;
};

export default GuestLayout;
