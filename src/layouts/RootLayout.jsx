import React from 'react';
import NavBar from '../components/Shared/NavBar';
import { Outlet } from 'react-router';
import Footer from '../components/Shared/Footer';
import useAuth from '../hooks/useAuth';
import Loading from '../components/Shared/Loading';

const RootLayout = () => {
    const {loading} = useAuth();

    if (loading) return <Loading />
    return (
        <div className='px-4 md:px-12 max-w-[1920px] mx-auto'>
            <NavBar></NavBar>
            <div className='pt-36 min-h-screen'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;