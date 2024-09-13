import logo from './logo.svg';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Homepage from './homepage/homepage';
import Donate from './homepage/donate';
import Apply from './homepage/apply';
import DSClasses from './homepage/dsclasses';
import About from './homepage/about';
import Blog from './homepage/blog';
import Careers from './homepage/careers';
import Contact from './homepage/contact';
import Ewastedropoff from './homepage/ewastedropoff';
import Financialdonation from './homepage/financialdonation';
import Help from './homepage/help';
import Press from './homepage/press';
import Impact from './homepage/impact';
import Partner from './homepage/partner';
import Programs from './homepage/programs';
import Socialmedia from './homepage/socialmedia';
import Team from './homepage/team';
import Volunteer from './homepage/volunteer';
import Hotspot from './homepage/hotspot';
import Pepper from './homepage/pepper';
import Login from './homepage/login';
import PageNotFound from './homepage/404page';
import PepperFest from './homepage/pepperfest';

// import background from './background.jpg'
import './App.css';
// import background from '/images/background.jpg'
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  // console.log(background);
  return (
    <div className="app">
      <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route path='/' element={<Homepage/>}/>
              {/* <Homepage /> */}
            <Route path="/donate" element={<Donate />}/>
           <Route path="/apply" element={<Apply />}/>
            <Route path="/dsclasses" element={<DSClasses />}/>
            <Route path="/blog" element={<Blog />}/>
            <Route path="/careers" element={<Careers />}/>
            <Route path="/about" element={<About />}/>         
            <Route path="/contact" element={<Contact />}/>
            <Route path="/ewastedropoff" element={<Ewastedropoff />}/>
            <Route path="/financialdonation" element={<Financialdonation />}/>
            <Route path="/help" element={<Help />}/>
            <Route path="/press" element={<Press />}/>
            <Route path="/impact" element={<Impact />}/>
            <Route path="/partner" element={<Partner />}/>
            <Route path="/programs" element={<Programs />}/>
            <Route path="/socialmedia" element={<Socialmedia />}/>
            <Route path="/team" element={<Team />}/>
            <Route path="/hotspot" element={<Hotspot />}/>
            <Route path="/volunteer" element={<Volunteer />}/>
            {/* <Route path="/pepper" element={<Pepper />}/> */}
            <Route path="/login" element={<Login />}/>
            <Route path='/pepperfest' element={<PepperFest />}/>
            <Route path="*" element={<PageNotFound />} />
         </Routes>
         <Footer/>
         {/* </div> */}
       </BrowserRouter>
    </div>
  );
}

export default App;
