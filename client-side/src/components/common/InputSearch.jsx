import Input from "./Input";

const InputSearch = (props) => {
  const { handleChange } = props;
  return (
    <div className="relative grow">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>

      <Input
        type={"text"}
        placeholder={"Masukkan pencarian.."}
        variant={"primary-outline-search"}
        className={"ps-10 max-w-sm"}
        handleChange={handleChange}
      />
    </div>
  );
};

export default InputSearch;
