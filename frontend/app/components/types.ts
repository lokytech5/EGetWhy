
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