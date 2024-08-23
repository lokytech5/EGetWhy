import React from 'react';
import Image from 'next/image';

interface Props {
  onClick: () => void;
}

const Post = ({onClick}: Props) => {
    return (
        <div className="w-full p-4 mb-4 bg-[#1c2b3a] shadow-lg rounded-lg text-white flex flex-col space-y-4 cursor-pointer">
          <div className="flex items-center space-x-4">
            <div className="avatar">
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                <Image src="/images/user-icon.svg" alt="User" width={40} height={40} />
              </div>
            </div>
            <div className="flex-grow">
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
      );
    };

export default Post