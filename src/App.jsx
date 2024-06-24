import React from 'react';
import 'tailwindcss/tailwind.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Components
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';
import About from './components/About.jsx';
import SignupPage from './components/Signup.jsx';
import AvailabilitySchedulePage from './components/Availability.jsx';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
          <Route index Component={Login}/>
          <Route path="/dashboard" Component={Dashboard}/>
          <Route path="/about" Component={About}/>
          <Route path="/signup" element = {<SignupPage/>}/>
          <Route path="/availability" element={<AvailabilitySchedulePage/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
