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

import AdminRoute from "./AdminRoute";
import AdminUsers from "../Pages/AdminDashboard/AdminUsers"; 
import AdminProperties from "../Pages/AdminDashboard/AdminProperties"; 
import AdminReviews from "../Pages/AdminDashboard/AdminReviews"; 
import DashboardStats from "../Pages/AdminDashboard/DashboardStats";

import Profile from "../Pages/Dashboard/Profile"; 
import Settings from "../Pages/Dashboard/Settings";

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
                element: <PrivateRoute><DashboardLayout /></PrivateRoute>, 
                children: [
                    {
                        index: true,
                        element: <Dashboard></Dashboard>
                    },
                    {
                        path: 'profile',
                        element: <Profile></Profile>,
                    },
                    {
                        path: 'settings',
                        element: <PrivateRoute><Settings /></PrivateRoute>
                    },
                    {
                        path: 'add-properties',
                        element: <AddProperties></AddProperties>,
                    },
                    {
                        path: 'my-properties',
                        element: <MyProperties></MyProperties>,
                    },
                    {
                        path: 'my-ratings',
                        element: <MyRatings></MyRatings>,
                    },
                    // Admin routes
                    {
                        path: 'users',
                        element: <AdminRoute><AdminUsers /></AdminRoute>
                    },
                    {
                        path: 'all-properties',
                        element: <AdminRoute><AdminProperties /></AdminRoute>
                    },
                    {
                        path: 'all-ratings',
                        element: <AdminRoute><AdminReviews /></AdminRoute>
                    },
                    {
                        path: 'statistics',
                        element: <AdminRoute><DashboardStats /></AdminRoute>
                    }
                ]
            },
            {
                path: 'all-ratings',
                element: <AllRatings></AllRatings>,
                loader: () => fetch('https://homenest-server-ten.vercel.app/ratings')
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
]);