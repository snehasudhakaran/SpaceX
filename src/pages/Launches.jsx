import React, { useEffect, useState } from 'react';
import { getLaunchData } from '../utils/spacexApi';
import LoadingSpinner from '../utils/loadingSpinner';

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
        setError('Failed to fetch launch data');
      } finally {
        setLoading(false);
      }
    };

    fetchLaunches();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-center text-white">{error}</div>;
  }

  // Filtering function for rockets based on the search term
  const filteredLaunches = launches.filter((launch) =>
    launch.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 my-10">
      <h1 className="text-4xl font-bold mb-5 text-center">Launches by SpaceX</h1>

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

      <div className="grid grid-cols-1 gap-10">
        {filteredLaunches.length > 0 ? (
          filteredLaunches.map(launch => ( // Use filteredLaunches here
            <div key={launch.id} className="bg-dark shadow-md p-4 grid grid-cols-1 md:grid-cols-2 gap-5 launch">
              <div>
                <h2 className="text-2xl font-bold mb-6">{launch.name}</h2>
                <p><strong className="font-extrabold">Launch Date:</strong> {new Date(launch.date_local).toLocaleString()}</p>

                {/* Render Details */}
                {launch.details && (
                  <p className="mt-2"><strong className="font-extrabold">Details:</strong> {launch.details}</p>
                )}

                {/* Failure Details */}
                {!launch.success && launch.failures.length > 0 && (
                  <p className="text-red-500 mt-2">
                    <strong className="font-extrabold">Failure Reason:</strong> {launch.failures[0].reason} at {launch.failures[0].time} seconds at an altitude of {launch.failures[0].altitude ? `${launch.failures[0].altitude} miles` : "'Unavailable info'"}.
                  </p>
                )}

                {/* Static Fire Date */}
                {launch.static_fire_date_utc && (
                  <p className="mt-2">
                    <strong className="font-extrabold">Static Fire Date:</strong> {new Date(launch.static_fire_date_utc).toUTCString()}
                  </p>
                )}

                {/* Core Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 mt-10">
                  {launch.cores?.length > 0 && (
                    <div className="mt-2">
                      <div className="mb-2">
                        <strong className="font-extrabold">Core Info:</strong>
                      </div>
                      <p>Flight: {launch.cores[0].flight}</p>
                      <p>Reused: {launch.cores[0].reused ? 'Yes' : 'No'}</p>
                      <p>Landing Attempt: {launch.cores[0].landing_attempt ? 'Yes' : 'No'}</p>
                      {launch.cores[0].landing_success !== null && (
                        <p>Landing Success: {launch.cores[0].landing_success ? 'Yes' : 'No'}</p>
                      )}
                    </div>
                  )}

                  {/* Patch Image */}
                  {launch.links.patch?.small && (
                    <img src={launch.links.patch.small} alt={`${launch.name} mission patch`} className="mt-4" loading="lazy" />
                  )}
                </div>
              </div>

              <div className="p-4 border rounded border-1 border-[#585858ab] bg-[#585858ab]">
                {/* Webcast */}
                {launch.links.webcast && launch.links.youtube_id && (
                  <div className="mt-4">
                    <span className="font-extrabold">Watch the Webcast: </span>
                    <iframe
                      src={`https://www.youtube.com/embed/${launch.links.youtube_id}`}
                      style={{ width: '100%', height: '400px' }}
                      loading="lazy"
                      className="mt-3 border border-1 border-[#585858ab]"
                      title="Launch webcast"
                    ></iframe>
                  </div>
                )}

                {/* Additional Links */}
                <div className="mt-4 text-center">
                  {launch.links.wikipedia && (
                    <a href={launch.links.wikipedia} className="text-blue-500 underline mr-4" target="_blank" rel="noopener noreferrer">
                      Wikipedia
                    </a>
                  )}
                  {launch.links.article && (
                    <a href={launch.links.article} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                      Read Article
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 col-span-1 md:col-span-3">
            No Launches match your search criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default Launches;
