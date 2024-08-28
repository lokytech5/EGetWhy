import React from 'react';
import Image from 'next/image';
import { useUserStore } from '../components/useUserStore';
import { extractUserInitials } from '../utils/userInitials';

interface Props {
  onClick: () => void;
}

const Post = ({ onClick }: Props) => {
  const userProfile = useUserStore((state) => state.user);

  return (
    <div className="w-full p-4 mb-4 bg-[#1c2b3a] shadow-lg rounded-lg text-white flex flex-col space-y-4 cursor-pointer">
      <div className="flex items-center space-x-4">
        <div className="avatar">
          <div className="w-10 h-10 px-3 p-2 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
            {userProfile?.profilePictureURL ? (
              <Image 
                src={userProfile.profilePictureURL} 
                alt={`${userProfile.fullName}'s profile`} 
                width={32} 
                height={32} 
                className="rounded-full object-cover"
              />
            ) : (
              <span className="text-sm font-bold">
                {userProfile?.fullName ? extractUserInitials(userProfile.fullName) : '?'}
              </span>
            )}
          </div>
        </div>
        <div className="flex-grow relative">
          {/* DaisyUI Tooltip */}
          <div className="tooltip tooltip-secondary" data-tip="Click to start writing a post. Remember to add at least one hashtag to categorize your post!">
            <input
              type="text"
              className="w-full bg-[#1c2b3a] text-gray-300 border border-gray-600 rounded-full px-4 py-2 focus:outline-none"
              placeholder="Start a post, try writing with AI"
              readOnly
              onClick={onClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
