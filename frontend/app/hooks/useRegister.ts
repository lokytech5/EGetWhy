import { useMutation } from '@tanstack/react-query';
import { authApiClient } from '../utils/apiClient';
import { showToastSuccess, showToastError } from '../utils/toastUtils';
import { RegisterData, RegisterResponse } from '../components/types';
import { AxiosError } from 'axios';

interface ErrorResponse {
    error: string;
}

export const useRegister = () => {

    return useMutation<RegisterResponse, AxiosError<ErrorResponse>, RegisterData>(
        async (registerData: RegisterData) => {
            const response = await authApiClient.post<RegisterResponse>('/auth/signup', registerData);
            return response.data;
        },
        {
            onSuccess: () => {
                showToastSuccess('Registration successful!');

            },
            onError: (error: AxiosError<ErrorResponse>) => {
                if(error.response && error.response.data){
                    showToastError(`Registration failed: ${error.response.data.error}`);
                } else {
                    showToastError('Registration failed. Please try again.');
                }
            },
        }
    );
};

