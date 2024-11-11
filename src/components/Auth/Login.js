// src/components/Auth/Login.js
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebaseconfig'; // Import Firestore
import { useNavigate, Link } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Check if user document exists
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        // Create a default user document if it doesn't exist
        await setDoc(userDocRef, {
          displayName: '',
          photoURL: '',
          phone: '',
          address: '',
          createdAt: new Date(),
        });
      }
      
      navigate('/'); // Redirect to home page after login
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container flex justify-center items-center min-h-screen bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">Login</h2>
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
        <div className="mb-6">
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
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500">Login</button>
        <p className="mt-4 text-center text-gray-400">
          Don't have an account? <Link to="/register" className="text-blue-400 hover:underline">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
