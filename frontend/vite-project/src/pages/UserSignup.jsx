import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {userDataContext} from "../context/UserContext";
import { toast } from 'react-toastify';

function UserSignup() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userData,setUserData]=useState({});

  const {user,setUser}=useContext(userDataContext);

  async function submitHandler (e) {
    e.preventDefault();

    console.log(firstName,lastName,email)

    const newUser = {
      fullname:{
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
    };

    const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`,newUser);
    
    if(response.status===200){
      const data=response.data;
      setUser(data.user);
      localStorage.setItem('token',data.token);
      toast.success("Signed up successfully!");
      navigate('/home');
    }

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");

  }

  return (
    <div className="flex items-center justify-center h-[90vh] bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center mb-6 bg-gray-100 p-5 rounded">
          Create Account
        </h1>

        <form onSubmit={(e)=>submitHandler(e)}>
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
          />

          <button
            type="submit"
            className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded w-full mb-4 "
          >
            Sign Up
          </button>

          <p className="text-center mb-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:text-blue-700">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default UserSignup;
