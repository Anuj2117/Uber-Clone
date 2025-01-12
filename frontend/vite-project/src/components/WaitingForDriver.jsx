import React from "react";
import car from "../assets/car.png";
import bike from "../assets/bike.png";
import auto from "../assets/auto.png";
import { FaUser } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { FaStop } from "react-icons/fa";
import { FaMoneyBill } from "react-icons/fa6";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { FaStar } from "react-icons/fa";

function WaitingForDriver(props) {
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
    <div className="bg-gray-100">
      {/* Left Side: Image Section */}
      {props.waitingForDriver ? (
        <MdOutlineKeyboardArrowDown
          className="absolute top-2 right-1 text-4xl text-gray-400"
          onClick={() => props.setWaitingforDriver(false)}
        />
      ) : (
        <MdOutlineKeyboardArrowUp
          className="absolute top-2 right-4 text-4xl text-gray-400"
          onClick={() => props.setWaitingforDriver(true)}
        />
      )}
      <div className="flex w-full justify-end text-end mt-8 p-2">
        <div className="flex flex items-center w-1/2 ">
          <div className="text-5xl bg-gray-100 rounded-full p-5  ">
            <FaUser />
          </div>
          <div className="w-[24%] bg-gray-100 rounded-full left-16 absolute">
            <img src={vehicleImage} alt="" />
          </div>
        </div>

        {/* Right Side: Text Section */}
        <div className=" flex justify-end w-1/2 text-end">
          <div className="flex items-center mb-2 ">
            <div className="flex flex-col items-end gap-1">
              <p className="font-bold">
                {props.ride?.captain.fullname.firstname +
                  props.ride?.captain.fullname.lastname}
              </p>
              <p className="font-bold text-sm capitalize">
                {props.ride?.captain.vehicle.plate}
              </p>
              <p className="font-bold text-sm">Black Honda Shine 125CC</p>
              <div className="flex items-center gap-1 justify-end">
                <FaStar className="text-yellow-500" />
                <p className="font-bold text-sm">5.0</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center w-full p-2  ">
        <h3 className="bg-gray-300 px-6 py-2 rounded  font-bold">Your one time Password is - <span className="bg-white py-1 px-3 rounded">{props.ride?.otp}</span> </h3>
      </div>

      <div className="flex flex-col items-center gap-1 mt-10 gap-4">
        <div className="flex items-center justify-start bg-white rounded gap-5 w-full p-4">
          <HiLocationMarker className="font-bold text-xl" />
          <div className="">
            <h3 className="font-bold text-xl">563/11-A</h3>
            <p className="font-bold text-sm">{props.ride?.pickup || "Fare"}</p>
          </div>
          <hr />
        </div>

        <div className="flex items-center justify-start gap-5  w-full bg-white rounded p-5">
          <FaStop className="font-bold text-sm" />
          <div>
            <h3 className="font-bold text-xl">Third Wave Coffee</h3>
            <p className="font-bold text-sm">{props.ride?.destination}</p>
          </div>
        </div>

        <div className="flex items-center justify-start gap-5  w-full bg-white rounded p-5">
          <FaMoneyBill className="font-bold text-sm" />
          <div>
            <h3 className="font-bold text-xl">₹{props.ride?.fare || "Fare"}</h3>
            <p className="font-bold text-sm">CASH UPI </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WaitingForDriver;
