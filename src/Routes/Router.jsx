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
                path: 'all-ratings',
                element: <AllRatings></AllRatings>,
                loader: () => fetch('https://homenest-server-ten.vercel.app/ratings')
            },
            {
                path: 'my-ratings',
                element: <PrivateRoute>
                    <MyRatings></MyRatings>,
                </PrivateRoute>,
                //                 loader: async () => {
                //     const { user } = use(AuthContext);
                //     if (!user?.email) return [];
                //     const res = await fetch(`https://homenest-server-ten.vercel.app/my-ratings/${user.email}`);
                //     return res.json();
                //   },
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