import { useMutation } from '@tanstack/react-query'
import { CommentData, Comment } from '../components/types';
import { AxiosError } from 'axios';
import { postApiClient } from '../utils/apiClient';
import { showToastError, showToastSuccess } from '../utils/toastUtils';

interface ErrorResponse {
    error: string;
}

const useComments = (postId: string) => {
    return useMutation <Comment, AxiosError<ErrorResponse>, CommentData> (
        async(commentData: CommentData) => {
            const response = await postApiClient.post<Comment>(`/api/posts/${postId}/comments`, commentData);
            return response.data;
        },
        {
            onSuccess: () => {
                showToastSuccess('Comment added successfully!');
            },

            onError:(error: AxiosError<ErrorResponse>) => {
                if (error.response && error.response.data) {
                    showToastError(`Error: ${error.response.data.error}`);
                  } else {
                    showToastError('An unexpected error occurred.');
                  }
            }
        }
    )
  
}

export default useComments