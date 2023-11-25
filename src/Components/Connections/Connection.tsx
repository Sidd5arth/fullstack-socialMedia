import React, { useState, useEffect, useContext } from "react";
import Followers from "./Followers";
import Follows from "./Follows";
import UserCard from "./UserCard";
import AppContext from "../../context/app-context";
import useGraphQLQuery from "../../hooks/useGraphQLQuery";

export interface FollowersResponse {
  followersCollection: {
    edges: {
      node: {
        user_id: string;
        follower_id: string;
        relationship_id: string;
      };
    }[];
  };
}
const Connection: React.FC = () => {
  const { userData, setFollowData, setFollowersData, allUserData, followData, followersData } = useContext(AppContext);
  const [showFollowers, setShowFollowers] = useState(true);
  const [showFollows, setShowFollows] = useState(false);
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [selectedCard, setSelectedCard] = useState<
    { user_id: string | ""; username: string | ""; relationship_id: string | ""; type:string } | {}
  >();
  // const [followerData, setFollowerData] = useState<
  //   { user_id: string | ""; username: string | "" }[]
  // >([]);
  // const [followsData, setFollowsData] = useState<
  //   { user_id: string | ""; username: string | "" }[]
  // >([]);
  const [allFollowerData, setAllFollowerData] = useState<
    FollowersResponse["followersCollection"]["edges"] | []
  >([]);

  const query = `
  {
    followersCollection {
      edges {
        node {
          relationship_id
          user_id
          follower_id
        }
      }
    }
  }
`;
  const { data, loading, error } = useGraphQLQuery<FollowersResponse>(query);
  console.log(data)
  useEffect(()=>{
    if(selectedCard && ('type' in selectedCard)){
      if(selectedCard.type === "follow"){
        const newCard = {
          user_id: selectedCard.user_id,
          username: selectedCard.username,
          relationship_id: selectedCard.relationship_id
        }
        setFollowData((prev) => [newCard, ...prev])
      }
      if (selectedCard.type === "unfollow") {
        const newCard = {
          user_id: selectedCard.user_id,
          username: selectedCard.username,
          relationship_id: selectedCard.relationship_id
        };
        setFollowData(prev => prev.filter(card => card.user_id !== newCard.user_id));
      }
    }
  }, [selectedCard])
  useEffect(() => {
    if (data) {
      const allData = data.data.followersCollection.edges;
      console.log(allData)
      setAllFollowerData(allData);
      let followerArray = [];
      let followsArray = [];
      for (const item of allData) {
        if (item.node.user_id === userData.user.id) {
          followsArray.push({follower_id: item.node.follower_id, relationship_id: item.node.relationship_id});
        } else if (item.node.follower_id === userData.user.id) {
          followerArray.push({user_id: item.node.user_id, relationship_id: item.node.relationship_id});
        }
      }
      console.log(followsArray)
      console.log(followerArray)
      const filteredFollowerData = followerArray.map((follower) => {
        const matchedUser = allUserData.find(
          (user) => user.node.user_id === follower.user_id
        );
        const followerobj = {
          user_id: matchedUser?.node.user_id,
          username: matchedUser?.node.username,
          relationship_id: follower.relationship_id,
        };
        return followerobj;
      });

      setFollowersData(
        filteredFollowerData as { user_id: string; username: string; relationship_id: string }[]
      );

      const filteredFollowsData = followsArray.map((follows) => {
        const matchedUser = allUserData.find(
          (user) => user.node.user_id === follows.follower_id
        );
        const followerobj = {
          user_id: matchedUser?.node.user_id,
          username: matchedUser?.node.username,
          relationship_id: follows.relationship_id,
        };
        return followerobj;
      });

      setFollowData(
        filteredFollowsData as { user_id: string; username: string; relationship_id: string }[]
      )
    }
  }, [data]);

  const toggleFollowers = () => {
    setShowFollowers(true);
    setShowFollows(false);
    setShowAllUsers(false);
  };

  const toggleFollows = () => {
    setShowFollows(true);
    setShowFollowers(false);
    setShowAllUsers(false);
  };

  const toggleAllUsers = () => {
    setShowAllUsers(true);
    setShowFollowers(false);
    setShowFollows(false);
  };

  return (
    <div className="w-full text-sm mx-auto p-4 my-1 text-center border border-grey-800 bg-gray-50 bg-opacity-70 shadow-lg shadow-gray-200">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between gap-3 mb-3 items-center rounded-lg">
          <button
            className={`w-1/3 py-2 rounded-lg ${
              showAllUsers
                ? "bg-blue-500 text-white text-sm shadow-lg shadow-blue-200 border-2 border-blue-400 hover:border-blue-400 transition-all"
                : "bg-gray-200 text-gray-700 border-2 border-gray-300"
            }`}
            onClick={toggleAllUsers}
          >
            All Users
          </button>
          <button
            className={`w-1/3 py-2 rounded-lg ${
              showFollowers
                ? "bg-blue-500 text-white text-sm shadow-lg shadow-blue-200 border-2 border-blue-400 hover:border-blue-400 transition-all"
                : "bg-gray-200 text-gray-700 border-2 border-gray-300"
            }`}
            onClick={toggleFollowers}
          >
            Followers
          </button>
          <button
            className={`w-1/3 py-2 rounded-lg ${
              showFollows
                ? "bg-blue-500 text-white text-sm shadow-lg shadow-blue-200 border-2 border-blue-400 hover:border-blue-400 transition-all"
                : "bg-gray-200 text-gray-700 border-2 border-gray-300"
            }`}
            onClick={toggleFollows}
          >
            Follows
          </button>
        </div>
        {showAllUsers ? (
          <div className="w-full min-h-min">
            <div className="max-h-[320px] overflow-y-auto scroll-smooth" style={{
            scrollbarWidth:"thin",
            scrollbarColor: "#dddddd #ffffff",
            scrollBehavior: "smooth",
        }}>
              {allUserData.map((item) => {
                console.log(followData);
                let realtionID = "";
                const isFollowing = followData.some((follow) => {
                  if(follow.user_id === item.node.user_id){
                    realtionID = follow.relationship_id;
                    return true;
                  }else return false;
                }
                );
                const type = isFollowing ? "unfollow" : "follow";
                return (
                  <UserCard
                    key={item.node.user_id}
                    user_id={item.node.user_id}
                    relationship_id={realtionID}
                    username={item.node.username}
                    setSelectedCard={setSelectedCard}
                    type={type} 
                  />
                );
              })}
            </div>
          </div>
        ) : null}
        {showFollowers ? (
          <Followers
            setSelectedCard={setSelectedCard}
          />
        ) : null}
        {showFollows ? (
          <Follows
            setSelectedCard={setSelectedCard}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Connection;
