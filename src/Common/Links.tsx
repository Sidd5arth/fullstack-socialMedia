import AuthPage from "../Pages/AuthPage";
import Home from "../Pages/Home";

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
    }
]