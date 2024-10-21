import React from "react";
import { Link } from "react-router-dom";
import FallbackImage from "../assets/images/Elon-Musk1.jpg";

const RocketCard = React.memo(({ rocket }) => {
  const { name, description, flickr_images, id } = rocket;

  const defaultName = "Unnamed Rocket";
  const defaultDescription = "No description available for this rocket.";

  return (
    <Link to={`/rockets/${id}`}>
      <div
        className="bg-gray-950 text-white p-4 rounded-lg shadow-sm shadow-sky-900 hover:shadow-sky-300"
        style={{ transition: "box-shadow 500ms linear" }}
      >
        <img
          src={
            flickr_images && flickr_images.length > 0
              ? flickr_images[0]
              : FallbackImage
          }
          alt={name || defaultName}
          className="w-full h-64 object-cover rounded-md"
          loading="lazy"
        />
        <h2 className="text-xl mt-5 mb-2 font-bold">{name || defaultName}</h2>
        <p className="mb-5 flex-grow">
          {description && description.trim()
            ? description.substring(0, 100)
            : defaultDescription}
          ...
        </p>
        <span className="text-blue-700 underline self-start">Read More</span>
      </div>
    </Link>
  );
});

export default RocketCard;
