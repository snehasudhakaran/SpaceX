import React, { useState } from "react";
import LoadingSpinner from "../utils/loadingSpinner";

const LaunchItem = React.memo(({ launch }) => {
  const [iframeLoading, setIframeLoading] = useState(true);

  const {
    name,
    date_local,
    details,
    success,
    failures,
    static_fire_date_utc,
    cores,
    links,
  } = launch;

  return (
    <div className="bg-dark shadow-md p-4 grid grid-cols-1 md:grid-cols-2 gap-5 launch">
      <div>
        <h2 className="text-2xl font-bold mb-6">{name}</h2>
        <p>
          <strong className="font-extrabold">Launch Date:</strong>{" "}
          {new Date(date_local).toLocaleString()}
        </p>

        {/* Render Details */}
        {details && (
          <p className="mt-2">
            <strong className="font-extrabold">Details:</strong> {details}
          </p>
        )}

        {/* Failure Details */}
        {!success && failures.length > 0 && (
          <p className="text-red-500 mt-2">
            <strong className="font-extrabold">Failure Reason:</strong>{" "}
            {failures[0].reason} at {failures[0].time} seconds{" "}
            {failures[0].altitude &&
              `at an altitude of ${failures[0].altitude} miles`}
            .
          </p>
        )}

        {/* Static Fire Date */}
        {static_fire_date_utc && (
          <p className="mt-2">
            <strong className="font-extrabold">Static Fire Date:</strong>{" "}
            {new Date(static_fire_date_utc).toUTCString()}
          </p>
        )}

        {/* Core Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 mt-10">
          {cores?.length > 0 && (
            <div className="mt-2">
              <div className="mb-2">
                <strong className="font-extrabold">Core Info:</strong>
              </div>
              <p>Flight: {cores[0].flight}</p>
              <p>Reused: {cores[0].reused ? "Yes" : "No"}</p>
              <p>Landing Attempt: {cores[0].landing_attempt ? "Yes" : "No"}</p>
              {cores[0].landing_success !== null && (
                <p>
                  Landing Success: {cores[0].landing_success ? "Yes" : "No"}
                </p>
              )}
            </div>
          )}

          {/* Patch Image */}
          {links?.patch?.small && (
            <img
              src={links.patch.small}
              alt={`${name} mission patch`}
              className="mt-4"
              loading="lazy"
            />
          )}
        </div>
      </div>

      {/* Webcast */}
      <div className="p-4 border rounded border-1 border-[#585858ab] bg-[#585858ab]">
        {links?.youtube_id ? (
          <div className="mt-4">
            <span className="font-extrabold">Watch the Webcast: </span>
            {iframeLoading && <LoadingSpinner />}
            <iframe
              src={`https://www.youtube.com/embed/${links.youtube_id}`}
              style={{ width: "100%", height: "400px" }}
              loading="lazy"
              className="mt-3 border border-1 border-[#585858ab]"
              title="Launch webcast"
              onLoad={() => setIframeLoading(false)}
            ></iframe>
          </div>
        ) : (
          <p className="mt-2">Webcast temporarily not available</p>
        )}

        {/* Additional Links */}
        <div className="mt-4 text-center">
          {links?.wikipedia && (
            <a
              href={links.wikipedia}
              className="text-blue-500 underline mr-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              Wikipedia
            </a>
          )}
          {links?.article && (
            <a
              href={links.article}
              className="text-blue-500 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read Article
            </a>
          )}
        </div>
      </div>
    </div>
  );
});

export default LaunchItem;
