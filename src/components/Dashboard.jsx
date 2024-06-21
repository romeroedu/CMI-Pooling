import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import AuthContext from "./AuthContext"; // Ensure the path is correct

const Dashboard = () => {
  // Importing user data from firebase
  const { user, dob, uid, firstName, lastName, contactNumber, address, haveCar } = AuthContext();

  // Used for debugging logging out
  const auth = getAuth();
  const handleLogout = () => {
    signOut(auth).then(() => {
      console.log('User logged out');
      // Handle successful logout here, like redirecting to a login page
    }).catch((error) => {
      console.error('Logout error:', error);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 space-y-4">
      <div className="p-8 bg-white rounded shadow-lg">
        <h1 className="text-2xl font-bold text-green-500">You have signed in successfully!</h1>
        <div className="mt-4 text-lg">
          <p><strong>First Name:</strong> {firstName}</p>
          <p><strong>Last Name:</strong> {lastName}</p>
          <p><strong>Date of Birth:</strong> {dob}</p>
          <p><strong>Contact Number:</strong> {contactNumber}</p>
          <p><strong>Address:</strong> {address}</p>
          <p><strong>UID:</strong> {uid}</p>
          <p className="text-lg">
          <strong>Have Car?: </strong>
            <span className={haveCar ? 'text-green-500' : 'text-red-500'}>
              {haveCar ? "Yes" : "No"}
            </span>
          </p>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-700 transition duration-300">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;



