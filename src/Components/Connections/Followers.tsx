import React from 'react'
import UserCard from './UserCard';

interface FollowersProps {
  followerData:{
    user_id:string | "";
    username:string | "";
  }[];
  setSelectedCard:React.Dispatch<
  React.SetStateAction<{
    user_id:string|"";
    username:string|"";
    type:string|"";
  }|{}>>
}

const Followers: React.FC<FollowersProps> = ({followerData, setSelectedCard}) => {
  return (
    <div>
      {followerData.map((item)=>(
        <UserCard key={item.user_id} user_id={item.user_id} username={item.username} setSelectedCard={setSelectedCard} type='remove'/>
      ))}
    </div>
  )
}

export default Followers