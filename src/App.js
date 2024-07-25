import logo from './logo.svg';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Homepage from './homepage/homepage';
import Ewaste from './homepage/ewaste';
import Refurbished from './homepage/refurbished';
import DSClasses from './homepage/dsclasses';

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
         </Routes>
         <Footer/>
         {/* </div> */}
       </BrowserRouter>
    </div>
  );
}

export default App;
