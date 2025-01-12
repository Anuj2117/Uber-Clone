import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import car from "../assets/car.png";
import bike from "../assets/bike.png"
import auto from "../assets/auto.png"
import { HiLocationMarker } from "react-icons/hi";
import { FaStop } from "react-icons/fa";
import { FaMoneyBill } from "react-icons/fa6";
import {
    MdOutlineKeyboardArrowDown,
    MdOutlineKeyboardArrowUp,
} from "react-icons/md";

function LookingForDriver(props) {

    let vehicleImage;
    switch (props.vehicleType) {
        case 'car':
            vehicleImage = car;
            break;
        case 'bike':
            vehicleImage = bike;
            break;
        case 'auto':
            vehicleImage = auto;
            break;
        default:
            vehicleImage = null; // Fallback if no type is selected
    }
    
    return (
        <div className="bg-gray-100 flex flex-col items-center relative h-[90vh]">
            {props.vehicleFound ? (
                <MdOutlineKeyboardArrowDown
                    className="absolute top-3 right-1 text-4xl z-10"
                    onClick={() => props.setVehicleFound(false)}
                />
            ) : (
                <MdOutlineKeyboardArrowUp
                    className="absolute top-6 right-5 text-4xl z-10"
                    onClick={() =>props.setVehicleFound(true) }
                />
            )}
            <h3 className="mt-3 font-bold text-2xl">Looking for a driver</h3>
            <hr />

            {/* Lottie Animation Background */}
            <div className="absolute inset-0 z-0">
                <DotLottieReact
                    src="https://lottie.host/dac6ebad-bea7-428a-a1e9-fb5398030d2d/MxWg6U98wA.lottie"
                    loop
                    autoplay
                    style={{ width: '100%', height: '35%', position: 'absolute', top: 30, left: 0}}
                />
            </div>

            {/* Car Image */}
            <div className="w-[40%] p-1 z-10 relative mt-5">
                <img src={vehicleImage} alt="Vehicle" className="rounded-full" />
            </div>

            {/* Location and Details */}
            <div className="flex flex-col items-center gap-2 z-10 relative mt-10 w-full p-2">
                <div className="flex items-center justify-start bg-white rounded gap-5 w-full p-4">
                    <HiLocationMarker className="font-bold text-xl" />
                    <div>
                        <h3 className="font-bold text-xl">563/11-A</h3>
                        <p className="font-bold text-sm">
                           {props.pickup}
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-start gap-5 w-full bg-white rounded p-4">
                    <FaStop className="font-bold text-sm" />
                    <div>
                        <h3 className="font-bold text-xl">Third Wave Coffee</h3>
                        <p className="font-bold text-sm">
                           {props.destination}
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-start gap-5 w-full bg-white rounded p-4">
                    <FaMoneyBill className="font-bold text-sm" />
                    <div>
                        <h3 className="font-bold text-xl">₹{props.fare[props.vehicleType]}</h3>
                        <p className="font-bold text-sm">
                            CASH , UPI
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LookingForDriver;
