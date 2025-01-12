import React, { useContext, useState } from "react";
import car from "../assets/car.png";
import bike from "../assets/bike.png";
import auto from "../assets/auto.png";
import { FaUser } from "react-icons/fa";
import { userDataContext } from "../context/UserContext";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

function VehiclePanel(props) {
  const { vehicleType, setVehicleType } = useContext(userDataContext);

  function handleOpen(type) {
    setVehicleType(type);
    props.setConfirmRidePanelOpen(true);
  }

  return (
    <div>
      {props.vehiclepanelOpen ? (
        <MdOutlineKeyboardArrowDown
          className="absolute top-6 right-5 text-4xl"
          onClick={() => props.setVehiclepanelOpen(false)}
        />
      ) : (
        <MdOutlineKeyboardArrowUp
          className="absolute top-6 right-5 text-4xl"
          onClick={() => props.setVehiclepanelOpen(true)}
        />
      )}
      <h3 className="font-bold text-2xl mb-6 pl-4">Choose a vehicle</h3>

      <div
        className="flex items-center justify-between gap-5 active:border-2 border-black rounded-xl p-1 mb-6 bg-gray-100"
        onClick={() => handleOpen("car")}
      >
        <img src={car} alt="Car" className="w-14 h-16 rounded-full" />
        <div>
          <h4 className="flex items-center gap-2 font-bold">
            UberGo{" "}
            <span>
              <FaUser />
            </span>
            4
          </h4>
          <h5>2 mins away</h5>
          <p>Affordable, compact rides</p>
        </div>
        <h2 className="font-bold">₹{props.fare.car}</h2>
      </div>

      <div
        className="flex items-center justify-between gap-5 active:border-2 border-black rounded-xl p-1 mb-6 bg-gray-100"
        onClick={() => handleOpen("bike")}
      >
        <img src={bike} alt="Bike" className="w-14 h-16 rounded-full" />
        <div>
          <h4 className="flex items-center gap-2 font-bold">
            UberMoto{" "}
            <span>
              <FaUser />
            </span>
            1
          </h4>
          <h5>2 mins away</h5>
          <p>Affordable, compact rides</p>
        </div>
        <h2 className="font-bold">₹{props.fare.bike}</h2>
      </div>

      <div
        className="flex items-center justify-between gap-5 active:border-2 border-black rounded-xl p-1 mb-6 bg-gray-100"
        onClick={() => handleOpen("auto")}
      >
        <img src={auto} alt="Auto" className="w-14 h-16 rounded-full" />
        <div>
          <h4 className="flex items-center gap-2 font-bold">
            UberAuto{" "}
            <span>
              <FaUser />
            </span>
            3
          </h4>
          <h5>2 mins away</h5>
          <p>Affordable, compact rides</p>
        </div>
        <h2 className="font-bold">₹{props.fare.auto}</h2>
      </div>
    </div>
  );
}

export default VehiclePanel;
