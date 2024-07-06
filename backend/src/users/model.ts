export interface User {
  userId: string;
  username: string;
  email: string;
  password: string;
  fullName: string;
  profilePictureURL?: string;
  bio?: string;
  location?: string;
  createdAt?: string;
  updatedAt?: string;
}