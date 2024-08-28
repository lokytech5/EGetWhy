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
  userFetched: boolean;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  setIsVerified: (verified: boolean) => void;
  setUserFetched: (fetched: boolean) => void;
  initializeUser: () => void;
  persistUser: () => void;
  clearUser: () => void;
  setUserProfilePicture: (profilePictureURL: string) => void;
  updateUserProfile: (updatedFields: Partial<User>) => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  token: null,
  verified: false,
  isAuthenticated: false,
  loading: true,
  userFetched: false,
  setUser: (user) => set({ user, isAuthenticated: true }),
  setToken: (token) => set({ token }),
  setIsVerified: (verified) => set({ verified }),
  setUserFetched: (fetched) => set({ userFetched: fetched }),
  
  setUserProfilePicture: (profilePictureURL: string) => {
    const user = get().user;
    if (user) {
      set({
        user: { ...user, profilePictureURL },
      });
    }
  },

  updateUserProfile: (updatedFields: Partial<User>) => {
    set((state) => {
      if (state.user) {
        return {
          user: { ...state.user, ...updatedFields },
        };
      } else {
        return state;
      }
    });
  },

  clearUser: () => set({ user: null, token: null, verified: false, isAuthenticated: false, userFetched: false }),

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
          userFetched: true,
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
