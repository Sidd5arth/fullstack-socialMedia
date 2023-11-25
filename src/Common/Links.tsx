import CreatePost from "../Components/CreatePost";
import Profile from "../Components/ProfileComp/Profile";
import AuthPage from "../Pages/AuthPage";
import Home from "../Pages/Home";
import ApiPage from "../Pages/ApiPage";

export const Links = [
    {
        name:"Home",
        path:"/Home",
        element:<Home/>,
        showInNavigation: true
    },
    {
        name:"AuthPage",
        path:"/",
        element:<AuthPage/>,
        showInNavigation: true
    },
    {
        name:"CreatePost",
        path:"/Post",
        element:<CreatePost/>,
        showInNavigation: true
    },
    {
        name:"Profile",
        path:"/Profile",
        element:<Profile/>,
        showInNavigation: true
    },
    {
        name:"apiPage",
        path:"/apiPage",
        element:<ApiPage/>,
        showInNavigation: true
    },
]