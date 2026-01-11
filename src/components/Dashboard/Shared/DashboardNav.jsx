import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useThemeToggle } from "../../../hooks/useThemeToggle";
import { FiSun, FiMoon } from "react-icons/fi";

const DashboardNav = ({ title }) => {
    const { user } = useAuth();
    const themeToggle = useThemeToggle();
        const [isDark, setIsDark] = useState(
            typeof document !== "undefined" &&
            document.documentElement.getAttribute("data-theme") === "dark"
        );

    return (
        <div className="flex items-center justify-between gap-5">
            <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>

            <div className="flex items-center gap-4">
                <div className='items-center justify-center flex'>
                    <button
                        onClick={() => {
                            themeToggle();
                            setIsDark(!isDark);
                        }}
                        className={`relative w-16 h-8 rounded-full transition-colors duration-300 cursor-pointer
                            ${isDark ? "bg-gray-700" : "bg-gray-200"}`}
                    >
                        {/* Knob */}
                        <span
                            className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white
                                flex items-center justify-center
                                transition-transform duration-300 ease-in-out
                                ${isDark ? "translate-x-8" : "translate-x-0"}`}
                        >
                            {isDark ? (
                                <FiMoon className="text-black text-sm" />
                            ) : (
                                <FiSun className="text-black text-sm" />
                            )}
                        </span>
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    <img
                        src={user?.photoURL}
                        referrerPolicy="no-referrer"
                        className="size-12 rounded-full border-2 border-primary"
                        title={user?.email}
                    />
                    <h1 className="text-lg hidden sm:block">{user?.displayName}</h1>
                </div>
            </div>
        </div>
    );
};

export default DashboardNav;
