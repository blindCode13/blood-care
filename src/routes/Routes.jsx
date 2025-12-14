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
import DonationRequests from "../pages/DonationRequests";
import DonationRequestDetails from "../components/DonationRequestDetails";
import EditDonationRequest from "../components/EditDonationRequest";
import MyDonations from "../components/Dashboard/Donor/MyDonations";
import Loading from "../components/Shared/Loading";
import AdminRoute from "./AdminRoute";
import MyRequests from "../components/Dashboard/Donor/MyRequests";
import AllRequests from "../components/Dashboard/Admin/AllRequests";
import AllUsers from "../components/Dashboard/Admin/AllUsers";
import RolebasedHome from "../components/Dashboard/RolebasedHome";
import SearchDonors from "../pages/SearchDonors";
import PaymentSuccess from "../pages/PaymentSuccess";
import ErrorElement from "../components/ErrorElement";
import NotFound from "../components/Notfound";

export const routes = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        errorElement: <ErrorElement />,
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
                hydrateFallbackElement: <Loading />,
                element: <PrivateRoute><DonationRequestDetails /></PrivateRoute>
            },
            {
                path: "/donation-requests/edit/:id",
                loader: () => axios("../../src/data/location.json").then(res => res.data),
                element: <PrivateRoute><EditDonationRequest /></PrivateRoute>
            },
            {
                path: "/search-donors",
                Component: SearchDonors,
                loader: () => axios("../../src/data/location.json").then(res => res.data)
            },
            {
                path: "/funding",
                element: <PrivateRoute><Funding /></PrivateRoute>
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
        path: "/payment-success",
        Component: PaymentSuccess
    },
    {
        path: "*",
        Component: NotFound
    },

    {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
                index: true,
                Component: RolebasedHome
            },
            {
                path: "/dashboard/create-donation-request",
                Component: RequestDonation,
                loader: () => axios("../../src/data/location.json").then(res => res.data)
            },
            {
                path: "/dashboard/my-donation-requests",
                Component: MyRequests
            },
            {
                path: "/dashboard/all-blood-donation-request",
                element: <AllRequests />
            },
            {
                path: "/dashboard/all-users",
                element: <AdminRoute><AllUsers /></AdminRoute>
            },
            {
                path: "/dashboard/my-donations",
                Component: MyDonations
            },
            {
                path: "/dashboard/profile",
                loader: () => axios("../../src/data/location.json").then(res => res.data),
                Component: Profile
            }
        ]
    }
]);