import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Components
import Login from './components/Login.jsx';

function App() {
  return (

    <Router>
      <Routes>
          <Route index Component={Login}/>
      </Routes>
    </Router>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    //   <Login />
    // </div>

    // <div className="App">
    //   <header className="App-header bg-blue-500 p-6 text-white">
    //     <h1 className="text-3xl font-bold">Hola Mundo!</h1> 
    //   </header>
    // </div>
  );
}

export default App;
