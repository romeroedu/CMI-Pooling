import React from 'react';
import authUser from './AuthContext.jsx';

const Navbar = () => {
    const {user} = authUser();

  return (
    <nav className="bg-red-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-16">
          <a href="/" className="text-white text-2xl font-bold">CMI Pooling</a>
          <ul className="flex space-x-4">
            {/* Checks if there is a user logged in to display options in Navigation Bar. */}
            {user ? (
                <>
                <li>
                    <a href="/ride" className="text-white font-medium text-lg hover:text-black">Ride</a>
                </li>
                <li>
                    <a href="/drive" className="text-white font-medium text-lg hover:text-black">Drive</a>
                </li>
                <li>
                    <a href="/about" className="text-white font-medium text-lg hover:text-black">About</a>
                </li>
                </>
            ) : null}
        </ul>
        </div>
        <div className="ml-auto">
          <a href="/profile" className="block w-10 h-10 rounded-full overflow-hidden border-2 border-gray-600">
            <img src="path_to_profile_picture.jpg" alt="Profile" className="w-full h-full object-cover" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
