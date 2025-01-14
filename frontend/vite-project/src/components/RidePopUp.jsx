import React from "react";
import { HiLocationMarker } from "react-icons/hi";
import { FaStop } from "react-icons/fa";
import { FaMoneyBill } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";

function RidePopUp(props) {
  return (
    <>
      <div className="">
        <h3 className="text-2xl font-bold text-center m-1">
          New Ride Available
        </h3>
        <div className="h-[0.2vh] bg-gray-200"></div>

        <div className="p-5 ">
          <div className="flex items-center justify-between p-5 bg-yellow-500 rounded-xl shadow-sm">
            <div className="flex items-center justify-between gap-2">
              <FaUser className="text-6xl bg-gray-200 p-4 rounded-full " />
              <h3 className="font-bold">
                {props.ride?.user.fullname.firstname +
                  " " +
                  props.ride?.user.fullname.lastname}
              </h3>
            </div>
            <div>
              <h3 className="text-sm font-bold">Distence</h3>
              <p className="text-sm font-bold text-gray-500">2.5 K.M</p>
            </div>
          </div>
        </div>

        <div className="h-[0.2vh] bg-gray-200"></div>

        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center justify-start bg-gray-100 rounded gap-5 w-full p-4 shadow-2xl">
            <HiLocationMarker className="font-bold text-xl" />
            <div className="">
              <h3 className="font-bold text-xl">563/11-A</h3>
              <p className="font-bold text-sm ">
                {props.ride?.pickup || "Pickup Address"}
              </p>
            </div>
            <hr />
          </div>

          <div className="flex items-center justify-start gap-5  w-full bg-gray-100 rounded p-5 shadow-2xl">
            <FaStop className="font-bold text-sm" />
            <div>
              <h3 className="font-bold text-xl">Third Wave Coffee</h3>
              <p className="font-bold text-sm">
                {props.ride?.destination || "Destination Address"}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-start gap-5  w-full bg-gray-100 rounded p-5 shadow-2xl">
            <FaMoneyBill className="font-bold text-sm" />
            <div>
              <h3 className="font-bold text-xl">
                {" "}
                ₹{props.ride?.fare || "Fare"}
              </h3>
              <p className="font-bold text-sm">CASH UPI</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3  mt-2">
          <button
            className="rounded-xl p-3 bg-black text-white w-[90%] font-bold hover:bg-gray-600 "
            onClick={() => {
              props.setConfirmRidePopUpOpen(true);
              props.confirmRide()
            }}
          >
            Accept Ride
          </button>
          <button
            className="rounded-xl p-3 bg-gray-500 text-white w-[90%] font-bold hover:bg-gray-600 "
            onClick={() => props.setRidePopUpOpen(false)}
          >
            Ignore Ride
          </button>
        </div>
      </div>
    </>
  );
}

export default RidePopUp;
