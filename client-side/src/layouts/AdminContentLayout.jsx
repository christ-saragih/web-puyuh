const AdminContentLayout = (props) => {
    const { isHovered, setIsHovered, children } = props;

  return (
    <div
      className={` transition-all duration-300 ease-in-out ${
        isHovered ? "md:ml-64" : "md:ml-32"
      }`}
    >
        {children}
    </div>
  );
};

export default AdminContentLayout;
