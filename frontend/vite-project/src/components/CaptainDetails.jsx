import React from 'react'
import { IoTimeOutline } from "react-icons/io5";
import { BiTachometer } from "react-icons/bi";
import { MdOutlineSpeakerNotes } from "react-icons/md";

function CaptainDetails(props) {
  return (
   <>
    <div className="p-5 ">
           <div className="flex items-center justify-between bg-[#002D62] p-10 rounded-xl ">
             <div className="flex flex-col items-center gap-1">
               <IoTimeOutline className="text-3xl text-gray-200" />
               <p className="text-gray-500">5 Hours </p>
               <p className="font-bold text-gray-200 ">Time </p>
             </div>
             <div className="flex flex-col items-center gap-1">
               <BiTachometer className="text-3xl text-gray-200"/>
               <p className="text-gray-500">50 K.M</p>
               <p className="font-bold text-gray-200 ">Distence</p>
             </div>
             <div className="flex flex-col items-center gap-1">
               {" "}
               <MdOutlineSpeakerNotes className="text-3xl text-gray-200"/>
               <p className="text-gray-500">5 Notes</p>
               <p className="font-bold text-gray-200 ">Notes</p>
             </div>
           </div>
           </div>
   </>
  )
}

export default CaptainDetails