import { FiGrid, FiUsers, FiFileText, FiLogOut } from "react-icons/fi";
import { LuFileUser } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { PiUsersThree } from "react-icons/pi";
import { NavLink, useNavigate } from "react-router";
import Logo from '../../../assets/Logo.png';
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import LogoutConfirmation from "../../Modals/LogoutConfirmation";
import useRole from "../../../hooks/useRole";
import Loading from "../../Shared/Loading";

const DashboardSidebar = () => {
    const navigate = useNavigate();
    const [modalShow, setModalShow] = useState(false);
    const {logOut} = useAuth();
    const [role, roleLoading] = useRole();

    if (roleLoading) return <Loading />

    return (
        <>
        {
            modalShow && <LogoutConfirmation setModalShow={setModalShow} logOut={logOut}></LogoutConfirmation>
        }
        <div className="
            h-screen bg-primary-bg shadow-lg flex flex-col fixed left-0 md:translate-x-0 top-0 z-50
            w-18 md:w-64
        ">
            
            <div
                className="flex flex-col md:flex-row items-center hover:-rotate-2 hover:scale-110 justify-center md:justify-start
                gap-2 cursor-pointer transition mt-6 md:pl-6"
                onClick={() => navigate("/")}
            >
                <img src={Logo} className="w-8" />
                <h1 className="font-bold text-2xl hidden md:block">Blood Care</h1>
            </div>

            <div className="flex-1 px-2 md:px-4 py-6 space-y-2 border-t border-gray-300/60 mt-4">

                <NavLink
                    to="/dashboard"
                    end
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition
                        justify-center md:justify-start
                        ${isActive ? "bg-primary text-white" : "hover:bg-primary/10"}`
                    }
                >
                    <FiGrid size={22} />
                    <span className="hidden md:block">Overview</span>
                </NavLink>

                {
                    role === 'donor' &&
                    <>
                        <NavLink
                    to="/dashboard/create-donation-request"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition
                        justify-center md:justify-start
                        ${isActive ? "bg-primary text-white" : "hover:bg-primary/10"}`
                    }
                >
                    <FiUsers size={22} />
                    <span className="hidden md:block">Request Donation</span>
                </NavLink>

                <NavLink
                    to="/dashboard/my-donation-requests"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition
                        justify-center md:justify-start
                        ${isActive ? "bg-primary text-white" : "hover:bg-primary/10"}`
                    }
                >
                    <FiFileText size={22} />
                    <span className="hidden md:block">My Requests</span>
                </NavLink>

                <NavLink
                    to="/dashboard/my-donations"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition
                        justify-center md:justify-start
                        ${isActive ? "bg-primary text-white" : "hover:bg-primary/10"}`
                    }
                >
                    <LuFileUser size={22} />
                    <span className="hidden md:block">My Donations</span>
                </NavLink>
                    </>
                }

                {
                    role === 'admin' &&
                    <NavLink
                    to="/dashboard/all-users"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition
                        justify-center md:justify-start
                        ${isActive ? "bg-primary text-white" : "hover:bg-primary/10"}`
                    }
                >
                    <PiUsersThree size={24} />
                    <span className="hidden md:block">All Users</span>
                </NavLink>
                }

                {
                    role !== 'donor' &&
                    <NavLink
                    to="/dashboard/all-blood-donation-request"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition
                        justify-center md:justify-start
                        ${isActive ? "bg-primary text-white" : "hover:bg-primary/10"}`
                    }
                >
                    <FiFileText size={22} />
                    <span className="hidden md:block">All Requests</span>
                </NavLink>
                }

            </div>

            <div className="px-2 md:px-4 pb-6 space-y-2 border-t border-gray-300/60">

                <NavLink
                    to="/dashboard/profile"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition mt-2
                        justify-center md:justify-start
                        ${isActive ? "bg-primary text-white" : "hover:bg-primary/10"}`
                    }
                >
                    <FaRegUser size={22} />
                    <span className="hidden md:block">Profile</span>
                </NavLink>

                <button
                    className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
                    hover:bg-primary/10 w-full text-left justify-center md:justify-start"
                    onClick={() => setModalShow(true)}
                >
                    <FiLogOut size={22} />
                    <span className="hidden md:block">Logout</span>
                </button>

            </div>
        </div>
        </>
    );
};

export default DashboardSidebar;
