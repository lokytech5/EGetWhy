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
  loading: boolean;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  setIsVerified: (verified: boolean) => void;
  initializeUser: () => void;
  persistUser: () => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  token: null,
  verified: false,
  isAuthenticated: false,
  loading: true,
  setUser: (user) => set({ user, isAuthenticated: true }),
  setToken: (token) => set({ token }),
  setIsVerified: (verified) => set({ verified }),
  clearUser: () => set({ user: null, token: null, verified: false, isAuthenticated: false }),

  initializeUser: () => {
    set({ loading: true });
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        set({
          user: parsedUser.user,
          token: parsedUser.token,
          isAuthenticated: !!parsedUser.user && !!parsedUser.token,
          loading: false,
        });
      } catch (error) {
        localStorage.removeItem('user');
        set({ loading: false });
      }
    } else {
      set({ loading: false });
    }
  },
  persistUser: () => {
    const { user, token } = get();
    localStorage.setItem('user', JSON.stringify({ user, token }));
  },
}));
