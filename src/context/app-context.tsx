import { createContext } from "react";

interface AppContextType {
  dimensions: {
    width: number;
    height: number;
  };
  userData: {
    user: {
      id:string
    };
    session: object;
  };
  setUserData: React.Dispatch<React.SetStateAction<{
    user: {
      id:string;
    };
    session: object;
  }>>;
  followData:{
    user_id:string;
    username:string;
  }[];
  setFollowData: React.Dispatch<React.SetStateAction<{
    user_id:string;
    username:string
  }[]>>;
}

const defaultContextValue: AppContextType = {
  dimensions: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  userData: {
    user: {id:""},
    session: {},
  },
  followData:[],
  setUserData: () => {}, 
  setFollowData:() => {},
};

const AppContext = createContext<AppContextType>(defaultContextValue);

export default AppContext;
