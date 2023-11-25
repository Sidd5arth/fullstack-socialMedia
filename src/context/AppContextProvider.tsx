import React, { useCallback, useEffect, useState } from "react";
import AppContext from "./app-context";
import { AppContextProviderProps, UserData, PostResponse, Dimensions, UserResponse } from "../types";


const AppContextProvider: React.FC<AppContextProviderProps> = ({ children}) => {
  const [userData, setUserData] = useState<UserData>({
    user: {id:null, user_metadata:{first_name:null}},
    session: null
  });
  const [allPostData, setAllPostData] = useState<PostResponse["postsCollection"]["edges"] | []>([]);
  const [allUserData, setAllUserData] = useState<UserResponse["usersCollection"]["edges"] | []>([]);
  const [followData, setFollowData] = useState<{user_id:string|""; username:string|""; relationship_id: string}[]>([]);
  const [followersData, setFollowersData] = useState<{user_id:string|""; username:string|""; relationship_id: string}[]>([]);
  const [dimensions, setDimensions] = useState<Dimensions>({width: window.innerWidth, height: window.innerHeight,});

  const changeDimensionsHandler = useCallback(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", changeDimensionsHandler);
    return () => {
      window.removeEventListener("resize", changeDimensionsHandler);
    };
  }, [changeDimensionsHandler]);


  return (
    <AppContext.Provider
      value={{
        dimensions,
        userData,
        setUserData,
        followData,
        setFollowData,
        followersData,
        setFollowersData,
        allPostData,
        setAllPostData,
        allUserData,
        setAllUserData,
      }}
    >
    {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
