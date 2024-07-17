const GuestLayout = (props) => {
  const { children, className = "" } = props;
  return <div className={"w-[90%] mx-auto mb-20 " + className}>{children}</div>;
};

export default GuestLayout;