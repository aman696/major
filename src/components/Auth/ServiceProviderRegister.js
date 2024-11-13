// src/components/Auth/ServiceProviderRegister.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebaseconfig';
import { useNavigate, Link } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import SideFadeSection from '../SideFadeSection';
function ServiceProviderRegister() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceCategory, setServiceCategory] = useState('');
  const [experience, setExperience] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Predefined categories
  const categories = [
    'Cleaning', 'Plumbing', 'Electrical', 'Landscaping',
    'Painting', 'Carpentry', 'Pest Control', 'Home Repair',
    'Moving', 'Appliance Repair'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create a document in the `serviceProviders` collection for the new service provider
      await setDoc(doc(db, 'serviceProviders', user.uid), {
        displayName: name,
        email: email,
        phone: phone,
        serviceCategory: serviceCategory,
        experience: experience,
        createdAt: new Date(),
        role: 'serviceProvider'
      });

      navigate('/service-provider-home');    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 bg-opacity-90 p-8 rounded-lg shadow-2xl w-full max-w-md text-white"
        style={{ backdropFilter: 'blur(10px)' }}
      >
        <SideFadeSection direction="left">
          <h2 className="text-3xl font-semibold mb-6 text-center">Register as a Service Provider</h2>
        </SideFadeSection>

        {error && (
          <SideFadeSection direction="right">
            <p className="text-red-400 mb-4 text-center">{error}</p>
          </SideFadeSection>
        )}

        <SideFadeSection direction="left">
          <div className="mb-5">
            <input
              type="text"
              id="name"
              className="w-full p-3 rounded-lg bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Full Name"
            />
          </div>
        </SideFadeSection>

        <SideFadeSection direction="right">
          <div className="mb-5">
            <input
              type="tel"
              id="phone"
              className="w-full p-3 rounded-lg bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="Phone Number"
            />
          </div>
        </SideFadeSection>

        <SideFadeSection direction="left">
          <div className="mb-5">
            <input
              type="email"
              id="email"
              className="w-full p-3 rounded-lg bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email Address"
            />
          </div>
        </SideFadeSection>

        <SideFadeSection direction="right">
          <div className="mb-5">
            <input
              type="password"
              id="password"
              className="w-full p-3 rounded-lg bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
          </div>
        </SideFadeSection>

        <SideFadeSection direction="left">
          <div className="mb-5">
            <input
              type="password"
              id="confirmPassword"
              className="w-full p-3 rounded-lg bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm Password"
            />
          </div>
        </SideFadeSection>

        <SideFadeSection direction="right">
          <div className="mb-5">
            <select
              id="serviceCategory"
              className="w-full p-3 rounded-lg bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              value={serviceCategory}
              onChange={(e) => setServiceCategory(e.target.value)}
              required
            >
              <option value="" disabled>Select Service Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </SideFadeSection>

        <SideFadeSection direction="left">
          <div className="mb-6">
            <input
              type="text"
              id="experience"
              className="w-full p-3 rounded-lg bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
              placeholder="Years of Experience"
            />
          </div>
        </SideFadeSection>

        <SideFadeSection direction="right">
          <button
            type="submit"
            className="w-full p-3 rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors text-white font-semibold text-lg shadow-md"
          >
            Register as Service Provider
          </button>
        </SideFadeSection>

        <SideFadeSection direction="left">
          <p className="mt-6 text-center text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:underline">
              Login
            </Link>
          </p>
        </SideFadeSection>
      </form>
    </div>
  );
}

export default ServiceProviderRegister;
