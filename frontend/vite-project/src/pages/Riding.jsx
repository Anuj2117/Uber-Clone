import React, { useContext, useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import car from "../assets/car.png";
import bike from "../assets/bike.png";
import auto from "../assets/auto.png";
import { HiLocationMarker } from "react-icons/hi";
import { FaStop } from "react-icons/fa";
import { FaMoneyBill } from "react-icons/fa6";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

import { userDataContext } from "../context/UserContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import LiveTracking from "../components/LiveTracking";

function Riding() {
  const { vehicleType, setVehicleType } = useContext(userDataContext);
  const { panelOpen, setPanelOpen } = useState(false);
  const panelRef = useRef(null);

  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  const location = useLocation();
  const { ride } = location.state || {};

  socket.on("ride-end", () => {
    navigate("/home");
  });

  console.log(ride);
  let vehicleImage;
  switch (ride?.captain.vehicle.typeofVechicle) {
    case "car":
      vehicleImage = car;
      break;
    case "motorcycle":
      vehicleImage = bike;
      break;
    case "auto":
      vehicleImage = auto;
      break;
    default:
      vehicleImage = null; // Fallback if no type is selected
  }

  useGSAP(
    function () {
      gsap.to(panelRef.current, {
        transform: panelOpen ? "translateY(0)" : "translateY(100%)",
        duration: 0.5, // Duration of animation
      });
    },
    [panelOpen]
  );

  return (
    <>
      <div className="flex flex-col items-center ">
        {panelOpen ? (
          <MdOutlineKeyboardArrowDown className="absolute top-3 right-1 text-4xl z-10" />
        ) : (
          <MdOutlineKeyboardArrowUp className="absolute top-6 right-5 text-4xl z-10" />
        )}

        <div className="h-[75vh] w-full">
          <LiveTracking />
        </div>

        <div
          ref={panelRef}
          className="absolute bottom-0 w-full transition-transform duration-500 bg-white"
        >
          <div className=" ">
            <div className="flex justify-between items-center w-full  text-end p-2">
              <img
                src={vehicleImage}
                alt="img"
                className="w-[30%] rounded-full"
              />
              <div className="">
                <h3 className="font-bold  ">
                  {ride?.captain?.fullname.firstname}
                  {ride?.captain?.fullname.lastname}
                </h3>
                <p className="text-sm font-bold">
                  {ride?.captain.vehicle.plate}
                </p>
                <p className="text-sm font-bold">Honda Shine black</p>
              </div>
            </div>

            <div className="w-full h-[0.2vh] bg-gray-200 rounded-full"></div>

            <div className="flex flex-col items-center mt-5 gap-2">
              <div className="flex items-center justify-start gap-5  w-full bg-white rounded p-4">
                <HiLocationMarker className="font-bold text-xl" />
                <div>
                  <h3 className="font-bold text-xl">Third Wave Coffee</h3>
                  <p className="text-sm font-bold">{ride?.pickup}</p>
                </div>
              </div>
              <div className="flex items-center justify-start gap-5  w-full bg-white rounded p-5">
                <FaStop className="font-bold text-sm" />
                <div>
                  <h3 className="font-bold text-xl">Third Wave Coffee</h3>
                  <p className="text-sm font-bold">{ride?.destination}</p>
                </div>
              </div>

              <div className="flex items-center gap-5  w-full bg-white rounded p-5">
                <FaMoneyBill className="font-bold text-sm" />
                <div>
                  <h3 className="font-bold text-xl">₹{ride?.fare}</h3>
                  <p className="text-sm font-bold">CASH UPI</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-[0.2vh] bg-gray-200 rounded-full "></div>

          <div className="flex items-center justify-center  w-full p-5">
            <button className="w-full bg-black text-white font-bold p-3 rounded MB-5">
              Make a payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Riding;
