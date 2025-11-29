import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Donordashboard from './components/Donordashboard';
import Home from './components/Home';
import Request from './components/Request';
import Donate from './components/Donate';
import Userdonorlst from './components/Userdonorlst';

import Admindash from './components/Admindash';
import Adsign from './components/Adsign';
import Adviewreq from './components/Adviewreq';
import Adviewdnr from './components/Adviewdnr';
import Adupreq from './components/Adupreq';
import Addnrup from './components/Addnrup';

function App() {
  return (
    <div className="App">
   <Routes>
   <Route path='/home' element={<Home/>}/>
     <Route path='/' element={<Login/>}/>
     <Route path='/sign' element={<SignUp/>}/>
     <Route path='/donor' element={<Donordashboard/>}/>
     <Route path='/req' element={<Request/>}/>
     <Route path='/dnr' element={<Donate/>}/>
     <Route path='/usrdnr' element={<Userdonorlst/>}/>

     <Route path='/addash' element={<Admindash/>}/>
     <Route path='/adsign' element={<Adsign/>}/>
     <Route path='/adviewreq' element={<Adviewreq/>}/>
     <Route path='/adviewdnr' element={<Adviewdnr/>}/>
     <Route path='/adrequp' element={<Adupreq/>}/>
     <Route path='/addnrup' element={<Addnrup/>}/>











   </Routes>
    </div>
  );
}

export default App;
