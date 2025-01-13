import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HiLocationMarker } from "react-icons/hi";
import { FaStop } from "react-icons/fa";
import { FaMoneyBill } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";

const FinishRide = (props) => {
  const navigate = useNavigate();

  async function endRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
      {
        rideId: props.ride._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.status === 200) {
      navigate("/captain-home");
    }
  }

  return (
    <div className="flex flex-col items-center p-3">
  
      <h3 className="text-2xl font-bold mb-5">Finish this Ride</h3>
      <div className="flex items-center justify-between p-4 border-2 border-yellow-400 rounded-lg mt-4 w-full">
        <div className="flex items-center gap-3 ">
          <FaUser className="bg-gray-200 p-3 rounded-full text-5xl"/>
          <h2 className="text-lg font-bold ">
           { props.ride?.user.fullname.firstname 
            +" "+props.ride?.user.fullname.lastname}
          </h2>
        </div>
        <h5 className="text-lg font-bold">2.2 KM</h5>
      </div>

      <div className="flex flex-col items-center w-full">
        <div className="flex items-center justify-start bg-white rounded-md shadow-sm gap-5 w-full p-4 mb-2">
          <HiLocationMarker className="font-bold text-xl " />
          <div>
            <h3 className="font-bold text-xl">563/11-A</h3>
            <p className="font-bold text-sm text-gray-500">
              {props.ride?.pickup}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-start gap-5 w-full bg-white rounded-md shadow-sm p-5 mb-2">
          <FaStop className="font-bold text-sm " />
          <div>
            <h3 className="font-bold text-xl">Third Wave Coffee</h3>
            <p className="font-bold text-sm text-gray-500">
              {props.ride?.destination}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-start gap-5 w-full bg-white rounded-md shadow-sm p-5 mb-2">
          <FaMoneyBill className="font-bold text-sm " />
          <div>
            <h3 className="font-bold text-xl">₹{props.ride?.fare || "Fare"}</h3>
            <p className="font-bold text-sm text-gray-500">CASH UPI </p>
          </div>
        </div>
      </div>

      <div className="mt-10 w-full">
        <button
          onClick={endRide}
          className="w-full mt-5 flex  text-lg justify-center bg-black text-white font-semibold p-3 rounded-lg"
        >
          Finish Ride
        </button>
      </div>
    </div>
  );
};

export default FinishRide;
