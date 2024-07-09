import logo from './logo.svg';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Homepage from './homepage/homepage';
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
          <Homepage />
        {/* <div style={{backgroundImage: 'url("/background.jpg")'}} className="bg-cover bg-center bg-absolute bg-no-repeat" /> */}
        {/* <img src='background.jpg' alt="" className='-z-10absolute bg-cover bg-center  bg-no-repeat'></img> */}
        
          <Routes>
            <Route path='/'>
            </Route>
           <Route path="/apply">
           </Route>         
         </Routes>
         <Footer/>
         {/* </div> */}
       </BrowserRouter>
    </div>
  );
}

export default App;
