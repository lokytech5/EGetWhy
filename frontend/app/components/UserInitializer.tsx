"use client";
import { useEffect } from 'react'
import { useUserStore } from './useUserStore';

const UserInitializer = () => {
    const initializeUser = useUserStore((state) => state.initializeUser);
    const persistUser = useUserStore((state) => state.persistUser);
  
    useEffect(() => {
      initializeUser();
  
      window.addEventListener("beforeunload", persistUser);
  
      return () => {
        window.removeEventListener("beforeunload", persistUser);
      };
    }, [initializeUser, persistUser]);
  
    return null;
  };

export default UserInitializer