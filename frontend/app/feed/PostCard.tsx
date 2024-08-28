import React from 'react';
import Image from 'next/image';
import { FaHeart, FaComment, FaShare } from 'react-icons/fa';
import { format, parseISO } from 'date-fns';
import { FaUser } from 'react-icons/fa';
import { extractUserInitials } from '../utils/userInitials';

export interface Post {
  PostID: string;
  UserID: string;
  Content: string;
  Hashtags: string;
  CategoryID: string | null;
  IsAnonymous: boolean;
  CreatedAt: string;
  UpdatedAt: string;
}

interface UserProfile {
  fullName: string;
  profilePictureURL?: string;
}

interface PostCardProps {
  post: Post;
  userProfile: UserProfile; // Add userProfile prop
}

const PostCard: React.FC<PostCardProps> = ({ post, userProfile }) => {
  const {
    Content,
    Hashtags,
    IsAnonymous,
    CreatedAt,
  } = post;

  // Format the date using date-fns
  const formattedDate = CreatedAt 
    ? format(parseISO(CreatedAt), "MM/dd/yyyy, hh:mm a") // e.g., "08/24/2024, 10:44 AM"
    : 'Invalid Date';

  return (
    <div className="w-full mb-4">
      <div className="bg-[#1c2b3a] shadow-lg rounded-lg p-6 text-white">
        {/* User Info and Timestamp */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="w-8 h-8 px-2 p-1 rounded-full bg-gray-700 flex items-center justify-center">
                {userProfile.profilePictureURL ? (
                  <Image 
                    src={userProfile.profilePictureURL} 
                    alt={`${userProfile.fullName}'s profile`} 
                    width={32} 
                    height={32} 
                    className="rounded-full object-cover"
                  />
                ) : (
                  <span className="text-sm font-bold">
                    {extractUserInitials(userProfile.fullName)}
                  </span>
                )}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold">
                {IsAnonymous ? "Anonymous" : userProfile.fullName} 
              </h4>
              <span className="text-xs text-gray-400">Jobs in Tech</span>
            </div>
          </div>
          <span className="text-xs text-gray-400">{formattedDate}</span>
        </div>

        {/* Post Content */}
        <p className="text-gray-300 break-words">{Content}</p>

        {/* Hashtags */}
        {Hashtags && (
          <div className="mt-2 flex flex-wrap">
            {Hashtags.split(', ').map((hashtag, index) => (
              <span key={index} className="text-blue-400 text-xs mr-2 mb-2">
                {hashtag}
              </span>
            ))}
          </div>
        )}

        {/* Interaction Buttons */}
        <div className="flex justify-around items-center space-x-4 mt-4 border-t border-gray-700 pt-4">
          <button className="flex items-center space-x-2 text-gray-400 hover:text-red-500 transition-colors duration-200 ease-in-out">
            <FaHeart className="w-5 h-5" />
            <span>Like</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-500 transition-colors duration-200 ease-in-out">
            <FaComment className="w-5 h-5" />
            <span>Comment</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-400 hover:text-green-500 transition-colors duration-200 ease-in-out">
            <FaShare className="w-5 h-5" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
