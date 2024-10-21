import React, { useEffect, useState } from "react";
import { getRocketById } from "../utils/spacexApi";
import { useParams, useNavigate } from "react-router-dom";
import Carousel from "../components/Carousel";
import FallbackImage from "../assets/images/Elon-Musk1.jpg";
import LoadingSpinner from "../utils/loadingSpinner";

// RocketDetailCard
const RocketDetailCard = ({ title, children }) => (
  <div className="p-4 border bg-[#292a2b6e] rounded-lg border-1 border-[#585858ab]">
    <h2 className="text-xl font-semibold mb-6">{title}</h2>
    {children}
  </div>
);

const RocketDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rocket, setRocket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRocket = async () => {
      try {
        const response = await getRocketById(id);
        setRocket(response.data);
      } catch (err) {
        setError("Failed to fetch rocket details.");
      } finally {
        setLoading(false);
      }
    };

    fetchRocket();
  }, [id]);

  if (loading) return <LoadingSpinner />;

  if (error) return <div className="text-white">{error}</div>;

  if (!rocket) return null;

  const {
    name,
    flickr_images,
    height,
    diameter,
    mass,
    stages,
    boosters,
    country,
    company,
    description,
    first_flight,
    active,
    success_rate_pct,
    cost_per_launch,
    landing_legs,
    payload_weights,
    first_stage,
    second_stage,
    engines,
    wikipedia,
  } = rocket;

  return (
    <div
      className="container mx-auto p-4 my-10"
      id="rocketPage"
      style={{ fontFamily: "Montserrat" }}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 p-1 pb-2 px-3 border bg-[#292a2b6e] rounded-lg border-1 border-[#585858ab]"
      >
        &lt; back
      </button>

      <h1 className="text-4xl font-bold mb-10">{name}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 gap-y-2">
        {/* Carousel */}
        <div className="col-span-1 md:col-span-1">
          <Carousel
            images={flickr_images.length > 0 ? flickr_images : [FallbackImage]}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 gap-y-5 mb-8">
          <RocketDetailCard title="Specifications">
            <ul className="list-disc list-inside mb-4">
              <li className="mb-2">
                <span className="font-medium">Height:</span> {height.meters} m (
                {height.feet} ft)
              </li>
              <li className="mb-2">
                <span className="font-medium">Diameter:</span> {diameter.meters}{" "}
                m ({diameter.feet} ft)
              </li>
              <li className="mb-2">
                <span className="font-medium">Mass:</span>{" "}
                {mass.kg.toLocaleString()} kg ({mass.lb.toLocaleString()} lbs)
              </li>
              <li className="mb-2">
                <span className="font-medium">Stages:</span> {stages}
              </li>
              <li className="mb-2">
                <span className="font-medium">Boosters:</span> {boosters}
              </li>
              <li className="mb-2">
                <span className="font-medium">Country:</span> {country}
              </li>
              <li>
                <span className="font-medium">Company:</span> {company}
              </li>
            </ul>
          </RocketDetailCard>

          <RocketDetailCard title="Landing Legs">
            <ul className="list-disc list-inside mb-4">
              <li className="mb-2">
                <span className="font-medium">Number:</span>{" "}
                {landing_legs.number}
              </li>
              <li className="mb-2">
                <span className="font-medium">Material:</span>{" "}
                {landing_legs.material || "Not specified"}
              </li>
            </ul>
          </RocketDetailCard>

          <RocketDetailCard title="Payload Weights">
            <ul className="list-disc list-inside mb-4">
              {payload_weights.map((payload) => (
                <li key={payload.id} className="mb-2">
                  <span className="font-medium">{payload.name}:</span>{" "}
                  {payload.kg.toLocaleString()} kg (
                  {payload.lb.toLocaleString()} lbs)
                </li>
              ))}
            </ul>
          </RocketDetailCard>
        </div>
      </div>

      {/* Rocket Description */}
      <p className="mb-10 text-lg">
        {description} This rocket, developed by {company}, had its first flight
        on {first_flight}. It is currently {active ? "active" : "inactive"} and
        has {stages} stages with {boosters} boosters. The rocket has a success
        rate of {success_rate_pct}% and costs about $
        {cost_per_launch.toLocaleString()} per launch. It was first launched
        from {country}.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-20">
        <RocketDetailCard title="First Stage">
          <p className="mb-4">
            The first stage of the {name} boasts impressive thrust capabilities,
            delivering{" "}
            <span className="font-bold">
              {first_stage.thrust_sea_level.kN} kN
            </span>{" "}
            (
            <span className="font-bold">
              {first_stage.thrust_sea_level.lbf} lbf
            </span>
            ) at sea level and{" "}
            <span className="font-bold">{first_stage.thrust_vacuum.kN} kN</span>{" "}
            (
            <span className="font-bold">
              {first_stage.thrust_vacuum.lbf} lbf
            </span>
            ) in a vacuum. It consumes{" "}
            <span className="font-bold">
              {first_stage.fuel_amount_tons} tons
            </span>{" "}
            of fuel and operates with{" "}
            <span className="font-bold">{first_stage.engines}</span> engine(s),
            achieving a burn time of{" "}
            <span className="font-bold">
              {first_stage.burn_time_sec} seconds
            </span>
            . Notably, this stage is{" "}
            <span className="font-bold">
              {first_stage.reusable ? "reusable" : "not reusable"}
            </span>
            .
          </p>
        </RocketDetailCard>

        <RocketDetailCard title="Second Stage">
          <p className="mb-4">
            The second stage generates a thrust of{" "}
            <span className="font-bold">{second_stage.thrust.kN} kN</span> (
            <span className="font-bold">{second_stage.thrust.lbf} lbf</span>)
            while utilizing{" "}
            <span className="font-bold">
              {second_stage.fuel_amount_tons} tons
            </span>{" "}
            of fuel. It has a burn duration of{" "}
            <span className="font-bold">
              {second_stage.burn_time_sec} seconds
            </span>{" "}
            and also employs{" "}
            <span className="font-bold">{second_stage.engines}</span> engine(s).
            Its payload option includes a{" "}
            <span className="font-bold">{second_stage.payloads.option_1}</span>.
          </p>
        </RocketDetailCard>

        <RocketDetailCard title="Engines">
          <p className="mb-4">
            The {name} is equipped with{" "}
            <span className="font-bold">{engines.type}</span> engines of version{" "}
            <span className="font-bold">{engines.version}</span> in a{" "}
            <span className="font-bold">{engines.layout}</span> layout. These
            engines provide{" "}
            <span className="font-bold">{engines.thrust_sea_level.kN} kN</span>{" "}
            (
            <span className="font-bold">
              {engines.thrust_sea_level.lbf} lbf
            </span>
            ) thrust at sea level and{" "}
            <span className="font-bold">{engines.thrust_vacuum.kN} kN</span> (
            <span className="font-bold">{engines.thrust_vacuum.lbf} lbf</span>)
            in a vacuum. The engines utilize{" "}
            <span className="font-bold">{engines.propellant_1}</span> and{" "}
            <span className="font-bold">{engines.propellant_2}</span> as
            propellants, achieving a thrust-to-weight ratio of{" "}
            <span className="font-bold">{engines.thrust_to_weight}</span>.
          </p>
        </RocketDetailCard>
      </div>

      {/* Wikipedia link */}
      <p className="mb-4">
        For more information, visit the{" "}
        <a
          href={wikipedia}
          className="text-blue-500 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Wikipedia page
        </a>
        .
      </p>
    </div>
  );
};

export default RocketDetails;
