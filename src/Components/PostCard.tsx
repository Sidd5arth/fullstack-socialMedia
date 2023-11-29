import React, { useState, useEffect, useContext } from "react";
import AppContext from "../context/app-context";
import { FaRegHeart, FaHeart, FaUserTag, FaCommentAlt } from "react-icons/fa";
import { Circles } from "react-loader-spinner";
import SideNavBar from "./SideNavBar";

interface Props {
  imageSrc?: string;
  caption?: string;
  likes?: number;
  post_id?: string;
  created_at?: string;
  user_id?: string;
  taggedUsers?: string[];
}

const PostCard: React.FC<Props> = ({
  imageSrc,
  caption,
  likes,
  taggedUsers,
}) => {
  const [showTaggedUsers, setShowTaggedUsers] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const manageLike = () => {};

  useEffect(() => {
    manageLike();
  }, [isLiked]);

  return (
    <div className="w-full mx-auto p-4 border-2 rounded-lg my-4 border-white shadow-lg shadow-gray-200">

      <div className="flex-col">
        <div className="flex h-full gap-9">
          {imageSrc && (
            <img
              src={imageSrc}
              alt="Post"
              className="w-10 h-10 rounded-lg mb-2"
            />
          )}
          <p className="text-gray-700 mb-2">{caption}</p>
        </div>
        <div className="flex">
          <div className="w-20 h-full"></div>
          {imageSrc ? (
            <img src={imageSrc} alt="Post" className="w-80 rounded-lg mb-2" />
          ) : (
            <div className="flex justify-center align-middle">
              <Circles />
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-end mt-1 gap-4 mb-2">
        <div className="flex items-center">
          {isLiked ? (
            <FaHeart
              className="text-red-500 cursor-pointer bg-white w-8 h-8 p-2 rounded-lg border-white shadow-lg transform bottom-8 left-24 bg-opacity-80 backdrop-blur-md"
              onClick={() => setIsLiked(false)}
            />
          ) : (
            <FaRegHeart
              className="text-red-500 cursor-pointer border-2 bg-white w-8 h-8 p-2 rounded-lg border-white shadow-lg transform bottom-8 left-24 bg-opacity-80 backdrop-blur-md"
              onClick={() => setIsLiked(true)}
            />
          )}
          <p className="text-gray-500">{likes}</p>
        </div>
        <div className="flex items-center">
          <button
            className="text-blue-500"
            // onClick={() => setShowTaggedUsers(!showTaggedUsers)}
          ></button>
          <FaCommentAlt className="text-blue-500 cursor-pointer border-2 bg-white w-8 h-8 p-2 rounded-lg border-white shadow-lg transform bottom-8 left-24 bg-opacity-80 backdrop-blur-md" />
        </div>
        <div className="flex items-center">
          <button
            className="text-blue-500"
            onClick={() => setShowTaggedUsers(!showTaggedUsers)}
          ></button>
          <FaUserTag className="text-blue-500 cursor-pointer border-2 bg-white w-8 h-8 p-2 rounded-lg border-white shadow-lg transform bottom-8 left-24 bg-opacity-80 backdrop-blur-" />
        </div>
      </div>
      {showTaggedUsers && taggedUsers && taggedUsers.length > 0 && (
        <div className="mt-2">
          {taggedUsers.map((userName, index) => (
            <div key={index} className="flex items-center mb-2">
              <div className="w-6 h-6 bg-gray-400 rounded-full mr-2"></div>
              <span className="text-gray-700">{userName}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostCard;
