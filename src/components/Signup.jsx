
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Header = ({ heading, paragraph, linkName, linkUrl }) => (
  <div className="mb-10">
    <div className="flex justify-center">
      <img alt="Cummins Logo" className="h-14 w-14" src="./cummins_logo.png" />
    </div>
    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
      {heading}
    </h2>
    <p className="mt-2 text-center text-sm text-gray-600">
      {paragraph}{" "}
      <a href={linkUrl} className="font-medium text-red-600 hover:text-red-500">
        {linkName}
      </a>
    </p>
  </div>
);

const Signup = () => {
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    // createUserWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     console.log(userCredential);
    //     navigate('/dashboard');
    //   }).catch((error) => {
    //     alert(error.message);
    //   })
    //console.log("Signup details:", { email, mobileNumber, password });
    
    navigate("/availability");
  };

  const handleMobileNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
    if (value.length <= 10) {
      setMobileNumber(value);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-auto m-64">
      <div className="w-full max-w-md p-6 space-y-6 bg-gray-200 rounded-lg shadow-md">
        <Header
          heading="CMI Pooling Signup"
          paragraph="Already have an account?"
          linkName="Login"
          linkUrl="/"
        />
        <form onSubmit={handleSignup} className="mt-8 space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              placeholder="Enter your Cummins email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="mobile-number"
              className="block text-sm font-medium text-gray-700"
            >
              Mobile Number
            </label>
            <input
              id="mobile-number"
              name="mobile-number"
              type="tel"
              pattern="[0-9]{10}"
              autoComplete="tel"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              placeholder="Enter 10 digit mobile number"
              value={mobileNumber}
              onChange={handleMobileNumberChange}
              maxLength={10}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              autoComplete="new-password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function SignupPage() {
  return (
    <>
      <Signup />
    </>
  );
}