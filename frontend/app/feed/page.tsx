"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import PostCard from './PostCard';
import Post from './Post';
import CustomModal from '../components/CustomModal';
import TrendingHashtags from './TrendingHashtags';
import MyInterests from './MyInterests';
import PostUserProfile from './PostUserProfile';

const FeedPage = () => {

  const dummyPostData = {
    data: {
      PostID: "0b69cd80-6078-11ef-9652-3db22d29b962",
      UserID: "646844d8-f021-7050-cd80-15f357d4c269",
      Content: "Challenges of remote work in Nigeria.",
      Hashtags: "#RemoteWorkNigeria, #WorkFromHome, #Internet, #nawa",
      CategoryID: null,
      IsAnonymous: false,
      CreatedAt: "2024-08-22",
      UpdatedAt: "2024-08-22"
    }
  };

  const userData = {
    data: {
      Interests: ["#Tech", "#nawa", "#test", "#Programming"],
      UserID: "646844d8-f021-7050-cd80-15f357d4c269"
    },
    meta: {}
  };

  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handlePostSubmit = () => {
    setShowModal(false);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen p-4 bg-gradient-to-r from-blue-50 via-purple-50 to-blue-100">
      
      {/* User Profile Section */}
      <div className="w-full md:w-1/4 mt-4 mr-4">

      <PostUserProfile/>
        {/* My Interests Section */}
        <div className="hidden md:block mt-6">
          <MyInterests interests={userData.data.Interests} />
        </div>
      </div>

      {/* Feed Section */}
      <div className="w-full md:w-1/2 p-4">
        <Post onClick={handleOpenModal} />
        <PostCard post={dummyPostData} />
      </div>

      {/* Trending Hashtags Section */}
      <div className="hidden md:block w-full md:w-1/4">
        <TrendingHashtags />
      </div>

      {/* Modal for creating post */}
      <CustomModal 
        title="Create a Post"
        content={
          <textarea 
            className="w-full p-4 bg-gray-800 text-gray-100 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500" 
            placeholder="What's on your mind?" 
            rows={5}
          ></textarea>
        }
        isOpen={showModal}
        onClose={handleCloseModal}
        onConfirm={handlePostSubmit}
      />
    </div>
  );
};

export default FeedPage;
