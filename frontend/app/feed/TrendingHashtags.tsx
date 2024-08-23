import React from 'react';
import useTrendingHashtag from '../hooks/useTrendingHashtag';
import LoadingSpinner from '../components/LoadingSpinner';

const colorClasses = [
  "bg-gradient-to-r from-blue-500 to-purple-500",
  "bg-gradient-to-r from-green-500 to-teal-500",
  "bg-gradient-to-r from-pink-500 to-red-500",
  "bg-gradient-to-r from-yellow-500 to-orange-500"
];

const TrendingHashtags = () => {
  const { data, isLoading, error } = useTrendingHashtag();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="w-full p-4">
        <div role="alert" className="alert alert-error shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Error! Failed to load trending hashtags.</span>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full p-4">
      <div className="bg-[#1c2b3a] shadow-lg rounded-lg p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">Trending Hashtags</h3>
        <div className="space-y-3">
          {data?.data.map((hashtagData, index) => (
            <div
              key={index}
              className={`flex justify-between items-center p-3 md:p-2 rounded-lg shadow-md transition-all duration-300 ease-in-out cursor-pointer text-white ${colorClasses[index % colorClasses.length]}`}
            >
              <span className="text-md md:text-sm font-semibold">{hashtagData.hashtag}</span>
              <span className="text-sm md:text-xs bg-gray-900 rounded-full px-3 py-1 md:px-2 md:py-0.5">{hashtagData.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingHashtags;
