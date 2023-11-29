import React, { useContext, useEffect, useState } from "react";
import { UserResponse } from "../../types";
import { FaUser } from "react-icons/fa";
import AppContext from "../../context/app-context";
import { useNavigate } from "react-router";
import SideNavBar from "../SideNavBar";

interface Props {
  profilePicture?: string;
  username?: string | null;
  posts?: number;
}

const Profile: React.FC<Props> = ({ profilePicture, username }) => {
  const { followData, followersData, userData, allPostData, dimensions } = useContext(AppContext);
  const [postCount, setPostCount] = useState<number>(0);
  const navigate = useNavigate();
  const [smallScreen, setSmallScreen] = useState<boolean>(
    dimensions.width < 600
  );

  useEffect(() => {
    const posts = allPostData;
    console.log(allPostData);
    let count = 0;
    posts?.map((item) => {
      if (item.node.user_id === userData.user.id) {
        count++;
      }
    });
    setPostCount(count);
  }, [allPostData]);
  useEffect(() => {
    if (dimensions.width > 780) {
      navigate("/Home");
    }
  }, [dimensions.width > 780]);
  return (
    <>
      {smallScreen && (
        <div className="w-full absolute flex bottom-0">
          <SideNavBar />
        </div>
      )}
      <div className="w-full mx-auto p-4 text-center border border-grey-800 bg-gray-50 bg-opacity-70 shadow-lg shadow-gray-200">
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
          @{userData.user.user_metadata.first_name}
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
            <span className="font-semibold">{postCount}</span>
            <span className="text-gray-500">Posts</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
