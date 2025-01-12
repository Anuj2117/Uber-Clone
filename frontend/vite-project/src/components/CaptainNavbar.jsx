import React from "react";
import {Link} from "react-router-dom"
import { HiOutlineHome } from "react-icons/hi2";
function CaptainNavbar() {
  return (
    <nav className="bg-black h-[7vh] flex items-center sticky top-0 z-10">

      <div className="flex items-center justify-between p-6 w-full">
        <h1 className="text-white text-3xl font-bold  py-5">Uber</h1>

        <Link to="/captain-home" className="text-white">
          <HiOutlineHome className="text-2xl" />
        </Link>
      </div>
    </nav>
  );
}

export default CaptainNavbar;
