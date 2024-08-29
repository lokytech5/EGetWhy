import React from 'react'
import PostUserProfile from './PostUserProfile'
import MyInterests from './MyInterests'

const UserProfileSection = () => {
  return (
    <div className="w-full md:w-1/4 mt-4 mr-4">
      <PostUserProfile />
      <div className="hidden md:block mt-6">
        <MyInterests />
      </div>
    </div>
  )
}

export default UserProfileSection