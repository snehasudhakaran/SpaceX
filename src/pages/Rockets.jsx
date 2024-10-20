import React, { useEffect, useState } from "react";
import { getRockets } from "../utils/spacexApi";
import RocketCard from "../components/RocketCard";
import LoadingSpinner from "../utils/loadingSpinner";

function Rockets() {
  const [rockets, setRockets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); 

  useEffect(() => {
    const fetchRockets = async () => {
      try {
        const response = await getRockets();
        setRockets(response.data);
      } catch (err) {
        setError("Failed to fetch rockets");
      } finally {
        setLoading(false);
      }
    };

    fetchRockets();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-center text-white">{error}</div>;
  }

  // Filtering function for rockets based on the search term
  const filteredRockets = rockets.filter((rocket) =>
    rocket.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 my-10">
      <h1 className="text-4xl font-bold text-center mb-4">SpaceX Rockets</h1>
      <p className="mb-5 text-center ">
        Below are the list of rockets launched by SpaceX.
      </p>

      {/* Search Input */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search Rockets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full lg:w-1/2 p-3 px-6 border bg-[#292a2b6e] rounded-full border-1 border-[#585858ab] text-white my-10"
        />
      </div>

      {/* Filtered Rockets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 gap-y-10">
        {filteredRockets.length > 0 ? (
          filteredRockets.map((rocket) => (
            <RocketCard key={rocket.id} rocket={rocket} />
          ))
        ) : (
          <div className="text-center text-gray-500 col-span-1 md:col-span-3">
            No rockets match your search criteria.
          </div>
        )}
      </div>
    </div>
  );
}

export default Rockets;
