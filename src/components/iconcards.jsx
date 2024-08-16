import React from "react";
import { Link } from "react-router-dom";

export default function IconCards () {
    return(
        <div className="grid grid-cols-3 gap-20 p-5 h-1/2" style={{height:'40vh', width:'90vw'}}>
            <Link className="border shadow-2xl flex flex-col justify-end text-center font-bold p-5 h-full"> <img className='mb-10'src="../maps.png" />BECOME AN EWASTE DROP-OFF SITE</Link>
            <Link className="border shadow-2xl flex flex-col justify-end text-center font-bold p-5 h-full"> <img className="mb-10" src="../handshake.png"></img>SPONSOR DIGITAL ACCESS</Link>
            <Link className="border shadow-2xl flex flex-col justify-end text-center font-bold p-5 h-full"> <img className='mb-10' src='../hands.png'></img>VOLUNTEER</Link>
        </div>
    )
}