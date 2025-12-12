// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import HomePage from './pages/HomePage';
import Destinasi from './pages/Destinasi';
import MainLayout from './pages/MainLayout';
import InKeamanan from './pages/InKeamanan';
import Peta from './pages/Peta';
import Profile from './pages/Profile';
import { PiMetaLogo } from 'react-icons/pi';

function App() {
  return (
    <Router>
      <div className="App">

        <Routes>
          <Route path="/" element={<MainLayout> <HomePage /> </MainLayout>}/>
          <Route path="/destinasi" element={<MainLayout> <Destinasi /> </MainLayout>}/>
          <Route path="/info-keamanan" element={<MainLayout> <InKeamanan /> </MainLayout>} />
          <Route path="/peta-keamanan" element={<MainLayout> <Peta /> </MainLayout>} />
          <Route path="/profile" element={<Profile />}/>

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          {/* <Route path="/" element={<Login />} /> */}
        </Routes>

      </div>
    </Router>
  );
}

export default App;