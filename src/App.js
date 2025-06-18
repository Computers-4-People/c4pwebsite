import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Scroll from "./components/scroll";
import Homepage from "./homepage/homepage";
import Donate from "./homepage/donate";
import Apply from "./homepage/apply";
import DSClasses from "./homepage/dsclasses";
import About from "./homepage/about";
import Blog from "./homepage/blog";
import Careers from "./homepage/careers";
import Contact from "./homepage/contact";
import Ewastedropoff from "./homepage/ewastedropoff";
import Support from "./homepage/support";
import Press from "./homepage/press";
import Impact from "./homepage/impact";
import Partner from "./homepage/partner";
import Programs from "./homepage/programs";
import Socialmedia from "./homepage/socialmedia";
import Team from "./homepage/team";
import Volunteer from "./homepage/volunteer";
import Hotspot from "./homepage/hotspot";
import Nonprofitapplication from "./homepage/nonprofitapplication";
import Paperapplication from "./homepage/paperapplication";
import Checkin from "./homepage/checkin";
import Uploadrecommendation from "./homepage/uploadrecommendation";
import Eligibility from "./homepage/eligibility";
import Auth from "./homepage/auth";
import Boardapplication from "./homepage/boardapplication";
import Pepper from "./homepage/pepper";
import Portal from "./homepage/portal";
import Shield from "./homepage/shield";
import Shieldsimcard from "./homepage/shieldsimcard";
import Shieldhotspotsim from "./homepage/shieldhotspotsim";
import Shield5grouter from "./homepage/shield5grouter";
import PageNotFound from "./homepage/404page";
import Champions from "./homepage/champions";
import Jackdorsey from "./homepage/fundraiser/jackdorsey144";
import CraigNewmark from "./homepage/fundraiser/craignewmarknotmanagementsince2000";
import RobertSmith from "./homepage/fundraiser/robertfsmith";
import EricSchmidt from "./homepage/fundraiser/ericschmidt";
import MichaelBloomberg from "./homepage/fundraiser/michaelbloomberg108";
import Evan from "./homepage/fundraiser/evan";
import DavidRubenstein from "./homepage/fundraiser/davidrubenstein";
import MichaelDell          from "./homepage/fundraiser/michaeldell";
import ReidHoffman          from "./homepage/fundraiser/reidhoffman";
import ReedHastings         from "./homepage/fundraiser/reedhastings";
import LarryEllison         from "./homepage/fundraiser/larryellison";
import SergeyBrin           from "./homepage/fundraiser/sergeybrin";
import CharlesKoch          from "./homepage/fundraiser/charleskoch";
import PriscillaChan        from "./homepage/fundraiser/priscillachan";
import SamAltman            from "./homepage/fundraiser/samaltman";
import SheriKerschSchultz   from "./homepage/fundraiser/sherikerschschultz";
import MarcBenioff          from "./homepage/fundraiser/marcbenioff";
import VinodKhosla          from "./homepage/fundraiser/vinodkhosla";
import CameronWinklevoss          from "./homepage/fundraiser/cameronwinklevoss";

import "./App.css";
import CameronWinklevoss from "./homepage/fundraiser/cameronwinklevoss";


function App() {
  useEffect(() => {
    // Add Zoho Desk ASAP script dynamically
    const asapScript = document.createElement("script");
    asapScript.type = "text/javascript";
    asapScript.src = "https://desk.zoho.com/portal/api/web/asapApp/560217000008252019?orgId=731111531";
    asapScript.defer = true;
    document.body.appendChild(asapScript);
  }, []); // Ensure this runs only once on component mount

  return (
    <div className="app">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-black focus:text-white focus:px-4 focus:py-2 focus:z-50"
      >
        Skip to main content
      </a>
      <BrowserRouter>
        <Scroll />
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/donate.html" element={<Donate />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/apply.html" element={<Apply />} />
          <Route path="/dsclasses" element={<DSClasses />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact.html" element={<Contact />} />
          <Route path="/ewastedropoff" element={<Ewastedropoff />} />
          <Route path="/support" element={<Support />} />
          <Route path="/press" element={<Press />} />
          <Route path="/press.html" element={<Press />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/impact" element={<Impact />} />
          <Route path="/partner" element={<Partner />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/socialmedia" element={<Socialmedia />} />
          <Route path="/team" element={<Team />} />
          <Route path="/team.html" element={<Team />} />
          <Route path="/hotspot" element={<Hotspot />} />
          <Route path="/nonprofitapplication" element={<Nonprofitapplication />} />
          <Route path="/paperapplication" element={<Paperapplication />} />
          <Route path="/checkin" element={<Checkin />} />
          <Route path="/uploadrecommendation" element={<Uploadrecommendation />} />
          <Route path="/eligibility" element={<Eligibility />} />
          <Route path="/uploadrecommendation.html" element={<Uploadrecommendation />} />
          <Route path="/boardapplication" element={<Boardapplication />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/connect" element={<Shield />} />
          <Route path="/shield" element={<Shield />} />
          <Route path="/shieldinternet" element={<Shield />} />
          <Route path="/shieldsimcard" element={<Shieldsimcard />} />
          <Route path="/shieldhotspotsim" element={<Shieldhotspotsim />} />
          <Route path="/shield5grouter" element={<Shield5grouter />} />
          <Route path="/portal" element={<Portal />} />
          <Route path="/champions" element={<Champions />} />
          <Route path="/pepper" element={<Pepper />} />
          <Route path="/pepper.html" element={<Pepper />} />
          <Route path="/Pepper-Fest" element={<Pepper />} />
          <Route path="/jackdorsey144" element={<Jackdorsey />} />
          <Route path="/craignewmarknotmanagementsince2000" element={<CraigNewmark />} />
          <Route path="/robertfsmith" element={<RobertSmith />} />
          <Route path="/ericschmidt" element={<EricSchmidt />} />
          <Route path="/michaelbloomberg108" element={<MichaelBloomberg />} />
          <Route path="/evan" element={<Evan />} />
          <Route path="/davidrubenstein" element={<DavidRubenstein />} />
          <Route path="/michaeldell"            element={<MichaelDell />} />
          <Route path="/reidhoffman"            element={<ReidHoffman />} />
          <Route path="/reedhastings"           element={<ReedHastings />} />
          <Route path="/larryellison"           element={<LarryEllison />} />
          <Route path="/sergeybrin"             element={<SergeyBrin />} />
          <Route path="/charleskoch"            element={<CharlesKoch />} />
          <Route path="/priscillachan"          element={<PriscillaChan />} />
          <Route path="/samaltman"              element={<SamAltman />} />
          <Route path="/sherikerschschultz"     element={<SheriKerschSchultz />} />
          <Route path="/marcbenioff"            element={<MarcBenioff />} />
          <Route path="/vinodkhosla"            element={<VinodKhosla />} />
          <Route path="/cameronwinklevoss"            element={<CameronWinklevoss />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
