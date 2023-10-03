import React, { useEffect, useState, useContext } from "react";
import PostCard from "../Components/PostCard";
import CreatePost from "../Components/CreatePost";
import Profile from "../Components/ProfileComp/Profile";
import Connection from "../Components/Connections/Connection";
import useGraphQLQuery from "../hooks/useGraphQLQuery";
import { useNavigate } from "react-router";
import { AiOutlineArrowRight } from "react-icons/ai";
import SideNavBar from "../Components/SideNavBar";

// import PostCard from '../Components/PostCard';
import AppContext from "../context/app-context";
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
  const { userData, followData, dimensions} = useContext(AppContext);
  const [smallScreen, setSmallScreen] = useState<boolean>(dimensions.width < 600)
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    console.log(isOpen)
    setIsOpen(!isOpen);
  };

  useEffect(()=>{
    if(dimensions.width < 600){
      setSmallScreen(true);
    }else{
      setSmallScreen(false);
    }
  }, [dimensions])

  useEffect(() => {
    if (!smallScreen && isOpen) {
      setIsOpen(false);
    }
  }, [smallScreen, isOpen]);


  useEffect(() => {
    if (
      Object.keys(userData.user).length === 0 ||
      Object.keys(userData.session).length === 0
    ) {
      navigate("/AuthPage", { replace: true });
    }
  }, [userData]);
  console.log(userData);
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

  console.log(allPostData);
  console.log(allUserData);

  return (
    <div
      className="mx-20 flex flex-row gap-10 max-h-screen"
      style={{ height: "100vh" }}
    >
      {smallScreen && (
        <SideNavBar smallScreen={smallScreen} />
      )}
      {!smallScreen && <div className="flex-1 flex flex-col items-center justify-start py-20">
        <Profile />
        <Connection allUserData={allUserData} />
      </div>}
      <div className="flex-2 flex flex-col items-start justify-start">

        <h1 className="pt-10 text-left">home</h1>
        <hr></hr>
        {allPostData.length === 0 ? (
          <div className="h-full max-w-md mx-auto p-4 border border-gray-300 rounded-lg my-4 text-center relative">
            <h1>Create A Post to see or follow someone</h1>
            <AiOutlineArrowRight className="text-2xl mt-2 absolute right-0 top-1/2 transform -translate-y-1/2" />
          </div>
        ) : (
          <div className="overflow-y-auto h-full scroll-smooth">
          {allPostData.map((item) => {
            if (
              item.node.user_id === userData.user.id ||
              followData.some((follow) => follow.user_id === item.node.user_id)
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
      {!smallScreen && <div className="flex-1 flex flex-col items-center justify-start py-20">
        <CreatePost
          setPostData={setPostData}
          postData={postData}
          setImageUrl={setImageUrl}
        />
      </div>}
    </div>
  );
};

export default Home;
