import { userApiClient } from '../utils/apiClient'
import { useUserStore } from '../components/useUserStore'
import { MyInterestsResponse } from '../components/types';
import { useQuery } from '@tanstack/react-query';

const useMyInterests = () => {
    const userId = useUserStore((state) => state.user?.userId);

    const fetchMyInterests = async (): Promise<MyInterestsResponse> => {
        if(!userId) {
            throw new Error("UserID not available")
        }
        const response = await userApiClient.get(`/users/${userId}/interests`);
        return response.data;
    }

    return useQuery<MyInterestsResponse>(['myInterests', userId], fetchMyInterests, {
        enabled: !!userId,
      });
}

export default useMyInterests;
