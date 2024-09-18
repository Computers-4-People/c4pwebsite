import React from "react";
import { Link } from "react-router-dom";

export default function Hotspot() {
    const scrollToForm = () => {
        const formSection = document.getElementById("inquiry-form");
        if (formSection) {
            formSection.scrollIntoView({ behavior: "smooth" });
        }
    };


    return (
        <div  id="main-content" >
           <div style={{
  backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5)), url('/refurbished/refurbishedbackground.png')`,
  display: 'flex',
  alignItems: 'center', // This aligns the iframe vertically
  justifyContent: 'center', // This aligns the iframe horizontally
  height: '200vh',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat'
}} className="bg-fixed">
  <iframe
    className="pt-20"
    scrolling="no"
    aria-label='Board Form'
    style={{ width: '100%', height: '100%', border: 'none' }} // Make iframe fullscreen and remove border
    src='https://forms.zohopublic.com/Computers4People/form/BoardSignUp/formperma/rP1Tcbq23fV-4WO22ju8rDN3pv2TnrbKxmT9nSS0p4c'
 ></iframe>
</div>
           </div>
    );
}
