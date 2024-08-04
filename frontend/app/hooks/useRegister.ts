import { useMutation } from '@tanstack/react-query';
import apiClient from '../utils/apiClient';
import { showToastSuccess, showToastError } from '../utils/toastUtils';

interface RegisterData {
    username: string;
    email: string;
    password: string;
    name: string; // changed from fullName to name due to TypeScript error
}

export const useRegister = () => {
    return useMutation(
        async (registerData: RegisterData) => {
            const response = await apiClient.post('/auth/signup', registerData);
            return response.data;
        },
        {
            onSuccess: (data) => {
                showToastSuccess('Registration successful!');

            },
            onError: (error) => {
                showToastError('Registration failed. Please try again.');
            },
        }
    );
};