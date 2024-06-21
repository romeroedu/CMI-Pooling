import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 m-16">
      <h1 className="text-3xl font-bold text-center mb-6">About CMI Pooling</h1>
      <p>Welcome to CMI Pooling, your dedicated carpooling network for employees and interns of Cummins.</p>
      
      <h2 className="text-2xl font-semibold mt-8">Our Vision</h2>
      <p>At CMI Pooling, we envision a workplace where community and sustainability go hand in hand...</p>
      
      <h2 className="text-2xl font-semibold mt-8">How It Works</h2>
      <ol className="list-decimal pl-8">
        <li>Sign Up: Create your profile using your CMI employee credentials.</li>
        <li>Post a Ride: If you have a car, post your travel details.</li>
        <li>Find a Ride: Browse available rides posted by fellow CMI colleagues...</li>
        <li>Connect: Once you find a match, connect with your colleague...</li>
        <li>Ride Together: Enjoy your commute with your colleagues.</li>
      </ol>
      
      <h2 className="text-2xl font-semibold mt-8">Benefits of Joining CMI Pooling</h2>
      <ul className="list-disc pl-8">
        <li>Cost-Effective: Share fuel costs and parking fees.</li>
        <li>Eco-Friendly: Fewer cars on the road mean reduced carbon emissions.</li>
        <li>Community Building: Meet new people within CMI.</li>
        <li>Stress Reduction: Enjoy rides with colleagues.</li>
      </ul>
      
      <h2 className="text-2xl font-semibold mt-8">Commitment to Security</h2>
      <p>Your safety and security are paramount...</p>
      
      <p className="mt-8">For questions or assistance, please contact our support team at <a href="mailto:support@cmipooling.com" className="text-blue-500 hover:text-blue-700">cmipoolingsupport@cummins.com</a>.</p>
    </div>
  );
};

export default About;
