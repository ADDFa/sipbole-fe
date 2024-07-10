import { createBrowserRouter } from "react-router-dom"
import SignIn from "Pages/SignIn"
import ErrorElement from "Pages/ErrorElement/ErrorElement"
import Dashboard from "Pages/Dashboard/Dashboard"
import userRoutes from "./User.Routes"
import adminRoutes from "./Admin.Routes"
import EditProfile from "Pages/Profile/EditProfile"
import UbahPassword from "Pages/Profile/UbahPassword"
import GantiFoto from "Pages/Profile/GantiFoto"
import { isLoginLoader, notSignInLoader, signInLoader } from "Functions/Loader"

const router = createBrowserRouter([
    {
        path: "/",
        loader: isLoginLoader,
        errorElement: <ErrorElement />
    },
    {
        path: "/sign-in",
        element: <SignIn />,
        loader: signInLoader
    },
    {
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />
            },
            {
                path: "/ganti-foto",
                element: <GantiFoto />
            },
            {
                path: "/edit-profile",
                element: <EditProfile />
            },
            {
                path: "/ubah-password",
                element: <UbahPassword />
            }
        ],
        errorElement: <ErrorElement />,
        loader: notSignInLoader
    },
    {
        children: userRoutes,
        errorElement: <ErrorElement />,
        loader: notSignInLoader
    },
    {
        path: "/admin",
        children: adminRoutes,
        errorElement: <ErrorElement />,
        loader: notSignInLoader
    }
])

export default router
