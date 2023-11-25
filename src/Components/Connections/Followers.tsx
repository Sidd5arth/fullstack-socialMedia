import React, { useContext } from "react";
import UserCard from "./UserCard";
import AppContext from "../../context/app-context";

interface FollowersProps {
  setSelectedCard: React.Dispatch<
    React.SetStateAction<
      | {
          user_id: string | "";
          username: string | "";
          type: string | "";
        }
      | {}
    >
  >;
}

const Followers: React.FC<FollowersProps> = ({
  setSelectedCard,
}) => {
  const { followersData } = useContext(AppContext);
  return (
    <div
      className="max-h-[320px] overflow-y-auto scroll-smooth"
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "#dddddd #ffffff",
        scrollBehavior: "smooth",
      }}
    >
      {followersData.map((item) => (
        <UserCard
          key={item.user_id}
          user_id={item.user_id}
          username={item.username}
          setSelectedCard={setSelectedCard}
          relationship_id={item.relationship_id}
          type="remove"
        />
      ))}
    </div>
  );
};

export default Followers;
