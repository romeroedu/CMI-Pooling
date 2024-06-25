import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-red-600 text-gray-300 p-4 mt-auto w-full">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 CMI Pooling. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="/privacy" className="hover:text-white">Privacy Policy</a>
          <a href="/terms" className="hover:text-white">Terms of Service</a>
          <a href="/contact" className="hover:text-white">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


