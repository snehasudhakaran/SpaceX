import React from "react";

const UpcomingLaunchItem = ({ launch }) => {
  return (
    <div className="border bg-[#292a2b6e] border-1 border-[#585858ab] p-4 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">Launch Name: {launch.name}</h3>
      <p className="text-lg mb-2">
        Date: {new Date(launch.date_utc).toUTCString()}
      </p>
      <p className="text-lg ">Flight Number: {launch.flight_number}</p>
      {launch.links.webcast && (
        <a
          href={launch.links.webcast}
          target="__blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          Click to view Mission Webcast
        </a>
      )}
      {launch.links.youtube_id ? (
        <iframe
          src={`https://www.youtube.com/embed/${launch.links.youtube_id}`}
          style={{ width: "100%" }}
          loading="lazy"
          className="mt-5"
          title="YouTube Video"
        />
      ) : (
        <p>Webcast preview not available</p>
      )}
    </div>
  );
};

export default UpcomingLaunchItem;
