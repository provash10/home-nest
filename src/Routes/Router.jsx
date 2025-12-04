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
import PropertyDetails from "../Pages/AllProperties/PropertyDetails";
import UpdateProperty from "../Pages/AllProperties/UpdateProperty";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        hydrateFallbackElement: <LoadingHydrate></LoadingHydrate>,
        children:[
            {
                index: true,
                element: <Home></Home>,
                loader: () => fetch('http://localhost:3000/featured-properties')
            },
            {
                path: 'all-properties',
                element: <AllProperties></AllProperties>,
                loader: () => fetch('http://localhost:3000/properties')
            },
            {
                path: '/property-details/:id',
                element: <PrivateRoute>
                    <PropertyDetails></PropertyDetails>
                </PrivateRoute>,
                loader: ({params}) => fetch (`http://localhost:3000/properties/${params.id}`)
            },
            {
                path: '/update-property/:id',
                element: <PrivateRoute>
                    <UpdateProperty></UpdateProperty>
                </PrivateRoute>,
                loader: ({params}) => fetch (`http://localhost:3000/properties/${params.id}`)
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