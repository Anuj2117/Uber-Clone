import React, { useRef, useState } from "react";
import { Link, useLocation } from 'react-router-dom'
import map from "../assets/map.png";
import FinishRide from "../components/FinishRide";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import LiveTracking from "../components/LiveTracking"
function CaptainRiding() {

  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelref = useRef(null);

  const location = useLocation()
  const rideData = location.state?.ride
  
  useGSAP(
    function () {
      if (finishRidePanel) {
        gsap.to(finishRidePanelref.current, {
          transform: "translateY(0)",
          height: "90%",
        });
      } else {
        gsap.to(finishRidePanelref.current, {
          transform: "translateY(100%)",
          height: "0",
        });
      }
    },
    [finishRidePanel]
  );

  return (
    <>
      <div>
        <div className="w-full h-[65vh]">
         <LiveTracking/>
        </div>

        <div className="flex w-full items-center justify-between p-5 h-[23vh] bg-gray-100">
          <h3 className="font-bold text-xl">
            Distence -<span className="text-gray-600"> 3 KM </span>
          </h3>
          <button
            className="bg-black text-white p-4 rounded text-sm font-bold"
            onClick={() => setFinishRidePanel(true)}
          >
            {" "}
            Complete Ride
          </button>

        </div>
        <div>
          <p></p>
        </div>

        <div
          ref={finishRidePanelref}
          className="fixed bottom-0  z-10 bg-white px-1 py-5 w-full "
        >
          <FinishRide
            ride={rideData}
            finishRidePanel={finishRidePanel}
            setFinishRidePanel={setFinishRidePanel}
          />
        </div>
      </div>
    </>
  );
}

export default CaptainRiding;
