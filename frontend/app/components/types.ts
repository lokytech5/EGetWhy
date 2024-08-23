
export interface RegisterData {
    username: string;
    email: string;
    password: string;
    fullName: string; // changed from fullName to name due to TypeScript error
}

export interface RegisterResponse {
    data: {
        message: string;
        user: {
            userId: string;
            username: string;
            email: string;
            fullName: string;
            profilePictureURL: string;
            bio: string;
            location: string;
            createdAt: string;
            updatedAt: string;
        }
    },
    meta: Record<string, never>

}

export interface VerifyData {
    email: string;
    code: string;
}

export interface VerifyResponse {
    data: {
        message: string;
    },
    meta: Record<string, never>
}

export interface LoginData {
    email: string;
    password: string;
}

export interface LoginResponse {
    data: {
        message: string;
        accessToken: string;
    },
    meta: Record<string, never>
}

export interface ProfileResponse {
    data: {
        profilePictureURL: string,
        location: string,
        bio: string,
        userId: string,
        updatedAt: string,
        createdAt: string,
        username: string,
        fullName: string,
        email: string,
    },
    meta: Record<string, never>
}

export interface ProfileUpdateData {
    userId: string;
    username: string; 
    fullName: string;
    bio?: string;
    location?: string;
}

export interface TrendingHashtagResponse {
    data: [
        {
            hashtag: string;
            count: number;
        }
    ],
    meta: Record<string, never>
}

export interface MyInterestsResponse {
    data: {
        Interests: string[];
        UserID: string;
    },
    meta: Record<string, never>
}

export interface PostFeedResponse {
    data: {
        UpdatedAt: string;
        PostID: string;
        UserID: string;
        CategoryID: string | null;
        Content: string;
        Hashtags: string;
        CreatedAt: string;
        IsAnonymous: boolean;
    }[];
    meta: Record<string, never>;
}
