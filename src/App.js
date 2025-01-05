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
import Boardapplication from "./homepage/boardapplication";
import Pepper from "./homepage/pepper";
import Portal from "./homepage/portal";
import Connect from "./homepage/connect987654321";
import PageNotFound from "./homepage/404page";
import "./App.css";

function App() {
  useEffect(() => {
    // Add GTM script dynamically
    const script = document.createElement("script");
    script.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-TKNZ7LGV');
    `;
    document.head.appendChild(script);

    // Add GTM noscript fallback dynamically
    const noscript = document.createElement("noscript");
    noscript.innerHTML = `
      <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>
    `;
    document.body.appendChild(noscript);
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
          <Route path="/connect987654321" element={<Connect />} />
          <Route path="/portal" element={<Portal />} />
          <Route path="/pepper" element={<Pepper />} />
          <Route path="/pepper.html" element={<Pepper />} />
          <Route path="/Pepper-Fest" element={<Pepper />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
