import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import motercycle from "../assets/motercycle.png";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";
import { toast } from 'react-toastify';

  function CaptainLogin({ setUserType }) {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const {captain,setCaptain}=useContext(CaptainDataContext);

  async function submitHandler(e) {
    e.preventDefault();

    const newCaptainData = {
      email: email,
      password: password, 
    };
    
    const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`,newCaptainData);
    
    if(response.status===200){

      const data=response.data;
      setCaptain(data.captain);
      localStorage.setItem('token',data.token);
      toast.success("Logged in successfully!");
      setUserType('captain');
      navigate('/captain-home')
    }


    setEmail("");
    setPassword("");
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center    pr-5 mb-6 flex items-center justify-center bg-gray-100 rounded">
          Rider
          <img src={motercycle} alt="Motorcycle" className="w-1/5 mb-4" />
        </h1>

        <form onSubmit={submitHandler}>
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
            Enter your Password
          </label>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            placeholder="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-6"
          />

          <button
            type="submit"
            className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded w-full mb-4"
          >
            Login
          </button>

          <p className="text-center mb-4">
            Don't have any account?{" "}
            <Link
              to="/captain-signup"
              className="text-blue-500 hover:text-blue-700"
            >
              Signup here
            </Link>
          </p>
        </form>

        <div className="flex justify-center mt-4">
          <button
            onClick={() => navigate("/login")}
            type="button"
            className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded w-full"
          >
            Login as User
          </button>
        </div>
      </div>
    </div>
  );
}

export default CaptainLogin;
