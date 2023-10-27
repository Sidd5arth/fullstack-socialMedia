import React, { useState, useRef, useContext, useEffect } from "react";
import useGraphQLMutation from "../hooks/useGraphQLMutation";
import AppContext from "../context/app-context";
import useFileUpload from "../hooks/useFileUpload";
import { IoIosAddCircle } from "react-icons/io";
import { Circles } from "react-loader-spinner";
import UserTagModal from "./UserTagModal";

interface PostProps {
  setPostData: React.Dispatch<
    React.SetStateAction<
      | {
          content: string;
          created_at: string;
          image_url: string;
          post_id: string;
          user_id: string;
        }[]
      | []
    >
  >;
  postData?: {
    content: string;
    created_at: string;
    image_url: string;
    post_id: string;
    user_id: string;
  }[];
  setImageUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
}

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

const CreatePost: React.FC<PostProps> = ({
  setPostData,
  postData,
  setImageUrl,
}) => {
  const [image, setImage] = useState<File | null>();
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [postText, setPostText] = useState<string | null>(null);
  const { userData, followData } = useContext(AppContext);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false); 
  const [taggedUsers, setTaggedUsers] = useState<string[]>([]);

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
      console.log(
        "Mutation data updated:",
        mutationData.insertIntopostsCollection.records[0]
      );
    }
  }, [mutationData]);

  useEffect(() => {
    const postImgData = async () => {
      if (uploadResponse) {
        setImageUrl(uploadResponse);
        const mutation = `
          mutation InsertPost($userId: UUID!, $content: String!, $imageUrl: String!) {
            insertIntopostsCollection(objects: [{ user_id: $userId, content: $content, image_url: $imageUrl }]) {
              affectedCount
              records {
                post_id
                user_id
                content
                image_url
                created_at
              }
            }
          }
        `;

        console.log(uploadResponse);
        const userId = userData.user.id;
        const content = postText;
        const imageUrl = uploadResponse;

        await executeMutation(mutation, { userId, content, imageUrl });
        setImage(null);
        setPostText("");
        console.log("Mutation data updated:", uploadResponse);
      }
    };

    postImgData();
  }, [uploadResponse]);

  const handlePostSubmit = async () => {
    if (mutationLoading || mutationError) {
      return;
    }
    if (image) {
      console.log("settingImg");
      const bucketName = "socialmedia-content";
      const filePath = `posts/${image.name}`;
      await uploadFile(bucketName, filePath, image);
    }
  };

  const handleUserTag = (username: string) => {
    setTaggedUsers([...taggedUsers, username]);
    
  };

  return (
    <div className="w-full mx-auto p-4 border-2 border-white rounded-lg bg-gray-50 bg-opacity-70 shadow-lg shadow-gray-200">
      <h2 className="text-xl font-semibold mb-4">Create a Post</h2>
      {/* Text input area */}
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
