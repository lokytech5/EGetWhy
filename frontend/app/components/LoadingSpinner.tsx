import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="w-full p-4">
      <div className="bg-[#1c2b3a] shadow-lg rounded-lg p-6 text-white flex justify-center items-center">
        <span className="loading loading-bars loading-md"></span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
