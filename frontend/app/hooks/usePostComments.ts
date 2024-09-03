import React from 'react'
import { CommentResponse } from '../components/types'
import { AxiosError } from 'axios'
import { useQuery } from '@tanstack/react-query'
import { postApiClient } from '../utils/apiClient'

const usePostComments = (postId: string) => {
    const fetchPostComments = async () : Promise<CommentResponse> => {
        if(!postId) {
            throw new Error ("PostId is not available");
        }
        const response = await postApiClient.get(`/api/posts/${postId}/comments/list`);
        return response.data;
    };

    return useQuery<CommentResponse>(['postcomments', postId], fetchPostComments, {
        enabled: !!postId,
    });
 
}

export default usePostComments