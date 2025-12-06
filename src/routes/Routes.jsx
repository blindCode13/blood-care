import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import DonationRequest from "../pages/DonationRequest";
import Funding from "../pages/Funding";

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
    }
]);