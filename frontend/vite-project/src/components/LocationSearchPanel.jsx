import React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { FaLocationDot } from "react-icons/fa6";

function LocationSearchPanel({ suggestions, setPickup, setDestination, activeField }) {
  const handleSuggestionClick = (suggestion) => {
    if (activeField === "pickup") {
      setPickup(suggestion);
    } else if (activeField === "destination") {
      setDestination(suggestion);
    }
  };

  return (
    <>
      <div>
        {suggestions.length === 0 ? (
          // Render skeletons when suggestions are empty
          <Box sx={{ width: "100%" , mt:4 }} className="flex flex-col items-center ">
            <Skeleton variant="rectangular" height={50}  className="w-[87%]" animation="wave" sx={{ borderRadius: 1, marginBottom: 2 }}  />
            <Skeleton variant="rectangular" height={50} animation="wave" className="w-[87%]" sx={{ borderRadius: 1, marginBottom: 2 }} />
            <Skeleton variant="rectangular" height={50} animation="wave" className="w-[87%]" sx={{ borderRadius: 1, marginBottom: 2 }} />
            <Skeleton variant="rectangular" height={50} animation="wave" className="w-[87%]" sx={{ borderRadius: 1, marginBottom: 2 }} />
            <Skeleton variant="rectangular" height={50} animation="wave" className="w-[87%]" sx={{ borderRadius: 1, marginBottom: 2 }} />
            
          </Box>
        ) : (
          // Render suggestions when available
          suggestions.map((location, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-100 gap-5 mb-3 mt-5 rounded-xl p-3"
              onClick={() => handleSuggestionClick(location)}
            >
              <div>
                <p className="bg-gray-300 p-2 rounded-full">
                  <FaLocationDot className=" " />
                </p>
              </div>
              <div>
                <h3 className="font-bold">{location}</h3>
                <h6>{location.address}</h6>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default LocationSearchPanel;
