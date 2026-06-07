import { useEffect } from 'react';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LandingPage from './pages/Landingpage';
// import ReviewPage from '.';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';

function App() {

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("authToken", token);
      window.history.replaceState({}, "", "/");
    }
  }, []);

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* <Route path="/review/:id" element={<ReviewPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;