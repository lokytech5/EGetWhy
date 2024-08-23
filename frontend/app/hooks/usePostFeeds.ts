import { PostFeedResponse } from '../components/types';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const usePostFeeds = () => {
    const fetchPostFeeds = async (): Promise<PostFeedResponse> => {
        const response = await axios.get('https://0zq8xgmvx9.execute-api.us-east-1.amazonaws.com/dev/api/feed');
        return response.data;
      };

      return useQuery<PostFeedResponse>(['posts'], fetchPostFeeds, {
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
      });
}

export default usePostFeeds