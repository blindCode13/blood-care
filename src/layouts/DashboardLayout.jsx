import { Outlet } from 'react-router';
import DashboardSidebar from '../components/Dashboard/Sidebar/DashboardSidebar';
import useAuth from '../hooks/useAuth';
import Loading from '../components/Shared/Loading';

const DashboardLayout = () => {
    const { loading } = useAuth();

    if (loading) return <Loading />;

    return (
        <div className="flex min-h-screen">

            <DashboardSidebar />
            <div className="flex-1 pt-6 px-4 md:px-10 md:ml-64 ml-20">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;
