import { PostFeedResponse } from '../components/types';
import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';

const usePostFeeds = () => {
  const fetchPostFeeds = async ({ pageParam = null, limit = 10 }): Promise<PostFeedResponse> => {
    const response = await axios.get('https://0zq8xgmvx9.execute-api.us-east-1.amazonaws.com/dev/api/feed', {
      params: {
        limit,
        lastKey: pageParam ? JSON.stringify(pageParam) : undefined,
      },
    });
    return response.data;
  };

  return useInfiniteQuery<PostFeedResponse>(
    ['posts'], 
    ({ pageParam = null }) => fetchPostFeeds({ pageParam }),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage && lastPage.lastKey) {
          return lastPage.lastKey;
        }
        return undefined; // No more pages
      },
      staleTime: 5 * 60 * 1000, // Data is considered fresh for 5 minutes
      cacheTime: 10 * 60 * 1000, // Data is cached for 10 minutes
      refetchOnWindowFocus: false, // Do not refetch on window focus
    }
  );
};

export default usePostFeeds;
