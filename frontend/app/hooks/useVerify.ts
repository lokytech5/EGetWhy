import { useMutation } from "@tanstack/react-query"
import { VerifyData, VerifyResponse } from "../components/types"
import { AxiosError } from "axios"
import { authApiClient } from "../utils/apiClient"
import { showToastError, showToastSuccess } from "../utils/toastUtils"

interface ErrorResponse {
    error: string;
}

export const useVerify = () => {
    return useMutation<VerifyResponse, AxiosError<ErrorResponse>, VerifyData>(
        async (verifyData: VerifyData) => {
            const response = await authApiClient.post<VerifyResponse>('/auth/verify', verifyData);
            return response.data;
        },
        {
            onSuccess: (data) => {
                showToastSuccess('Verification successful! You can now log in.');
            },
            onError:(error: AxiosError<ErrorResponse>) => {
                if (error.response && error.response.data) {
                    showToastError(`Verification failed: ${error.response.data.error}`);
                } else {
                    showToastError('Verification failed. Please try again.');
                }
            }
        },
    )
}