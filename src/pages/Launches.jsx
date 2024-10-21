import React, { useEffect, useState } from "react";
import { getLaunchData } from "../utils/spacexApi";
import LaunchItem from "../components/LaunchItem";
import PaginationControls from "../components/PaginationControls";
import LoadingSpinner from "../utils/loadingSpinner";
import { usePagination } from "../hooks/usePagination";

const Launches = () => {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchLaunches = async () => {
      try {
        const response = await getLaunchData();
        setLaunches(response.data);
      } catch (err) {
        setError("Failed to fetch launch data");
      } finally {
        setLoading(false);
      }
    };

    fetchLaunches();
  }, []);

  const filteredLaunches = launches.filter((launch) =>
    launch.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const {
    currentData: paginatedLaunches,
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    goToPage,
  } = usePagination(filteredLaunches, 10); 

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-white">{error}</div>;

  return (
    <div
      className="container mx-auto p-4 my-10"
      style={{ fontFamily: "Montserrat" }}
    >
      <h1 className="text-4xl font-bold mb-5 text-center">
        Launches by SpaceX
      </h1>

      {/* Search Input */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search Launch missions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
          className="w-full lg:w-1/2 p-3 px-6 border bg-[#292a2b6e] rounded-full border-1 border-[#585858ab] text-white my-10"
        />
      </div>

      <div className="grid grid-cols-1 gap-10">
        {paginatedLaunches.length > 0 ? (
          paginatedLaunches.map((launch) => (
            <LaunchItem key={launch.id} launch={launch} />
          ))
        ) : (
          <div className="text-center text-gray-500 col-span-1 md:col-span-3">
            No launches match your search criteria.
          </div>
        )}
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

export default Launches;
