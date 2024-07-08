import logo from './logo.svg';
import Navbar from './components/navbar/navbar';
import Footer from './components/navbar/footer';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar/>
          <Routes>
           <Route path="/apply">

           </Route>         
         </Routes>
         <Footer/>
       </BrowserRouter>
    </div>
  );
}

export default App;
