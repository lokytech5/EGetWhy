import React from 'react';
import Image from 'next/image';
import { FaHandsHelping, FaBrain, FaBriefcase } from 'react-icons/fa'; // Importing custom icons

const Hero = () => {
  return (
    <section className="hero bg-gradient-to-r from-purple-50 to-purple-100 min-h-screen flex items-center">
      <div className="container mx-auto px-6 md:px-12 lg:flex lg:items-center lg:justify-between">
        {/* Text and Call to Action in a Card */}
        <div className="lg:w-1/2 mb-10 lg:mb-0">
          <div className="bg-white shadow-xl rounded-lg p-8 md:p-12">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="block">Empowering</span> 
              <span className="block">Nigeria's</span> 
              <span className="text-orange-400">Voices,</span> <span className="text-gray-900">Building</span>
              <span className="block">Connections</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-700 mb-6">
              EGetWhy is your platform to connect, share, and find solutions. Join us in addressing the "why" behind challenges, and build a network that empowers and uplifts Nigeria.
            </p>
            <button className="btn bg-gradient-to-r from-purple-500 to-purple-700 text-white py-2 px-6 rounded-full hover:opacity-90">
              Join the Movement
            </button>
          </div>
        </div>

        {/* Image and Additional Info */}
        <div className="relative lg:w-1/2 flex justify-center lg:justify-end mt-8 lg:mt-0">
          <div className="relative flex items-center justify-center">
            {/* Circular Background with Gradient */}
            <div className="absolute w-[200px] h-[200px] md:w-[320px] md:h-[320px] lg:w-[400px] lg:h-[400px] bg-gradient-to-r from-blue-500 to-purple-600 rounded-full z-0 transform rotate-45">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-700 to-purple-800 opacity-50 rounded-full transform scale-110 rotate-45"></div>
            </div>
            {/* Image */}
            <Image
              className="relative z-10 w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full object-cover"
              width={500}
              height={500}
              src="/images/newI.png"
              alt="Hero Image"
            />
          </div>

          {/* Enhanced Floating Icons and Stats */}
          <div className="absolute top-[-20px] left-[-40px] lg:left-[-60px] w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 bg-blue-100 shadow-lg rounded-full flex flex-col items-center justify-center hover:bg-blue-200 transition-colors">
            <FaHandsHelping className="text-blue-500 text-xl lg:text-2xl mb-1" />
            <p className="text-xs lg:text-sm text-center">
              <span className="font-bold text-gray-800">5k+</span><br /> Active Discussions
            </p>
          </div>
          <div className="absolute top-2 right-[-40px] lg:right-[-60px] w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 bg-orange-100 shadow-lg rounded-full flex flex-col items-center justify-center hover:bg-orange-200 transition-colors">
            <FaBrain className="text-orange-500 text-xl lg:text-2xl mb-1" />
            <p className="text-xs lg:text-sm text-center">
              <span className="font-bold text-gray-800">500+</span><br /> Expert Insights
            </p>
          </div>
          <div className="absolute bottom-[-20px] left-[20px] lg:left-[60px] w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 bg-green-100 shadow-lg rounded-full flex flex-col items-center justify-center hover:bg-green-200 transition-colors">
            <FaBriefcase className="text-green-500 text-xl lg:text-2xl mb-1" />
            <p className="text-xs lg:text-sm text-center">
              <span className="font-bold text-gray-800">1k+</span><br /> Job Leads Shared
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
