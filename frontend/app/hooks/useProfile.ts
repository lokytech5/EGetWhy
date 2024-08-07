import { useQuery } from "@tanstack/react-query";

import { ProfileResponse } from "../components/types";

export const useProfile = (token: string) => {
    // const fetchProfile = () => {
    //     return apiClient.get('/me').then(res => res.data);
    // };

    // const queryInfo = useQuery<ProfileResponse, Error>({
    //     queryKey: ['profile'],
    //     queryFn: fetchProfile,
    //     enabled: !!token
    // });

    // return queryInfo;
}