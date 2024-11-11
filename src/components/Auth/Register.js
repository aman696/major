// src/components/Auth/Register.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebaseconfig'; // Import Firestore
import { useNavigate, Link } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(password !== confirmPassword){
      setError('Passwords do not match');
      return;
    }
    try{
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Create a user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        displayName: '',
        photoURL: '',
        phone: '',
        address: '',
        createdAt: new Date(),
      });
      
      navigate('/');
    } catch(err){
      setError(err.message);
    }
  };

  return (
    <div className="container flex justify-center items-center min-h-screen bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">Register</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block mb-1 text-gray-200" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="w-full p-2 rounded bg-gray-700 text-gray-200"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-200" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="w-full p-2 rounded bg-gray-700 text-gray-200"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 text-gray-200" htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            className="w-full p-2 rounded bg-gray-700 text-gray-200"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm your password"
          />
        </div>
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500">Register</button>
        <p className="mt-4 text-center text-gray-400">
          Already have an account? <Link to="/login" className="text-blue-400 hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
