import React, { useRef, useState, useContext, useEffect } from "react";
import axios from "axios";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import map from "../assets/map.png";
import { FaUser } from "react-icons/fa";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import sound from "../assets/notification.mp3"
import { CaptainDataContext } from "../context/CaptainContext";
import { SocketContext } from "../context/SocketContext";
import LiveTracking from "../components/LiveTracking";

function CaptainHome() {
  const { captain } = useContext(CaptainDataContext);
  const { socket } = useContext(SocketContext);

  const [ridePopUpOpen, setRidePopUpOpen] = useState(false);
  const [confirmridePopUpOpen, setConfirmRidePopUpOpen] = useState(false);
  const [ride, setRide] = useState(null);
  const ridePopupref = useRef(null);
  const confirmridePopupref = useRef(null);

  useEffect(() => {
    socket.emit("join", {
      userId: captain._id,
      userType: "captain",
    });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          socket.emit("update-location-captain", {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();
  }, []);

  socket.on("new-ride", (data) => {
    setRide(data);
    setRidePopUpOpen(true);
  });
  useEffect(() => {
    if (ridePopUpOpen) {
      const audio = new Audio(sound);
      audio.play().catch((error) => console.error("Error playing notification sound:", error));
    }
  }, [ridePopUpOpen]);

  async function confirmRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
      {
        rideId: ride._id,
        captainId: captain._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setRidePopUpOpen(false);
    setConfirmRidePopUpOpen(true);

  }

  useGSAP(
    function () {
      if (ridePopUpOpen) {
        gsap.to(ridePopupref.current, {
          transform: "translateY(0)",
          height: "90%",
        });
      } else {
        gsap.to(ridePopupref.current, {
          transform: "translateY(100%)",
          height: "0",
        });
      }
    },
    [ridePopUpOpen]
  );

  useGSAP(
    function () {
      if (confirmridePopUpOpen) {
        gsap.to(confirmridePopupref.current, {
          transform: "translateY(0)",
          height: "90%",
        });
      } else {
        gsap.to(confirmridePopupref.current, {
          transform: "translateY(100%)",
          height: "0",
        });
      }
    },
    [confirmridePopUpOpen]
  );

  return (
    <>
      <div className="bg-gray-100">
        <div className="">
          <div className="flex items-center w-full h-[47vh] ">
           <LiveTracking/>
          </div>

          <div className="flex  items-center justify-between w-full p-5">
            <div className="flex items-center gap-3">
              <FaUser className="text-5xl bg-gray-200 p-2 rounded-full" />
              <div>
                <h4 className="font-bold text-sm">
                  {captain.fullname.firstname}
                  {captain.fullname.lastname}
                </h4>
                <p className="text-gray-600">Basic level</p>
              </div>
            </div>

            <div className="flex flex-col text-end">
              <p className="font-bold ">$500</p>
              <p className="font-bold text-gray-500">earned</p>
            </div>
          </div>
        </div>
        <div className="h-[0.3vh] bg-gray-200"></div>

        <CaptainDetails captain={captain} />

        <div
          ref={ridePopupref}
          className="fixed bottom-0  z-10 bg-white px-1 py-5 w-full "
        >
          <RidePopUp
            ride={ride}
            confirmRide={confirmRide}
            ridePopUpOpen={ridePopUpOpen}
            setRidePopUpOpen={setRidePopUpOpen}
            confirmridePopUpOpen={confirmridePopUpOpen}
            setConfirmRidePopUpOpen={setConfirmRidePopUpOpen}
          />
        </div>

        <div
          ref={confirmridePopupref}
          className="fixed bottom-0  z-10 bg-white px-1 py-5 w-full "
        >
          <ConfirmRidePopUp
            ride={ride}
            ridePopUpOpen={ridePopUpOpen}
            setRidePopUpOpen={setRidePopUpOpen}
            confirmridePopUpOpen={confirmridePopUpOpen}
            setConfirmRidePopUpOpen={setConfirmRidePopUpOpen}  // setConfirmRidePanelOpen
          />
        </div>
      </div>
    </>
  );
}

export default CaptainHome;
