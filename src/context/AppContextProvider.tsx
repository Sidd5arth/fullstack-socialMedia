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
    id: string;
  }
  session: object;
}

const AppContextProvider: React.FC<AppContextProviderProps> = ({ children}) => {
  const [userData, setUserData] = useState<UserData>({
    user: {id:""},
    session:{}
  });
  const [followData, setFollowData] = useState<{user_id:string|""; username:string|""}[]>([]);
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
        setFollowData
      }}
    >
    {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
