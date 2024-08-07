import { create } from 'zustand';

interface User {
    userId: string;
    username: string;
    email: string;
    fullName: string;
    profilePictureURL?: string;
    bio?: string;
    location?: string;
  }
  
  interface UserState {
    user: User | null;
    token: string | null;
    verified: boolean;
    isAuthenticated: boolean;
    setUser: (user: User) => void;
    setToken: (token: string) => void;
    setIsVerified: (verified: boolean) => void;
    clearUser: () => void;
  }

  export const useUserStore = create<UserState>((set) => ({
    user: null,
    token: null,
    verified: false,
    isAuthenticated: false,
    setUser: (user) => set({ user, isAuthenticated: true }),
    setToken: (token) => set({ token }),
    setIsVerified: (verified) => set({ verified }),
    clearUser: () => set({ user: null, token: null, verified: false, isAuthenticated: false }),
  }));