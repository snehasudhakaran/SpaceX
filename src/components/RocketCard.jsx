import React from "react";
import { Link } from "react-router-dom";
import FallbackImage from "../assets/images/Elon-Musk1.jpg";

const RocketCard = React.memo(({ rocket }) => {
  const { name, description, flickr_images, id } = rocket;

  // Fallback values
  const defaultName = "Unnamed Rocket";
  const defaultDescription = "No description available for this rocket.";

  return (
    <Link to={`/rockets/${id}`}>
      <div className="flex flex-col h-full text-white p-4 rounded-lg bg-[#0b0f1f6e] border border-1 border-[#585858ab] transition-shadow duration-500">
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
            : defaultDescription}...
        </p>
        <span className="text-blue-700 underline self-start">
          Read More
        </span>
      </div>
    </Link>
  );
});

export default RocketCard;
