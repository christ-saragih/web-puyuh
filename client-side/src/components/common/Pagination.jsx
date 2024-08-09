import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Pagination = (props) => {
  const { articlesPerPage, totalArticles, paginate, currentPage } = props;

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalArticles / articlesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="flex justify-center mt-4">
        <li className="mx-1 rounded-full overflow-hidden flex justify-center">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`w-8 h-8 flex justify-center items-center ${
              currentPage === 1 ? "" : "hover:bg-gray-200"
            }`}
          >
            <FiChevronLeft className={`w-5 h-5 ${
              currentPage === 1 ? "text-gray-500" : ""
            }`} />
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`mx-1 rounded-full overflow-hidden ${
              currentPage === number ? "bg-[#572618] text-white font-semibold" : ""
            }`}
          >
            <button
              onClick={() => paginate(number)}
              className={`w-8 h-8 ${
                currentPage !== number
                  ? "bg-gray-200 hover:bg-gray-300"
                  : "cursor-default"
              }`}
            >
              {number}
            </button>
          </li>
        ))}
        <li className="mx-1 rounded-full overflow-hidden">
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === pageNumbers.length}
            className={`w-8 h-8 flex justify-center items-center ${
              currentPage === pageNumbers.length
                ? ""
                : "hover:bg-gray-200"
            }`}
          >
            <FiChevronRight className={`w-5 h-5 ${
              currentPage === pageNumbers.length ? "text-gray-500" : ""
            }`} />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
