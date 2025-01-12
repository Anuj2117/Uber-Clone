import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
//import VehiclePanel from "../components/VehiclePanel";
import map from "../assets/map.png";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmedRide from "../components/ConfirmedRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { userDataContext } from "../context/UserContext";
import { SocketContext } from "../context/SocketContext";
import LiveTracking from "../components/LiveTracking";

function Home() {

  const navigate = useNavigate();
  
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclepanelOpen, setVehiclepanelOpen] = useState(false);
  const [confirmRidePanelOpen, setConfirmRidePanelOpen] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingforDriver] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({});
  
  const [ride, setRide] = useState(null);
  
  const panelref = useRef(null);
  const vehicleref = useRef(null);
  const confirmRidePanelref = useRef(null);
  const vehicleFoundref = useRef(null);
  const waitingForDriverRef = useRef(null);
  
  const { vehicleType, setVehicleType, user } = useContext(userDataContext);
  
  const { socket } = useContext(SocketContext);
  
  useEffect(() => {
    
    console.log(user);

    socket.emit("join", { userType: "user", userId: user._id });
  }, [user]);
 
  socket.on("ride-start", (ride) => {
    setWaitingforDriver(false);
    navigate("/riding",{state :{ride}});
  });

  socket.on('ride-confirm', (ride) => {
    setRide(ride);
    setVehicleFound(false);
    setWaitingforDriver(true);
  });

  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPickupSuggestions(response.data);
    } catch(err) {
      console.log(err)
    }
  };

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDestinationSuggestions(response.data);
    } catch(err) {
      console.log(err)
    }
  };

  async function findTrip() {
    setVehiclepanelOpen(true);
    setPanelOpen(false);

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
      {
        params: { pickup, destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response.data);
    setFare(response.data);
  }

  async function createRide() {
    console.log(vehicleType, pickup, destination + " inside create function ");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        {
          vehicleType,
          pickup,
          destination,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
 

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelref.current, {
          height: "64vh",
          padding: "25",
        });
      } else {
        gsap.to(panelref.current, {
          height: "0vh",
        });
      }
    },
    [panelOpen]
  );
  useGSAP(
    function () {
      if (vehiclepanelOpen) {
        gsap.to(vehicleref.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehicleref.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclepanelOpen]
  );
  useGSAP(
    function () {
      if (confirmRidePanelOpen) {
        gsap.to(confirmRidePanelref.current, {
          transform: "translateY(0)",
          height: "90%",
        });
      } else {
        gsap.to(confirmRidePanelref.current, {
          transform: "translateY(100%)",
          height: "0",
        });
      }
    },
    [confirmRidePanelOpen]
  );
  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundref.current, {
          transform: "translateY(0)",
          height: "90%",
        });
      } else {
        gsap.to(vehicleFoundref.current, {
          transform: "translateY(100%)",
          height: "0",
        });
      }
    },
    [vehicleFound]
  );
  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0)",
          height: "90%",
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(100%)",
          height: "0",
        });
      }
    },
    [waitingForDriver]
  );
  function submitHandler(e) {
    e.preventDefault();
  }

  return (
    <>
      <div className="h-screen relative">
        <div className="h-[75%] w-screen ">
         <LiveTracking/>
        </div>
        <div className="absolute top-0 w-full h-screen flex flex-col justify-end">
          <div className="h-[30%] p-6 bg-white relative">
            {panelOpen ? (
              <MdOutlineKeyboardArrowDown
                className="absolute top-6 right-5 text-4xl"
                onClick={() => setPanelOpen(false)}
              />
            ) : (
              <MdOutlineKeyboardArrowUp
                className="absolute top-6 right-5 text-4xl"
                onClick={() => setPanelOpen(true)}
              />
            )}
            <h4 className="text-2xl font-bold">Find a trip</h4>

            <form onSubmit={(e) => submitHandler(e)}>
              <div className="line absolute h-16 w-1 top-[46%] left-11 bg-gray-600 rounded-full "></div>
              <input
                type="text "
                value={pickup}
                onChange={handlePickupChange}
                onClick={() => {
                  setPanelOpen(true);
                  setActiveField("pickup");
                }}
                placeholder="Enter your pick-up"
                className="w-full bg-[#eee] px-12 py-2 rounded-lg mt-5 "
              />
              <input
                type="text"
                value={destination}
                onChange={handleDestinationChange}
                onClick={() => {
                  setPanelOpen(true);
                  setActiveField("destination");
                }}
                placeholder="Enter your destination"
                className="w-full bg-[#eee] px-12 py-2 rounded-lg mt-5"
              />
            </form>
            <button
              onClick={findTrip}
              className="bg-black text-white px-4 py-2 rounded-lg mt-3 w-full"
            >
              Find Trip
            </button>
          </div>

          <div className="h-0 bg-white w-full" ref={panelref}>
            <LocationSearchPanel
              suggestions={
                activeField === "pickup"
                  ? pickupSuggestions
                  : destinationSuggestions
              }
              vehiclepanelOpen={vehiclepanelOpen}
              setVehiclepanelOpen={setVehiclepanelOpen}
              setPanelOpen={setPanelOpen}
              setPickup={setPickup}
              setDestination={setDestination}
              activeField={activeField}
            />
          </div>
        </div>

        <div
          ref={vehicleref}
          className="fixed  bottom-0 translate-y-full  bg-white px-1 py-5  w-full "
        >
          <VehiclePanel
            fare={fare}
            vehiclepanelOpen={vehiclepanelOpen}
            setVehiclepanelOpen={setVehiclepanelOpen}
            setConfirmRidePanelOpen={setConfirmRidePanelOpen}
            setConfirmRidePanel={setConfirmRidePanelOpen}
            setVehiclePanel={setVehiclepanelOpen}
          />
        </div>

        <div
          ref={confirmRidePanelref}
          className="fixed bottom-0 translate-y-full  bg-white px-1 py-5 h-0 w-full  "
        >
          <ConfirmedRide
            fare={fare}
            createRide={createRide}
            pickup={pickup}
            destination={destination}
            confirmRidePanelOpen={confirmRidePanelOpen}
            setConfirmRidePanelOpen={setConfirmRidePanelOpen}
            vehicleFound={vehicleFound}
            setVehicleFound={setVehicleFound}
            vehicleType={vehicleType}
          />
        </div>

        <div
          ref={vehicleFoundref}
          className="fixed bottom-0 translate-y-full  bg-white px-1 py-5 h-0 w-full  "
        >
          <LookingForDriver
            vehicleFound={vehicleFound}
            setVehicleFound={setVehicleFound}
            vehicleType={vehicleType}
            pickup={pickup}
            destination={destination}
            fare={fare}
          />
        </div>

        <div
          ref={waitingForDriverRef}
          className="fixed bottom-0  z-10 bg-white px-1 py-5 w-full  "
        >
          <WaitingForDriver
            fare={fare}
            ride={ride}
            vehicleType={vehicleType}
            waitingForDriver={waitingForDriver}
            setWaitingforDriver={setWaitingforDriver}
            setVehicleType={setVehicleType}
          />
        </div>
      </div>
    </>
  );
}

export default Home;
