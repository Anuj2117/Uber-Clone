import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import motercycle from "../assets/motercycle.png";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import { toast } from "react-toastify";

function CaptainSignup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  //const [captainData, setCaptainData] = useState({});

  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [typeofVechicle, setTypeofVehicle] = useState("");

  const { captain, setCaptain } = useContext(CaptainDataContext);

  //console.log(typeofVechicle);

  async function submitHandler(e) {
    e.preventDefault();

    const newCaptainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        typeofVechicle: typeofVechicle,
      },
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/register`,
      newCaptainData
    );

    if (response.status === 201) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      toast.success("Signed up successfully!");
      navigate("/captain-home");
    }

    // Reset form fields
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleCapacity("");
    setTypeofVehicle("");

   
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <div className="flex items-center mb-6  bg-gray-100 rounded p-3">
          <h1 className="text-3xl font-bold mr-4">Create Account</h1>
          <img src={motercycle} alt="Motorcycle" className="w-[17%] mb-3" />
        </div>

        <form onSubmit={submitHandler}>
          <div className="flex space-x-2 mb-4">
            <div className="flex-1">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="first-name"
              >
                First Name
              </label>
              <input
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                id="first-name"
                placeholder="First Name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex-1">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="last-name"
              >
                Last Name
              </label>
              <input
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                id="last-name"
                placeholder="Last Name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          <label className="block text-sm font-bold mb-2" htmlFor="email">
            What's your email?
          </label>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            placeholder="example@gmail.com"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
          />
          <label className="block text-sm font-bold mb-2" htmlFor="password">
            Create a Password
          </label>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            placeholder="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
          />{" "}
          <br />
          
          {/* Vehicle Information Section */}
          <h3 className="text-lg font-bold mb-2">Vehicle Information</h3>
          <br />
          <div className="flex space-x-2 mb-4">
            <div className="flex-1">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="vehicle-color"
              >
                Vehicle Color
              </label>
              <input
                required
                value={vehicleColor}
                onChange={(e) => setVehicleColor(e.target.value)}
                type="text"
                id="vehicle-color"
                placeholder="Color"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex-1">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="vehicle-plate"
              >
                Vehicle Plate
              </label>
              <input
                required
                value={vehiclePlate}
                onChange={(e) => setVehiclePlate(e.target.value)}
                type="text"
                id="vehicle-plate"
                placeholder="Plate Number"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          <div className="flex space-x-2 mb-4">
            <div className="flex-1">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="vehicle-capacity"
              >
                Vehicle Capacity
              </label>
              <input
                required
                value={vehicleCapacity}
                onChange={(e) => setVehicleCapacity(e.target.value)}
                type="number"
                id="vehicle-capacity"
                placeholder="Capacity"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex-1">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="vehicle-type"
              >
                Vehicle Type
              </label>
              <select
                required
                value={typeofVechicle}
                onChange={(e) => setTypeofVehicle(e.target.value)}
                id="vehicle-type"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="" disabled>
                  Select Vehicle Type
                </option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="motorcycle">Moto</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded w-full mb-4 "
          >
            Sign Up
          </button>
          <p className="text-center mb-4">
            Already have an account?{" "}
            <Link
              to="/captain-login"
              className="text-blue-500 hover:text-blue-700"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default CaptainSignup;
