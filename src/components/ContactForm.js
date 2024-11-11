// src/components/ContactForm.js
import React, { useState } from 'react';
import { db } from '../firebaseconfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

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

export default ContactForm;
