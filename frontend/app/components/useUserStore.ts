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
    setUser: (user: User) => void;
    setToken: (token: string) => void;
    clearUser: () => void;
  }

  export const useUserStore = create<UserState>((set) => ({
    user: null,
    token: null,
    setUser: (user) => set({ user }),
    setToken: (token) => set({ token }),
    clearUser: () => set({ user: null, token: null }),
  }));