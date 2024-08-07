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
    setUser: (user: User) => void;
    setToken: (token: string) => void;
    setIsVerified: (verified: boolean) => void;
    fetchUserDetails: (token: string) => Promise<void>;
    clearUser: () => void;
  }

  export const useUserStore = create<UserState>((set) => ({
    user: null,
    token: null,
    verified: false,
    setUser: (user) => set({ user }),
    setToken: (token) => set({ token }),
    setIsVerified: (verified) => set({ verified }),
    fetchUserDetails: async (token: string) => {

    },
    clearUser: () => set({ user: null, token: null, verified: false }),
  }));