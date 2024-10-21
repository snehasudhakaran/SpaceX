import React from "react";
import {
  FaRocket,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaInfoCircle,
} from "react-icons/fa";

const StarlinkCard = ({ starlink }) => {
  const {
    spaceTrack,
    version,
    height_km,
    latitude,
    longitude,
    velocity_kms,
    launch,
    decay_date,
  } = starlink;

  return (
    <div className="bg-gray-950 rounded-lg  p-6 transition-transform transform  border border-gray-200">
      <div className="absolute top-2 right-2 text-gray-400">
        <FaInfoCircle size={30} />
      </div>
      <h3 className="text-3xl font-bold text-blue-300 mb-2">
        {spaceTrack.OBJECT_NAME}
      </h3>
      <p className="text-lg text-sky-700 mb-4">
        <strong>Version:</strong> {version} | <strong>Launch:</strong> {launch}
      </p>
      <div className="flex flex-col md:flex-row justify-between mb-4">
        <div className="flex-1 mr-2">
          <p className="flex items-center text-gray-600 mb-1">
            <FaRocket className="mr-2" /> <strong>Height:</strong>{" "}
            {height_km ? `${height_km} km` : "N/A"}
          </p>
          <p className="flex items-center text-gray-600">
            <strong>NORAD ID:</strong> {spaceTrack.NORAD_CAT_ID}
          </p>
          <p className="flex items-center text-gray-600">
            <strong>RCS Size:</strong> {spaceTrack.RCS_SIZE}
          </p>
          <p className="flex items-center text-gray-600">
            <strong>Country Code:</strong> {spaceTrack.COUNTRY_CODE}
          </p>
        </div>
        <div className="flex-1">
          <p className="flex items-center text-gray-600 mb-1">
            <strong>Velocity:</strong>{" "}
            {velocity_kms ? `${velocity_kms} km/s` : "N/A"}
          </p>
          <p className="flex items-center text-gray-600">
            <FaMapMarkerAlt className="mr-2" /> <strong>Location:</strong>{" "}
            {latitude && longitude ? `${latitude}°, ${longitude}°` : "N/A"}
          </p>
          <p className="flex items-center text-gray-600">
            <strong>Epoch:</strong>{" "}
            {new Date(spaceTrack.EPOCH).toLocaleString()}
          </p>
        </div>
      </div>
      <div className="border-t border-gray-300 my-4"></div>
      <p className="text-gray-700 mb-2">
        <strong>Decay Date:</strong>{" "}
        {decay_date ? new Date(decay_date).toLocaleDateString() : "N/A"}
      </p>
      <div className="mt-4">
        <h4 className="text-lg font-bold mb-2">Orbit Details:</h4>
        <p className="text-sm text-gray-500">
          <strong>Mean Motion:</strong> {spaceTrack.MEAN_MOTION} |
          <strong> Eccentricity:</strong> {spaceTrack.ECCENTRICITY} |
          <strong> Inclination:</strong> {spaceTrack.INCLINATION}°
        </p>
        <p className="text-sm text-gray-500">
          <strong>Period:</strong> {spaceTrack.PERIOD} mins |
          <strong> Apogee:</strong> {spaceTrack.APOAPSIS} km |
          <strong> Perigee:</strong> {spaceTrack.PERIAPSIS} km
        </p>
        <p className="text-sm text-gray-500">
          <strong>Argument of Pericenter:</strong>{" "}
          {spaceTrack.ARG_OF_PERICENTER}° |
          <strong>RA of Ascending Node:</strong> {spaceTrack.RA_OF_ASC_NODE}°
        </p>
        <p className="text-sm text-gray-500">
          <strong>Mean Anomaly:</strong> {spaceTrack.MEAN_ANOMALY}° |
          <strong>Decay Status:</strong> {spaceTrack.DECAYED ? "Yes" : "No"}
        </p>
      </div>
      <div className="border-t border-gray-300 my-4"></div>
      <h4 className="text-lg font-bold mb-2">Additional Info:</h4>
      <p className="text-sm text-gray-500">
        <strong>Ephemeris Type:</strong> {spaceTrack.EPHEMERIS_TYPE} |
        <strong>Element Set No:</strong> {spaceTrack.ELEMENT_SET_NO}
      </p>
      <p className="text-sm text-gray-500">
        <strong>Creation Date:</strong>{" "}
        {new Date(spaceTrack.CREATION_DATE).toLocaleDateString()} |
        <strong>Comment:</strong> {spaceTrack.COMMENT}
      </p>
      <div className="border-t border-gray-300 my-4"></div>
      <p className="text-sm text-gray-500">
        <strong>Center Name:</strong> {spaceTrack.CENTER_NAME} |
        <strong>Reference Frame:</strong> {spaceTrack.REF_FRAME}
      </p>
      <p className="text-sm text-gray-500">
        <strong>Time System:</strong> {spaceTrack.TIME_SYSTEM} |
        <strong>Mean Element Theory:</strong> {spaceTrack.MEAN_ELEMENT_THEORY}
      </p>
    </div>
  );
};

export default StarlinkCard;
