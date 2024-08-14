import PropTypes from "prop-types";

const FileInput = (props) => {
  const { inputId, selectedFile, handleChange } = props;
  return (
    <div className="flex flex-row items-center mt-1 bg-gray-50 border-2 border-gray-300  rounded-2xl shadow overflow-hidden">
      <input
        type="file"
        id={inputId}
        onChange={handleChange}
        hidden
      />
      <label
        htmlFor={inputId}
        className="block mr-4 py-2 px-[18px]
             border-0 border-r border-gray-300 text-sm font-semibold bg-[#eee9e7]
            text-[#572618] hover:bg-[#ddd3d0] duration-300 ease-in-out cursor-pointer"
      >
        Unggah
      </label>
      <label
        htmlFor={inputId}
        className="text-sm text-slate-500 cursor-pointer"
      >
        {selectedFile}
      </label>
    </div>
  );
};

FileInput.propTypes = {
    inputId: PropTypes.string.isRequired,
    selectedFile: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
}

export default FileInput;
