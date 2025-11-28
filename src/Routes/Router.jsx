import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root/Root";
import Home from "../Pages/Home/Home";
import AllProperties from "../Pages/AllProperties/AllProperties";
import AddProperties from "../Pages/AddProperties/AddProperties";
import MyProperties from "../Pages/MyProperties/MyProperties";
import Register from "../Pages/Auth/Register";
import Login from "../Pages/Auth/Login";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        children:[
            {
                index: true,
                element: <Home></Home>,
            },
            {
                path: 'all-properties',
                element: <PrivateRoute>
                    <AllProperties></AllProperties>,
                </PrivateRoute>,
            },
            {
                path: 'add-properties',
                element: <AddProperties></AddProperties>
            },
            {
                path: 'all-properties',
                element: <AllProperties></AllProperties>,
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