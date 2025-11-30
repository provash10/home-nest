import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root/Root";
import Home from "../Pages/Home/Home";
import AllProperties from "../Pages/AllProperties/AllProperties";
import AddProperties from "../Pages/AddProperties/AddProperties";
import MyProperties from "../Pages/MyProperties/MyProperties";
import Register from "../Pages/Auth/Register";
import Login from "../Pages/Auth/Login";
import PrivateRoute from "./PrivateRoute";
import LoadingHydrate from "../Loader/LoadingHydrate";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        hydrateFallbackElement: <LoadingHydrate></LoadingHydrate>,
        children:[
            {
                index: true,
                element: <Home></Home>,
                loader: () => fetch('http://localhost:3000/properties')
            },
            {
                path: 'all-properties',
                element: <AllProperties></AllProperties>,
                loader: () => fetch('http://localhost:3000/properties')
            },
            {
                path: 'add-properties',
                element: <PrivateRoute>
                    <AddProperties></AddProperties>,
                </PrivateRoute>,
            },
           
            {
                path: 'my-properties',
                element: <PrivateRoute>
                    <MyProperties></MyProperties>,
                </PrivateRoute>,
            },
            {
                path: 'register',
                element: <Register></Register>,
            },
            {
                path: 'login',
                element: <Login></Login>,
            },
        ]

    },
])