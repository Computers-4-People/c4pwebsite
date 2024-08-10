import logo from './logo.svg';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Homepage from './homepage/homepage';
import Ewaste from './homepage/ewaste';
import Refurbished from './homepage/refurbished';
import DSClasses from './homepage/dsclasses';
import About from './homepage/about';
import Blog from './homepage/blog';
import Careers from './homepage/careers';
import Contact from './homepage/contact';
import Ewastedropoff from './homepage/ewastedropoff';
import Financialdonation from './homepage/financialdonation';
import Help from './homepage/help';
import Impact from './homepage/impact';
import Partner from './homepage/partner';
import Programs from './homepage/programs';
import Socialmedia from './homepage/socialmedia';
import Team from './homepage/team';
import Volunteer from './homepage/volunteer';

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
            <Route path='/' element={<Homepage/>}>
              {/* <Homepage /> */}
            </Route>
            <Route path="/ewaste" element={<Ewaste />}>
           </Route>  
           <Route path="/refurbishment" element={<Refurbished />}>
            </Route>
            <Route path="/dataskills" element={<DSClasses />}>
              </Route> 
            <Route path="/about" element={<About />}>
              </Route>  
            <Route path="/blog" element={<Blog />}>
              </Route>
            <Route path="/careers" element={<Careers />}>
              </Route>         
            <Route path="/contact" element={<Contact />}>
              </Route>
            <Route path="/ewastedropoff" element={<Ewastedropoff />}>
              </Route>
            <Route path="/financialdonation" element={<Financialdonation />}>
              </Route>
            <Route path="/help" element={<Help />}>
              </Route>
            <Route path="/impact" element={<Impact />}>
              </Route>
            <Route path="/partner" element={<Partner />}>
              </Route>
            <Route path="/programs" element={<Programs />}>
              </Route>
            <Route path="/socialmedia" element={<Socialmedia />}>
              </Route>
            <Route path="/team" element={<Team />}>
              </Route>
            <Route path="/volunteer" element={<Volunteer />}>
              </Route>
         </Routes>
         <Footer/>
         {/* </div> */}
       </BrowserRouter>
    </div>
  );
}

export default App;
