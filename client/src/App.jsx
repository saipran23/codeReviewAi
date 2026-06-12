import { useEffect } from 'react';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LandingPage from './pages/Landingpage';
import ReviewPage from './pages/ReviewPage';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';

function App() {

  // useEffect(() => {
  //   const params = new URLSearchParams(window.location.search);
  //   const token = params.get("token");

  //   if (token) {
  //     localStorage.setItem("authToken", token);
  //     window.history.replaceState({}, "", "/");
  //   }
  // }, []);

  function handleOAuthToken() {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) return;

    localStorage.setItem("authToken", token);
    window.history.replaceState({}, "", window.location.pathname);
  }

  useEffect(() => {
    handleOAuthToken();
  }, []);

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* {location.pathname !== "/login" && <Navbar />} */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/review/:id" element={<ReviewPage />} />


        {/* <Route path="/review/:id" element={<ReviewPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;