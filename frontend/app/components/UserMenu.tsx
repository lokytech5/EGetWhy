import React from 'react'
import Image from "next/image";
import Link from 'next/link';


const UserMenu = () => {
  return (
    <div className="dropdown dropdown-end sm:block px-2">
    <button
      tabIndex={0}
      role="button"
      className="btn btn-ghost btn-circle avatar"
    >
      <div className="w-10 rounded-full">
        <Image
          alt="User Profile"
          src="/images/avatar.svg"
          width={40}
          height={40}
          className="rounded-full bg-white"
        />
      </div>
    </button>
    <ul
      tabIndex={0}
      className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
    >
      <li>
        <Link href="#" className="justify-between">
          Profile
        </Link>
      </li>
    </ul>
  </div>
  )
}

export default UserMenu