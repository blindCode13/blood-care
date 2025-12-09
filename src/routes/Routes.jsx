import { createBrowserRouter } from "react-router";
import axios from 'axios';
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Funding from "../pages/Funding";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import DashboardLayout from "../layouts/DashboardLayout";
import Profile from "../components/Dashboard/Shared/Profile";
import PrivateRoute from "./PrivateRoute";
import RequestDonation from "../components/Dashboard/Donor/RequestDonation";
import DashboardHome from "../components/Dashboard/Donor/DashboardHome";
import AllDonationReq from "../components/Dashboard/Donor/AllDonationReq";
import DonationRequests from "../pages/DonationRequests";
import DonationRequestDetails from "../components/DonationRequestDetails";
import EditDonationRequest from "../components/EditDonationRequest";

export const routes = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "/donation-requests",
                Component: DonationRequests
            },
            {
                path: "/donation-requests/:id",
                loader: ({params}) => axios(`${import.meta.env.VITE_SERVER_API_URL}/donation-requests/${params.id}`).then(res => res.data),
                element: <PrivateRoute><DonationRequestDetails /></PrivateRoute>
            },
            {
                path: "/donation-requests/edit/:id",
                loader: () => axios("../../src/data/location.json").then(res => res.data),
                element: <PrivateRoute><EditDonationRequest /></PrivateRoute>
            },
            {
                path: "/funding",
                Component: Funding
            }
        ]
    },

    { path: "/login", Component: Login },
    { 
        path: "/register",
        Component: Register,
        loader: () => axios("../../src/data/location.json").then(res => res.data)
    },
    { path: "/forgot-password", Component: ForgotPassword },

    {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
                index: true,
                Component: DashboardHome
            },
            {
                path: "/dashboard/create-donation-request",
                Component: RequestDonation,
                loader: () => axios("../../src/data/location.json").then(res => res.data)
            },
            {
                path: "/dashboard/my-donation-requests",
                Component: AllDonationReq
            },
            {
                path: "/dashboard/profile",
                Component: Profile
            }
        ]
    }
]);