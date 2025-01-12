import React from "react";
import car from "../assets/car.png";
import auto from "../assets/auto.png";
import bike from "../assets/bike.png";
import { HiLocationMarker } from "react-icons/hi";
import { FaStop } from "react-icons/fa";
import { FaMoneyBill } from "react-icons/fa6";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

function ConfirmedRide(props) {
  let vehicleImage;
  switch (props.vehicleType) {
    case "car":
      vehicleImage = car;
      break;
    case "bike":
      vehicleImage = bike;
      break;
    case "auto":
      vehicleImage = auto;
      break;
    default:
      vehicleImage = null; // Fallback if no type is selected
  }
  return (
    <>
      <div className="bg-gray-100 flex flex-col items-center">
        {props.confirmRidePanelOpen ? (
          <MdOutlineKeyboardArrowDown
            className="absolute top-8 right-5 text-4xl"
            onClick={() => props.setConfirmRidePanelOpen(false)}
          />
        ) : (
          <MdOutlineKeyboardArrowUp
            className="absolute top-8 right-5 text-4xl"
            onClick={() => props.setConfirmRidePanelOpen(true)}
          />
        )}
        <h3 className="mt-3 font-bold text-2xl">Ride nearby you </h3>
        <hr />

        <div className="h-[0.2vh] bg-gray-00"></div>

        <div className="w-[40%] p-1 ">
          <img src={vehicleImage} alt="Vehicle" className="" />
        </div>

        <div className="flex flex-col items-center gap-2 p-2 w-full">

          <div className="flex items-center justify-start bg-white rounded gap-5 w-full p-4">
            <HiLocationMarker className="font-bold text-xl" />
            <div className="">
              <h3 className="font-bold text-xl">563/11-A</h3>
              <p className="font-bold text-sm ">{props.pickup}</p>
            </div>
            <hr />
          </div>

          <div className="flex items-center justify-start gap-5  w-full bg-white rounded p-5">
            <FaStop className="font-bold text-sm" />
            <div>
              <h3 className="font-bold text-xl">Third Wave Coffee</h3>
              <p className="font-bold text-sm ">{props.destination}</p>
            </div>
          </div>

          <div className="flex items-center justify-start gap-5  w-full bg-white rounded p-5">
            <FaMoneyBill className="font-bold text-sm" />
            <div>
              <h3 className="font-bold text-xl">
                {" "}
                ₹{props.fare[props.vehicleType]}
              </h3>
              <p className="font-bold text-sm">CASH , UPI</p>
            </div>
          </div>
        </div>

        <button
          className="rounded-xl p-3 bg-black text-white w-[90%] font-bold m-4"
          onClick={() => {
            props.setVehicleFound(true);
            props.createRide();
          }}
        >
          Confirm Ride
        </button>
      </div>
    </>
  );
}

export default ConfirmedRide;
