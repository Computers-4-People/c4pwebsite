import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import InfoCard from "../components/infocard";
import IconCards from "../components/iconcards";
import Header from "../components/header";

export default function Homepage() {
  const iconsData = [
    {
      title: "Fund Digital Access",
      image: "../Homepage/funddigitalaccess.jpg",
      alt: "Sponsor Digital Access",
      link: "/support"
    },
    {
      title: "Donate Computers",
      image: "../Homepage/donatecomputersicon.jpg",
      alt: "Donate your computers today",
      link: "/donate"
    },
    {
      title: "Volunteer",
      image: "../Homepage/volunteericon.jpg",
      alt: "Volunteer",
      link: "/volunteer"
    }
  ];

  const cardsData = [
    {
      titlePart1: "Begins",
      titlePart2: "With a Donation",
      description:
        "Companies and individuals donate their computers, tablets, keyboards and other electronic devices.",
      image: "../Homepage/collection.jpg",
      alt: 'Computers 4 People team member picking up a new donation from a company.'
    },
    {
      titlePart1: "Certified",
      titlePart2: "Data Erasure",
      description:
        "Every device goes through a meticulous data wiping and refurbishment process to be in optimal condition.",
      image: "../Homepage/refurb.jpg",
      alt: 'Staff refurbishing donated computers to provide them to people in need.'
    },
    {
      titlePart1: "Partners",
      titlePart2: "With Non-Profits",
      description: "We partner with 400+ non-profit partners to identify individuals lacking digital access.",
      image: "../Homepage/partners.jpg",
      alt: 'Computers 4 People ambassador delivering laptops to a non-profit partner'
    },
    {
      titlePart1: "Unlocks",
      titlePart2: "The Digital World",
      description:
        "Our unique application process distributes computers to individuals, families, and organizations that need them the most.",
      image: "../Homepage/unlocks.jpg",
      alt: 'Young recipient from the community holding a green tote bag with the Computers 4 People logo, with a refurbished donated computer inside.'
    },
    {
      titlePart1: "Enables",
      titlePart2: "Real Change",
      description:
        "Recipients use their devices to obtain jobs, access education, entrepreneurship, telehealth, and beyond!",
      image: "../Homepage/enables.jpg",
      alt: 'Computer receipient holding their new laptop from Computers 4 People.'
    },
  ];

  return (
    <div id="main-content" className="overflow-x-hidden">
      <Header
        props={{
          bgImage: "/Homepage/homepagebackground.jpg",
          titlePart1: "Transform a Life",
          titlePart2: "with Technology",
          links: [
            { text: "Donate Now", url: "/support" },
            { text: "Discover our programs", url: "/programs" },
          ],
        }}
      />

      <h2 className="ml-14 mt-20 text-7xl font-title text-left">
        Be Part of the Change
      </h2>
      <div>
        <InfoCard cards={cardsData} />
      </div>
      <h2 className="ml-14 text-7xl font-title mt-20">
          Give Unused Tech a Second Chance!
        </h2>
      <div className="text-black p-5 m-5">
       
        <div className="md:grid grid-rows-3 grid-cols-6 relative">
          <img
            src="../Homepage/homepagetestimonial.png"
            className="col-span-6 md:col-span-3 row-start-1 row-span-3 animate-fade-right animate-once w-auto h-auto"
            alt='Woman holding her refurbished computer donated by Computers 4 People.
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
             "I’m going to start filling out all my college applications!”
            </p>
            <p className="text-right italic">-Kenadi</p>
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

      <div className="my-5 mt-20 p-5 mb-20">
        <IconCards cards={iconsData} />
      </div>
    </div>
  );
}
