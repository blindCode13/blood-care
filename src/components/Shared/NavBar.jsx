import { NavLink, useNavigate } from 'react-router';
import { FiLogOut, FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import Logo from '../../assets/Logo.png';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import LogoutConfirmation from '../Modals/LogoutConfirmation';
import { FiSun, FiMoon } from "react-icons/fi";
import { useThemeToggle } from '../../hooks/useThemeToggle';


const NavBar = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const themeToggle = useThemeToggle();
    const [isDark, setIsDark] = useState(
        typeof document !== "undefined" &&
        document.documentElement.getAttribute("data-theme") === "dark"
    );



    return (
        <>
            <nav className='mt-6 px-8 py-5 flex items-center justify-between bg-primary-bg rounded-3xl fixed left-4 md:left-12 right-4 md:right-12 max-w-[1824px] mx-auto shadow-sm z-30'>

                {
                    dropdown && <ProfileDropdown userData={user} setDropDown={setDropdown} setModalShow={setModalShow} navigate={navigate}></ProfileDropdown>
                }
                {
                    modalShow && <LogoutConfirmation setModalShow={setModalShow} logOut={logOut}></LogoutConfirmation>
                }

                <div className='flex items-center justify-center gap-4 cursor-pointer hover:-rotate-2 hover:scale-110 transition'
                    onClick={() => navigate("/")}>
                    <img src={Logo} className='w-8' />
                    <h1 className='font-bold text-2xl'>Blood Care</h1>
                </div>

                <ul className='lg:flex hidden items-center justify-center gap-6'>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/donation-requests">Donation Requests</NavLink></li>
                    <li><NavLink to="/search-donors">Search Donors</NavLink></li>
                    <li><NavLink to="/funding">Funding</NavLink></li>
                </ul>

                <div className='text-primary flex items-center gap-2'>
                    <div className='items-center justify-center hidden lg:flex'>
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
                    {
                        !user && <button className='primary-btn hidden lg:flex' onClick={() => navigate("/login")}>Login</button>
                    }
                    <div className='lg:hidden flex' onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <IoClose size={40} /> : <FiMenu size={40} />}
                    </div>

                    {
                        user &&
                        <img src={user && user.photoURL} referrerPolicy="no-referrer" className='size-12 rounded-full border-2 border-primary cursor-pointer' onClick={() => setDropdown(!dropdown)} />
                    }
                </div>


            </nav>

            {menuOpen && (
                <div className="lg:hidden flex flex-col items-center fixed top-32 left-4 md:left-12 right-4 md:right-12 bg-primary-bg p-6 rounded-3xl shadow-lg z-20 border border-gray-200/20">
                    <NavItems close={() => { setMenuOpen(false) }} dropdown={dropdown} setDropDown={setDropdown} user={user} navigate={navigate} isDark={isDark} setIsDark={setIsDark} themeToggle={themeToggle}/>
                </div>
            )}
        </>
    );
};


const NavItems = ({ close, user, navigate, isDark, setIsDark, themeToggle }) => (
    <>
        <ul className='flex flex-col lg:flex-row items-center justify-center gap-8'>
            <li><NavLink onClick={close} to="/">Home</NavLink></li>
            <li><NavLink onClick={close} to="/donation-requests">Donation Requests</NavLink></li>
            <li><NavLink to="/search-donors">Search Donors</NavLink></li>
            <li><NavLink onClick={close} to="/funding">Funding</NavLink></li>
        </ul>
        <div className='flex items-center justify-center mt-4'>
            <button
                onClick={() => {
                    themeToggle();
                    setIsDark(!isDark);
                }}
                className={`relative w-16 h-8 rounded-full transition-colors duration-300
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
        <div>
            {
                !user &&
                <button className='primary-btn mt-4' onClick={() => navigate("/login")}>Login</button>
            }
        </div>
    </>
);

const ProfileDropdown = ({ setDropDown, userData, setModalShow, navigate }) => {
    return (
        <div className="absolute right-4 -bottom-64 w-80 bg-primary-bg shadow-xl rounded-2xl overflow-hidden border border-gray-200/20">

            <div className="px-5 py-4 border-b border-gray-200/20 flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold">{userData.displayName}</h2>
                    <div className="flex items-center text-primary-text/60 text-sm mt-1">
                        {userData.email}
                    </div>
                </div>
                <div>
                    <IoMdCloseCircle className="size-7 text-primary cursor-pointer" onClick={() => setDropDown(false)} />
                </div>
            </div>

            <div className="py-2">
                <button className="w-full flex items-center gap-3 px-5 py-3 text-primary-text/80 hover:bg-primary/10 transition cursor-pointer" onClick={() => { navigate("/dashboard"); setDropDown(false) }}>
                    <MdSpaceDashboard className="text-primary" size={20} />
                    Dashboard
                </button>

                <button className="w-full flex items-center gap-3 px-5 py-3 text-primary-text/80 hover:bg-primary/10 transition cursor-pointer" onClick={() => { navigate("/dashboard/profile"); setDropDown(false) }}>
                    <FaUser className="text-primary" size={20} />
                    Profile
                </button>
            </div>

            <div className="border-t border-gray-200/20">
                <button className="w-full flex items-center gap-3 px-5 py-3 text-primary-text/80 hover:bg-primary/10 transition cursor-pointer"
                    onClick={() => {
                        setDropDown(false);
                        setModalShow(true);
                    }}>
                    <FiLogOut className="text-primary" size={20} />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default NavBar;
