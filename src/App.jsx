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
    <div className="flex flex-col min-h-screen">
      <Router>
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route index element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/availability" element={<AvailabilitySchedulePage />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;