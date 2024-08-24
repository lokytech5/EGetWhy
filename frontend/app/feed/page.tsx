"use client";
import React, { useState, useEffect } from 'react';
import PostCard from './PostCard';
import Post from './Post';
import CustomModal from '../components/CustomModal';
import TrendingHashtags from './TrendingHashtags';
import MyInterests from './MyInterests';
import PostUserProfile from './PostUserProfile';
import usePostFeeds from '../hooks/usePostFeeds';
import usePost from '../hooks/usePost';
import { useUserStore } from '../components/useUserStore';
import { Post as PostInterface } from '../feed/PostCard'
import { transformPostResponseToPost } from '../utils/postTransformers';

const FeedPage = () => {
  const { data, isLoading, error } = usePostFeeds();
  const [showModal, setShowModal] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const { mutate: createPost } = usePost();
  const userId = useUserStore((state) => state.user?.userId);

  // Initialize transformedInitialPosts properly
  useEffect(() => {
    if (data && data.data) {
      setLocalPosts(data.data.map(transformPostResponseToPost));
    }
  }, [data]);

  const [localPosts, setLocalPosts] = useState<PostInterface[]>([]);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  
  const handlePostSubmit = () => {
    if (!userId) return;

    const postData = {
      userId,
      content: postContent,
      hashtags: hashtags, 
      isAnonymous: false,
    };

    createPost(postData, {
      onSuccess: (newPostData) => {
        setShowModal(false);
        setPostContent('');
        setHashtags([]);

        // Ensure newPostData is correctly used
        const newPost = transformPostResponseToPost(newPostData.data);
        setLocalPosts([newPost, ...localPosts]);
      }
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts. Please try again later.</div>;

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
