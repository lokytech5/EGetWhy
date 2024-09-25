import { Post } from '../feed/PostCard';
import { PostResponse } from '../components/types';


export const transformPostResponseToPost = (response: PostResponse['data']): Post => ({
    PostID: response.postId,
    UserID: response.userId,
    Content: response.content,
    Hashtags: response.hashtags,
    CategoryID: response.categoryId,
    IsAnonymous: response.isAnonymous,
    CreatedAt: response.createdAt,
    UpdatedAt: response.updatedAt,
    userDetails: {
        username: response.isAnonymous ? 'Anonymous' : 'Unknown',
        profilePicture: undefined,
      },
});