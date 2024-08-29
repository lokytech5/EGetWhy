import { PostData, PostResponse } from '../components/types'
import { AxiosError } from 'axios'
import { postApiClient } from '../utils/apiClient'
import { useMutation } from '@tanstack/react-query';
import { showToastError, showToastSuccess } from '../utils/toastUtils';

interface ErrorResponse {
    error: string;
}

const usePost = () => {
    return useMutation<PostResponse, AxiosError<ErrorResponse>, PostData>(
        async (postData: PostData) => {
            const response = await postApiClient.post<PostResponse>('/api/posts', postData);
            return response.data;
        },
        {
            onSuccess: () => {
                showToastSuccess('Post created successfully!');
               
            },
            onError: (error: AxiosError<ErrorResponse>) => {
                if (error.response && error.response.data) {
                    showToastError(`Post failed: ${error.response.data.error}`);
                } else {
                    showToastError('Post failed. Please try again.');
                }
            },
        }
    );
}

export default usePost;
