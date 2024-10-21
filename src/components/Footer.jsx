import React from "react";

const Footer = () => {
  return (
    <footer
      className="bg-black text-white py-6 mt-10 border border-1 border-[#585858ab] bg-[#292a2b6e]"
      style={{ fontFamily: "Montserrat" }}
    >
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 ">
        {/* Footer Links */}
        <div className="flex space-x-6 ">
          <a
            href="https://www.spacex.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            SpaceX Website
          </a>
          <a
            href="https://twitter.com/SpaceX"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            Twitter
          </a>
          <a
            href="https://www.flickr.com/photos/spacex/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            Flickr
          </a>
        </div>

        {/* Footer Text */}
        <p className="text-center text-sm">
          © {new Date().getFullYear()} SpaceX Info | All Rights Reserved.
        </p>
        <p className="text-center text-xs ">
          This is a fan page and is not affiliated with SpaceX.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
