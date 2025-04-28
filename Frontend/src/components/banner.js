import React from "react";
import Banner from "../images/background.png";
import Logo from "../images/logo-Photoroom.png";
const CustomHeader = () => {
  return (
    <div
      className="relative bg-cover bg-center p-10 text-white"
      style={{ backgroundImage: `url(${Banner})` }}
    >
      {/* Dark overlay to make text pop */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Content on top of background */}
      <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1 flex justify-center">
          <img
            src="https://images.squarespace-cdn.com/content/v1/5ec694eda6af3254350f52f7/1590931907710-BXNFKRMBG9WPDDWMFMZL/Jar+of+Joy_Logo_S-01+copy.png"
            alt="Find the joy"
            className="max-w-xs"
          />
        </div>

        {/* Middle Column */}
        <div className="flex-1 flex justify-center">
          <h1>
            <a id="logo" href="/home" data-supplied-ml="false">
              <img src={Logo} alt="Blogilates logo" className="max-w-[150px]" />
            </a>
          </h1>
        </div>

        {/* Right Column */}
        <div className="flex-1 flex justify-center">
          <p className="text-lg font-bold text-center">
            {new Date()
              .toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })
              .replace(",", "\n")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomHeader;
