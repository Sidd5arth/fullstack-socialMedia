import React from 'react'
import UserCard from './UserCard';

interface FollowsProps {
  followsData:{
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

const Follows: React.FC<FollowsProps> = ({followsData, setSelectedCard}) => {
  return (
    <div>
      {followsData.map((item)=>(
        <UserCard key={item.user_id} user_id={item.user_id} username={item.username} setSelectedCard={setSelectedCard} type="unfollow"/>
      ))}
    </div>
  )
}

export default Follows