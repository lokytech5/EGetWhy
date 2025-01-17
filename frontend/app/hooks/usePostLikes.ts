import axios from 'axios';
import { PostLikesResponse } from '../components/types';
import { useQuery } from '@tanstack/react-query';


const usePostLikes = (postId: string) => {
  const fetchPostLikes = async (): Promise<PostLikesResponse> => {
    if (!postId) {
      throw new Error("PostId is not available");
    }
    const response = await axios.get(`https://0zq8xgmvx9.execute-api.us-east-1.amazonaws.com/dev/api/posts/${postId}/likes`);
    return response.data;
  };

  return useQuery<PostLikesResponse>(['postlikes', postId], fetchPostLikes, {
    enabled: !!postId,
  });
};

export default usePostLikes;
