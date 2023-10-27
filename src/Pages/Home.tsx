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

type Props = {};
export interface UserResponse {
  usersCollection: {
    edges: {
      node: {
        user_id: string;
        username: string;
      };
    }[];
  };
}

interface PostResponse {
  postsCollection: {
    edges: {
      node: {
        content: string;
        created_at: string;
        image_url: string;
        post_id: string;
        user_id: string;
      };
    }[];
  };
}

const Home = (props: Props) => {
  const [postData, setPostData] = useState<
    {
      content: string | "";
      created_at: string | "";
      image_url: string | "";
      post_id: string | "";
      user_id: string | "";
    }[]
  >([]);
  const [imageUrl, setImageUrl] = useState<string>();
  const [loadingHome, setLoadingHome] = useState<boolean>(false);
  const { userData, followData, dimensions, setUserData } =
    useContext(AppContext);
  const [postCount, setPostCount] = useState<number>(0);
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
  console.log(userData);

  const toggleSidebar = () => {
    console.log(isOpen);
    setIsOpen(!isOpen);
  };

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

  const [allUserData, setAllUserData] = useState<
    UserResponse["usersCollection"]["edges"] | []
  >([]);
  const [allPostData, setAllPostData] = useState<
    PostResponse["postsCollection"]["edges"] | []
  >([]);

  const query = `
    {
      usersCollection {
        edges {
          node {
            user_id
            username
          }
        }
      }
    }
  `;
  const query2 = `
  {
    postsCollection(orderBy: [{ created_at: DescNullsFirst }]) {
      edges {
        node {
          user_id
          post_id
          created_at
          content
          image_url
        }
      }
    }
  }
  `;

  const { data, loading, error } = useGraphQLQuery<UserResponse>(query);
  const {
    data: data2,
    loading: loading2,
    error: error2,
  } = useGraphQLQuery<PostResponse>(query2);
  console.log(data?.data);
  console.log(data2?.data);

  useEffect(() => {
    if (data) {
      setAllUserData(data.data.usersCollection.edges);
    }
    if (data2) {
      setAllPostData(data2.data.postsCollection.edges);
    }
    const posts = data2?.data.postsCollection.edges;

    let count = 0;

    posts?.map((item) => {
      if (item.node.user_id === userData.user.id) {
        count++;
      }
    });
    setPostCount(count);
  }, [data, data2]);

  useEffect(() => {
    if (postData?.[0]) {
      console.log(postData);
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

  const handleLogOut = async () => {
    let { error } = await supabase.auth.signOut();
    localStorage.removeItem("supabaseSession");
    navigate("/", { replace: true });
    console.log(error);
    setUserData({
      user: {
        id: null,
        user_metadata: {
          first_name: null,
        },
      },
      session: null,
    });
  };

  console.log(allPostData);
  console.log(allUserData);

  return (
    <>
      {loading ? (
        "loading"
      ) : (
        <div
          className="mx-20 flex flex-row gap-4 max-h-screen "
          style={{ height: "100vh" }}
        >
          {smallScreen && <SideNavBar smallScreen={smallScreen} />}
          {!smallScreen && (
            <div className="w-3/6 flex flex-col items-center justify-start py-10">
              <Profile
                posts={postCount}
                username={userData.user.user_metadata.first_name}
              />
              {loading ? (
                "loading..."
              ) : (
                <Connection allUserData={allUserData} />
              )}
            </div>
          )}
          <div className="mt-10 w-full flex flex-col items-start justify-start border-2 border-white rounded-lg bg-gray-50 bg-opacity-75 ">
            <div
              className="absolute bg-opacity-50 rounded-lg backdrop-blur-md"
              style={{
                width: "42%",
                height: "55px",
              }}
            >
              <h1 className="text-xl font-semibold p-4">Home</h1>
            </div>
            {allPostData.length === 0 ? (
              <div className="max-w-md mx-auto h-96 p-4 border border-gray-300 rounded-lg my-4 text-center relative">
                <h1>Create A Post to see or follow someone</h1>
                <AiOutlineArrowRight className="text-2xl mt-2 absolute right-0 top-1/2 transform -translate-y-1/2" />
              </div>
            ) : (
              <div
                className="w-full overflow-y-auto h-full p-4 scroll-smooth mt-9"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#dddddd #ffffff",
                  scrollBehavior: "smooth",
                }}
              >
                {loading2
                  ? "loading..."
                  : allPostData.map((item) => {
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
                    })}
              </div>
            )}
          </div>
          {!smallScreen && (
            <div className="w-7/12 flex flex-col items-center justify-between py-10">
              <CreatePost
                setPostData={setPostData}
                postData={postData}
                setImageUrl={setImageUrl}
              />
              <button
                className="text-sm w-full cursor-pointer bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg shadow-gray-300 border-2 border-red-300"
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
