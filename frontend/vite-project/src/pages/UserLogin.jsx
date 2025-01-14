import React, { useContext, useState } from "react";
import { Link ,useNavigate } from "react-router-dom";
import {userDataContext} from "../context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";



function UserLogin({ setUserType }) {

  const navigate=useNavigate();

  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [userData,setUserData]=useState({});

  const {user,setUser}=useContext(userDataContext);

  async function submitHandler(e){
    e.preventDefault();

    const userData={
      email:email,
      password:password
    }
    
    const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login` , userData)
    
    
    if(response.status===200){
      const data=response.data;
      setUser(data.user);
      localStorage.setItem('token',data.token);
      toast.success("Logged in successfully!");
      setUserType('user');
      navigate('/home')
    }
    setEmail('');
    setPassword('');
  }

  return (
    <div className="flex items-center justify-center h-[90vh] bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center mb-6 bg-gray-100 p-5 rounded">Welcome Back</h1>
        
        <form onSubmit={(e)=>submitHandler(e)}>
          <label className="block text-sm font-bold mb-2" htmlFor="email">
            What's your email?
          </label>
          <input 
            required 
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
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
            onChange={(e)=>setPassword(e.target.value)}
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
            Don't have any account ?{" "}
            <Link to="/signup" className="text-blue-500 hover:text-blue-700">Signup here</Link>
          </p>
        </form>

        <div className="flex justify-center mt-4">
          <button
            onClick={()=>navigate('/captain-login')}
            type="button"
            className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded w-full"
          >
            Login as Captain
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
