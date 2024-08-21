import React from 'react';
import Image from 'next/image'; // Using next/image for optimized image loading

const FeedPage = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen p-4" style={{ backgroundColor: '#121e2b' }}>
      {/* User Profile Section */}
      <div className="w-full md:w-1/4 p-4">
        <div className="bg-[#1c2b3a] shadow-lg rounded-lg p-6 text-white">
          {/* Profile Card */}
          <div className="flex items-center space-x-4 mb-4">
            <div className="avatar">
              <div className="w-16 rounded-full bg-purple-500 flex items-center justify-center text-white">
                <span className="text-2xl">MH</span>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Mr Holmes</h2>
              <p className="text-sm text-gray-300">Software Developer at Newco</p>
            </div>
          </div>
          {/* Posting as */}
          <div className="bg-gray-700 p-2 rounded-lg flex items-center space-x-2">
            <div className="avatar">
              <div className="w-8 rounded-full bg-purple-500 flex items-center justify-center text-white">
                <span className="text-sm">MH</span>
              </div>
            </div>
            <span className="text-sm">Posting as: Mr Holmes</span>
          </div>
          {/* Additional Info */}
          <div className="mt-4">
            <span className="text-sm text-gray-400">You have view-only access</span>
          </div>
        </div>
        {/* My Bowls Section */}
        <div className="mt-6 text-white">
          <h3 className="text-lg font-semibold mb-4">My Bowls</h3>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2">
              <div className="avatar">
                <div className="w-8 rounded-full bg-gray-700 flex items-center justify-center">
                  <Image src="/images/tech-icon.svg" alt="Jobs in Tech" width={24} height={24} />
                </div>
              </div>
              <span>Jobs in Tech</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="avatar">
                <div className="w-8 rounded-full bg-gray-700 flex items-center justify-center">
                  <Image src="/images/tech-icon.svg" alt="Tech" width={24} height={24} />
                </div>
              </div>
              <span>Tech</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="avatar">
                <div className="w-8 rounded-full bg-gray-700 flex items-center justify-center">
                  <Image src="/images/tech-icon.svg" alt="Salaries in Tech" width={24} height={24} />
                </div>
              </div>
              <span>Salaries in Tech</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="avatar">
                <div className="w-8 rounded-full bg-gray-700 flex items-center justify-center">
                  <Image src="/images/tech-icon.svg" alt="Software Engineering" width={24} height={24} />
                </div>
              </div>
              <span>Software Engineering</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="avatar">
                <div className="w-8 rounded-full bg-gray-700 flex items-center justify-center">
                  <Image src="/images/tech-icon.svg" alt="Salaries in STEM" width={24} height={24} />
                </div>
              </div>
              <span>Salaries in STEM</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Feed Section */}
      <div className="w-full md:w-1/2 p-4">
        <div className="space-y-4">
          {/* Post Card */}
          <div className="bg-[#1c2b3a] shadow-lg rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="avatar">
                  <div className="w-8 rounded-full bg-gray-700 flex items-center justify-center">
                    <Image src="/images/user-icon.svg" alt="User" width={24} height={24} />
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold">a TIG Welder</h4>
                  <span className="text-xs text-gray-400">Jobs in Tech</span>
                </div>
              </div>
              <span className="text-xs text-gray-400">2h</span>
            </div>
            <p className="mt-4 text-gray-300">Tig welder job</p>
            <div className="flex items-center space-x-4 mt-4">
              <button className="flex items-center space-x-1 text-gray-400 hover:text-purple-500">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                </svg>
                <span>Like</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-400 hover:text-purple-500">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7 7 7" />
                </svg>
                <span>Comment</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-400 hover:text-purple-500">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l7-7 7 7" />
                </svg>
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Additional Post Cards */}
          <div className="bg-[#1c2b3a] shadow-lg rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="avatar">
                  <div className="w-8 rounded-full bg-gray-700 flex items-center justify-center">
                    <Image src="/images/user-icon.svg" alt="User" width={24} height={24} />
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold">a Senior GRC Analyst</h4>
                  <span className="text-xs text-gray-400">Jobs in Tech</span>
                </div>
              </div>
              <span className="text-xs text-gray-400">2h</span>
            </div>
            <p className="mt-4 text-gray-300">Hello everyone, I have been applying to jobs...</p>
            <div className="flex items-center space-x-4 mt-4">
              <button className="flex items-center space-x-1 text-gray-400 hover:text-purple-500">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                </svg>
                <span>Like</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-400 hover:text-purple-500">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7 7 7" />
                </svg>
                <span>Comment</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-400 hover:text-purple-500">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l7-7 7 7" />
                </svg>
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Explore Section */}
      <div className="w-full md:w-1/4 p-4">
        <div className="bg-[#1c2b3a] shadow-lg rounded-lg p-6 text-white">
          <h3 className="text-lg font-semibold mb-4">Explore Bowls</h3>
          <div className="space-y-4">
            {/* Explore Card */}
            <div className="bg-gray-700 p-4 rounded-lg">
              <h4 className="text-md font-semibold">Product Management</h4>
              <p className="text-sm text-gray-300">A community for Product Managers to learn, create, and connect.</p>
              <button className="btn bg-blue-500 hover:bg-blue-700 text-white mt-2">Preview</button>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <h4 className="text-md font-semibold">Black in Tech</h4>
              <p className="text-sm text-gray-300">A safe space to discuss all things related to technology & being black.</p>
              <button className="btn bg-blue-500 hover:bg-blue-700 text-white mt-2">Preview</button>
            </div>
            {/* Add more explore items similarly */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedPage;
