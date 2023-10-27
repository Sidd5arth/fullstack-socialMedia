import React, { useContext } from "react";
import { UserResponse } from '../../Pages/Home';
import { FaUser } from "react-icons/fa";
import AppContext from '../../context/app-context';

interface Props {
  profilePicture?: string; 
  username?: string | null;
  posts?: number;
}

const Profile: React.FC<Props> = ({ profilePicture, username, posts}) => {
  const {followData, followersData} = useContext(AppContext)
  return (
    <div className="w-full mx-auto p-4 border-2 text-center border-white rounded-lg bg-gray-50 bg-opacity-70 shadow-lg shadow-gray-200">
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

      <div className="flex justify-center mt-4 gap-3">
        <div className="flex flex-1 p-1 flex-col items-center border-2 border-white bg-gray-50 bg-opacity-50 rounded-lg shadow-md shadow-gray-200 ">
          <span className="font-semibold">{followersData.length}</span>
          <span className="text-gray-500">Followers</span>
        </div>
        <div className="flex flex-1 p-1 flex-col items-center border-2 border-white bg-gray-50 bg-opacity-50 rounded-lg shadow-md shadow-gray-200 ">
          <span className="font-semibold">{followData.length}</span>
          <span className="text-gray-500">Follows</span>
        </div>
        <div className="flex flex-1 p-1 flex-col items-center border-2 border-white bg-gray-50 bg-opacity-50 rounded-lg shadow-md shadow-gray-200 ">
          <span className="font-semibold">{posts}</span>
          <span className="text-gray-500">Posts</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
