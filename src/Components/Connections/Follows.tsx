import React, { useContext } from "react";
import UserCard from "./UserCard";
import AppContext from "../../context/app-context";

interface FollowsProps {
  setSelectedCard: React.Dispatch<
    React.SetStateAction<
      | {
          user_id: string | "";
          username: string | "";
          relationship_id: string | "";
          type: string | "";
        }
      | {}
    >
  >;
}

const Follows: React.FC<FollowsProps> = ({ setSelectedCard }) => {
  const { followData } = useContext(AppContext);
  return (
    <div
      className="max-h-[320px] overflow-y-auto scroll-smooth"
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "#dddddd #ffffff",
        scrollBehavior: "smooth",
      }}
    >
      {followData.map((item) => (
        <UserCard
          key={item.user_id}
          user_id={item.user_id}
          username={item.username}
          setSelectedCard={setSelectedCard}
          relationship_id={item.relationship_id}
          type="unfollow"
        />
      ))}
    </div>
  );
};

export default Follows;
