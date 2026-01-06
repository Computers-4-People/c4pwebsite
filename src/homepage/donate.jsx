import React from "react";
import InfoCard from "../components/infocard";
import IconCards from "../components/iconcards";
import Header from "../components/header";
import Testimonial from "../components/testimonial";
import ImageMarquee from "../components/imagemarquee";
import { Link } from "react-router-dom";

const scrollToForm = () => {
  document.getElementById("donation-form").scrollIntoView({ behavior: "smooth" });
};

export default function Donate() {
  const cards = [
    {
      titlePart1: "Donate",
      titlePart2: "50+ Devices",
      description: "We'll pick up your donation at no cost and handle everything securely.",
      image: "/Programs/E-waste/Images/Donor_Scheduling_Ewaste_Pickup.jpeg",
      alt: "Donor arranging pickup"
    },
    {
      titlePart1: "Donate",
      titlePart2: "<50 Devices",
      description: "Easily drop off your devices at our dropoff locations.",
      image: "/Programs/E-waste/Images/c4p_ambassador_Picking_Up_Ewaste.jpeg",
      alt: "Ambassador drop-off"
    },
    {
      titlePart1: "Data",
      titlePart2: "Destroyed",
      description: "Data is erased using NIST 800-88 standards.",
      image: "/Programs/E-waste/Images/Child_Building_Refurbished_PCs.jpeg",
      alt: "Child refurbishing PC"
    },
    {
      titlePart1: "Others",
      titlePart2: "Are Recycled",
      description: "Non-reusable items are responsibly recycled via R2-certified downstream partners.",
      image: "/Programs/E-waste/Images/Volunteer_Sorting_ewaste.jpeg",
      alt: "Sorting electronics"
    },
    {
      titlePart1: "People",
      titlePart2: "Get Connected",
      description: "Your donated tech helps people access education, jobs, and services.",
      image: "/Programs/E-waste/Images/Recipient_Receiving_Refurbished_Computer.jpeg",
      alt: "Happy recipient"
    }
  ];

  const iconsData = [
    { title: "Fund Digital Access", image: "../Homepage/funddigitalaccess.jpg", alt: "Fund access", link: "/support" },
    { title: "Host a Computer Drive", image: "../Homepage/donatecomputersicon.jpg", alt: "Host drive", link: "/contact" },
    { title: "Volunteer", image: "../Homepage/volunteericon.jpg", alt: "Volunteer with us", link: "/volunteer" }
  ];

  const partnerLogos = [
    { src: "/logos/americanliverfoundation.png", alt: "American Liver Foundation" },
    { src: "/logos/pkf.png", alt: "PKF O'Conner Davies" },
    { src: "/logos/prudential.png", alt: "Prudential" },
    { src: "/logos/hudsoncounty.png", alt: "Hudson County" },
    { src: "/logos/kroll.png", alt: "Kroll" },
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
    { src: "/logos/ef.png", alt: "Education Foundation" },
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
    { src: "/logos/hultprize.png", alt: "The Hult Prize" },
    { src: "/logos/junkteens.png", alt: "Junk Teens" },
    { src: "/logos/carlyle.png", alt: "The Carlyle Group" },
  ];

  return (
    <div id="main-content" className="font-sans overflow-x-hidden">
      <Header props={{
        bgImage: '/Programs/E-waste/Images/c4p_ambassador_Picking_Up_Ewaste.jpeg',
        titlePart1: 'Donate Tech',
        titlePart2: 'Securely & Impactfully',
        description: (
          <p>We ensure your data is fully wiped and your devices go to someone in need. Schedule a free pickup for 50+ devices or drop off fewer anytime.</p>
        ),
        links: [{ text: 'Donate Now', clickAction: scrollToForm }]
      }} />

      <div className="bg-cover">
        <div className="pl-5 md:pl-14">
          <h2 className="text-5xl font-subtitle mt-16">How It Works</h2>
          <p className="text-2xl mt-4 max-w-3xl">From your hands to someone in need - safely, simply, impactfully.</p>
        </div>
        <InfoCard cards={cards} />
      </div>

      {/* Drop-off testimonial */}
      <Testimonial props={{
        title2: 'Quick Drop-Off',
        desc2: (
          <div>
            <p className="mb-4">
              Have fewer than 50 devices?{' '}
              <Link to="/ewastedropoff" className="underline text-c4p hover:text-c4p-hover font-medium">
                Drop them off at a location near you.
              </Link>
            </p>
            <p>We accept any electronics & provide tax deductible receipts.</p>
          </div>
        ),
        image: '/Programs/E-waste/Images/Donor_with_Bulk_Ewaste_Laptops.jpeg',
        alt: 'Donor dropping off laptops'
      }} />

      {/* Data security testimonial with image on right */}
      <Testimonial props={{
        side: "right",
        title2: 'Your Data is Safe',
        desc2: (
          <p>We follow NIST 800-88 standards and provide a certificate of data destruction for every device. Donors receive a portal to view and download their data destruction certificates.</p>
        ),
        image: '/E-waste/datacert.png',
        alt: 'Certificate of data destruction'
      }} />

      {/* Partner Logos */}
      <div className="m-10">
        <ImageMarquee
          images={partnerLogos}
          title="Join 250+ Leaders in Tech, Healthcare, Government, and Beyond."
        />
      </div>

      {/* Get Involved */}
      <div className="bg-cover mt-20">
        <div className="mx-6 md:mx-20 text-center">
          <h2 className="text-5xl font-subtitle mb-3">Get Involved</h2>
          <p className="text-xl">Volunteer, sponsor, or host a drive – your impact starts here.</p>
        </div>
      </div>

      <div className="my-5 p-5 mt-10">
        <IconCards cards={iconsData} />
      </div>

      {/* Donation Form */}
      <div
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5)), url('/Programs/E-waste/Images/c4p_ambassador_Picking_Up_Ewaste.jpeg')`,
          display: 'flex',
          justifyContent: 'center',
          height: '100vh',
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: window.innerWidth > 720 ? 'fixed' : 'scroll'
        }}
        className="bg-fixed"
      >
        <iframe
          scrolling="no"
          id="donation-form"
          aria-label="Donate Computers"
          style={{ width: '100%', height: '100vh', border: 'none', marginBottom: '-1px' }}
          src='https://forms.zohopublic.com/Computers4People/form/DonateYourElectronicstestKPIs/formperma/AsSpFP2nu9WN-cUFojNMNeHV3KcP-8xiM6-sWVFbwgA'
        ></iframe>
      </div>
    </div>
  );
}
