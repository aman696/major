// src/pages/ServiceProviderHomePage.js
import SideFadeSection from '../components/SideFadeSection';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../firebaseconfig';

function ServiceProviderHomePage() {
  return (
    <div>
      {/* Hero Section */}
      <SideFadeSection direction="left">
        <section className="hero flex flex-col md:flex-row items-center md:justify-between p-10 md:p-20 bg-teal-900 text-white">
          {/* Left Side (Image) */}
          <div className="md:w-1/2">
            <img
              src="https://via.placeholder.com/600x400"
              alt="Provider Hero"
              className="w-full h-auto rounded-lg"
            />
          </div>

          {/* Right Side (Text Content) */}
          <div className="md:w-1/2 md:pl-10 mt-5 md:mt-0 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold">Welcome Back, Provider!</h2>
            <p className="mt-2 text-md md:text-lg text-gray-200">
              Manage your services and view bookings with ease.
            </p>
            <Link to="/manage-services" className="mt-4 inline-block px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-500">
              Manage Your Services
            </Link>
          </div>
        </section>
      </SideFadeSection>

      {/* Manage Services Section */}
      <SideFadeSection direction="left">
        <section id="manage-services" className="services p-5 md:p-10 bg-teal-800">
          <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-5 text-center text-gray-100">Your Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Example Service Cards */}
            <div className="p-4 bg-teal-700 shadow rounded text-center">
              <img src="https://via.placeholder.com/80" alt="Service Icon" className="mx-auto mb-3 md:mb-4" />
              <h4 className="font-bold text-md md:text-lg text-white">Service 1</h4>
              <p className="text-sm md:text-base text-gray-200">Brief description of service.</p>
            </div>
            <div className="p-4 bg-teal-700 shadow rounded text-center">
              <img src="https://via.placeholder.com/80" alt="Service Icon" className="mx-auto mb-3 md:mb-4" />
              <h4 className="font-bold text-md md:text-lg text-white">Service 2</h4>
              <p className="text-sm md:text-base text-gray-200">Brief description of service.</p>
            </div>
            <div className="p-4 bg-teal-700 shadow rounded text-center">
              <img src="https://via.placeholder.com/80" alt="Service Icon" className="mx-auto mb-3 md:mb-4" />
              <h4 className="font-bold text-md md:text-lg text-white">Service 3</h4>
              <p className="text-sm md:text-base text-gray-200">Brief description of service.</p>
            </div>
          </div>
          <Link to="/manage-services" className="mt-6 md:mt-8 block mx-auto px-4 md:px-5 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-500">
            View All Services
          </Link>
        </section>
      </SideFadeSection>

      {/* Bookings Section */}
      <SideFadeSection direction="right">
        <section className="bookings p-5 md:p-10 bg-teal-900">
          <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-5 text-center text-gray-100">Recent Bookings</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Example Booking Cards */}
            <div className="p-4 bg-teal-700 shadow rounded text-center">
              <h4 className="font-bold text-md md:text-lg text-white">Booking 1</h4>
              <p className="text-sm md:text-base text-gray-200">Details about the booking.</p>
            </div>
            <div className="p-4 bg-teal-700 shadow rounded text-center">
              <h4 className="font-bold text-md md:text-lg text-white">Booking 2</h4>
              <p className="text-sm md:text-base text-gray-200">Details about the booking.</p>
            </div>
            <div className="p-4 bg-teal-700 shadow rounded text-center">
              <h4 className="font-bold text-md md:text-lg text-white">Booking 3</h4>
              <p className="text-sm md:text-base text-gray-200">Details about the booking.</p>
            </div>
          </div>
          <Link to="/bookings" className="mt-6 md:mt-8 block mx-auto px-4 md:px-5 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-500">
            View All Bookings
          </Link>
        </section>
      </SideFadeSection>

      {/* About Us Section */}
      <SideFadeSection direction="left">
        <section id="about" className="about p-5 md:p-10 bg-teal-800">
          <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-5 text-center text-gray-100">About Us</h3>
          <p className="text-gray-200 text-center max-w-2xl mx-auto">
            Easy Serve connects service providers with customers in need of reliable services. Join our network to grow your business and reach new clients.
          </p>
        </section>
      </SideFadeSection>

      {/* Contact Support Section */}
      <SideFadeSection direction="right">
        <section id="contact-support" className="contact-support p-5 md:p-10 bg-teal-900">
          <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-5 text-center text-gray-100">Contact Support</h3>
          <ContactForm />
        </section>
      </SideFadeSection>
    </div>
  );
}

export default ServiceProviderHomePage;

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'contacts'), {
        name,
        email,
        message,
        createdAt: Timestamp.now(),
      });
      setSuccess('Message sent successfully!');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setError('Failed to send message. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      {success && <p className="text-green-500 mb-4">{success}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <label htmlFor="name" className="block mb-1 text-gray-200">Name</label>
        <input
          type="text"
          id="name"
          className="w-full p-2 rounded bg-teal-700 text-gray-200"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Your Name"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block mb-1 text-gray-200">Email</label>
        <input
          type="email"
          id="email"
          className="w-full p-2 rounded bg-teal-700 text-gray-200"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Your Email"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="message" className="block mb-1 text-gray-200">Message</label>
        <textarea
          id="message"
          rows="4"
          className="w-full p-2 rounded bg-teal-700 text-gray-200"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          placeholder="Your Message"
        ></textarea>
      </div>
      <button type="submit" className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-500">Send Message</button>
    </form>
  );
}
