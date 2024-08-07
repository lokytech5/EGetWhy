import { AxiosError } from "axios";
import { LoginData, LoginResponse } from "../components/types";
import apiClient from "../utils/apiClient";
import { useMutation } from "@tanstack/react-query";
import { showToastError, showToastSuccess } from "../utils/toastUtils";
import { useUserStore } from "../components/useUserStore";

interface ErrorResponse {
    error: string;
}

export const useLogin = () => {
    const setUser = useUserStore.getState().setUser;

    return useMutation<LoginResponse, AxiosError<ErrorResponse>, LoginData>(
        async (loginData: LoginData) => {
            const response = await apiClient.post<LoginResponse>('/auth/signup', loginData);
            return response.data;
        },
        {
            onSuccess: (data) => {
               localStorage.setItem('token', data.data.accessToken);
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
)

}