import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { LikeData, LikeResponse } from '../components/types';
import { postApiClient } from '../utils/apiClient';
import { showToastError, showToastSuccess } from '../utils/toastUtils';

interface ErrorResponse {
  error: string;
}

const useLikes = () => {
  const queryClient = useQueryClient();

  return useMutation<LikeResponse, AxiosError<ErrorResponse>, LikeData>(
    async (likeData: LikeData) => {
      const { postId, userId } = likeData;
      const response = await postApiClient.post<LikeResponse>(`/api/posts/${postId}/like`, { userId });
      return response.data;
    },
    {
      onError: (error: AxiosError<ErrorResponse>, _likeData, _context) => {
        if (error.response && error.response.data) {
          showToastError(`Error: ${error.response.data.error}`);
        } else {
          showToastError('An unexpected error occurred.');
        }
      },
      onSettled: (data, error, likeData) => {
        queryClient.invalidateQueries(['post', likeData.postId]);
      },
      onSuccess: () => {
        showToastSuccess('Like was successfully added');
      },
    }
  );
};

export default useLikes;
