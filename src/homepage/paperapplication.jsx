import React from "react";
import { Link } from "react-router-dom";

export default function Paperapplication() {
    const scrollToForm = () => {
        const formSection = document.getElementById("inquiry-form");
        if (formSection) {
            formSection.scrollIntoView({ behavior: "smooth" });
        }
    };


    return (
        <div id="main-content" >
           <div style={{
  backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5)), url('/refurbished/refurbishedbackground.png')`,
  display: 'flex',
  justifyContent: 'center', // This aligns the iframe horizontally
  height: '150vh',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat'
}} className="bg-fixed">
  <iframe
    className="pt-20"
    scrolling="no"
    aria-label='Hotspot Form'
    style={{ width: '100%', height: '100vh', border: 'none' }} // Make iframe fullscreen and remove border
    src='https://forms.zohopublic.com/Computers4People/form/PaperApplication2/formperma/jJiN5MZAgIE6uGONOcWkwsFoBgfZMsdfEyVq2IXyyqk'
 ></iframe>
</div>
           </div>
    );
}
