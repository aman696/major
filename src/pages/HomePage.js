// src/pages/HomePage.js
import React from 'react';
import SideFadeSection from '../components/SideFadeSection';
import { useState } from 'react';
import { db } from '../firebaseconfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <SideFadeSection direction="left">
        <section 
          id="home"
          className="hero bg-cover bg-center text-center p-10 md:p-20 text-white" 
          style={{ backgroundImage: 'url("https://via.placeholder.com/1500x500")' }}
        >
          <h2 className="text-3xl md:text-4xl font-bold">Welcome to Local Serve</h2>
          <p className="mt-2 text-md md:text-lg text-gray-300">Reliable services for your needs</p>
        </section>
      </SideFadeSection>

      {/* Service Partners */}
      <SideFadeSection direction="right">
        <section className="partners p-5 md:p-10">
          <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-5 text-center text-gray-100">Our Partners</h3>
          <div className="flex justify-center flex-wrap gap-5">
            <img src="https://via.placeholder.com/100x50" alt="Partner Logo" className="w-20 h-10 md:w-24 md:h-12" />
            <img src="https://via.placeholder.com/100x50" alt="Partner Logo" className="w-20 h-10 md:w-24 md:h-12" />
            <img src="https://via.placeholder.com/100x50" alt="Partner Logo" className="w-20 h-10 md:w-24 md:h-12" />
            <img src="https://via.placeholder.com/100x50" alt="Partner Logo" className="w-20 h-10 md:w-24 md:h-12" />
          </div>
        </section>
      </SideFadeSection>

      {/* Our Services */}
      <SideFadeSection direction="left">
        <section id="services" className="services p-5 md:p-10 bg-gray-800">
          <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-5 text-center text-gray-100">Our Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="p-4 bg-gray-700 shadow rounded text-center">
              <img src="https://via.placeholder.com/80" alt="Service Icon" className="mx-auto mb-3 md:mb-4"/>
              <h4 className="font-bold text-md md:text-lg text-white">Service 1</h4>
              <p className="text-sm md:text-base text-gray-300">Description of Service 1.</p>
            </div>
            {/* Repeat for other services */}
            <div className="p-4 bg-gray-700 shadow rounded text-center">
              <img src="https://via.placeholder.com/80" alt="Service Icon" className="mx-auto mb-3 md:mb-4"/>
              <h4 className="font-bold text-md md:text-lg text-white">Service 2</h4>
              <p className="text-sm md:text-base text-gray-300">Description of Service 2.</p>
            </div>
            <div className="p-4 bg-gray-700 shadow rounded text-center">
              <img src="https://via.placeholder.com/80" alt="Service Icon" className="mx-auto mb-3 md:mb-4"/>
              <h4 className="font-bold text-md md:text-lg text-white">Service 3</h4>
              <p className="text-sm md:text-base text-gray-300">Description of Service 3.</p>
            </div>
          </div>
          <Link to="/services" className="mt-6 md:mt-8 block mx-auto px-4 md:px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-500">Explore More</Link>
        </section>
      </SideFadeSection>

      {/* Your Health is Our Priority */}
      <SideFadeSection direction="right">
        <section className="priority p-5 md:p-10 flex flex-col md:flex-row items-center bg-gray-900">
          <div className="text-center md:text-left md:w-1/2 mb-5 md:mb-0 md:pr-5">
            <h3 className="text-xl font-bold text-gray-100">Your Health is Our Priority</h3>
            <p className="mt-2 text-gray-300 text-sm md:text-base">We offer quality services with your health in mind.</p>
          </div>
          <img src="https://via.placeholder.com/300x200" alt="Health Priority" className="w-full md:w-1/2 rounded-lg"/>
        </section>
      </SideFadeSection>

      {/* Customer Testimonials */}
      <SideFadeSection direction="left">
        <section className="testimonials p-5 md:p-10 bg-gray-800">
          <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-5 text-center text-gray-100">Our Lovely Customers</h3>
          <div className="flex flex-col md:flex-row md:space-x-5 items-center md:justify-center space-y-5 md:space-y-0">
            <div className="p-4 md:p-5 bg-gray-700 shadow rounded text-center w-full md:w-1/3">
              <img src="https://via.placeholder.com/80" alt="Customer Avatar" className="rounded-full mx-auto mb-3"/>
              <p className="text-gray-300 text-sm md:text-base">"Great service!"</p>
              <span className="text-xs md:text-sm text-gray-400">- Customer 1</span>
            </div>
            {/* Repeat for more testimonials */}
            <div className="p-4 md:p-5 bg-gray-700 shadow rounded text-center w-full md:w-1/3">
              <img src="https://via.placeholder.com/80" alt="Customer Avatar" className="rounded-full mx-auto mb-3"/>
              <p className="text-gray-300 text-sm md:text-base">"Highly recommend!"</p>
              <span className="text-xs md:text-sm text-gray-400">- Customer 2</span>
            </div>
            <div className="p-4 md:p-5 bg-gray-700 shadow rounded text-center w-full md:w-1/3">
              <img src="https://via.placeholder.com/80" alt="Customer Avatar" className="rounded-full mx-auto mb-3"/>
              <p className="text-gray-300 text-sm md:text-base">"Exceptional quality."</p>
              <span className="text-xs md:text-sm text-gray-400">- Customer 3</span>
            </div>
          </div>
        </section>
      </SideFadeSection>

      {/* About Us Section */}
      <SideFadeSection direction="left">
        <section id="about" className="about p-5 md:p-10 bg-gray-800">
          <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-5 text-center text-gray-100">About Us</h3>
          <p className="text-gray-300 text-center max-w-2xl mx-auto">
            Local Serve is dedicated to providing top-notch services to meet all your needs. Our team of professionals ensures quality and reliability in every service we offer.
          </p>
        </section>
      </SideFadeSection>

      {/* Contact Section */}
      <SideFadeSection direction="right">
        <section id="contact" className="contact p-5 md:p-10 bg-gray-900">
          <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-5 text-center text-gray-100">Contact Us</h3>
          <ContactForm />
        </section>
      </SideFadeSection>
    </div>
  );
}

export default HomePage;



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
          className="w-full p-2 rounded bg-gray-700 text-gray-200" 
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
          className="w-full p-2 rounded bg-gray-700 text-gray-200" 
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
          className="w-full p-2 rounded bg-gray-700 text-gray-200" 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          placeholder="Your Message"
        ></textarea>
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">Send Message</button>
    </form>
  );
}
