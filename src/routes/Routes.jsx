import { createBrowserRouter } from "react-router";
import axios from 'axios';
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import DonationRequest from "../pages/DonationRequest";
import Funding from "../pages/Funding";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ForgotPassword from "../pages/Auth/ForgotPassword";

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
                path: "/donation-request",
                Component: DonationRequest
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
    { path: "/forgot-password", Component: ForgotPassword }
]);