import { createContext } from "react";
import { AppContextType,  } from "../types";

const defaultContextValue: AppContextType = {
  dimensions: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  userData: {
    user: {id:null, user_metadata:{first_name:null}},
    session: null,
  },
  allPostData:[],
  allUserData:[],
  followData:[],
  followersData:[],
  setUserData: () => {}, 
  setFollowData:() => {},
  setFollowersData:() => {},
  setAllPostData:() => {},
  setAllUserData:() => {},
};

const AppContext = createContext<AppContextType>(defaultContextValue);

export default AppContext;
