const Tabs = (props) => {
  const { tab, setTab } = props;

  const toggleTab = (index) => {
    setTab(index);
  };

  return (
    <ul className="flex flex-wrap font-medium text-center max-w-fit mx-auto rounded-3xl bg-gray-200 mb-6">
      <li>
        <button
          onClick={() => toggleTab(1)}
          className={`${
            tab === 1
              ? "text-[#EFEFEF] bg-[#4B241A] font-semibold font-bold"
              : "text-[#4B241A] hover:bg-[#4B241A] hover:text-[#EFEFEF] hover:font-semibold ease-in-out duration-300"
          } inline-block w-48 py-2 rounded-3xl font-medium`}
        >
          Tentang Bisnis
        </button>
      </li>
      <li>
        <button
          onClick={() => toggleTab(2)}
          className={`${
            tab === 2
              ? "text-[#EFEFEF] bg-[#4B241A] font-semibold"
              : "text-[#4B241A] hover:bg-[#4B241A] hover:text-[#EFEFEF] hover:font-semibold ease-in-out duration-300"
          } inline-block w-48 py-2 rounded-3xl font-medium text-medium`}
        >
          Profil Bisnis
        </button>
      </li>
      <li>
        <button
          onClick={() => toggleTab(3)}
          className={`${
            tab === 3
              ? "text-[#EFEFEF] bg-[#4B241A] font-semibold"
              : "text-[#4B241A] hover:bg-[#4B241A] hover:text-[#EFEFEF] hover:font-semibold ease-in-out duration-300"
          } inline-block w-48 py-2 rounded-3xl font-medium text-medium`}
        >
          Lokasi
        </button>
      </li>
      <li>
        <button
          onClick={() => toggleTab(4)}
          className={`${
            tab === 4
              ? "text-[#EFEFEF] bg-[#4B241A] font-semibold"
              : "text-[#4B241A] hover:bg-[#4B241A] hover:text-[#EFEFEF] hover:font-semibold ease-in-out duration-300"
          } inline-block w-48 py-2 rounded-3xl font-medium text-medium`}
        >
          Investor
        </button>
      </li>
    </ul>
  );
};

export default Tabs;
