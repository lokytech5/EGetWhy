import React from 'react';
import { PostLikesResponse } from '../components/types';
import { postApiClient } from '../utils/apiClient';
import { useQuery } from '@tanstack/react-query';


const usePostLikes = (postId: string) => {
  const fetchPostLikes = async (): Promise<PostLikesResponse> => {
    if (!postId) {
      throw new Error("PostId is not available");
    }
    const response = await postApiClient.get(`/api/posts/${postId}/likes`);
    return response.data;
  };

  return useQuery<PostLikesResponse>(['postlikes', postId], fetchPostLikes, {
    enabled: !!postId,
  });
};

export default usePostLikes;
