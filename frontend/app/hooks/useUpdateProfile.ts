import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../components/useUserStore";
import { ProfileUpdateData, ProfileResponse } from "../components/types";
import { userApiClient } from "../utils/apiClient";
import { AxiosError } from "axios";
import { showToastError, showToastSuccess } from "../utils/toastUtils";

interface ErrorResponse {
  error: string;
}

export const useUpdateProfile = () => {
  const setUserFetched = useUserStore((state) => state.setUserFetched);
  const setUser = useUserStore((state) => state.setUser);
  const queryClient = useQueryClient();

  return useMutation<ProfileResponse, AxiosError<ErrorResponse>, ProfileUpdateData>(
    async (profileData: ProfileUpdateData) => {
      const response = await userApiClient.put(`/users/${profileData.userId}`, profileData);
      return response.data;
    },
    {
      onSuccess: (data) => {
        setUser(data.data);
        setUserFetched(true);
        queryClient.invalidateQueries(['profile']);
        showToastSuccess('Profile updated successfully!');
      },
      onError: (error: AxiosError<ErrorResponse>) => {
        if (error.response && error.response.data) {
          showToastError(`Update profile failed: ${error.response.data.error}`);
        } else {
          showToastError('Failed to update profile. Please try again.');
        }
      },
    }
  );
};
