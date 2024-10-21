import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  getCompanyData,
  getLaunchData,
  getStarlinkData,
} from "../utils/spacexApi";
import musk from "../assets/images/Elon-Musk1.jpg";
import bannerImage from "../assets/images/photo-1518364538800-6bae3c2ea0f2.jpg";
import LoadingSpinner from "../utils/loadingSpinner";
import UpcomingLaunchItem from "../components/UpcomingLaunchItem";
import StarlinkCard from "../components/StarlinkCard";

const Home = () => {
  const [companyData, setCompanyData] = useState(null);
  const [upcomingLaunches, setUpcomingLaunches] = useState([]);
  const [starlinkData, setStarlinkData] = useState([]);
  const [showMoreLaunches, setShowMoreLaunches] = useState(false);
  const [showMoreStarlink, setShowMoreStarlink] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [companyRes, launchRes, starlinkRes] = await Promise.all([
          getCompanyData(),
          getLaunchData(),
          getStarlinkData(),
        ]);

        setCompanyData(companyRes.data);
        setUpcomingLaunches(launchRes.data.filter((launch) => launch.upcoming));
        setStarlinkData(starlinkRes.data.slice(0, 10));
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const visibleLaunches = useMemo(
    () => (showMoreLaunches ? upcomingLaunches : upcomingLaunches.slice(0, 3)),
    [showMoreLaunches, upcomingLaunches]
  );

  const visibleStarlinks = useMemo(
    () => (showMoreStarlink ? starlinkData : starlinkData.slice(0, 2)),
    [showMoreStarlink, starlinkData]
  );

  const toggleShowMoreLaunches = useCallback(
    () => setShowMoreLaunches((prev) => !prev),
    []
  );

  const toggleShowMoreStarlink = useCallback(
    () => setShowMoreStarlink((prev) => !prev),
    []
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {/* Banner Image */}
      <div className="relative w-full h-[100vh] overlay">
        <img
          src={bannerImage}
          alt="SpaceX Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 z-4 w-full h-full flex flex-col justify-center items-end z-10 text-white bg-black bg-opacity-50">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">{companyData?.name}</h1>
            <p className="text-base text-center max-w-2xl p-4">
              {companyData?.summary}
            </p>
          </div>
        </div>
      </div>

      {/* Company Overview Section */}
      <div
        className="container mx-auto p-4 my-10"
        style={{ fontFamily: "Montserrat" }}
      >
        <h2 className="text-4xl font-bold mb-6">Company Overview</h2>
        {companyData && (
          <p className="mb-4 text-lg">
            Founded by <strong>{companyData.founder}</strong> in{" "}
            <strong>{companyData.founded}</strong>, SpaceX is headquartered at{" "}
            {companyData.headquarters.address}, {companyData.headquarters.city},{" "}
            {companyData.headquarters.state}. With a current valuation of{" "}
            <strong>
              ${(companyData.valuation / 1_000_000_000).toLocaleString()}{" "}
              billion
            </strong>
            , SpaceX employs approximately{" "}
            <strong>{companyData.employees.toLocaleString()}</strong> people.
            The company operates
            <strong> {companyData.vehicles}</strong> rocket vehicles, with{" "}
            <strong>{companyData.launch_sites}</strong> launch sites and
            <strong> {companyData.test_sites}</strong> test sites globally.
          </p>
        )}

        <div className="mt-10">
          <h2 className="text-4xl font-bold mb-7">Leadership</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <img src={musk} className="rounded-2xl h-full" alt="Elon Musk" />
            </div>
            <div className="border border-1 border-[#585858ab] bg-[#292a2b6e] p-6 rounded-2xl">
              {companyData && (
                <>
                  <p className="mb-4">
                    The leadership team includes{" "}
                    <strong>{companyData.ceo}</strong> as the CEO and CTO, with{" "}
                    <strong>{companyData.coo}</strong> as COO and{" "}
                    <strong>{companyData.cto_propulsion}</strong> as CTO of
                    Propulsion.
                  </p>

                  <h2 className="text-2xl font-semibold mb-2">Headquarters</h2>
                  <p className="mb-4 text-lg">
                    SpaceX's headquarters is located at{" "}
                    {companyData.headquarters.address} in{" "}
                    {companyData.headquarters.city},{" "}
                    {companyData.headquarters.state}.
                  </p>

                  <h2 className="text-2xl font-semibold mb-2">Links</h2>
                  <ul className="list-disc list-inside mb-4 text-lg">
                    <li>
                      <a
                        href={companyData.links.website}
                        className="text-blue-500 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Official Website
                      </a>
                    </li>
                    <li>
                      <a
                        href={companyData.links.flickr}
                        className="text-blue-500 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Flickr
                      </a>
                    </li>
                    <li>
                      <a
                        href={companyData.links.twitter}
                        className="text-blue-500 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Twitter
                      </a>
                    </li>
                    <li>
                      <a
                        href={companyData.links.elon_twitter}
                        className="text-blue-500 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Elon Musk's Twitter
                      </a>
                    </li>
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Launches Section */}
      <div
        className="container mx-auto p-4"
        style={{ fontFamily: "Montserrat" }}
      >
        <h2 className="text-4xl font-bold mb-10">Upcoming Launches</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleLaunches.map((launch) => (
            <UpcomingLaunchItem key={launch.id} launch={launch} />
          ))}
        </div>
        {upcomingLaunches.length > 3 && (
          <div className="w-full flex justify-center mt-6">
            <button
              className="px-4 py-2 bg-[#292a2b6e] border-1 border-[#767676ab] text-white rounded-lg"
              onClick={toggleShowMoreLaunches}
            >
              {showMoreLaunches ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
      </div>

      {/* Starlink Satellites Section */}
      <div className="container mx-auto p-4 my-10">
        <h2 className="text-4xl font-bold mb-6">
          Starlink Satellites and Orbits
        </h2>
        <p className="mb-6">
          SpaceX is deploying the Starlink satellite constellation to provide
          satellite Internet access across the globe. Here are some recent
          updates on Starlink's deployment:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {visibleStarlinks.map((starlink) => (
            <StarlinkCard key={starlink.id} starlink={starlink} />
          ))}
        </div>
        {starlinkData.length > 2 && (
          <div className="w-full flex justify-center mt-6">
            <button
              className="px-4 py-2 bg-[#292a2b6e] border-1 border-[#767676ab] text-white rounded-lg"
              onClick={toggleShowMoreStarlink}
            >
              {showMoreStarlink ? "Show Less" : "Show More"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
