// src/pages/BookingPage.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db, auth } from '../firebaseconfig';
import { collection, addDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const provider = location.state?.provider || {}; // Get provider data from navigation state

  const [userData, setUserData] = useState({
    userName: '',
    userEmail: '',
    bookingDate: '',
    timeAvailability: '',
    address: '',
    additionalNotes: '',
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUserData((prevData) => ({
          ...prevData,
          userEmail: currentUser.email, // Set the email directly from the authenticated user
        }));
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleBooking = async () => {
    try {
      // Sending data to 'bookings' collection
      await addDoc(collection(db, 'bookings'), {
        providerId: provider.id,
        providerName: provider.name,
        providerExperience: provider.experience,
        providerExpertise: provider.expertise,
        userName: userData.userName,
        userEmail: userData.userEmail,
        bookingDate: userData.bookingDate,
        timeAvailability: userData.timeAvailability,
        address: userData.address,
        additionalNotes: userData.additionalNotes,
        timestamp: new Date(),
      });
      alert('Booking confirmed!');
      navigate('/my-bookings'); // Redirect to a confirmation page if needed
    } catch (error) {
      console.error('Error saving booking:', error);
      alert('There was an issue with your booking. Please try again.');
    }
  };

  return (
    <div className="container p-5 md:p-10 bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-bold text-white mb-6">Booking for {provider.name}</h2>
      <form className="space-y-4">
        <input
          type="text"
          name="userName"
          placeholder="Your Name"
          value={userData.userName}
          onChange={handleChange}
          className="p-2 w-full bg-gray-700 text-white rounded"
          required
        />
        <input
          type="email"
          name="userEmail"
          value={userData.userEmail}
          readOnly
          className="p-2 w-full bg-gray-700 text-white rounded"
        />
        <input
          type="date"
          name="bookingDate"
          value={userData.bookingDate}
          onChange={handleChange}
          className="p-2 w-full bg-gray-700 text-white rounded"
          required
        />
        <input
          type="time"
          name="timeAvailability"
          placeholder="Time Availability"
          value={userData.timeAvailability}
          onChange={handleChange}
          className="p-2 w-full bg-gray-700 text-white rounded"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Your Address"
          value={userData.address}
          onChange={handleChange}
          className="p-2 w-full bg-gray-700 text-white rounded"
          required
        />
        <textarea
          name="additionalNotes"
          placeholder="Additional Notes"
          value={userData.additionalNotes}
          onChange={handleChange}
          className="p-2 w-full bg-gray-700 text-white rounded"
        />
        <button
          type="button"
          onClick={handleBooking}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
}

export default BookingPage;
