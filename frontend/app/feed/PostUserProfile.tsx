import React from 'react';
import { useUserStore } from '../components/useUserStore';
import { FaUser } from 'react-icons/fa';
import { extractUserInitials } from '../utils/userInitials';

const PostUserProfile = () => {
  const userProfile = useUserStore((state) => state.user);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 text-gray-900 transition-transform transform hover:scale-105">
      
      {/* Profile Card */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="avatar">
          <div className="w-16 h-16 py-4 p-4 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center text-white shadow-lg">
            {userProfile?.profilePictureURL ? (
              <img 
                src={userProfile.profilePictureURL} 
                alt={`${userProfile.fullName}'s profile`} 
                className="rounded-full w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl font-bold">
              {userProfile?.fullName ? extractUserInitials(userProfile.fullName) : <FaUser className="h-8 w-8 py-4 p-2" />}
            </span>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold">{userProfile?.username}</h2>
        </div>
      </div>
      
      {/* Posting as Section */}
      <div className="bg-gray-200 p-2 rounded-lg flex items-center space-x-2">
        <span className="text-sm">Posting as: {userProfile?.username}</span>
      </div>
    </div>
  );
};

export default PostUserProfile;
