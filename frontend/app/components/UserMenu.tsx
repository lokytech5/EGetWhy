"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LogoutButton from './LogoutButton';
import { FaUser } from 'react-icons/fa';
import { useUserStore } from './useUserStore';
import { extractUserInitials } from '../utils/userInitials'; // Import the utility function

const UserMenu = () => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const userProfile = useUserStore((state) => state.user);

  if (!isAuthenticated || !userProfile) {
    return null;
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="dropdown dropdown-end">
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
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
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
      </div>

      <div className="dropdown dropdown-end">
        <button
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
            {userProfile?.profilePictureURL ? (
              <Image 
                src={userProfile.profilePictureURL} 
                alt={`${userProfile.fullName}'s profile`} 
                width={40} 
                height={40} 
                className="rounded-full object-cover"
              />
            ) : (
              <span className="text-xl font-bold text-white">
                {userProfile?.fullName ? extractUserInitials(userProfile.fullName) : <FaUser className="h-8 w-8" />}
              </span>
            )}
          </div>
        </button>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <Link href="/profile" className="justify-between">
              Profile
            </Link>
          </li>
          <li>
            <LogoutButton />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserMenu;
