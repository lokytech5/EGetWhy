"use client";
import React, { useState, useEffect } from 'react';
import Post from './Post';
import usePostFeeds from '../hooks/usePostFeeds';
import usePost from '../hooks/usePost';
import { useUserStore } from '../components/useUserStore';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import { Post as PostInterface } from '../feed/PostCard';
import TrendingHashtags from './TrendingHashtags';
import PostCreationModal from './PostCreationModal';
import PostFeed from './PostFeed';
import UserProfileSection from './UserProfileSection';

const FeedPage = () => {
  const { data, isLoading: isLoadingFeeds, error, fetchNextPage, hasNextPage, isFetchingNextPage } = usePostFeeds();
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutate: createPost } = usePost();
  const [posts, setPosts] = useState<PostInterface[]>([]);

  const userProfile = useUserStore((state) => state.user);

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

  const handlePostSubmit = (content: string, hashtags: string[], isAnonymous: boolean) => {
    if (!content.trim()) {
      setErrorMessage("Post content cannot be empty.");
      return;
    }
    
    if (hashtags.length === 0) {
      setErrorMessage("Please enter at least one hashtag.");
      return;
    }

    const postData = {
      userId: isAnonymous ? 'ANONYMOUS' : useUserStore.getState().user?.userId || '',
      content,
      hashtags,
      isAnonymous,
    };

    const tempId = Date.now().toString();

    // Create an optimistic post object
    const optimisticPost: PostInterface = {
      PostID: tempId, 
      UserID: postData.userId,
      Content: content,
      Hashtags: hashtags.join(', '),
      CategoryID: null,
      IsAnonymous: isAnonymous,
      CreatedAt: new Date().toISOString(),
      UpdatedAt: new Date().toISOString(),
      userDetails: {
        username: isAnonymous ? 'Anonymous' : userProfile?.username || 'Unknown', // Fallback to 'Unknown' if no username
        profilePicture: userProfile?.profilePictureURL || undefined, // Fallback to undefined if no profile picture
      },
    };

    // Update the posts state optimistically
    setPosts([optimisticPost, ...posts]);

    setIsSubmitting(true);

    createPost(postData, {
      onSuccess: (newPostData) => {
        console.log('New post data:', newPostData);

        setShowModal(false);
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
    <UserProfileSection />
    <div className="w-full md:w-1/2 p-4">
      <Post onClick={handleOpenModal} />
      <PostFeed posts={posts} />
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
    <div className="hidden md:block w-full md:w-1/4">
      <TrendingHashtags />
    </div>
    <PostCreationModal 
      isOpen={showModal} 
      onClose={handleCloseModal} 
      onSubmit={handlePostSubmit} 
      isSubmitting={isSubmitting} 
      errorMessage={errorMessage}
    />
  </div>
  );
};

export default FeedPage;
