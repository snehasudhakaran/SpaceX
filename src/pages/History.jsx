import React, { useEffect, useState } from "react";
import { getHistory } from "../utils/spacexApi";
import HistoryItem from "../components/HistoryItem";
import LoadingSpinner from "../utils/loadingSpinner";

function History() {
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await getHistory();
        setHistory(response.data);
        setFilteredHistory(response.data);
      } catch (err) {
        setError("Failed to fetch history data.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = history.filter(
      (hist) =>
        hist.title.toLowerCase().includes(term) ||
        hist.details.toLowerCase().includes(term)
    );
    setFilteredHistory(filtered);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-white text-center">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4 my-10" id="history_sec">
      <h1 className="text-4xl font-bold mb-5 text-center">Historic Moments</h1>

      {/* Search Input for filtering */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search historic moments..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full lg:w-1/2 p-3 px-6 border bg-[#292a2b6e] rounded-full border-1 border-[#585858ab] text-white my-10"
        />
      </div>

      <div className="block grid grid-cols-1 lg:grid-cols-2 gap-10">
        {filteredHistory.length > 0 ? (
          filteredHistory.map((hist) => (
            <HistoryItem key={hist.id} item={hist} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-1 md:col-span-3">
            No historic moments found.
          </p>
        )}
      </div>
    </div>
  );
}

export default History;
