import React from 'react';
import Image from 'next/image';
import { FaHandsHelping, FaBrain, FaBriefcase } from 'react-icons/fa';

const Hero = () => {
  return (
    <section className="hero bg-gradient-to-r from-blue-50 via-purple-50 to-blue-100 min-h-screen flex items-center pb-14">
  <div className="container mx-auto px-6 md:px-12 lg:flex lg:items-center lg:justify-between">
        {/* Text and Call to Action in a Card */}
        <div className="lg:w-1/2 mb-10 lg:mb-0">
          <div className="rounded-lg p-8 md:p-12">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="block">Empowering</span> 
              <span className="block">Nigeria's</span> 
              <span className="text-orange-400">Voices,</span> <span className="text-gray-900">Building</span>
              <span className="block">Connections</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-700 mb-6">
              EGetWhy is your platform to connect, share, and find solutions. Join us in addressing the "why" behind challenges, and build a network that empowers and uplifts Nigeria.
            </p>
            <button className="bg-gradient-to-r from-purple-400 to-pink-500 text-white py-3 px-8 rounded-full shadow-md hover:opacity-90 transition-opacity duration-300">
      Join the Movement
    </button>
          </div>
        </div>

        {/* Image and Additional Info */}
        <div className="relative lg:w-1/2 mt-12 lg:mt-0">
          <div className="relative">
            {/* Circular Background */}
            <div className="absolute inset-0 flex justify-center items-center">
    <div className="w-[70vw] h-[70vw] max-w-[400px] max-h-[400px] bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex justify-center items-center">
      <div className="w-full h-full bg-gradient-to-r from-blue-700 to-purple-800 opacity-50 rounded-full transform scale-125"></div>
    </div>
  </div>
            <Image
              className="relative z-10 w-full h-auto rounded-lg"
              width={500}
              height={500}
              src="/images/newI.png"
              alt="Hero Image"
            />
          </div>

          {/* Floating Icons and Stats */}
          {/* Enhanced Floating Icons and Stats */}
          {/* Icon 1: Active Discussions */}
          <div className="absolute top-[10px] left-[10px] sm:left-[-30px] md:left-[-0px] lg:left-[-20px] md:top-[40px] lg:top-[50px] w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 bg-blue-100 shadow-lg rounded-full flex flex-col items-center justify-center hover:bg-blue-200 transition-colors">
            <FaHandsHelping className="text-blue-500 text-xl lg:text-2xl mb-1" />
            <p className="text-xs lg:text-sm text-center">
              <span className="font-bold text-gray-800">5k+</span><br /> Active Discussions
            </p>
          </div>

          {/* Icon 2: Expert Insights */}
          <div className="absolute top-[10px] right-[10px] sm:right-[-30px] md:right-[-0px] lg:right-[-50px] md:top-[40px] lg:top-[50px] w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 bg-orange-100 shadow-lg rounded-full flex flex-col items-center justify-center hover:bg-orange-200 transition-colors">
            <FaBrain className="text-orange-500 text-xl lg:text-2xl mb-1" />
            <p className="text-xs lg:text-sm text-center">
              <span className="font-bold text-gray-800">500+</span><br /> Expert Insights
            </p>
          </div>

          {/* Icon 3: Job Leads Shared */}
          <div className="absolute bottom-[-40px] left-[50%] transform -translate-x-1/2 sm:left-[60px] md:left-[50%] md:bottom-[-50px] lg:bottom-[-60px] w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 bg-green-100 shadow-lg rounded-full flex flex-col items-center justify-center hover:bg-green-200 transition-colors z-20">
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
