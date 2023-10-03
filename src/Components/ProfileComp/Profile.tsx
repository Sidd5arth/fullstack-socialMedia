import React from 'react';
import { UserResponse } from '../../Pages/Home';
import { FaUser } from "react-icons/fa";

interface Props {
  profilePicture?: string; 
  username?: string;
  followers?: number;
  follows?: number;
  posts?: number;
}

const Profile: React.FC<Props> = ({ profilePicture, username, followers, follows, posts }) => {
  return (
    <div className="w-full mx-auto p-4 border border-gray-300 rounded-lg text-center">
      <div className="mb-4">
        <img
          src={profilePicture}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto"
        />
      </div>

      <h2 className="text-xl font-semibold">
        <span>
          <FaUser className="inline-block mr-2 text-lg" />
        </span>
        @{username}
      </h2>

      <div className="flex justify-center mt-4">
        <div className="flex flex-col items-center mx-4">
          <span className="font-semibold">{followers}</span>
          <span className="text-gray-500">Followers</span>
        </div>
        <div className="flex flex-col items-center mx-4">
          <span className="font-semibold">{follows}</span>
          <span className="text-gray-500">Follows</span>
        </div>
        <div className="flex flex-col items-center mx-4">
          <span className="font-semibold">{posts}</span>
          <span className="text-gray-500">Posts</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
