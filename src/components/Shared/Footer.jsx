import { Link, useNavigate } from 'react-router';
import Logo from '../../assets/Logo.png';
import { FaFacebook, FaInstagram, FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";


const Footer = () => {
    const navigate = useNavigate();
    return (
        <div className='w-full my-8 px-8 py-8 bg-primary-bg rounded-3xl'>
            <div className='flex items-center justify-center gap-4 cursor-pointer w-fit mx-auto' onClick={() => navigate("/")}>
                <img src={Logo} className='w-8' />
                <h1 className='font-bold text-2xl'>Blood Care</h1>
            </div>
            <div className='my-12'>
                <p className='mb-5 text-sm text-primary-text/60 text-center max-w-[400px] mx-auto'>BloodCare is a community-driven platform designed to connect willing donors with patients in urgent need.</p>
                <ul className='flex flex-col md:flex-row items-center justify-center gap-5'>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/donation-requests">Donation Requests</Link></li>
                    <li><Link to="/funding">Funding</Link></li>
                </ul>
                <div className='flex items-center gap-4 text-2xl text-primary w-fit mx-auto mt-6'>
                <FaFacebook className='cursor-pointer'/>
                <FaXTwitter className='cursor-pointer'/>
                <FaInstagram className='cursor-pointer'/>
                <FaDiscord className='cursor-pointer'/>
            </div>
            </div>
            <p className='text-sm text-primary-text/60 text-center'>&copy; 2025 BloodCare. All rights reserved</p>
        </div>
    );
};

export default Footer;