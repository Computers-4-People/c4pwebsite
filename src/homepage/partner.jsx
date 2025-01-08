import React from "react";
import Header from "../components/header";
import Testimonial from "../components/testimonial";
import ImageMarquee from "../components/imagemarquee";

export default function Refurbished() {
    const scrollToForm = () => {
        document.getElementById("partnership-form").scrollIntoView({ behavior: "smooth" });
        
    };
    const partnerLogos = [
            { src: "../logos/cityofboston.png", alt: "City of Boston" },
            { src: "../logos/unitedway.png", alt: "United Way" },
            { src: "../logos/jewishboard.png", alt: "Jewish Board" },
            { src: "../logos/perscholas.png", alt: "Per Scholas" },
            { src: "../logos/phoenixhouse.png", alt: "Phoenix House" },
            { src: "../logos/camba.png", alt: "Camba" },
            { src: "../logos/cws.png", alt: "Church World Service" },
            { src: "../logos/easterseals.png", alt: "Easterseals" },
            { src: "../logos/veteransaffairs.png", alt: "Veteran Affairs" },
            { src: "../logos/boysandgirlsclub.png", alt: "Boys and Girls Club" },
            { src: "../logos/volunteersofamerica.png", alt: "Volunteers of America" },
            { src: "../logos/yorkstreetproject.png", alt: "York Street Project" },
            { src: "../logos/doefund.png", alt: "The Doe Fund" },
            { src: "../logos/lacolaborativa.png", alt: "La Colaborativa" },
            { src: "../logos/brc.png", alt: "BRC" },
            { src: "../logos/communitylifestyle.png", alt: "Community Lifestyle" },
            { src: "../logos/npower.png", alt: "N Power" },
            { src: "../logos/rutgers.png", alt: "Rutgers University" },
            { src: "../logos/maturityworks.png", alt: "Maturity Works" },
            { src: "../logos/housingworks.png", alt: "Housing Works" },
            { src: "../logos/familypromise.png", alt: "Family Promise" },
            { src: "../logos/hopes.png", alt: "HOPES Cap" },
            { src: "../logos/fountainhouse.png", alt: "Fountain House" },
            { src: "../logos/odysseyhouse.png", alt: "Odyssey House" },
            { src: "../logos/goodwill.png", alt: "Goodwill" },
            { src: "../logos/riseboro.png", alt: "Riseboro" },
            { src: "../logos/fortunesociety.png", alt: "The Fortune Society" },
            { src: "../logos/communityaccess.png", alt: "Community Access" },
            { src: "../logos/catholiccharities.png", alt: "Catholic Charities" },
      ];

    return (
        <div id="main-content" className='font-sans overflow-x-hidden'>
            <Header props={{bgImage: '/partner/partnerbackground.jpeg', titlePart1: 'Drive Positive Impact', titlePart2: 'Become a Partner',
            description: 'Join a network of 300+ nonprofit partners that are tackling pressing community needs, uplifting people, and building bridges to lasting change worldwide.',
            links: [{text: 'Become a Partner', clickAction: scrollToForm}]
            }} />
              <div className="m-10"><ImageMarquee
        images={partnerLogos}
        title="Join 300+ Non-Profit Partners..."
      />
      </div>
      <Testimonial
    props={{
      title2: "Why Join Us as a Partner?",
      desc2: (
        <ul className="text-lg md:text-lg leading-7 md:leading-8 lg:leading-7 list-disc list-inside">
          <li>
            <strong>Bring Technology to Your Community:</strong> Nominate individuals in your programs for computers.
          </li>
          <li>
            <strong>Host Digital Skills Classes:</strong> Collaborate with us to
            offer essential tech education.
          </li>
          <li>
            <strong>Innovative Partnerships:</strong> Join forces on creative
            solutions to enhance digital equity and impact.
          </li>
        </ul>
      ),
      image: "../partner/dvinekonektionevent.png",
      alt: `Computers 4 People distributing laptops at a partner organization`,
    }}
  />

<Testimonial
    props={{
      title2: "Partner Requirements",
      desc2: (
        <ul className="text-lg md:text-lg leading-7 md:leading-8 lg:leading-7 list-disc list-inside">
          <li>
            <strong>Service Area:</strong> The organization must provide services
            and have a physical location in New Jersey, New York City, or
            Massachusetts.
          </li>
          <li>
            <strong>Mission Alignment:</strong> The organization’s mission
            should align with Computers 4 People’s goals of promoting digital
            access and literacy within under-resourced communities.
          </li>
          <li>
            <strong>Device Distribution Capability:</strong> The organization
            must demonstrate the ability to distribute devices to clients in a
            responsible and secure manner, ensuring that devices reach those
            most in need.
          </li>
          <li>
            <strong>Application Process:</strong> To apply, complete the Partner
            Form before <strong>February 15th</strong>. Applications submitted
            after this date will be considered in the next cycle.
          </li>
        </ul>
      ),
      image: "../partner/graduation.png",
      alt: `Partner organization taking photos with Computers 4 People team member`,
      side: "right", // Image on the right
    }}
  />
            <div style={{
  backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5)), url('/partner/partnerbackground.jpeg')`,
  display: 'flex',
  alignItems: 'center', // This aligns the iframe vertically
  justifyContent: 'center', // This aligns the iframe horizontally
  height: '100vh',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat'
}} className="bg-fixed">
  <iframe
    scrolling="no"
    aria-label='Partner Form'
    style={{ width: '100%', height: '100%', border: 'none' }} // Make iframe fullscreen and remove border
    src='https://forms.zohopublic.com/Computers4People/form/NonProfitPartnerApplicationtestKPIs/formperma/KL05sPM09wVMLK1u79mFQwS8zaWKnQdX57BRHA1NKO0'
    id="partnership-form"
 ></iframe>
</div>
        </div>
    );
}
