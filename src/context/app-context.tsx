import { createContext } from "react";

interface AppContextType {
  dimensions: {
    width: number;
    height: number;
  };
  userData: {
    user: {
      id: string|null;
      user_metadata: {
        first_name: string|null;
      };
    };
    session: object | null;
  };
  setUserData: React.Dispatch<React.SetStateAction<{
    user: {
      id: string|null;
      user_metadata: {
        first_name: string|null;
      };
    };
    session: object | null;
  }>>;
  followData:{
    user_id:string;
    username:string;
  }[];
  setFollowData: React.Dispatch<React.SetStateAction<{
    user_id:string;
    username:string
  }[]>>;
  followersData:{
    user_id:string;
    username:string;
  }[];
  setFollowersData: React.Dispatch<React.SetStateAction<{
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
    user: {id:null, user_metadata:{first_name:null}},
    session: null,
  },
  followData:[],
  followersData:[],
  setUserData: () => {}, 
  setFollowData:() => {},
  setFollowersData:() => {},
};

const AppContext = createContext<AppContextType>(defaultContextValue);

export default AppContext;
