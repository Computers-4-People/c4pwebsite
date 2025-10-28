import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import InfoCard from "../components/infocard";
import IconCards from "../components/iconcards";
import Header from "../components/header";
import ImageMarquee from "../components/imagemarquee";
import Testimonial from "../components/testimonial";

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
        "We're a 501(c)(3) Non-Profit. Companies and individuals donate their computers, tablets, keyboards and other electronic devices. Everything's tax deductible.",
      image: "../Homepage/collection.jpg",
      alt: 'Computers 4 People team member picking up a new donation from a company.'
    },
    {
      titlePart1: "Certified",
      titlePart2: "Data Erasure",
      description:
        "Every device goes through a meticulous data erasure (NIST 800-88) certification process. Computers are refurbished back to optimal condition.",
      image: "../Homepage/refurb.jpg",
      alt: 'Staff refurbishing donated computers to provide them to people in need.'
    },
    {
      titlePart1: "Non-Profit",
      titlePart2: "Partners",
      description: "We partner with 400+ non-profit partners across New Jersey, New York City, and Massachusetts to identify individuals lacking digital access.",
      image: "../Homepage/partners.jpg",
      alt: 'Computers 4 People ambassador delivering laptops to a non-profit partner'
    },
    {
      titlePart1: "Unlocks",
      titlePart2: "Opportunity",
      description:
        "Our unique application process distributes computers to individuals, families, and organizations that need them the most.",
      image: "../Homepage/unlocks.jpg",
      alt: 'Young recipient from the community holding a green tote bag with the Computers 4 People logo, with a refurbished donated computer inside.'
    },
    {
      titlePart1: "Enables",
      titlePart2: "Real Change",
      description:
        "Recipients use their devices to obtain jobs, access education, entrepreneurship, health services, and beyond!",
      image: "../Homepage/enables.jpg",
      alt: 'Computer receipient holding their new laptop from Computers 4 People.'
    },
  ];

  const partnerLogos = [
    { src: "/logos/americanliverfoundation.png", alt: "American Liver Foundation" },
    { src: "/logos/hudsoncounty.png", alt: "Hudson County" },
    { src: "/logos/wayfair.png", alt: "Wayfair" },
    { src: "/logos/aspeninstitute.png", alt: "The Aspen Institute" },
    { src: "/logos/vista.png", alt: "Vista Equity Partners" },
    { src: "/logos/att.png", alt: "AT&T" },
    { src: "/logos/invescologo.png", alt: "Invesco" },
    { src: "/logos/comcast.png", alt: "Comcast" },
    { src: "/logos/brighthorizons.png", alt: "Bright Horizons" },
    { src: "/logos/charitynavigator.png", alt: "Charity Navigator" },
    { src: "/logos/sgainc.png", alt: "Software Guidance & Assistance, Inc." },
    { src: "/logos/dazn.png", alt: "DAZN" },
    { src: "/logos/babson.png", alt: "Babson College" },
    { src: "/logos/edrington.png", alt: "Edrington" },
    { src: "/logos/bigbelly.png", alt: "Big Belly Solar" },
    { src: "/logos/stevens.png", alt: "Stevens Institute of Technology" },
    { src: "/logos/qbe.png", alt: "QBE" },
    { src: "/logos/wsaudiology.png", alt: "WS Audiology" },
    { src: "/logos/columbiauniversity.png", alt: "Columbia University" },
    { src: "/logos/cityofboston.png", alt: "The City of Boston" },
    { src: "/logos/insightpartners.png", alt: "Insight Partners" },
    { src: "/logos/universityofmass.png", alt: "University of Massachusetts Honors College" },
    { src: "/logos/lincolncenter.png", alt: "Lincoln Center Theater" },
    { src: "/logos/radnetlogo.png", alt: "Radnet" },
    { src: "/logos/junkteens.png", alt: "Junk Teens" },
    { src: "/logos/carlyle.png", alt: "The Carlyle Group" },
  ];


  return (
    <div id="main-content" className="overflow-x-hidden">
      <Header
        props={{
          bgImage: "/Homepage/homepagebackground.jpg",
          titlePart1: "TRANSFORM A LIFE",
          titlePart2: "WITH TECHNOLOGY",
          links: [
            { text: "Donate Computers", url: "/donate" },
            { text: "Support Our Growth", url: "/support" },
          ],
        }}
      />
       <div className="m-10"><ImageMarquee
        images={partnerLogos}
        title="Join 250+ Computer Donors."
      />
      </div>
      <h2 className="ml-14 mt-20 text-7xl font-subtitle text-left">
        Be Part of the Change
      </h2>
      <div>
        <InfoCard cards={cardsData} />
      </div>
      <Testimonial
    props={{
      title2: " Give Unused Tech a Second Chance!",
      desc2: '"I’m going to start filling out all my college applications!” -Kendadi',
      image: "../Homepage/homepagetestimonial.png",
      alt: `Partner organization taking photos with Computers 4 People team member`,
      side: "left", // Image on the right
      links: [{text:'Donate Computers', url: "/donate"}, {text: 'Become a Non-Profit Partner', url: "/partner"}]
    }}
  />
      <div className="my-5 mt-20 p-5 mb-20">
        <IconCards cards={iconsData} />
      </div>
    </div>
  );
}
