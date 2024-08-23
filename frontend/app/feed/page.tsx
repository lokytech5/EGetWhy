"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import PostCard from './PostCard';
import Post from './Post';
import CustomModal from '../components/CustomModal';
import TrendingHashtags from './TrendingHashtags';
import MyInterests from './MyInterests';
import PostUserProfile from './PostUserProfile';
import usePostFeeds from '../hooks/usePostFeeds';
import usePost from '../hooks/usePost';
import { useUserStore } from '../components/useUserStore';


const FeedPage = () => {
  const { data, isLoading, error } = usePostFeeds();
  const [showModal, setShowModal] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const { mutate: createPost } = usePost();
  const userId = useUserStore((state) => state.user?.userId);
  const [localPosts, setLocalPosts] = useState<Post[]>(data?.data || []);
  
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  
  
  
  const handlePostSubmit = () => {
    if (!userId) return;

    const postData = {
      userId, // use the userId from the store
      content: postContent,
      hashtags: hashtags, 
      isAnonymous: false, // Or make this dynamic based on user choice
    };

    createPost(postData, {
      onSuccess: (newPostData) => {
        setShowModal(false);
        setPostContent('');
        setHashtags([]);
        setLocalPosts([newPostData.data, ...localPosts]); // Update the feed immediately
      }
    });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen p-4 bg-gradient-to-r from-blue-50 via-purple-50 to-blue-100">
    {/* User Profile Section */}
    <div className="w-full md:w-1/4 mt-4 mr-4">
      <PostUserProfile/>
      {/* My Interests Section */}
      <div className="hidden md:block mt-6">
        <MyInterests/>
      </div>
    </div>

    {/* Feed Section */}
    <div className="w-full md:w-1/2 p-4">
      <Post onClick={handleOpenModal} />
      {localPosts.map((post) => (
       <PostCard key={post.PostID} post={post} />
      ))}
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
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
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
