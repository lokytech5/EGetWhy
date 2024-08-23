import React from 'react';
import Image from 'next/image';
import { FaHeart, FaComment, FaShare } from 'react-icons/fa';

interface PostData {
  data: {
    PostID: string;
    UserID: string;
    Content: string;
    Hashtags: string;
    CategoryID: string | null;
    IsAnonymous: boolean;
    CreatedAt: string;
    UpdatedAt: string;
  };
}

const PostCard: React.FC<{ post: PostData }> = ({ post }) => {
  const { Content, Hashtags, CreatedAt, IsAnonymous } = post.data;

  const timeAgo = new Date(CreatedAt).toISOString().slice(0, 19).replace("T", " ");

  return (
    <div className="w-full">
      <div className="bg-[#1c2b3a] shadow-lg rounded-lg p-6 text-white">
        {/* User Info and Timestamp */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                <Image src="/images/user-icon.svg" alt="User" width={24} height={24} />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold">
                {IsAnonymous ? "Anonymous" : "User Name"} 
              </h4>
              <span className="text-xs text-gray-400">Jobs in Tech</span>
            </div>
          </div>
          <span className="text-xs text-gray-400">{timeAgo}</span>
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
}

export default PostCard;
