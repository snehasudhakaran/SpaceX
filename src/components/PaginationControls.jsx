import React from "react";

const PaginationControls = ({
  currentPage,
  totalPages,
  goToNextPage,
  goToPreviousPage,
  goToPage,
}) => {
  if (totalPages === 1) return null;

  return (
    <div className="flex justify-center gap-2 my-20">
      <button
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded ${
          currentPage === 1 ? "bg-gray-950" : "bg-gray-900 text-white"
        }`}
      >
        Previous
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          onClick={() => goToPage(i + 1)}
          className={`px-4 py-2 rounded ${
            currentPage === i + 1 ? "bg-zinc-700 text-white" : "bg-zinc-900"
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded ${
          currentPage === totalPages ? "bg-gray-950" : "bg-gray-900 text-white"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
