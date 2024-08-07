import { useRouter } from 'next/navigation';
import React from 'react'
import { useUserStore } from './useUserStore';

const LogoutButton = () => {
    const logout = useUserStore((state) => state.clearUser);

    const router = useRouter();
    const handleLogout = () => {
        logout();
        localStorage.removeItem("token");
        router.push('/home')
      };
      return (
        <ul tabIndex={0} 
        className="ml-3 mt-1 pl-0"
        onClick={handleLogout}>
        <li>logout</li>
      </ul>
      );
}

export default LogoutButton