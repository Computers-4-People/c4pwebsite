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
import Contribution       from "./homepage/addacontribution";
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
import DavidDuffield         from "./homepage/fundraiser/davidduffield";
import AneelBhusri           from "./homepage/fundraiser/aneelbhusri";
import DavidSun              from "./homepage/fundraiser/davidsun";
import AliceWalton           from "./homepage/fundraiser/alicewalton";
import JoshHarris            from "./homepage/fundraiser/joshharris";
import MelaniePerkins        from "./homepage/fundraiser/melanieperkins";
import CliffObercht          from "./homepage/fundraiser/cliffobercht";
import JedMcCaleb            from "./homepage/fundraiser/jedmccaleb";
import EricLefkofsky         from "./homepage/fundraiser/ericlefkofsky";
import FredEhrsam            from "./homepage/fundraiser/fredehrsam";
import JanKoum               from "./homepage/fundraiser/jankoum";
import ToddMcKinnon          from "./homepage/fundraiser/toddmckinnon";
import RyanSmith             from "./homepage/fundraiser/ryansmith";
import ScottCook             from "./homepage/fundraiser/scottcook";

import ChrisWanstrath       from "./homepage/fundraiser/chriswanstrath";
import GeorgeRoberts        from "./homepage/fundraiser/georgeroberts";
import AlexisLeQuoc            from "./homepage/fundraiser/alexislequoc";
import BenChestnut             from "./homepage/fundraiser/benchestnut";
import BenSilbermann           from "./homepage/fundraiser/bensilbermann";
import BradGarlinghouse        from "./homepage/fundraiser/bradgarlinghouse";
import DanielLoeb              from "./homepage/fundraiser/danielloeb";
import DanielLubetzky          from "./homepage/fundraiser/daniellubetzky";
import DavidTepper             from "./homepage/fundraiser/davidtepper";
import DustinMoskovitz         from "./homepage/fundraiser/dustinmoskovitz";
import JeffreySkoll            from "./homepage/fundraiser/jeffreyskoll";
import JohnOverdeck            from "./homepage/fundraiser/johnoverdeck";
import JordanSugarCarlsgaard   from "./homepage/fundraiser/jordansugarcarlsgaard";
import LeonardBlavatnick       from "./homepage/fundraiser/leonardblavatnick";
import MellodyHobson           from "./homepage/fundraiser/mellodyhobson";
import NathanBlecharczyk       from "./homepage/fundraiser/nathanblecharczyk";
import NicoleShanahan          from "./homepage/fundraiser/nicoleshanahan";
import RichBarton              from "./homepage/fundraiser/richbarton";
import SaraBlakely             from "./homepage/fundraiser/sarablakely";
import StephenMandel           from "./homepage/fundraiser/stephenmandel";
import TravisKalanick          from "./homepage/fundraiser/traviskalanick";
import RomeshWadhwani      from "./homepage/fundraiser/romeshwadhwani";
import StacySchusterman    from "./homepage/fundraiser/stacyschusterman";
import AllisonThoreson     from "./homepage/fundraiser/allisonthoreson";
import CariTuna            from "./homepage/fundraiser/carituna";
import DavidMerage         from "./homepage/fundraiser/davidmerage";
import TomSteyer           from "./homepage/fundraiser/tomsteyer";
import JosephTsai          from "./homepage/fundraiser/josephtsai";
import ChrisSacca          from "./homepage/fundraiser/chrissacca";
import ThierryCruanes        from "./homepage/fundraiser/thierrycruanes";
import MarkCuban        from "./homepage/fundraiser/markcuban";
import PalmerLuckey     from "./homepage/fundraiser/palmerluckey";
import AndyFang         from "./homepage/fundraiser/andyfang";
import JohnMorgridge    from "./homepage/fundraiser/johnmorgridge";
import HowardMorgan     from "./homepage/fundraiser/howardmorgan";
import AnneWojcicki     from "./homepage/fundraiser/annewojcicki";
import DouglasLeone        from "./homepage/fundraiser/douglasleone";
import SeanParker          from "./homepage/fundraiser/seanparker";
import JimGoodnight        from "./homepage/fundraiser/jimgoodnight";
import MatthewRoszak       from "./homepage/fundraiser/matthewroszak";
import MichaelMoritz       from "./homepage/fundraiser/michaelmoritz";
import ThomasSiebel        from "./homepage/fundraiser/thomassiebel";
import MackenzieScott      from "./homepage/fundraiser/mackenziescott";
import SteveBallmer        from "./homepage/fundraiser/steveballmer";
import PhilKnight          from "./homepage/fundraiser/philknight";
import DrewHouston         from "./homepage/fundraiser/drewhouston";
import EricYuan            from "./homepage/fundraiser/ericyuan";
import SusanCrown          from "./homepage/fundraiser/susancrown";
import SherylSandberg      from "./homepage/fundraiser/sherylsandberg";
import StewartButterfield  from "./homepage/fundraiser/stewartbutterfield";
import RichardSands        from "./homepage/fundraiser/richardsands";
import DavidSteward        from "./homepage/fundraiser/davidsteward";
import "./App.css";


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
          <Route path="/addacontribution" element={<Contribution />} />
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
          <Route path="/davidduffield"     element={<DavidDuffield />} />
          <Route path="/aneelbhusri"       element={<AneelBhusri />} />
          <Route path="/davidsun"          element={<DavidSun />} />
          <Route path="/alicewalton"       element={<AliceWalton />} />
          <Route path="/joshharris"        element={<JoshHarris />} />
          <Route path="/melanieperkins"    element={<MelaniePerkins />} />
          <Route path="/cliffobercht"      element={<CliffObercht />} />
          <Route path="/jedmccaleb"        element={<JedMcCaleb />} />
          <Route path="/ericlefkofsky"     element={<EricLefkofsky />} />
          <Route path="/fredehrsam"        element={<FredEhrsam />} />
          <Route path="/jankoum"           element={<JanKoum />} />
          <Route path="/toddmckinnon"      element={<ToddMcKinnon />} />
          <Route path="/ryansmith"         element={<RyanSmith />} />
          <Route path="/scottcook"         element={<ScottCook />} />
          <Route path="/chriswanstrath"         element={<ChrisWanstrath />} />
          <Route path="/georgeroberts"         element={<GeorgeRoberts />} />
          <Route path="/alexislequoc"           element={<AlexisLeQuoc />} />
          <Route path="/benchestnut"            element={<BenChestnut />} />
          <Route path="/bensilbermann"          element={<BenSilbermann />} />
          <Route path="/bradgarlinghouse"       element={<BradGarlinghouse />} />
          <Route path="/danielloeb"             element={<DanielLoeb />} />
          <Route path="/daniellubetzky"         element={<DanielLubetzky />} />
          <Route path="/davidtepper"            element={<DavidTepper />} />
          <Route path="/dustinmoskovitz"        element={<DustinMoskovitz />} />
          <Route path="/jeffreyskoll"           element={<JeffreySkoll />} />
          <Route path="/johnoverdeck"           element={<JohnOverdeck />} />
          <Route path="/jordansugarcarlsgaard"  element={<JordanSugarCarlsgaard />} />
          <Route path="/leonardblavatnick"      element={<LeonardBlavatnick />} />
          <Route path="/mellodyhobson"          element={<MellodyHobson />} />
          <Route path="/nathanblecharczyk"      element={<NathanBlecharczyk />} />
          <Route path="/nicoleshanahan"         element={<NicoleShanahan />} />
          <Route path="/richbarton"             element={<RichBarton />} />
          <Route path="/sarablakely"            element={<SaraBlakely />} />
          <Route path="/stephenmandel"          element={<StephenMandel />} />
          <Route path="/traviskalanick"         element={<TravisKalanick />} />
          <Route path="/romeshwadhwani"      element={<RomeshWadhwani />} />
          <Route path="/stacyschusterman"    element={<StacySchusterman />} />
          <Route path="/allisonthoreson"     element={<AllisonThoreson />} />
          <Route path="/carituna"            element={<CariTuna />} />
          <Route path="/davidmerage"         element={<DavidMerage />} />
          <Route path="/tomsteyer"           element={<TomSteyer />} />
          <Route path="/josephtsai"          element={<JosephTsai />} />
          <Route path="/chrissacca"          element={<ChrisSacca />} />
          <Route path="/thierrycruanes"          element={<ThierryCruanes />} />
          <Route path="/markcuban"        element={<MarkCuban />} />
          <Route path="/palmerluckey"     element={<PalmerLuckey />} />
          <Route path="/andyfang"         element={<AndyFang />} />
          <Route path="/johnmorgridge"    element={<JohnMorgridge />} />
          <Route path="/howardmorgan"     element={<HowardMorgan />} />
          <Route path="/annewojcicki"     element={<AnneWojcicki />} />
          <Route path="/douglasleone"        element={<DouglasLeone />} />
          <Route path="/seanparker"          element={<SeanParker />} />
          <Route path="/jimgoodnight"        element={<JimGoodnight />} />
          <Route path="/matthewroszak"       element={<MatthewRoszak />} />
          <Route path="/michaelmoritz"       element={<MichaelMoritz />} />
          <Route path="/thomassiebel"        element={<ThomasSiebel />} />
          <Route path="/mackenziescott"      element={<MackenzieScott />} />
          <Route path="/steveballmer"        element={<SteveBallmer />} />
          <Route path="/philknight"         element={<PhilKnight />} />
          <Route path="/drewhouston"         element={<DrewHouston />} />
          <Route path="/ericyuan"            element={<EricYuan />} />
          <Route path="/susancrown"          element={<SusanCrown />} />
          <Route path="/sherylsandberg"      element={<SherylSandberg />} />
          <Route path="/stewartbutterfield"  element={<StewartButterfield />} />
          <Route path="/richardsands"        element={<RichardSands />} />
          <Route path="/davidsteward"        element={<DavidSteward />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
