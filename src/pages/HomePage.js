// src/pages/HomePage.js
import React from 'react';
import SideFadeSection from '../components/SideFadeSection';
import { useState } from 'react';
import { db } from '../firebaseconfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { BrowserRouter as Router, Route, Routes, Link,useNavigate  } from 'react-router-dom';
import ServicesPage from './ServicesPage';  
function HomePage() {
  const navigate = useNavigate();

  // Display only the first three services from the services list
  const services = [
    { id: 1, name: 'Cleaning', description: 'Professional home and office cleaning services.', iconUrl: 'https://cdn.prod.website-files.com/60ff934f6ded2d17563ab9dd/61392d693cf1ac14070ad5b8_starting-a-cleaning-business.jpeg' },
    { id: 2, name: 'Plumbing', description: 'Reliable plumbing repairs and installations.', iconUrl: 'https://westmoreland.edu/academics/programs/program-pics/plumbing-640x427.jpg' },
    { id: 3, name: 'Electrical', description: 'Expert electrical services for all your needs.', iconUrl: 'https://www.vatsat.hr/wp-content/uploads/Elektroinstalacije.webp' }
  ];

  const handleServiceClick = (serviceId) => {
    navigate(`/services/${serviceId}`);
  };

  return (
    <div>
{/* Hero Section */}
<SideFadeSection direction="left">
  <section className="hero flex flex-col md:flex-row items-center md:items-start md:justify-between p-10 md:p-20 bg-gray-900 text-white">
    <div className="md:w-1/2">
      <img
        src="https://via.placeholder.com/600x400"
        alt="Hero"
        className="w-full h-auto rounded-lg"
      />
    </div>
    <div className="md:w-1/2 md:pl-10 mt-5 md:mt-0 text-center md:text-left">
      <h2 className="text-3xl md:text-4xl font-bold">Welcome to Easy Serve</h2>
      <p className="mt-4 text-md md:text-lg text-gray-300 leading-relaxed">
        Your trusted partner for a variety of quality home services. Whether it's a last-minute repair, a scheduled cleaning, or expert advice on home maintenance, Easy Serve is here to help.
      </p>
      <p className="mt-2 text-md md:text-lg text-gray-300 leading-relaxed">
        We understand your needs and offer personalized, convenient, and affordable solutions to make your life easier. Our experienced and friendly professionals prioritize your comfort, safety, and satisfaction in every task they handle.
      </p>
      <Link to="/services" className="mt-6 inline-block px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 text-md md:text-lg">
        Discover Our Services
      </Link>
    </div>
  </section>
</SideFadeSection>


      {/* Our Services - Show only three services */}
      <SideFadeSection direction="left">
  <section id="services" className="services p-5 md:p-10 bg-gray-800">
    <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-5 text-center text-gray-100">Our Services</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
      {services.map(service => (
        <div
          key={service.id}
          onClick={() => handleServiceClick(service.id)}
          className="bg-gray-700 shadow rounded-lg overflow-hidden cursor-pointer hover:bg-gray-600"
        >
          <div className="relative h-32 md:h-40">
            <img src={service.iconUrl} alt={`${service.name} Icon`} className="w-full h-full object-cover" />
          </div>
          <div className="p-4 text-center">
            <h4 className="font-bold text-md md:text-lg text-white">{service.name}</h4>
            <p className="text-sm md:text-base text-gray-300 mt-2">{service.description}</p>
          </div>
        </div>
      ))}
    </div>
    <Link to="/services" className="mt-4 block mx-auto px-3 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 text-sm md:text-base text-center max-w-max">
      Explore More
    </Link>
  </section>
</SideFadeSection>
 

      {/* Your Health is Our Priority */}
      <SideFadeSection direction="right">
  <section className="priority p-5 md:p-10 flex flex-col md:flex-row items-center bg-gray-900">
    <div className="text-center md:text-left md:w-1/2 mb-5 md:mb-0 md:pr-5">
      <h3 className="text-xl font-bold text-gray-100">Your Health is Our Priority</h3>
      <p className="mt-2 text-gray-300 text-sm md:text-base">
        At Easy Serve, we place a strong emphasis on both quality and safety to ensure our clients' well-being. We are committed to providing reliable, professional services that you can trust in every aspect. Our team members are not only skilled but also prioritize health and safety protocols at every step of service delivery. Each worker is fully vaccinated, up-to-date on health guidelines, and trained to adhere to strict cleanliness standards. We take pride in creating an environment where you feel safe and cared for, whether it’s a home repair, cleaning service, or any of our other offerings. Your peace of mind is our mission.
      </p>
    </div>
    <img src="https://newsinhealth.nih.gov/sites/newsinhealth/files/2021/October/oct-2021-capsule1-man-facemask-getting-vaccinated-clinic.jpg" alt="Health Priority" className="w-full md:w-1/2 rounded-lg"/>
  </section>
</SideFadeSection>

<SideFadeSection direction="left">
  <section className="testimonials p-5 md:p-10 bg-gray-800">
    <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-5 text-center text-gray-100">Our Satisfied Customers</h3>
    <div className="flex flex-col md:flex-row md:space-x-5 items-center md:justify-center space-y-5 md:space-y-0">
      <div className="p-4 md:p-5 bg-gray-700 shadow rounded text-center w-full md:w-1/3">
        <img src="https://via.placeholder.com/80" alt="Customer Avatar" className="rounded-full mx-auto mb-3"/>
        <p className="text-gray-300 text-sm md:text-base">"The cleaning service was top-notch! My home has never felt fresher. The team was professional and thorough."</p>
        <span className="text-xs md:text-sm text-gray-400">- Sarah W., Homeowner</span>
      </div>

      <div className="p-4 md:p-5 bg-gray-700 shadow rounded text-center w-full md:w-1/3">
        <img src="https://via.placeholder.com/80" alt="Customer Avatar" className="rounded-full mx-auto mb-3"/>
        <p className="text-gray-300 text-sm md:text-base">"Had a plumbing emergency, and Easy Serve came to the rescue. Quick, reliable, and fixed it perfectly!"</p>
        <span className="text-xs md:text-sm text-gray-400">- Mike R., Business Owner</span>
      </div>

      <div className="p-4 md:p-5 bg-gray-700 shadow rounded text-center w-full md:w-1/3">
        <img src="https://via.placeholder.com/80" alt="Customer Avatar" className="rounded-full mx-auto mb-3"/>
        <p className="text-gray-300 text-sm md:text-base">"The team was courteous and efficient. From landscaping to repairs, they handled everything seamlessly!"</p>
        <span className="text-xs md:text-sm text-gray-400">- Priya S., Homeowner</span>
      </div>
    </div>
  </section>
</SideFadeSection>


      {/* About Us Section */}
      <SideFadeSection direction="left">
        <section id="about" className="about p-5 md:p-10 bg-gray-800">
          <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-5 text-center text-gray-100">About Us</h3>
          <p className="text-gray-300 text-center max-w-2xl mx-auto">
            Easy Serve is dedicated to providing top-notch services to meet all your needs. Our team of professionals ensures quality and reliability in every service we offer.
          </p>
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
