import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Carosel from "../components/carosel/carosel";
import Textmarquee from "../components/textmarquee";
import InfoCard from "../components/infocard";
import Header from "../components/header";
import Testimonial from "../components/testimonial";

export default function Homepage() {
  const animatedElements = useRef([]);

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           entry.target.classList.add("animate-fade-up");
  //           observer.unobserve(entry.target); // Stop observing after animation starts
  //         }
  //       });
  //     },
  //     {
  //       threshold: 0.1, // Adjust this threshold based on when you want the animation to trigger
  //     }
  //   );

  //   animatedElements.current.forEach((el) => {
  //     observer.observe(el);
  //   });

  //   return () => {
  //     if (animatedElements.current) {
  //       animatedElements.current.forEach((el) => observer.unobserve(el));
  //     }
  //   };
  // }, []);

  const cardsData = [
    {
      titlePart1: "Starts",
      titlePart2: "With a Donation",
      description:
        "Individuals and organizations donate their computers, tablets, keyboards and other electronic devices.",
      image: "../homepage/starts.JPG",
    },
    {
      titlePart1: "Undergoes",
      titlePart2: "Refurbishment",
      description:
        "Every device goes through a meticulous refurbishing and data wiping process to be in optimal condition.",
      image: "../homepage/undergoes.jpg",
    },
    {
      titlePart1: "Match",
      titlePart2: "With a Recipient",
      description: "Devices are redistributed to people in underserved communities.",
      image: "../homepage/match.png",
    },
    {
      titlePart1: "Becomes",
      titlePart2: "Catalyst for Change",
      description:
        "People use these devices to open opportunities in jobs, education, telehealth, and beyond!",
      image: "../homepage/becomes.jpg",
    },
    {
      titlePart1: "Equip",
      titlePart2: "People to succeed",
      description:
        "These refurbished devices become a gateway to acquire the digital skills they need.",
      image: "../homepage/equip.jpg",
    },
  ];

  return (
    <div className="font-sans overflow-x-hidden">
      <Header props={{
        bgImage: '/homepage/homepagebackground.png',
        titlePart1: 'Transform a Life',
        titlePart2: 'with Technology',
        links: [{text: 'Donate your ewaste', url: "/donate"}, {text: 'Discover our programs',  url: "/programs"}]
        }}/>
        
      <h2 className="m-14 mt-20 text-5xl font-bold text-left">Be Part of the Change</h2>
      <div>
        <InfoCard cards={cardsData} />
      </div>

      <div className="h-screen min-h-max text-black p-5 m-5">
        <h2 className="ml-14 mb-20 text-5xl font-bold">Give Unused Tech a Second Chance!</h2>
        <div className="grid grid-rows-6 grid-cols-6 relative">
          <img
            src="../secondchance.png"
            className="col-span-6 md:col-span-3 row-start-1 row-span-3 animate-fade-right animate-once"
          />

          <div
            className="absolute invisible md:visible inset-0 col-span-6 md:col-start-4 md:col-end-6 md:row-start-1 md:row-end-4 bg-contain bg-top bg-no-repeat z-0 animate-jump animate-once"
            style={{ backgroundImage: "url('../quotes.png')" }}
          />

          <div className="z-10 col-span-6 md:col-start-4 md:col-end-6 md:row-start-2 md:row-end-2 text-center text-xl bg-contain bg-top bg-no-repeat">
            <p>Thanks to the laptop I received from Computers 4 People; I can now create artwork every night when I get home!</p>
            <p className="text-right italic">-Mallika</p>
          </div>

          <div className="grid grid-cols-2 col-span-6 md:col-start-4 md:col-end-6 md:row-start-3 items-center text-center text-xl gap-3 z-20">
            <Link
              to="/donate"
              className="bg-c4p rounded h-12 pr-3 pt-2.5 hover:bg-c4p-hover hover:text-white"
            >
              🤍 Donate your ewaste
            </Link>
            <Link
              to="/partner"
              className="border-2 border-black rounded h-12 pr-1 pt-2.5 hover:bg-black hover:text-white"
            >
              Become a Partner
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-cover min-h-max h-screen">
        <div className="mx-20 grid grid-cols-3 grid-rows-2 gap-5">
          <h2 className="col-span-2 text-6xl font-sans font-bold">Ways to Get Involved</h2>
          <p className="col-span-2 text-3xl ml-2"> Explore these ways to cultivate digital equity</p>
          <div className="mt-4 row-start-3 col-span-3 grid grid-cols-3 justify-items-stretch gap-28 h-80">
            <Link
              to="/ewastedropoff"
              className="border shadow-2xl flex flex-col justify-end text-center font-bold pb-5"
            >
              {" "}
              <img className="mb-10" src="../maps.png" />
              BECOME AN EWASTE DROP-OFF SITE
            </Link>
            <Link
              to="/financialdonation"
              className="border shadow-2xl flex flex-col justify-end text-center font-bold pb-5"
            >
              {" "}
              <img className="mb-10" src="../handshake.png" />
              SPONSOR DIGITAL ACCESS
            </Link>
            <Link
              to="/volunteer"
              className="border shadow-2xl flex flex-col justify-end text-center font-bold pb-5"
            >
              {" "}
              <img className="mb-10" src="../hands.png" />
              VOLUNTEER
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-cover">
        <Carosel />
      </div>
    </div>
  );
}
