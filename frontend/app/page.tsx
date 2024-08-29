import { FaBrain, FaBriefcase, FaHandsHelping } from "react-icons/fa";
import Hero from "./components/Hero";
import HomePageBanner from "./components/HomePageBanner";


export default function Home() {
  return (
    <>
      <HomePageBanner />

      {/* Hero Section */}
      <Hero/>

{/* Additional Section - Trending Hashtags / Discussions */}
<div className="container mx-auto py-12 bg-secondary rounded-box">
  <h3 className="text-2xl md:text-4xl font-bold text-center mb-10 text-white">
    #Trending on EGetWhy
  </h3>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {/* Card 1: #JobScarcity */}
    <div className="relative p-6 bg-blue-50 border-4 border-blue-300 rounded-xl shadow-2xl mb-8 hover:bg-blue-100 transition-transform transform hover:scale-105 duration-300">
      <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center shadow-lg">
        <div className="text-blue-600 text-2xl shadow-lg">
          <FaBriefcase />
        </div>
      </div>
      <h4 className="text-lg font-bold mt-10 mb-2 text-center text-blue-900">#JobScarcity</h4>
      <p className="text-gray-700 text-center">
        Explore discussions around the job market in Nigeria and find expert advice on improving job prospects.
      </p>
    </div>

    {/* Card 2: #FinancialChallenges */}
    <div className="relative p-6 bg-orange-50 border-4 border-orange-300 rounded-xl shadow-2xl mb-8 hover:bg-orange-100 transition-transform transform hover:scale-105 duration-300">
      <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 w-16 h-16 bg-orange-200 rounded-full flex items-center justify-center shadow-lg">
        <div className="text-orange-600 text-2xl shadow-lg">
          <FaBrain />
        </div>
      </div>
      <h4 className="text-lg font-bold mt-10 mb-2 text-center text-orange-900">#FinancialChallenges</h4>
      <p className="text-gray-700 text-center">
        Gain insights into dealing with financial issues, and discover local solutions to transaction problems.
      </p>
    </div>

    {/* Card 3: #CommunitySupport */}
    <div className="relative p-6 bg-green-50 border-4 border-green-300 rounded-xl shadow-2xl mb-8 hover:bg-green-100 transition-transform transform hover:scale-105 duration-300">
      <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 w-16 h-16 bg-green-200 rounded-full flex items-center justify-center shadow-lg">
        <div className="text-green-600 text-2xl shadow-lg">
          <FaHandsHelping />
        </div>
      </div>
      <h4 className="text-lg font-bold mt-10 mb-2 text-center text-green-900">#CommunitySupport</h4>
      <p className="text-gray-700 text-center">
        Join the conversation on mutual support, tackling societal issues, and making your voice heard.
      </p>
    </div>
  </div>
</div>

{/* Featured Discussions Section */}
<div className="container mx-auto py-16 bg-base-300 text-base-content rounded-lg">
  <h3 className="text-3xl md:text-5xl font-bold text-center mb-10">
    Featured Discussions
  </h3>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {/* Discussion 1 */}
    <div className="p-6 bg-gray-800 rounded-lg shadow-md">
      <h4 className="text-xl font-bold text-white mb-2">#JobScarcity in Nigeria</h4>
      <p className="text-gray-400 mb-4">
        Discuss the current challenges in the Nigerian job market and explore potential solutions.
      </p>
      <div className="flex justify-between items-center text-gray-500">
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2.833 9.445a7.473 7.473 0 001.414 3.314 7.457 7.457 0 003.314 1.414 7.498 7.498 0 003.548 0 7.473 7.473 0 003.314-1.414 7.457 7.457 0 001.414-3.314 7.498 7.498 0 000-3.548 7.473 7.473 0 00-1.414-3.314 7.457 7.457 0 00-3.314-1.414 7.498 7.498 0 00-3.548 0 7.473 7.473 0 00-3.314 1.414 7.457 7.457 0 00-1.414 3.314 7.498 7.498 0 000 3.548zM10 14.6a5.513 5.513 0 01-2.292-.476 5.523 5.523 0 01-1.817-1.267 5.511 5.511 0 01-1.267-1.817 5.51 5.51 0 01-.476-2.292c0-.795.155-1.558.476-2.292a5.523 5.523 0 011.267-1.817 5.511 5.511 0 011.817-1.267 5.513 5.513 0 012.292-.476 5.513 5.513 0 012.292.476 5.523 5.523 0 011.817 1.267 5.511 5.511 0 011.267 1.817 5.51 5.51 0 01.476 2.292 5.513 5.513 0 01-.476 2.292 5.523 5.523 0 01-1.267 1.817 5.511 5.511 0 01-1.817 1.267 5.513 5.513 0 01-2.292.476z"></path>
            <path d="M10 12.8a2.8 2.8 0 110-5.6 2.8 2.8 0 010 5.6z"></path>
          </svg>
          <span>123 Likes</span>
        </div>
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H8l-4 4V15H4a2 2 0 01-2-2V5z"></path>
          </svg>
          <span>45 Comments</span>
        </div>
      </div>
    </div>

    {/* Discussion 2 */}
    <div className="p-6 bg-gray-800 rounded-lg shadow-md">
      <h4 className="text-xl font-bold text-white mb-2">#FinancialChallenges and Solutions</h4>
      <p className="text-gray-400 mb-4">
        Share your experiences and tips on navigating financial challenges in Nigeria.
      </p>
      <div className="flex justify-between items-center text-gray-500">
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2.833 9.445a7.473 7.473 0 001.414 3.314 7.457 7.457 0 003.314 1.414 7.498 7.498 0 003.548 0 7.473 7.473 0 003.314-1.414 7.457 7.457 0 001.414-3.314 7.498 7.498 0 000-3.548 7.473 7.473 0 00-1.414-3.314 7.457 7.457 0 00-3.314-1.414 7.498 7.498 0 00-3.548 0 7.473 7.473 0 00-3.314 1.414 7.457 7.457 0 00-1.414 3.314 7.498 7.498 0 000 3.548zM10 14.6a5.513 5.513 0 01-2.292-.476 5.523 5.523 0 01-1.817-1.267 5.511 5.511 0 01-1.267-1.817 5.51 5.51 0 01-.476-2.292c0-.795.155-1.558.476-2.292a5.523 5.523 0 011.267-1.817 5.511 5.511 0 011.817-1.267 5.513 5.513 0 012.292-.476 5.513 5.513 0 012.292.476 5.523 5.523 0 011.817 1.267 5.511 5.511 0 011.267 1.817 5.51 5.51 0 01.476 2.292 5.513 5.513 0 01-.476 2.292 5.523 5.523 0 01-1.267 1.817 5.511 5.511 0 01-1.817 1.267 5.513 5.513 0 01-2.292.476z"></path>
            <path d="M10 12.8a2.8 2.8 0 110-5.6 2.8 2.8 0 010 5.6z"></path>
          </svg>
          <span>98 Likes</span>
        </div>
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H8l-4 4V15H4a2 2 0 01-2-2V5z"></path>
          </svg>
          <span>30 Comments</span>
        </div>
      </div>
    </div>

    {/* Discussion 3 */}
    <div className="p-6 bg-gray-800 rounded-lg shadow-md">
      <h4 className="text-xl font-bold text-white mb-2">#CommunitySupport - Helping Each Other</h4>
      <p className="text-gray-400 mb-4">
        Explore how the EGetWhy community is providing mutual support to tackle common issues.
      </p>
      <div className="flex justify-between items-center text-gray-500">
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2.833 9.445a7.473 7.473 0 001.414 3.314 7.457 7.457 0 003.314 1.414 7.498 7.498 0 003.548 0 7.473 7.473 0 003.314-1.414 7.457 7.457 0 001.414-3.314 7.498 7.498 0 000-3.548 7.473 7.473 0 00-1.414-3.314 7.457 7.457 0 00-3.314-1.414 7.498 7.498 0 00-3.548 0 7.473 7.473 0 00-3.314 1.414 7.457 7.457 0 00-1.414 3.314 7.498 7.498 0 000 3.548zM10 14.6a5.513 5.513 0 01-2.292-.476 5.523 5.523 0 01-1.817-1.267 5.511 5.511 0 01-1.267-1.817 5.51 5.51 0 01-.476-2.292c0-.795.155-1.558.476-2.292a5.523 5.523 0 011.267-1.817 5.511 5.511 0 011.817-1.267 5.513 5.513 0 012.292-.476 5.513 5.513 0 012.292.476 5.523 5.523 0 011.817 1.267 5.511 5.511 0 011.267 1.817 5.51 5.51 0 01.476 2.292 5.513 5.513 0 01-.476 2.292 5.523 5.523 0 01-1.267 1.817 5.511 5.511 0 01-1.817 1.267 5.513 5.513 0 01-2.292.476z"></path>
            <path d="M10 12.8a2.8 2.8 0 110-5.6 2.8 2.8 0 010 5.6z"></path>
          </svg>
          <span>76 Likes</span>
        </div>
        <div className="flex items-center">
          <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H8l-4 4V15H4a2 2 0 01-2-2V5z"></path>
          </svg>
          <span>58 Comments</span>
        </div>
      </div>
    </div>
  </div>

  <div className="text-center mt-12">
    <button className="bg-blue-600 text-white py-3 px-8 rounded-full shadow-md hover:bg-blue-700 transition-colors duration-300">
      Join the Conversation
    </button>
  </div>
</div>

{/* Community/Engagement Section */}
<div className="container mx-auto py-16 bg-gray-800 rounded-lg shadow-lg text-white mt-10">
  <h3 className="text-3xl md:text-5xl font-bold text-center mb-10">
    Why Join the EGetWhy Community?
  </h3>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
    {/* Card 1: Community and Support */}
    <div className="p-8 bg-gray-900 rounded-xl border border-gray-700 hover:border-purple-500 shadow-lg transition-all duration-300">
      <h4 className="text-2xl font-bold mt-4 text-purple-400">Shared Experiences and Support</h4>
      <p className="mt-4 text-gray-300">Connect with fellow Nigerians to share experiences, ask questions, and get support on issues that matter most to you.</p>
    </div>

    {/* Card 2: Information and Resources */}
    <div className="p-8 bg-gray-900 rounded-xl border border-gray-700 hover:border-orange-500 shadow-lg transition-all duration-300">
      <h4 className="text-2xl font-bold mt-4 text-orange-400">Localized Information and Resources</h4>
      <p className="mt-4 text-gray-300">Access culturally relevant information and resources that address common challenges like job scarcity and financial issues in Nigeria.</p>
    </div>

    {/* Card 3: Empowerment Through Knowledge */}
    <div className="p-8 bg-gray-900 rounded-xl border border-gray-700 hover:border-green-500 shadow-lg transition-all duration-300">
      <h4 className="text-2xl font-bold mt-4 text-green-400">Empowerment Through Knowledge</h4>
      <p className="mt-4 text-gray-300">Understand the "why" behind the challenges you face and gain the knowledge you need to make informed decisions and take action.</p>
    </div>
  </div>

  <div className="text-center mt-12">
    <button className="bg-gradient-to-r from-purple-400 to-pink-500 text-white py-3 px-8 rounded-full shadow-md hover:opacity-90 transition-opacity duration-300">
      Join the Movement
    </button>
    <p className="mt-4 text-gray-400">Become part of a community that supports, informs, and empowers you to improve your circumstances in Nigeria.</p>
  </div>
</div>



    </>
  );
}
