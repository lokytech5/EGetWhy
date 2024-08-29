import { AxiosError } from "axios";
import { LoginData, LoginResponse, ProfileResponse } from "../components/types";
import { authApiClient, userApiClient } from "../utils/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToastError, showToastSuccess } from "../utils/toastUtils";
import { useUserStore } from "../components/useUserStore";
import { useRouter } from "next/navigation";

interface ErrorResponse {
    error: string;
}

export const useLogin = () => {
    const setUser = useUserStore.getState().setUser;
    const setToken = useUserStore.getState().setToken;
    const setUserFetched = useUserStore.getState().setUserFetched;
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation<LoginResponse, AxiosError<ErrorResponse>, LoginData>(
        async (loginData: LoginData) => {
            const response = await authApiClient.post<LoginResponse>('/auth/login', loginData);
            return response.data;
        },
        {
            onSuccess: async (data) => {           
                const token = data.data.accessToken;
                localStorage.setItem('token', token);
                setToken(token);
               
                    try {
                        const profileData = await queryClient.fetchQuery<ProfileResponse, Error>({
                            queryKey: ['profile'],
                            queryFn: async () => {
                                const response = await userApiClient.get('/me');
                                return response.data;
                            }
                        });
                        setUser(profileData.data);

                        if(profileData.data) {
                            setUserFetched(true);       
                        }
                    } catch (error) {
                        console.error('Failed to fetch user profile:', error);
                    }

                router.push('/feed');
                showToastSuccess('Login successful!');
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