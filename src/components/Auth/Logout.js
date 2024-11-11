// src/components/Auth/Logout.js
import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseconfig';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500">
      Logout
    </button>
  );
}

export default Logout;
