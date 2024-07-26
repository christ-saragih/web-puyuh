const AdminContentContainerLayout = (props) => {
  const { children } = props;

  return (
    <div className="bg-white w-dvw h-dvh overflow-y-auto py-5 pe-6">
      {children}
    </div>
  );
};

export default AdminContentContainerLayout;
