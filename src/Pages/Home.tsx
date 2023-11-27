import React, { useEffect, useState, useContext, useCallback } from "react";
import PostCard from "../Components/PostCard";
import CreatePost from "../Components/CreatePost";
import Profile from "../Components/ProfileComp/Profile";
import Connection from "../Components/Connections/Connection";
import useGraphQLQuery from "../hooks/useGraphQLQuery";
import { useNavigate } from "react-router";
import { AiOutlineArrowRight } from "react-icons/ai";
import SideNavBar from "../Components/SideNavBar";
import AppContext from "../context/app-context";
import { supabase } from "../SupabaseClient";
import { PostResponse, UserResponse } from "../types";
import { Circles } from "react-loader-spinner";
import { getUser, getPost } from "../queries";
const Home = () => {
  const {
    userData,
    followData,
    dimensions,
    setUserData,
    allPostData,
    setAllPostData,
    allUserData,
    setAllUserData,
  } = useContext(AppContext);

  const [imageUrl, setImageUrl] = useState<string>();
  const [isOpenPost, setIsOpenPost] = useState(false);
  const [loadingHome, setLoadingHome] = useState<boolean>(false);
  const [smallScreen, setSmallScreen] = useState<boolean>(
    dimensions.width < 600
  );
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData.user.id) {
      navigate("/", { replace: true });
    }
  }, [userData]);


  useEffect(() => {
    if (dimensions.width < 600) {
      setSmallScreen(true);
    } else {
      setSmallScreen(false);
    }
  }, [dimensions]);

  useEffect(() => {
    if (!smallScreen && isOpen) {
      setIsOpen(false);
    }
  }, [smallScreen, isOpen]);


  const {
    data: resposeUserData,
    loading: userResponseLoader,
    error: userResposeError,
  } = useGraphQLQuery<UserResponse>(getUser);
  const {
    data: resposePostData,
    loading: postResponseLoader,
    error: postResposeError,
  } = useGraphQLQuery<PostResponse>(getPost);

  useEffect(() => {
    if (resposeUserData) {
      setAllUserData(resposeUserData.data.usersCollection.edges);
    }
    if (resposePostData) {
      setAllPostData(resposePostData.data.postsCollection.edges);
    }
  }, [resposeUserData, resposePostData]);

  const handleLogOut = async () => {
    let { error } = await supabase.auth.signOut();
    localStorage.removeItem("supabaseSession");
    navigate("/", { replace: true });
    setUserData({
      user: {
        id: null,
        user_metadata: {
          first_name: null,
        },
      },
      session: null,
    });
    if (error) {
    }
  };

  return (
    <>
      {userResponseLoader ? (
        <div className="absolute h-full w-full flex items-center justify-center">
          <Circles color="black" width={"20px"} height={"20px"} />
        </div>
      ) : (
        <div
          className="lg:mx-20 flex flex-row gap-1 align-middle justify-center "
          style={{ height: "100vh" }}
        >
          {smallScreen && <div className="w-full absolute flex bottom-0">
            <SideNavBar />
            </div>}
          {!smallScreen && (
            <div className="w-3/6 flex flex-col items-center justify-start py-10">
              <Profile />
              {userResponseLoader ? (
                <div className="absolute h-full w-full flex items-center justify-center">
                  <Circles color="black" width={"20px"} height={"20px"} />
                </div>
              ) : (
                <Connection />
              )}
            </div>
          )}
          <div className="lg:mt-10 w-full flex flex-col items-start justify-start border border-grey-800 bg-gray-50 bg-opacity-75 ">
            <div className="bg-opacity-50 w-full rounded-lg backdrop-blur-md">
              <h1 className="text-xl font-semibold p-4">Home</h1>
            </div>
            {allPostData.length === 0 ? (
              <div className="max-w-md mx-auto h-96 p-4 border border-gray-300 rounded-lg my-4 text-center relative">
                <h1>Create A Post to see or follow someone</h1>
                <AiOutlineArrowRight className="text-2xl mt-2 absolute right-0 top-1/2 transform -translate-y-1/2" />
              </div>
            ) : (
              <div
                className="w-full overflow-y-auto h-full p-4 scroll-smooth mt-2"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#dddddd #ffffff",
                  scrollBehavior: "smooth",
                }}
              >
                {postResponseLoader ? (
                  <div className="absolute h-full w-full flex items-center justify-center">
                    <Circles color="black" width={"20px"} height={"20px"} />
                  </div>
                ) : (
                  allPostData.map((item) => {
                    if (
                      item.node.user_id === userData.user.id ||
                      followData.some(
                        (follow) => follow.user_id === item.node.user_id
                      )
                    ) {
                      return (
                        <PostCard
                          key={item.node.post_id}
                          caption={item.node.content}
                          post_id={item.node.post_id}
                          user_id={item.node.user_id}
                          imageSrc={item.node.image_url}
                          created_at={item.node.created_at}
                        />
                      );
                    }
                    return null;
                  })
                )}
              </div>
            )}
          </div>
          {!smallScreen && (
            <div className="w-7/12 flex flex-col items-center justify-between py-10">
              <CreatePost />
              <button
                className="text-sm cursor-pointer bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg shadow-gray-300 border-2 border-red-300"
                onClick={handleLogOut}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Home;
