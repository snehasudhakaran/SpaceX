import React, { useState } from "react";
import LoadingSpinner from "../utils/loadingSpinner";

const HistoryItem = React.memo(({ item }) => {
  
  // Fallback values 
  const title = item.title || "No title available";
  const details = item.details || "Details are unavailable for this event.";
  const articleLink = item.links?.article || null; 
  const eventDate = item.event_date_utc ? new Date(item.event_date_utc).toUTCString() : "Date not available";

  const [iframeLoading, setIframeLoading] = useState(true);

  return (
    <div key={item.id} className='p-4 border bg-[#292a2b6e] rounded-lg border-1 border-[#585858ab]'>
      <div>
        <span className='text-2xl font-extrabold'>{title} - </span>
        <p style={{ fontFamily: "Montserrat" }} className='text-base font-medium mt-4 mb-6'>{details.slice(0, 100)}...</p>
        <p>Happened on: {eventDate}</p>
      </div>

      {articleLink ? (
        <div>
          <a href={articleLink} target='__blank' className='text-blue-500 hover:underline'>Read about it</a>
          
          <div className="mt-6"></div>
          
          {/* spinner */}
          {iframeLoading && (
           <LoadingSpinner/>
          )}
          
          <iframe 
            loading='lazy' 
            src={articleLink} 
            scrolling='no' 
            style={{ width: '100%', height: '500px', border: 'none' }}
            onLoad={() => setIframeLoading(false)} 
          ></iframe>
        </div>
      ) : (
        <p className='text-gray-500 italic'>Article not available</p> 
      )}
    </div>
  );
});

export default HistoryItem;
