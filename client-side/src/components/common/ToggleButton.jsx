const ToggleButton = (props) => {
  const { isChecked, handleToggleStatus } = props;

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        checked={isChecked}
        onChange={handleToggleStatus}
      />
      <div
        className={`relative w-14 h-8 shadow-md bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#89675d] rounded-full peer 
        ${isChecked ? "peer-checked:bg-[#572618]" : ""}
        after:content-[''] after:absolute after:top-[4px] after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all 
        ${
          isChecked
            ? "peer-checked:after:translate-x-full peer-checked:after:border-white"
            : ""
        }
      `}
      ></div>
    </label>
  );
};

export default ToggleButton;
