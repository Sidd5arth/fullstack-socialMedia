import React, { useState, useRef, useContext, useEffect } from "react";
import useGraphQLMutation from "../hooks/useGraphQLMutation";
import AppContext from "../context/app-context";
import useFileUpload from "../hooks/useFileUpload";
import { IoIosAddCircle } from "react-icons/io";
import { Circles } from "react-loader-spinner";
import UserTagModal from "./UserTagModal";
import SideNavBar from "./SideNavBar";
import { PostResponse } from "../types";
import { createPost } from "../queries";
import { useNavigate } from "react-router";

interface PostMutate {
  insertIntopostsCollection: {
    records: [
      {
        content: string | null;
        created_at: string;
        image_url: string | null;
        post_id: string;
        user_id: string;
      }
    ];
  };
}

const CreatePost: React.FC = () => {
  const { userData, followData, allPostData, setAllPostData, dimensions } = useContext(AppContext);
  const [image, setImage] = useState<File | null>();
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [postText, setPostText] = useState<string | null>(null);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [taggedUsers, setTaggedUsers] = useState<string[]>([]);
  const [postData, setPostData] = useState<
    {
      content: string | "";
      created_at: string | "";
      image_url: string | "";
      post_id: string | "";
      user_id: string | "";
    }[]
  >([]);

const navigate = useNavigate();

  useEffect(() => {
    if (postData?.[0]) {
      const newPostNode = {
        node: {
          content: postData[0].content || "",
          created_at: postData[0].created_at || "",
          image_url: postData[0].image_url || "",
          post_id: postData[0].post_id || "",
          user_id: postData[0].user_id || "",
        },
      };
      const updateAllPostData: PostResponse["postsCollection"]["edges"] = [
        newPostNode,
        ...allPostData,
      ];
      setAllPostData(updateAllPostData);
    }
  }, [postData]);

  useEffect(() => {
    if(dimensions.width > 780){
      navigate("/Home")
    }
  },[dimensions.width > 780])

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedImage = event.target.files?.[0] || null;
    setImage(selectedImage);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = async (event: React.DragEvent) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    setImage(droppedFile);
  };

  const handleImageContainerClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleTextArea = (val: string) => {
    setPostText(val);
  };

  const { uploadFile, uploadResponse, isUploading } = useFileUpload();
  const { mutationData, mutationLoading, mutationError, executeMutation } =
    useGraphQLMutation<PostMutate>();

  useEffect(() => {
    if (mutationData?.insertIntopostsCollection.records[0]) {
      setPostData((prevData) => {
        return [
          mutationData?.insertIntopostsCollection.records[0],
          ...prevData,
        ];
      });
    }
  }, [mutationData]);

  useEffect(() => {
    const postImgData = async () => {
      if (uploadResponse) {


        const userId = userData.user.id;
        const content = postText;
        const imageUrl = uploadResponse;

        await executeMutation(createPost, { userId, content, imageUrl });
        setImage(null);
        setPostText("");
      }
    };

    postImgData();
  }, [uploadResponse]);

  const handlePostSubmit = async () => {
    if (mutationLoading || mutationError) {
      return;
    }
    if (image) {
      const bucketName = "socialmedia-content";
      const filePath = `posts/${image.name}`;
      await uploadFile(bucketName, filePath, image);
    }
  };

  const handleUserTag = (username: string) => {
    setTaggedUsers([...taggedUsers, username]);
  };

  return (
    <div className="md:w-full w-min mx-auto p-4 border border-grey-800 bg-gray-50 bg-opacity-70 shadow-lg shadow-gray-200">
      <h2 className="text-xl font-semibold mb-4">Create a Post</h2>
      <textarea
        className="resize-none w-full h-20 p-2 mb-4 border-2 border-white bg-gray-50 bg-opacity-50 rounded-lg shadow-md shadow-gray-200"
        placeholder="Write your post..."
        onChange={(e) => handleTextArea(e.target.value)}
      ></textarea>
      {!mutationLoading ? (
        <div
          ref={imageContainerRef}
          className={`flex justify-center w-full items-center mb-4 h-80 bg-cover bg-center cursor-pointer bg-gray-50 bg-opacity-50 rounded-lg shadow-md ${
            !image ? "border-2 border-dotted border-gray-500" : ""
          }`}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleImageContainerClick}
          style={{
            backgroundImage: image
              ? `url('${URL.createObjectURL(image)}')`
              : "none",
          }}
        >
          {!image && (
            <div className="flex flex-col items-center justify-center ">
              <IoIosAddCircle className="text-3xl text-gray-500" />
              <p className="text-gray-500 w-80 text-center p-2">
                Drag & Drop an image here or click to select one
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center mb-4 h-80 bg-cover bg-center">
          <Circles color="black" width={"20px"} height={"20px"} />
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleImageUpload}
      />
      <div className="flex justify-between items-center mb-4">
        <button
          className="text-sm w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mr-4 shadow-lg shadow-gray-300 border-2 border-blue-300"
          onClick={() => setIsTagModalOpen(true)}
        >
          Tag
        </button>
        {isTagModalOpen && (
          <UserTagModal
            followData={followData}
            taggedUsers={taggedUsers}
            onUserTag={handleUserTag}
            onClose={() => setIsTagModalOpen(false)}
          />
        )}
        <button
          className="text-sm w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg shadow-gray-300 border-2 border-blue-300"
          onClick={handlePostSubmit}
        >
          {isUploading ? (
            <div className="flex justify-center align-middle gap-3">
              <p>Uploading</p>
              <Circles color="white" width={"20px"} height={"20px"} />
            </div>
          ) : (
            "Post"
          )}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
