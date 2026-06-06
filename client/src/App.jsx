import { useState, useEffect } from 'react'
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Home from './pages/Home';

import { BrowserRouter, Routes, Route } from "react-router-dom";


import './App.css'

function App() {

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    // console.log(token);

    if (token) {
      localStorage.setItem("authToken", token);

      // remove token from URL
      window.history.replaceState({}, "", "/");
    }
  }, []);

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
