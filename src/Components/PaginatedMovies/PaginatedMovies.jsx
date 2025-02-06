import React, { useState } from "react";
import MoviesList from "../MoviesList/MoviesList";

function PaginatedMovies({ type }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 7;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <MoviesList type={type} nbrResultats={18} page={currentPage} />
      <div className="flex justify-center items-center mt-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-blue-100"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PaginatedMovies;
