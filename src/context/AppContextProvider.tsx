import React, { useCallback, useEffect, useState } from "react";
import AppContext from "./app-context";

interface AppContextProviderProps {
  children: React.ReactNode;
}

interface Dimensions {
  width: number;
  height: number;
}

interface UserData {
  user: {
    id: string|null;
    user_metadata: {
      first_name: string|null;
    };
  };
  session: object | null;
}

const AppContextProvider: React.FC<AppContextProviderProps> = ({ children}) => {
  const [userData, setUserData] = useState<UserData>({
    user: {id:null, user_metadata:{first_name:null}},
    session: null
  });
  const [followData, setFollowData] = useState<{user_id:string|""; username:string|""}[]>([]);
  const [followersData, setFollowersData] = useState<{user_id:string|""; username:string|""}[]>([]);
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

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
        setFollowersData
      }}
    >
    {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
