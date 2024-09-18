import React from "react";

const FaqItem = ({ id, pertanyaan, jawaban, isOpen, onToggle, status }) => {
  return (
    <>
      {status === "aktif" && (
        <div
          className={`accordion py-8 border-b border-solid border-gray-200 ${
            isOpen ? "active" : ""
          }`}
        >
          <button
            className="accordion-toggle group inline-flex items-center justify-between text-xl font-normal leading-8 text-[#2b2b2b] w-full ease-in-out duration-300 hover:text-[#4B241A] accordion-active:text-indigo-600 accordion-active:font-medium"
            aria-controls={`basic-collapse-${id}`}
            onClick={onToggle}
          >
            <h5 className="text-start font-semibold">{pertanyaan}</h5>
            <svg
              className={`text-gray-900 ease-in-out duration-300 group-hover:text-[#4B241A] accordion-active:text-indigo-600 ${
                isOpen ? "rotate-180" : ""
              }`}
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
          <div
            id={`basic-collapse-${id}`}
            className={`accordion-content w-full px-0 overflow-hidden transition-all duration-700 ease-in-out ${
              isOpen ? "max-h-96" : "max-h-0"
            }`}
          >
            <p
              className={`text-base font-normal text-[#2b2b2b] transition-opacity duration-700 ease-in-out ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              {jawaban}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default FaqItem;
