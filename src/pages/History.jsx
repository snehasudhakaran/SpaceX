/**
 * History Component
 *
 * This component displays a list of historic moments from SpaceX,
 * allowing users to search for specific moments and navigate through
 * the data using pagination controls. The component fetches data
 * from the SpaceX API, manages loading states, handles errors,
 * and provides a user-friendly search feature.
 *
 * Key Features:
 * - Fetches historic moments from the SpaceX API
 * - Implements a search function to filter results based on user input
 * - Displays paginated results for better navigation
 * - Shows a loading spinner while data is being fetched
 * - Displays error messages if data fetching fails
 *
 */

import React, { useEffect, useState } from "react";
import { getHistory } from "../utils/spacexApi";
import HistoryItem from "../components/HistoryItem";
import PaginationControls from "../components/PaginationControls";
import LoadingSpinner from "../utils/loadingSpinner";
import { usePagination } from "../hooks/usePagination";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await getHistory();
        setHistory(response.data);
      } catch (err) {
        setError("Failed to fetch history data");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  // Function to filter history
  const filteredHistory = history.filter((hist) =>
    hist.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const {
    currentData: paginatedHistory,
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    goToPage,
  } = usePagination(filteredHistory, 6);

  if (loading) return <LoadingSpinner />;

  if (error) return <div className="text-white text-center">{error}</div>;

  return (
    <div
      className="container mx-auto p-4 my-10"
      style={{ fontFamily: "Montserrat" }}
    >
      <h1 className="text-4xl font-bold mb-5 text-center">Historic Moments</h1>

      {/* Search Input */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search Historic moments"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full lg:w-1/2 p-3 px-6 border bg-[#292a2b6e] rounded-full border-1 border-[#585858ab] text-white my-10"
        />
      </div>

      {/* Historic Moments*/}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {paginatedHistory.length > 0 ? (paginatedHistory.map((hist) => (
          <HistoryItem key={hist.id} item={hist} />
        ))) : (          <div className="text-center text-gray-500 col-span-1 md:col-span-3">
        No Historic Moment match your search criteria.
      </div>)}
      </div>

      {/* Pagination Controls */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        goToNextPage={goToNextPage}
        goToPreviousPage={goToPreviousPage}
        goToPage={goToPage}
      />
    </div>
  );
};

export default History;
