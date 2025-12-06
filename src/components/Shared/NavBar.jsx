import { NavLink, useNavigate } from 'react-router';
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import Logo from '../../assets/Logo.png';
import { useState } from 'react';


const NavItems = ({ close }) => (
    <>
        <ul className='flex flex-col lg:flex-row items-center justify-center gap-8'>
            <li><NavLink onClick={close} to="/">Home</NavLink></li>
            <li><NavLink onClick={close} to="/donation-request">Donation Requests</NavLink></li>
            <li><NavLink onClick={close} to="/funding">Funding</NavLink></li>
        </ul>
        <button onClick={close} className='primary-btn mt-6 lg:mt-0'>
            Login
        </button>
    </>
);

const NavBar = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <nav className='mt-6 px-8 py-5 flex items-center justify-between bg-white rounded-3xl fixed left-4 md:left-12 right-4 md:right-12 max-w-[1824px] mx-auto shadow-sm z-30'>
                <div className='flex items-center justify-center gap-4 cursor-pointer hover:-rotate-2 hover:scale-110 transition'
                    onClick={() => navigate("/")}>
                    <img src={Logo} className='w-8' />
                    <h1 className='font-bold text-2xl'>Blood Care</h1>
                </div>

                <ul className='lg:flex hidden items-center justify-center gap-8'>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/donation-request">Donation Requests</NavLink></li>
                    <li><NavLink to="/funding">Funding</NavLink></li>
                </ul>

                <button className='primary-btn hidden lg:flex' onClick={() => navigate("/login")}>Login</button>

                <div
                    className='text-(--primary-color) lg:hidden flex'
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    { menuOpen ? <IoClose size={40} /> : <FiMenu size={40} /> }
                </div>
            </nav>

            {menuOpen && (
                <div className="lg:hidden flex flex-col items-center fixed top-32 left-4 md:left-12 right-4 md:right-12 bg-white p-6 rounded-3xl shadow-lg z-30">
                    <NavItems close={() => {setMenuOpen(false); navigate("/login")}} />
                </div>
            )}
        </>
    );
};

export default NavBar;
