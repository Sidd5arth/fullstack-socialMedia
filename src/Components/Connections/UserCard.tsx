import React, { useContext, useEffect } from "react";
import AppContext from "../../context/app-context";
import useGraphQLMutation from "../../hooks/useGraphQLMutation";
interface Props {
  username: string;
  user_id: string;
  relationship_id: string;
  type: string;
  setSelectedCard: React.Dispatch<
    React.SetStateAction<
      | {
          user_id: string;
          username: string;
          relationship_id?: string;
          type: string;
        }
      | ""
    >
  >;
}
interface FollowMutate {
  insertIntofollowersCollection: {
    records: [
      {
        follower_id: string;
        user_id: string;
      }
    ];
  };
}

const UserCard: React.FC<Props> = ({
  username,
  user_id,
  relationship_id,
  setSelectedCard,
  type,
}) => {
  const { userData } = useContext(AppContext);
  const { mutationData, mutationLoading, mutationError, executeMutation } =
    useGraphQLMutation<FollowMutate>();

  const handleFollowClick = async () => {
    const cardSelect = {
      user_id: user_id,
      username: username,
      type: "follow",
    };
    setSelectedCard(cardSelect);
    const mutation = `
    mutation InsertFollower($followerId: UUID!, $userId: UUID!) {
        insertIntofollowersCollection(objects: [{ follower_id: $followerId, user_id: $userId }]) {
          affectedCount
          records {
            follower_id
            user_id
          }
        }
      }      
  `;

    const userId = userData.user.id;
    const followerId = user_id;
 
    await executeMutation(mutation, { followerId, userId });
  };

  const handleUnFollowClick = async () => {
    const cardSelect = {
      user_id: user_id,
      username: username,
      type: "unfollow",
    };
    setSelectedCard(cardSelect);
    console.log(relationship_id)
    console.log(userData.user.id)
    console.log(user_id)
    const mutation = `
    mutation DeleteFollower($filter: followersFilter!) {
      deleteFromfollowersCollection(filter: $filter, atMost: 1) {
        affectedCount
        records {
          relationship_id
        }
      }
    }
  `;

    const userId = userData.user.id;
    const followerId = user_id;
    const relationshipId = relationship_id;

    await executeMutation(mutation, { userId, followerId, relationshipId });
  };

  return (
    <>
      {mutationLoading ? (
        <div className="max-w-md mx-auto p-4 my-2 flex items-center justify-between border-2 border-white bg-gray-50 bg-opacity-50 rounded-lg shadow-md shadow-gray-200 ">
          Loading...
        </div>
      ) : (
        <div className="max-w-md mx-auto p-4 my-2 flex items-center justify-between border-2 border-white bg-gray-50 bg-opacity-50 rounded-lg shadow-md shadow-gray-200 ">
          <div className="flex items-center">
            <span className="text-gray-700 text-md">@{username}</span>
          </div>

          {type === "follow" && (
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg w-32 text-sm shadow-lg shadow-blue-200 border-2 border-blue-300 hover:border-blue-500 transition-all"
              onClick={handleFollowClick}
            >
              Follow
            </button>
          )}
          {type === "unfollow" && (
            <button
              className=" text-white bg-red-400 py-2 px-4 rounded-lg w-32 text-sm shadow-lg shadow-red-200 border-2 border-red-300 hover:border-red-400 transition-all"
              onClick={handleUnFollowClick}
            >
              Unfollow
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default UserCard;
