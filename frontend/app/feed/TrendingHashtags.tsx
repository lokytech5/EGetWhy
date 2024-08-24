import React from 'react';
import useTrendingHashtag from '../hooks/useTrendingHashtag';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';

const colorClasses = [
  "bg-gradient-to-r from-blue-500 to-purple-500",
  "bg-gradient-to-r from-green-500 to-teal-500",
  "bg-gradient-to-r from-pink-500 to-red-500",
  "bg-gradient-to-r from-yellow-500 to-orange-500"
];

const TrendingHashtags = () => {
  const { data, isLoading, error } = useTrendingHashtag();
  
 
  const trendingHashtags = data?.data.filter(hashtagData => hashtagData.count >= 5);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorAlert message="Error! Failed to load trending hashtags." />;
  }

  return (
    <div className="w-full p-4">
      <div className="bg-[#1c2b3a] shadow-lg rounded-lg p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">Trending Hashtags</h3>
        <div className="space-y-3">
          {trendingHashtags?.length === 0 ? (  // Conditional rendering
            <p className="text-gray-400">No trending hashtags available.</p>
          ) : (
            trendingHashtags?.map((hashtagData, index) => (
              <div
                key={index}
                className={`flex justify-between items-center p-3 md:p-2 rounded-lg shadow-md transition-all duration-300 ease-in-out cursor-pointer text-white ${colorClasses[index % colorClasses.length]}`}
              >
                <span className="text-md md:text-sm font-semibold">{hashtagData.hashtag}</span>
                <span className="text-sm md:text-xs bg-gray-900 rounded-full px-3 py-1 md:px-2 md:py-0.5">{hashtagData.count}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TrendingHashtags;
