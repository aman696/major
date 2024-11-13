// src/pages/MyBookingsPage.js
import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebaseconfig';
import { collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import SideFadeSection from '../components/SideFadeSection';

function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for auth state changes to get the logged-in user
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;

      try {
        const q = query(
          collection(db, 'bookings'),
          where('userEmail', '==', user.email)
        );

        const querySnapshot = await getDocs(q);
        const userBookings = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBookings(userBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [user]);

  const handleCancelBooking = async (bookingId) => {
    try {
      await deleteDoc(doc(db, 'bookings', bookingId));
      setBookings(bookings.filter(booking => booking.id !== bookingId));
      console.log("Booking cancelled:", bookingId);
    } catch (error) {
      console.error("Error cancelling booking:", error);
      alert("Failed to cancel booking. Please try again.");
    }
  };

  if (!user) {
    return <div className="text-white">Please log in to view your bookings.</div>;
  }

  return (
    <div className="container p-5 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-6">My Bookings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bookings.map((booking) => (
          <SideFadeSection key={booking.id} direction="left">
            <div className="p-4 bg-gray-800 rounded shadow">
              <h3 className="text-lg font-bold text-white">{booking.serviceName}</h3>
              <p className="text-gray-400">Provider: {booking.providerName}</p>
              <p className="text-gray-400">Date: {booking.bookingDate}</p>
              <p className="text-gray-400">Location: {booking.location}</p>
              <button
                onClick={() => handleCancelBooking(booking.id)}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
              >
                Cancel Booking
              </button>
              <button
                onClick={() => handleCancelBooking(booking.id)}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500"
              >
                Complete Booking
              </button>
            </div>
          </SideFadeSection>
        ))}
      </div>
      {bookings.length === 0 && (
        <p className="text-center text-gray-400">You have no bookings.</p>
      )}
    </div>
  );
}

export default MyBookingsPage;
