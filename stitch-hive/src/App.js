import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Fashion from './components/Fashion';
import Collab from './components/Collab';
import Intro from './components/home/Intro';
import IntroDetail from './components/home/IntroDetail';
import LoginA from './components/Login/LoginA';
import LoginC from './components/Login/LoginC';
import LoginT from './components/Login/LoginT';
import LoginB from './components/Login/LoginB';
import RegisterC from './components/register/RegisterC';
import RegisterT from './components/register/RegisterT';
import RegisterB from './components/register/RegisterB';
import Service from './components/service/Service';
import Feedback from './components/customer/Feedback';
import ProfileA from './components/profile/ProfileA';
import ProfileB from './components/profile/ProfileB';
import ProfileC from './components/profile/ProfileC';
import ProfileT from './components/profile/ProfileT';
import Tailor from './components/tailor/Tailor';
import Track from './components/customer/TrackOrder';
import TrackOrder from './components/customer/TrackOrder';
import ProfileTforC from './components/profile/ProfileTforC';
import OrderSuccess from './components/profile/OrderSuccess'; 



const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login/customer" element={<LoginC />} />
        <Route path="/login/admin" element={<LoginA />} />
        <Route path="/login/tailor" element={<LoginT />} />
        <Route path="/login/boutique-owner" element={<LoginB />} />
        <Route path="/register/customer" element={<RegisterC />} />
        <Route path="/register/tailor" element={<RegisterT />} />
        <Route path="/register/boutique-owner" element={<RegisterB />} />
        <Route path="/services" element={<Service />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/profile/admin" element={<ProfileA/>} />
        <Route path="/profile/boutique-owner/:email" element={<ProfileB />} />
        <Route path="/profile/tailor/:email" element={<ProfileT/>} />
        <Route path="/profile/customer/:email" element={<ProfileC/>} />
        <Route path="/Tailor" element={<Tailor/>} />
        <Route path="/Fashion-Insights" element={<Fashion/>} />
        <Route path="/collaboration" element={<Collab/>} />
        <Route path="/Track-Order" element={<Track/>} />
        <Route path="/tailor/:email" element={<ProfileTforC />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/TrackOrder/:email" element={<TrackOrder />} />

      </Routes>
    </div>
  );
};
const Home = () => {
  return ( 
    <>
      <Intro />
      <IntroDetail />
    </>
  );
};
export default App;