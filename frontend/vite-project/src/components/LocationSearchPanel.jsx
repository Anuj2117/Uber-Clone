import React from "react";
import { FaLocationDot } from "react-icons/fa6";

function LocationSearchPanel({
  suggestions,
  setVehiclepanelOpen,
  setPanelOpen,
  setPickup,
  setDestination,
  activeField,
}) {

  const handleSuggestionClick = (suggestion) => {
    if (activeField === "pickup") {
      setPickup(suggestion);
    } else if (activeField === "destination") {
      setDestination(suggestion);
    }
  };

  return (
    <>
      <div >
        {suggestions.map((location, index) => (
          <div
            key={index}
            className="flex items-center bg-gray-100 gap-6 mb-3 mt-3 rounded-xl p-2"
            onClick={() => handleSuggestionClick(location)}
          >
            <div>
              <p className="bg-gray-300 p-2 rounded-full">
                {" "}
                <FaLocationDot className=" " />
              </p>
            </div>
            <div>
              <h3 className="font-bold">{location.name}</h3>
              <h6>{location}</h6>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default LocationSearchPanel;
