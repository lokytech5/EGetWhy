import React from 'react'
import { useUserStore } from './useUserStore';

const Drawer = () => {
    const isAuthenticated = useUserStore((state) => state.isAuthenticated );
    const loading = useUserStore((state) => state.loading);

    if (loading) {
        return null; // or a loading spinner if you want
      }
    
  return (
    <div className="drawer-end">
    <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
    <div className="drawer-content">
      {/* Page content here */}
      <label htmlFor="my-drawer-4" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      </label>
    </div>

    <div className="drawer-side z-50">
      <label
        htmlFor="my-drawer-4"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content flex flex-col justify-center items-center space-y-4 no-underline">
        {/* Sidebar content here */}
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/feed">Feed</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        {!isAuthenticated && (
            <>
          
        <li>
          <a href="/login">Login</a>
        </li>
        <li>
          <a href="/register">Register</a>
        </li>
            </>
        )}
      </ul>
    </div>
  </div>
  )
}

export default Drawer