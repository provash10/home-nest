import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root/Root";
import Home from "../Pages/Home/Home";
import AllProperties from "../Pages/AllProperties/AllProperties";
import AddProperties from "../Pages/AddProperties/AddProperties";
import MyProperties from "../Pages/MyProperties/MyProperties";
import Register from "../Pages/Auth/Register";
import Login from "../Pages/Auth/Login";
import PrivateRoute from "./PrivateRoute";
import PropertyDetails from "../Pages/AllProperties/PropertyDetails";
import UpdateProperty from "../Pages/AllProperties/UpdateProperty";
import AllRatings from "../Pages/Ratings/AllRatings";
import MyRatings from "../Pages/Ratings/MyRatings";
import ErrorPages from "../Loader/ErrorPages";
import DashboardLayout from "../Layouts/Dashboard/DashboardLayout";
import Dashboard from "../Pages/Dashboard/Dashboard";



export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        ErrorBoundary: ErrorPages,
        children: [
            {
                index: true,
                element: <Home></Home>,
                loader: () => fetch('https://homenest-server-ten.vercel.app/featured-properties')
            },
            {
                path: 'all-properties',
                element: <AllProperties></AllProperties>,
                loader: () => fetch('https://homenest-server-ten.vercel.app/properties')
            },
            {
                path: '/property-details/:id',
                element: <PrivateRoute>
                    <PropertyDetails></PropertyDetails>
                </PrivateRoute>,
                loader: ({ params }) => fetch(`https://homenest-server-ten.vercel.app/properties/${params.id}`)
            },
            {
                path: '/update-property/:id',
                element: <PrivateRoute>
                    <UpdateProperty></UpdateProperty>
                </PrivateRoute>,
                loader: ({ params }) => fetch(`https://homenest-server-ten.vercel.app/properties/${params.id}`)
            },
            {
                path: '/dashboard',
                element: <DashboardLayout></DashboardLayout>,
                children:[
                    {
                        index: true,
                        element: <Dashboard></Dashboard>
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
            // {
            //     path: 'all-ratings',
            //     element: <AllRatings></AllRatings>,
            //     loader: () => fetch('https://homenest-server-ten.vercel.app/ratings')
            // },
            {
                path: 'my-ratings',
                element: <PrivateRoute>
                    <MyRatings></MyRatings>,
                </PrivateRoute>,
            },
                ]
            },

             {
                path: 'all-ratings',
                element: <AllRatings></AllRatings>,
                loader: () => fetch('https://homenest-server-ten.vercel.app/ratings')
            },
            
            // {
            //     path: 'add-properties',
            //     element: <PrivateRoute>
            //         <AddProperties></AddProperties>,
            //     </PrivateRoute>,
            // },

            // {
            //     path: 'my-properties',
            //     element: <PrivateRoute>
            //         <MyProperties></MyProperties>,
            //     </PrivateRoute>,

            // },
            // {
            //     path: 'all-ratings',
            //     element: <AllRatings></AllRatings>,
            //     loader: () => fetch('https://homenest-server-ten.vercel.app/ratings')
            // },
            // {
            //     path: 'my-ratings',
            //     element: <PrivateRoute>
            //         <MyRatings></MyRatings>,
            //     </PrivateRoute>,
            // },
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