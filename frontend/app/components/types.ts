export interface RegisterData {
    username: string;
    email: string;
    password: string;
    fullName: string;
  }
  
  export interface User {
    userId: string;
    username: string;
    email: string;
    fullName: string;
    profilePictureURL?: string;
    bio?: string;
    location?: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface RegisterResponse {
    data: {
      message: string;
      user: User;
    };
    meta: Record<string, never>;
  }
  
  export interface VerifyData {
    email: string;
    code: string;
  }
  
  export interface VerifyResponse {
    data: {
      message: string;
    };
    meta: Record<string, never>;
  }
  
  export interface LoginData {
    email: string;
    password: string;
  }
  
  export interface LoginResponse {
    data: {
      message: string;
      accessToken: string;
    };
    meta: Record<string, never>;
  }
  
  export interface ProfileResponse {
    data: User;
    meta: Record<string, never>;
  }
  
  export interface ProfileUpdateData {
    userId: string;
    username: string;
    fullName: string;
    bio?: string;
    location?: string;
  }
  
  export interface Hashtag {
    hashtag: string;
    count: number;
  }
  
  export interface TrendingHashtagResponse {
    data: Hashtag[];
    meta: Record<string, never>;
  }
  
  export interface MyInterestsResponse {
    data: {
      Interests: string[];
      UserID: string;
    };
    meta: Record<string, never>;
  }
  
  export interface Post {
    PostID: string;
    UserID: string;
    Content: string;
    Hashtags: string;
    CategoryID: string | null;
    IsAnonymous: boolean;
    CreatedAt: string;
    UpdatedAt: string;
  }
  
  export interface PostFeedResponse {
    posts: Post[];
    lastKey?: { PostID: string };
  }
  
  export interface PostData {
    userId: string | undefined;
    content: string;
    hashtags: string[];
    isAnonymous: boolean;
  }
  
  export interface PostResponse {
    data: {
      postId: string;
      userId: string;
      categoryId: string | null;
      content: string;
      hashtags: string;
      isAnonymous: boolean;
      createdAt: string;
      updatedAt: string;
    };
    meta: Record<string, never>;
  }

  export interface LikeData {
    userId: string | undefined;
    postId: string;
  }

  export interface LikeResponse {
    data: {
      LikeID: string;
      PostId: string;
      UserId: string;
    }; 
    meta: Record<string, never>;
  }

  export interface PostLikesResponse {
    data: {
      totalLikes: number;
    },
    meta: Record<string, never>;

  }

  export interface CommentData {
    userId: string | undefined;
    content: string;
  }

  export interface Comment {
      CommentID: string;
      PostID: string;
      UserID: string;
      Content: string;
      CreatedAt: string;
      UpdatedAt: string;
  }

  export interface CommentResponse {
    data: Comment[];
    meta: Record<string, never>;
  }
  