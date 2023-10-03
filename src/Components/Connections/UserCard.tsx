import React, { useContext, useEffect } from "react";
import AppContext from "../../context/app-context";
import useGraphQLMutation from "../../hooks/useGraphQLMutation";
interface Props {
  username: string;
  user_id: string;
  type: string;
  setSelectedCard: React.Dispatch<
    React.SetStateAction<
      | {
          user_id: string;
          username: string;
          type:string;
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
  setSelectedCard,
  type,
}) => {
  const { userData } = useContext(AppContext);
  const { mutationData, mutationLoading, mutationError, executeMutation } =
    useGraphQLMutation<FollowMutate>();
  useEffect(() => {
    console.log("mutDataPost", mutationData);
  }, [mutationData]);

  const handleFollowClick = async () => {
    const cardSelect = {
      user_id: user_id,
      username: username,
      type:"follow"
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
      type:"unfollow"
    };
    setSelectedCard(cardSelect);
    const mutation = `
    mutation DeleteFollower($filter: followersFilter!) {
      deleteFromfollowersCollection(filter: $filter, atMost: 1) {
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
    console.log(userId)
    console.log(followerId)
    await executeMutation(mutation, { followerId, userId });
  };

  return (
    <div className="max-w-md mx-auto p-4 border border-gray-300 rounded-lg my-4 flex items-center justify-between">
      <div className="flex items-center">
        <span className="text-gray-700 text-lg">@{username}</span>
      </div>

      {type === "follow" && (
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-full"
          onClick={handleFollowClick}
        >
          Follow
        </button>
      )}
      {type === "unfollow" && (
        <button
          className=" text-white bg-gray-600 py-2 px-4 rounded-full"
          onClick={handleUnFollowClick}
        >
          Unfollow
        </button>
      )}
    </div>
  );
};

export default UserCard;
