 import React from 'react'
 import Image from "next/image";

 const Navbar = () => {
   return (
     <div className="navbar bg-base-100">
       <div className="navbar-start">
         <div className="dropdown">
           <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
             <svg
               xmlns="http://www.w3.org/2000/svg"
               className="h-5 w-5"
               fill="none"
               viewBox="0 0 24 24"
               stroke="currentColor">
               <path
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 strokeWidth="2"
                 d="M4 6h16M4 12h8m-8 6h16" />
             </svg>
           </div>
           <ul
             tabIndex={0}
             className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
             <li><a href='/'>Home</a></li>
             <li><a href='/about'>About</a></li>
             <li><a href='/services'>Services</a></li>
             <li><a href='/contact'>Contact</a></li>
           </ul>
         </div>
         <a className="btn btn-ghost text-xl">daisyUI</a>
       </div>
       <div className="navbar-center hidden lg:flex">
         <ul className="menu menu-horizontal px-1">
           <li><a href='/'>Home</a></li>
           <li><a href='/about'>About</a></li>
           <li><a href='/services'>Services</a></li>
           <li><a href='/contact'>Contact</a></li>
         </ul>
       </div>
       {/* Usermenu (profile section) */}
       <div className="dropdown dropdown-end sm:block px-2">
      <button tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <Image
            alt="User Profile"
            src="/images/avatar.svg"
            width={40} // Add the width of the image
            height={40} // Add the height of the image
            className="rounded-full bg-white"
          />
        </div>
      </button>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <a href="#" className="justify-between">
            Profile<span className="badge">New</span>
          </a>
        </li>
        <li>
          <a href="#">Settings</a>
        </li>
      </ul>
    </div>

       {/* End of (profile section) */}
     </div>
   )
 }
 
 export default Navbar