import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaHeart, FaComment, FaShare } from 'react-icons/fa';
import { format, parseISO } from 'date-fns';
import { extractUserInitials } from '../utils/userInitials';
import useLikes from '../hooks/useLikes';
import usePostLikes from '../hooks/usePostLikes';
import useComments from '../hooks/useComments';
import usePostComments from '../hooks/usePostComments';

export interface Post {
  PostID: string;
  UserID: string;
  Content: string;
  Hashtags: string;
  CategoryID: string | null;
  IsAnonymous: boolean;
  CreatedAt: string;
  UpdatedAt: string;
}

interface UserProfile {
  fullName: string;
  profilePictureURL?: string;
}

interface PostCardProps {
  post: Post;
  userProfile: UserProfile;
}

const PostCard: React.FC<PostCardProps> = ({ post, userProfile }) => {
  const { PostID, Content, Hashtags, IsAnonymous, CreatedAt } = post;

  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const MAX_WORDS = 50;
  const wordsLeft = MAX_WORDS - newComment.trim().split(/\s+/).filter(Boolean).length;
  const formattedDate = CreatedAt ? format(parseISO(CreatedAt), "MM/dd/yyyy, hh:mm a") : 'Invalid Date';

  // Fetch initial likes data using the hook
  const { data: postLikes } = usePostLikes(PostID);

  // Use the useLikes hook for mutation
  const { mutate: likePost } = useLikes();

  // Hook to add a comment
  const { mutate: addComment } = useComments(PostID);

  // Hook to fetch comments
  const { data: fetchedComments, isLoading, isError } = usePostComments(PostID);

  useEffect(() => {
    if (postLikes) {
      setLikesCount(postLikes.data.totalLikes);
    }
  }, [postLikes]);

  const handleAddComment = () => {
    if (newComment.trim() && wordsLeft >= 0) {
      const optimisticComment = {
        commentId: Date.now().toString(),
        userId: userProfile.fullName,
        fullName: userProfile.fullName,
        content: newComment,
        createdAt: new Date().toISOString(),
        isAnonymous: false,
      };
      
      // Optimistically update the comments state
      setNewComment(''); // Clear input field after submission

      // Call mutation to update the server
      addComment(
        {
          userId: userProfile.fullName,
          content: newComment,
        },
        {
          onSuccess: () => {
            // Refetch comments after successful addition
            setShowComments(true);
          },
          onError: () => {
            // Handle error state if needed
          }
        }
      );
    }
  };

  const handleLikeToggle = () => {
    const optimisticHasLiked = !hasLiked;
    const optimisticLikesCount = likesCount + (optimisticHasLiked ? 1 : -1);

    setHasLiked(optimisticHasLiked);
    setLikesCount(optimisticLikesCount);

    likePost(
      { userId: userProfile.fullName, postId: PostID },
      {
        onError: () => {
          setHasLiked(!optimisticHasLiked);
          setLikesCount(likesCount);
        }
      }
    );
  };

  return (
    <div className="w-full mb-4">
      <div className="bg-[#1c2b3a] shadow-lg rounded-lg p-6 text-white">
        {/* User Info and Timestamp */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="w-8 h-8 px-2 p-1 rounded-full bg-gray-700 flex items-center justify-center">
                {userProfile.profilePictureURL ? (
                  <Image 
                    src={userProfile.profilePictureURL} 
                    alt={`${userProfile.fullName}'s profile`} 
                    width={32} 
                    height={32} 
                    className="rounded-full object-cover"
                  />
                ) : (
                  <span className="text-sm font-bold">
                    {extractUserInitials(userProfile.fullName)}
                  </span>
                )}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold">
                {IsAnonymous ? "Anonymous" : userProfile.fullName} 
              </h4>
              <span className="text-xs text-gray-400">Jobs in Tech</span>
            </div>
          </div>
          <span className="text-xs text-gray-400">{formattedDate}</span>
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
        <div className="flex justify-between items-center space-x-4 mt-4 border-t border-gray-700 pt-4">
          {/* Like Button */}
          <div className="flex items-center space-x-1">
            <button 
              onClick={handleLikeToggle}
              className={`flex items-center ${hasLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'} transition-colors duration-200 ease-in-out`}
            >
              <FaHeart className="w-5 h-5" />
            </button>
            <span className="text-xs text-gray-400">{likesCount}</span>
          </div>

          {/* Comment Button */}
          <button 
            onClick={() => setShowComments(!showComments)} 
            className="flex items-center space-x-2 text-gray-400 hover:text-blue-500 transition-colors duration-200 ease-in-out"
          >
            <FaComment className="w-5 h-5" />
            <span>Comment</span>
          </button>

          {/* Share Button */}
          <button className="flex items-center space-x-2 text-gray-400 hover:text-green-500 transition-colors duration-200 ease-in-out">
            <FaShare className="w-5 h-5" />
            <span>Share</span>
          </button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-4">
            {/* Add New Comment at the Top */}
            <div className="p-4 bg-gray-800 rounded-lg mb-4">
              <textarea
                className="w-full p-2 bg-gray-700 text-gray-100 rounded-lg focus:outline-none placeholder-gray-400 resize-none"
                placeholder={`Add a comment... (Max ${MAX_WORDS} words)`}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={3}
              />
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-gray-400">
                  {wordsLeft >= 0 ? `${wordsLeft} words left` : 'Word limit exceeded'}
                </span>
                <button 
                  onClick={handleAddComment} 
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                  disabled={wordsLeft < 0}
                >
                  Submit
                </button>
              </div>
            </div>

            {/* Display Comments Section */}
            <div className="space-y-4 max-h-60 overflow-y-auto">
              {isLoading ? (
                <p>Loading comments...</p>
              ) : isError ? (
                <p>Error loading comments.</p>
              ) : (
                fetchedComments?.data.map((comment) => (
                  <div key={comment.CommentID} className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                      <span className="text-sm font-bold">
                        {extractUserInitials(comment.UserID)}
                      </span>
                    </div>
                    <div className="flex flex-col w-full">
                      <div className="bg-white p-3 rounded-lg text-black w-full">
                        <div className="flex justify-between items-center">
                          <h5 className="text-sm font-semibold">{comment.UserID}</h5>
                          <p className="text-xs text-gray-500">
                            {format(parseISO(comment.CreatedAt), "MM/dd/yyyy, hh:mm a")}
                          </p>
                        </div>
                        <p className="mt-2">{comment.Content}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
