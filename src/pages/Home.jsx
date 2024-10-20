import React, { useEffect, useState } from 'react';
import { getCompanyData, getLaunchData } from '../utils/spacexApi';
import musk from '../assets/images/Elon-Musk1.jpg';
import LoadingSpinner from '../utils/loadingSpinner';

function Home() {
    const [companyData, setCompanyData] = useState(null);
    const [upcomingLaunches, setUpcomingLaunches] = useState([]);

    useEffect(() => {
        getCompanyData().then((response) => {
            setCompanyData(response.data);
        });

        getLaunchData().then(response => {
            const upcoming = response.data.filter(launch => launch.upcoming);
            setUpcomingLaunches(upcoming);
        });


    }, []);
    if (!companyData) {
        return <LoadingSpinner/>;
    }

    return (
        <>
            <div className="container mx-auto p-4">
                <h1 className="text-4xl font-extrabold mb-4">{companyData.name}</h1>
                <p className="mb-4 text-lg">{companyData.summary}</p>

                <h2 className="text-2xl font-semibold mb-2">Company Overview</h2>
                <p className="mb-4 text-lg">
                    Founded by <strong>{companyData.founder}</strong> in <strong>{companyData.founded}</strong>, SpaceX is
                    headquartered at {companyData.headquarters.address}, {companyData.headquarters.city}, {companyData.headquarters.state}.
                    With a current valuation of <strong>${(companyData.valuation / 1_000_000_000).toLocaleString()} billion</strong>,
                    SpaceX employs approximately <strong>{companyData.employees.toLocaleString()}</strong> people. The company operates
                    <strong> {companyData.vehicles}</strong> rocket vehicles, with <strong>{companyData.launch_sites}</strong> launch sites and
                    <strong> {companyData.test_sites}</strong> test sites globally. SpaceX is known for its revolutionary advancements in
                    space technology, aiming to enable human life on other planets.
                </p>

                <h2 className="text-4xl font-extrabold mb-7">Leadership</h2>
                <img src={musk} className='rounded-3xl shadow-sm shadow-neutral-200 mx-auto mb-5'/>
                <p className="mb-4 text-lg">
                    The leadership team includes <strong>{companyData.ceo}</strong> as the CEO and CTO, with <strong>{companyData.coo}</strong> as
                    the COO and <strong>{companyData.cto_propulsion}</strong> as the CTO of Propulsion. The visionary leadership of Elon Musk
                    has been a driving force behind SpaceX's groundbreaking achievements.
                </p>

                <h2 className="text-2xl font-semibold mb-2">Headquarters</h2>
                <p className="mb-4 text-lg">
                    SpaceX's headquarters is located at {companyData.headquarters.address} in {companyData.headquarters.city}, {companyData.headquarters.state}.
                </p>

                <h2 className="text-2xl font-semibold mb-2">Links</h2>
                <ul className="list-disc list-inside mb-4 text-lg">
                    <li>
                        <a href={companyData.links.website} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                            Official Website
                        </a>
                    </li>
                    <li>
                        <a href={companyData.links.flickr} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                            Flickr
                        </a>
                    </li>
                    <li>
                        <a href={companyData.links.twitter} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                            Twitter
                        </a>
                    </li>
                    <li>
                        <a href={companyData.links.elon_twitter} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                            Elon Musk's Twitter
                        </a>
                    </li>
                </ul>
            </div>

            {/* Upcoming Launches Section */}
            <div className="container mx-auto p-4">
                <h2 className="text-4xl font-bold mb-10">Upcoming Launches</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {upcomingLaunches.map((launch) => (
                        <div key={launch.id} className="border bg-[#292a2b6e] rounded-full border-1 border-[#585858ab] p-4 rounded-lg shadow-lg">
                            <h3 className="text-xl font-bold">Launch Name: {launch.name}</h3>
                            <p className="text-lg">Date: {new Date(launch.date_utc).toUTCString()}</p>
                            <p className="text-lg">Flight Number: {launch.flight_number}</p>
                            <a href={launch.links.webcast} target='__blank' rel="noopener noreferrer">Click to view Mission Webcast</a>
                            <iframe src={`https://www.youtube.com/embed/${launch.links.youtube_id}`} style={{width: '100%'}} loading='lazy' className='mt-3'></iframe>
                        </div>
                    ))}
                </div>
            </div>

            {/* Related News Section */}
            <div className="container mx-auto p-4">
                <h2 className="text-4xl font-extrabold mb-4">Related News</h2>
                {/* Add static or dynamic news content here */}
            </div>
        </>
    )
}

export default Home