// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Logout from './components/Auth/Logout';
import ServiceDetailsPage from './pages/ServiceDetailsPage'; // Import ServiceDetailsPage

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App bg-gray-900 text-gray-200 min-h-screen flex flex-col overflow-x-hidden">
          <Header />
          <div className="pt-24 md:pt-20 pb-16">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:serviceId" element={<ServiceDetailsPage />} /> {/* Match the name and path */}
              <Route path="/services" element={
                <ProtectedRoute>
                  <ServicesPage />
                </ProtectedRoute>
              } />
              <Route path="/" element={
                  <HomePage />
              } />
              {/* Add more routes as needed */}
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

function Header() {
  const { currentUser } = useAuth();


  return (
    <header className="fixed w-full top-0 z-10 flex flex-wrap items-center justify-between p-4 md:p-5 bg-gray-800 shadow">
      <h1 className="text-xl md:text-2xl font-bold text-white">Local Serve</h1>
      <nav className="flex space-x-2 md:space-x-4 mt-2 md:mt-0 text-sm md:text-base items-center">
        <Link to="/" className="hover:text-blue-400">Home</Link>
        <Link to="/services" className="hover:text-blue-400">Services</Link>
        {currentUser ? <Logout /> : <Link to="/login" className="hover:text-blue-400">Login</Link>}
        {currentUser ? null : <Link to="/register" className="hover:text-blue-400 ml-2">Register</Link>}

      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full p-3 md:p-5 bg-gray-800 text-white text-center text-xs md:text-sm shadow">
      © {new Date().getFullYear()} Local Serve. All rights reserved.
    </footer>
  );
}

export default App;
