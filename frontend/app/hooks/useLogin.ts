import { AxiosError } from "axios";
import { LoginData, LoginResponse, ProfileResponse } from "../components/types";
import apiClient from "../utils/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToastError, showToastSuccess } from "../utils/toastUtils";
import { useUserStore } from "../components/useUserStore";
import { useProfile } from "./useProfile";

interface ErrorResponse {
    error: string;
}

export const useLogin = () => {
    const setUser = useUserStore.getState().setUser;
    const setToken = useUserStore.getState().setToken;
    const queryClient = useQueryClient();

    return useMutation<LoginResponse, AxiosError<ErrorResponse>, LoginData>(
        async (loginData: LoginData) => {
            const response = await apiClient.post<LoginResponse>('/auth/login', loginData);
            return response.data;
        },
        {
            onSuccess: async (data) => {
                showToastSuccess('Login successful!');
                const token = data.data.accessToken;
                localStorage.setItem('token', token);
                setToken(token);

                try {
                    const profileData = await queryClient.fetchQuery<ProfileResponse, Error>({
                        queryKey: ['profile'],
                        queryFn: async () => {
                            const response = await apiClient.get('/me');
                            return response.data;
                        }
                    });
                    setUser(profileData.data);
                } catch (error) {
                    console.error('Failed to fetch user profile:', error);
                }
            },

            onError: (error: AxiosError<ErrorResponse>) => {
                if(error.response && error.response.data){
                    showToastError(`Registration failed: ${error.response.data.error}`);
                } else {
                    showToastError('Registration failed. Please try again.');
                }
            },
        }
)

}