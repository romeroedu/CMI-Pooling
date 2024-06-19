import React from 'react';
import 'tailwindcss/tailwind.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Components
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';

function App() {
  return (
    <Router>
      <Routes>
          <Route index Component={Login}/>
          <Route path="/dashboard" Component={Dashboard}/>
      </Routes>
    </Router>
  );
}

export default App;
