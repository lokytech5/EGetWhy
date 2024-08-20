"use client"
import React from "react";
import UserMenu from "./UserMenu";
import Drawer from "./Drawer";
import { useUserStore } from "./useUserStore";


const Navbar = () => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated );
  const loading = useUserStore((state) => state.loading);

    if (loading) {
        return null; // or a loading spinner if you want
      }
  return (
    <div className="navbar bg-base-100 text-neutral-content">
      <div className="navbar-start">
        <Drawer/>


        <a href="/" className="btn btn-ghost text-xl">EgetWhy</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
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

      <div className="navbar-end">
        <UserMenu />
      </div>
    </div>
  );
};

export default Navbar;