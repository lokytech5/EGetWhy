"use client";
import React, { useState, useEffect } from 'react';
import PostCard from './PostCard';
import Post from './Post';
import CustomModal from '../components/CustomModal';
import usePostFeeds from '../hooks/usePostFeeds';
import usePost from '../hooks/usePost';
import { useUserStore } from '../components/useUserStore';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import { Post as PostInterface } from '../feed/PostCard';
import PostUserProfile from './PostUserProfile';
import MyInterests from './MyInterests';
import TrendingHashtags from './TrendingHashtags';

const FeedPage = () => {
  const { 
    data, 
    isLoading: isLoadingFeeds, 
    error, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = usePostFeeds();

  const [showModal, setShowModal] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: createPost } = usePost();
  const userId = useUserStore((state) => state.user?.userId);
  const userProfile = useUserStore((state) => state.user);


  const [posts, setPosts] = useState<PostInterface[]>([]);

  useEffect(() => {
    if (data) {
      console.log('Fetched data:', data);

      // Combine all posts from all pages
      const combinedPosts = data.pages.flatMap(page => page.data);

      // Sort posts by CreatedAt in descending order
      const sortedPosts = combinedPosts.sort((a, b) => new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime());

      setPosts(sortedPosts);
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
      userId,
      content: postContent,
      hashtags: hashtags,
      isAnonymous: false,
    };

    // Generate a temporary ID for the optimistic post
    const tempId = Date.now().toString();

    // Create an optimistic post object
    const optimisticPost: PostInterface = {
      PostID: tempId,  // Temporary ID
      UserID: userId || '',
      Content: postContent,
      Hashtags: hashtags.join(', '),
      CategoryID: null,
      IsAnonymous: false,
      CreatedAt: new Date().toISOString(),
      UpdatedAt: new Date().toISOString(),
    };

    // Update the posts state optimistically
    setPosts([optimisticPost, ...posts]);

    setIsSubmitting(true);

    createPost(postData, {
      onSuccess: (newPostData) => {
        console.log('New post data:', newPostData);

        setShowModal(false);
        setPostContent('');
        setHashtags([]);
        setIsSubmitting(false);

        // Replace the optimistic post with the actual post from the server
        setPosts((currentPosts) =>
          currentPosts.map((post) =>
            post.PostID === tempId ? { ...optimisticPost, ...newPostData.data } : post
          )
        );
      },
      onError: (error) => {
        console.error('Failed to create post:', error);
        setIsSubmitting(false);

        // Remove the optimistic post if the API call fails
        setPosts((currentPosts) => currentPosts.filter((post) => post.PostID !== tempId));
      }
    });
  };

  if (isLoadingFeeds && posts.length === 0) return <LoadingSpinner />;
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
        {/* Display Posts */}
        {userProfile && posts.map((post) => (
          <PostCard key={post.PostID} post={post} userProfile={userProfile} />
        ))}

        {/* Load More Button */}
        {hasNextPage && (
          <button
            onClick={() => fetchNextPage()}
            className="btn btn-primary mt-4"
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? 'Loading more...' : 'Load More'}
          </button>
        )}
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
            {isSubmitting ? (
              <div className="flex justify-center items-center">
                <LoadingSpinner />
              </div>
            ) : (
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
            )}
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
