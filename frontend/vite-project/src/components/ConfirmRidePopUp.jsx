import React, { useState } from "react";
import { HiLocationMarker } from "react-icons/hi";
import { FaStop } from "react-icons/fa";
import { FaMoneyBill } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function ConfirmRidePopUp(props) {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(Array(6).fill(""));

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus(); // Focus on next input
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  async function submitHandler(e) {
    e.preventDefault();

    const otpString = String(otp.join("").trim());

    if (!otpString) {
      toast.error("Please enter a valid OTP.");
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
        {
          params: {
            rideId: props.ride._id,
            otp: otpString,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
     
      if (response.status === 200) {
        props.setConfirmRidePopupPanel(false);
        props.setRidePopupPanel(false);
        navigate("/captain-riding", { state: { ride: props.ride } });
      }
    } catch (error) {
      console.error("Error during ride start:", error);
      toast.error("Invalid OTP. Please try again.");
    }
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg ">
        <h3 className="text-2xl font-bold text-center mb-4">
          Confirm Your New Ride
        </h3>

        <div className="h-[1px] bg-gray-300 my-4"></div>

        <div className="flex flex-col items-center">
          <div className="flex items-center justify-start bg-white rounded-md shadow-sm gap-5 w-full p-4 mb-2">
            <HiLocationMarker className="font-bold text-xl text-green-600" />
            <div>
              <h3 className="font-bold text-xl">563/11-A</h3>
              <p className="font-bold text-sm text-gray-500">
                {props.ride?.pickup}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-start gap-5 w-full bg-white rounded-md shadow-sm p-5 mb-2">
            <FaStop className="font-bold text-sm text-red-600" />
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
              <h3 className="font-bold text-xl">
                ₹{props.ride?.fare || "Fare"}
              </h3>
              <p className="font-bold text-sm text-gray-500">CASH UPI </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 mb-3 mt-3 bg-gray-100 w-full">
          <form
            onSubmit={(e) => submitHandler(e)}
            className="flex flex-col items-center gap-3 mb-3 mt-3"
          >
            <div className="flex gap-2 mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-10 h-12 text-center text-lg border-2 border-gray-300 rounded-md focus:outline-none focus:border-black"
                />
              ))}

              <button
                className="bg-green-500 p-2 rounded-xl font-bold ml-2"
                type="submit"
              >
                Verify Otp
              </button>
            </div>

            <div className="flex  flex-col items-center gap-2 mb-4 w-[100%]">
              <button
                className="rounded-xl p-3 bg-black text-white w-full font-bold hover:bg-gray-600 transition duration-200"
                onClick={() => {
                  props.setConfirmRidePopUpOpen(true);
                  navigate("/captain-riding");
                }}
              >
                Confirm Ride
              </button>
              <button
                className="rounded-xl p-3 bg-gray-500 text-white w-full font-bold hover:bg-gray-600 transition duration-200"
                onClick={() => {
                  props.setRidePopUpOpen(false);
                  props.setConfirmRidePopUpOpen(false);
                }}
              >
                Ignore Ride
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ConfirmRidePopUp;
