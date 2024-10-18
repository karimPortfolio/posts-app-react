import NotFound from "../views/404";
import Home from "../views/Home";
import Posts from "../views/Posts";
import Signin from "../views/Signin";
import Signup from "../views/Signup";

export const routes = [
    {
        path: "/",
        component: Home,
        type: "private",
        toSkip: true
    },
    {
        path: "/posts",
        component: Posts,
        type: "private",
        toSkip: true
    },
    {
        path: '/signin',
        component: Signin,
        type:"auth",
        toSkip: true
    },
    {
        path: '/signup',
        component: Signup,
        type:"auth",
        toSkip: true
    },
    {
        path: "*",
        component: NotFound,
        type: "public",
        toSkip: true
    },
]

