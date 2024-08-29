import React from 'react'
import PostCard, { Post as PostInterface } from '../feed/PostCard';
import { useUserStore } from '../components/useUserStore';

interface PostFeedProps {
    posts: PostInterface[];
  }

const PostFeed = ({posts}: PostFeedProps) => {
    const userProfile = useUserStore((state) => state.user);
  return (
    <>
    {userProfile && posts.map((post) => (
      <PostCard key={post.PostID} post={post} userProfile={userProfile} />
    ))}
  </>
  )
}

export default PostFeed