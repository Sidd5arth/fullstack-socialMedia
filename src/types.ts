export interface AppContextProviderProps {
  children: React.ReactNode;
}

export interface Dimensions {
  width: number;
  height: number;
}

export interface UserData {
  user: {
    id: string | null;
    user_metadata: {
      first_name: string | null;
    };
  };
  session: object | null;
}

export interface UserResponse {
  usersCollection: {
    edges: {
      node: {
        user_id: string;
        username: string;
      };
    }[];
  };
}

export interface PostResponse {
  postsCollection: {
    edges: {
      node: {
        content: string;
        created_at: string;
        image_url: string;
        post_id: string;
        user_id: string;
      };
    }[];
  };
}

export interface AppContextType {
  dimensions: {
    width: number;
    height: number;
  };
  userData: {
    user: {
      id: string | null;
      user_metadata: {
        first_name: string | null;
      };
    };
    session: object | null;
  };
  setUserData: React.Dispatch<
    React.SetStateAction<{
      user: {
        id: string | null;
        user_metadata: {
          first_name: string | null;
        };
      };
      session: object | null;
    }>
  >;
  followData: {
    user_id: string;
    username: string;
    relationship_id: string;
  }[];
  setFollowData: React.Dispatch<
    React.SetStateAction<
      {
        user_id: string;
        username: string;
        relationship_id: string;
      }[]
    >
  >;
  followersData: {
    user_id: string;
    username: string;
    relationship_id: string;
  }[];
  setFollowersData: React.Dispatch<
    React.SetStateAction<
      {
        user_id: string;
        username: string;
        relationship_id: string;
      }[]
    >
  >;

  allPostData:
    | []
    | {
        node: {
          content: string;
          created_at: string;
          image_url: string;
          post_id: string;
          user_id: string;
        };
      }[];
  setAllPostData: React.Dispatch<
    React.SetStateAction<
      | {
          node: {
            content: string;
            created_at: string;
            image_url: string;
            post_id: string;
            user_id: string;
          };
        }[]
      | []
    >
  >;
  setAllUserData: React.Dispatch<
    React.SetStateAction<
      | []
      | {
          node: {
            user_id: string;
            username: string;
          };
        }[]
    >
  >;
  allUserData:
    | {
        node: {
          user_id: string;
          username: string;
        };
      }[]
    | [];
}
