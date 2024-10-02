import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import InfoCard from "../components/infocard";
import IconCards from "../components/iconcards";
import Header from "../components/header";

export default function Homepage() {
  const iconsData = [
    {
      title: "BECOME AN EWASTE DROP-OFF SITE",
      image: "../maps.png",
      alt: "E-Waste Drop-off Site",
      link: "/ewastedropoff"
    },
    {
      title: "SPONSOR DIGITAL ACCESS",
      image: "../handshake.png",
      alt: "Sponsor Digital Access",
      link: "/financialdonation"
    },
    {
      title: "VOLUNTEER",
      image: "../hands.png",
      alt: "Volunteer",
      link: "/volunteer"
    }
  ];

  const cardsData = [
    {
      titlePart1: "Starts",
      titlePart2: "With a Donation",
      description:
        "Individuals and organizations donate their computers, tablets, keyboards and other electronic devices.",
      image: "../Homepage/starts.JPG",
      alt: 'Donor holding a stack of laptops for donation to Computers 4 People.'
    },
    {
      titlePart1: "Undergoes",
      titlePart2: "Refurbishment",
      description:
        "Every device goes through a meticulous refurbishing and data wiping process to be in optimal condition.",
      image: "../Homepage/undergoes.jpg",
      alt: 'Staff refurbishing donated computers to provide them to people in need.'
    },
    {
      titlePart1: "Match",
      titlePart2: "With a Recipient",
      description: "Devices are redistributed to people in underserved communities.",
      image: "../Homepage/match.png",
      alt: 'White Van with a green sign and the logo of Computers 4 People'
    },
    {
      titlePart1: "Becomes",
      titlePart2: "Catalyst for Change",
      description:
        "People use these devices to open opportunities in jobs, education, telehealth, and beyond!",
      image: "../Homepage/becomes.jpg",
      alt: 'Senior recipient from the community holding a green tote bag with the Computers 4 People logo, with a refurbished donated computer inside.'
    },
    {
      titlePart1: "Equip",
      titlePart2: "People to succeed",
      description:
        "These refurbished devices become a gateway to acquire the digital skills they need.",
      image: "../Homepage/equip.jpg",
      alt: 'Dylan Zajac hosting Digital Skills Classes at the Community Access Venue in front of recipients and community members in need.'
    },
  ];

  return (
    <div id="main-content" className="font-sans overflow-x-hidden">
      <Header
        props={{
          bgImage: "/Homepage/homepagebackground.jpg",
          titlePart1: "Transform a Life",
          titlePart2: "with Technology",
          links: [
            { text: "Donate your ewaste", url: "/donate" },
            { text: "Discover our programs", url: "/programs" },
          ],
        }}
      />

      <h2 className="m-14 mt-20 text-5xl font-bold text-left">
        Be Part of the Change
      </h2>
      <div>
        <InfoCard cards={cardsData} />
      </div>

      <div className="min-h-screen text-black p-5 m-5">
        <h2 className="ml-14 mb-20 text-5xl font-bold">
          Give Unused Tech a Second Chance!
        </h2>
        <div className="md:grid grid-rows-6 grid-cols-6 relative">
          <img
            src="../secondchance.png"
            className="col-span-6 md:col-span-3 row-start-1 row-span-3 animate-fade-right animate-once"
            alt='Woman holding a t-shirt she designed, with a refurbished computer donated by Computers 4 People.
'
          />

          <div
            className="md:absolute invisible md:visible inset-0 col-span-6 md:col-start-4 md:col-end-6 md:row-start-1 md:row-end-4 bg-contain bg-top bg-no-repeat z-0 animate-jump animate-once"
            style={{ backgroundImage: "url('../quotes.png')" }}
            role='img'
            aria-label='quotes'
          />

          <div className="z-20 col-span-6 md:col-start-4 md:col-end-6 md:row-start-2 md:row-end-2 text-center text-xl bg-contain bg-top bg-no-repeat">
            <p>
              Thanks to the laptop I received from Computers 4 People; I can now
              create artwork every night when I get home!
            </p>
            <p className="text-right italic">-Mallika</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 col-span-6 md:col-start-4 md:col-end-6 md:row-start-3 items-center gap-3 z-30">
            <Link
              to="/donate"
              className="bg-c4p rounded px-4 py-2 hover:bg-c4p-hover hover:text-white text-center w-full md:w-auto flex justify-center items-center"
            >
              Donate Computers
            </Link>
            <Link
              to="/partner"
              className="border-2 border-black rounded px-4 py-2 hover:bg-black hover:text-white text-center w-full md:w-auto flex justify-center items-center"
            >
              Become a Partner
            </Link>
          </div>
        </div>
      </div>

      <div className="my-5 p-5 mb-20">
        <IconCards cards={iconsData} />
      </div>
    </div>
  );
}
