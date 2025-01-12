import React, { useState ,useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Start from "./pages/Start";
import Home from "./pages/Home";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import UserNavbar from "./components/UserNavbar";
import UserProtected from "./pages/UserProtected";
import UserLogout from "./pages/UserLogout";
import CaptainProtected from "./pages/CaptainProtected";
import CaptainHome from "./pages/CaptainHome";
import CaptainLogout from "./pages/CaptainLogout";
import Riding from "./pages/Riding";
import CaptainRiding from "./pages/CaptainRiding";
import CaptainNavbar from "./components/CaptainNavbar";
function App() {

  const [userType, setUserType] = useState(localStorage.getItem("userType"));

  useEffect(() => {
    if (userType) {
      localStorage.setItem("userType", userType);
    } else {
      localStorage.removeItem("userType");
    }
  }, [userType]);

  console.log(userType);
  return (
    <>
      {userType === "captain" ? <CaptainNavbar /> : <UserNavbar />}
      <Routes>
        <Route path="/" element={<Start />} />
        <Route
          path="/home"
          element={
            <UserProtected>
              <Home userType={userType}/>
            </UserProtected>
          }
        />
        <Route
          path="/login"
          element={<UserLogin setUserType={setUserType} />}
        />
        <Route path="/signup" element={<UserSignup />} />
        <Route
          path="/captain-login"
          element={<CaptainLogin setUserType={setUserType} />}
        />
        <Route path="/riding" element={<Riding />} />
        <Route path="/captain-riding" element={<CaptainRiding />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route
          path="/users/logout"
          element={
            <UserProtected>
              <UserLogout />
            </UserProtected>
          }
        />

        <Route
          path="/captain-home"
          element={
            <CaptainProtected>
              <CaptainHome />
            </CaptainProtected>
          }
        />
        <Route
          path="/captain-logout"
          element={
            <CaptainProtected>
              <CaptainLogout />
            </CaptainProtected>
          }
        />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
