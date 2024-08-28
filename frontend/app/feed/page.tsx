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
  const { data, isLoading: isLoadingFeeds, error, fetchNextPage, hasNextPage, isFetchingNextPage } = usePostFeeds();
  const [showModal, setShowModal] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [isAnonymous, setIsAnonymous] = useState(false); // State for anonymous posting
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutate: createPost } = usePost();
  const userId = useUserStore((state) => state.user?.userId);
  const userProfile = useUserStore((state) => state.user);

  const [posts, setPosts] = useState<PostInterface[]>([]);

  useEffect(() => {
    if (data) {
      console.log('Fetched data:', data);
      const combinedPosts = data.pages.flatMap(page => page.posts || []);
      const sortedPosts = combinedPosts
        .filter(post => post?.PostID)
        .sort((a, b) => new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime());
      setPosts(sortedPosts);
    }
  }, [data]);

  const handleOpenModal = () => {
    setShowModal(true);
    setErrorMessage(null); // Reset error message when opening the modal
  };
  
  const handleCloseModal = () => setShowModal(false);

  const handlePostSubmit = () => {
    if (!postContent.trim()) {
      setErrorMessage("Post content cannot be empty.");
      return;
    }
    
    if (hashtags.length === 0) {
      setErrorMessage("Please enter at least one hashtag.");
      return;
    }

    const postData = {
      userId: isAnonymous ? 'ANONYMOUS' : userId || '',  // Use 'ANONYMOUS' if posting anonymously
      content: postContent,
      hashtags: hashtags,
      isAnonymous: isAnonymous,
    };

    const tempId = Date.now().toString();

    // Create an optimistic post object
    const optimisticPost: PostInterface = {
      PostID: tempId, 
      UserID: postData.userId,
      Content: postContent,
      Hashtags: hashtags.join(', '),
      CategoryID: null,
      IsAnonymous: isAnonymous,
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
        setIsAnonymous(false); // Reset the anonymous state after submitting
        setIsSubmitting(false);

        setPosts((currentPosts) =>
          currentPosts.map((post) =>
            post.PostID === tempId ? { ...optimisticPost, ...newPostData.data } : post
          )
        );
      },
      onError: (error) => {
        console.error('Failed to create post:', error);
        setIsSubmitting(false);
        setErrorMessage('Failed to create post. Please try again.');

        // Remove the optimistic post if the API call fails
        setPosts((currentPosts) => currentPosts.filter((post) => post.PostID !== tempId));
      }
    });
  };

  if (isLoadingFeeds) return <LoadingSpinner />;
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
        {userProfile && posts.map((post) => (  // Check if userProfile is not null
          <PostCard key={post.PostID} post={post} userProfile={userProfile} />
        ))}

       {/* Load More Button */}
       {hasNextPage && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => fetchNextPage()}
              className="btn btn-primary"
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? 'Loading more...' : 'Load More'}
            </button>
          </div>
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
        isOpen={showModal}
        onClose={handleCloseModal}
        onConfirm={handlePostSubmit}
      />
    </div>
  );
};

export default FeedPage;
