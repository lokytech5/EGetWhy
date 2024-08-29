"use client"
import React, { useState } from 'react'
import CustomModal from '../components/CustomModal';
import LoadingSpinner from '../components/LoadingSpinner';

interface PostCreationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (content: string, hashtags: string[], isAnonymous: boolean) => void;
    isSubmitting: boolean;
    errorMessage: string | null;
  }

const PostCreationModal = ({isOpen, onClose, onSubmit, isSubmitting, errorMessage }: PostCreationModalProps) => {
  const [postContent, setPostContent] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleSubmit = () => {
    onSubmit(postContent, hashtags, isAnonymous);
  };
  
  return (
    <CustomModal
      title="Create a Post"
      content={
        <>
          {isSubmitting ? (
            <div className="flex justify-center items-center">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              {errorMessage && (
                <div className="text-red-500 text-center mb-4">{errorMessage}</div>
              )}
              <textarea
                className="w-full p-4 bg-gray-800 text-gray-100 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="What's on your mind?"
                rows={5}
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              ></textarea>
              <input
                type="text"
                className="w-full p-2 bg-gray-800 text-gray-100 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mt-2"
                placeholder="Enter hashtags separated by commas"
                onChange={(e) => setHashtags(e.target.value.split(',').map(tag => tag.trim()))}
              />
              <p className="text-xs text-gray-400 mt-2">
                Add hashtags to help others discover your post. Use commas to separate multiple hashtags.
              </p>
              {/* Anonymous Posting Checkbox */}
              <div className="mt-4 flex items-center">
                <input 
                  type="checkbox" 
                  id="anonymous-checkbox" 
                  checked={isAnonymous}
                  onChange={() => setIsAnonymous(!isAnonymous)} 
                  className="mr-2 cursor-pointer"
                />
                <label htmlFor="anonymous-checkbox" className="text-gray-300 cursor-pointer">
                  Post Anonymously
                </label>
              </div>
            </>
          )}
        </>
      }
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleSubmit}
    />
  )
}

export default PostCreationModal