import React, { useState, useEffect, useRef } from "react";

const Dropdown = ({ options, label, onOptionSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onOptionSelect(option);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div className="flex items-center gap-3">
        <p>{label}</p>
        <button
          id="dropdownDelayButton"
          onClick={toggleDropdown}
          className="font-medium px-3 py-2 text-center inline-flex items-center text-sm border-2 rounded-2xl text-gray-900 bg-gray-50 border-gray-300 focus:ring-[#B87817] focus:border-[#B87817] focus:outline-none"
          type="button"
        >
          {selectedOption}{" "}
          <svg
            className="w-2.5 h-2.5 ms-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
          
        </button>
      </div>

      {isOpen && (
        <div
          id="dropdownDelay"
          className="absolute z-10 mt-2 bg-white divide-y divide-gray-100 rounded-2xl shadow w-20 left-[5.6rem]"
        >
          <ul
            className="py-2 text-sm text-gray-700"
            aria-labelledby="dropdownDelayButton"
          >
            {options.map((option, index) => (
              <li key={index} className="hover:bg-gray-100 rounded-md">
                <button
                  className="block px-4 py-2"
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
