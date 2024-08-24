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
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import { Post as PostInterface } from '../feed/PostCard';

const FeedPage = () => {
  const { data, isLoading, error } = usePostFeeds();
  const [showModal, setShowModal] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // State for loading spinner
  const { mutate: createPost, isLoading: isCreatingPost } = usePost();
  const userId = useUserStore((state) => state.user?.userId);
  const [posts, setPosts] = useState<PostInterface[]>(data?.data || []); // Local state for posts

  useEffect(() => {
    if (data) {
      setPosts(data.data); // Sync local state with fetched data
    }
  }, [data]);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handlePostSubmit = () => {
    if (!postContent.trim()) {
      alert("Post content cannot be empty.");
      return;
    }

    const postData = {
      userId: userId,
      content: postContent,
      hashtags: hashtags,
      isAnonymous: false,
    };

    setIsSubmitting(true); // Set loading state to true when starting the request

    createPost(postData, {
      onSuccess: (newPostData) => {
        setShowModal(false);
        setPostContent('');
        setHashtags([]);

        // Transform the response to match PostInterface type
        const newPost: PostInterface = {
          PostID: newPostData.data.postId || '',  // Handle undefined case
          UserID: newPostData.data.userId || '',
          Content: newPostData.data.content || '',
          Hashtags: newPostData.data.hashtags || '',
          CategoryID: newPostData.data.categoryId || null,
          IsAnonymous: newPostData.data.isAnonymous || false,
          CreatedAt: newPostData.data.createdAt || '',
          UpdatedAt: newPostData.data.updatedAt || '',
        };

        setPosts([newPost, ...posts]); // Add the new post to the beginning of the list
         // Set loading state to false after updating the state
      },
      onError: (error) => {
        console.error('Failed to create post:', error);
        // Set loading state to false on error
      }
    });
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message="Please try again later." />;

  return (
    <div className="flex flex-col md:flex-row min-h-screen p-4 bg-gradient-to-r from-blue-50 via-purple-50 to-blue-100">
      {/* User Profile Section */}
      <div className="w-full md:w-1/4 mt-4 mr-4">
        <PostUserProfile />
        <div className="hidden md:block mt-6">
          <MyInterests />
        </div>
      </div>

      {/* Feed Section */}
      <div className="w-full md:w-1/2 p-4">
        <Post onClick={handleOpenModal} />
        {isCreatingPost && <LoadingSpinner />} {/* Show spinner while submitting */}
        {posts.map((post) => (
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
          <>
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
          </>
        }
        isOpen={showModal}
        onClose={handleCloseModal}
        onConfirm={handlePostSubmit}
      />
    </div>
  );
};

export default FeedPage;
