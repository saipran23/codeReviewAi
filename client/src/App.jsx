import { useEffect } from 'react';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LandingPage from './pages/Landingpage';
import ReviewPage from './pages/ReviewPage';
import MyReview from './pages/MyReview';

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import './App.css';

function AppRoutes() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/landing";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/review/:id" element={<ReviewPage />} />
        <Route path="/myReview" element={<MyReview />} />
      </Routes>
    </>
  );
}

function App() {


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
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;