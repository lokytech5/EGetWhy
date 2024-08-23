import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { TrendingHashtagResponse } from '../components/types';

const useTrendingHashtag = () => {
    const fetchTrendingHashtags = async (): Promise<TrendingHashtagResponse> => {
        const response = await axios.get('https://0zq8xgmvx9.execute-api.us-east-1.amazonaws.com/dev/api/hashtags/trending');
        return response.data;
      };

      return useQuery<TrendingHashtagResponse>(['trendingHashtags'], fetchTrendingHashtags, {
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
      });
}

export default useTrendingHashtag