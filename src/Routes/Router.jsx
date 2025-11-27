import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root/Root";
import Home from "../Pages/Home/Home";
import AllProperties from "../Pages/AllProperties/AllProperties";
import AddProperties from "../Pages/AddProperties/AddProperties";
import MyProperties from "../Pages/MyProperties/MyProperties";

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
                element: <AllProperties></AllProperties>,
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
                element: <MyProperties></MyProperties>,
            },
        ]

    },
])