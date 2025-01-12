import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import uber1 from "../assets/uber1.png";
import uber2 from "../assets/uber2.png";
import uber3 from "../assets/uber3.png";
import uber4 from "../assets/uber4.png";
import uber5 from "../assets/uber5.webp";

function Start() {
  const images = [uber1, uber2, uber3, uber4, uber5];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="h-screen w-full flex flex-col">
      <div
        className="relative bg-gray-300 h-[70vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${images[currentImage]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* <h1 className="absolute top-6 left-9 text-5xl font-bold ">Uber</h1> */}
      </div>
      <div className=" h-[23vh] bg-white flex flex-col items-center justify-center p-6">
        <h2 className="text-3xl font-bold mb-4">Get Started with Uber</h2>
        <div className="flex items-center justify-center w-[75%] bg-black text-white text-xl py-4 rounded-lg hover:bg-gray-800 transition">
          <Link to="/login" className="flex items-center space-x-10">
            <span>Continue</span>
            <FaArrowRight className="mt-1"/>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Start;
