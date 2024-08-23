import React from 'react';
import { FaHashtag } from 'react-icons/fa'; // Importing an icon to represent interests

// Define unique gradients for each interest
const colors = [
  'bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400',
  'bg-gradient-to-r from-teal-400 via-blue-400 to-cyan-400',
  'bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400',
  'bg-gradient-to-r from-green-400 via-lime-400 to-teal-400'
];

const MyInterests: React.FC<{ interests: string[] }> = ({ interests }) => {
  return (
    <div className="mt-6 text-gray-700">
      <h3 className="text-lg font-semibold mb-4 ml-4">My Interests</h3>
      <ul className="space-y-4">
        {interests.map((interest, index) => (
          <li
            key={index}
            className={`p-4 md:p-3 rounded-lg shadow-lg flex items-center space-x-4 ${colors[index % colors.length]}`}
          >
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                <FaHashtag className="text-2xl md:text-xl text-gray-700" />
              </div>
            </div>
            <div className="flex-grow">
              <span className="text-lg md:text-base font-semibold text-white md:truncate">{interest}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyInterests;
