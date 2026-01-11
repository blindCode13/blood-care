import { Outlet } from 'react-router';
import DashboardSidebar from '../components/Dashboard/Sidebar/DashboardSidebar';
import useAuth from '../hooks/useAuth';
import Loading from '../components/Shared/Loading';
import { useApplyTheme } from '../hooks/useApplyTheme';
import useRole from '../hooks/useRole';

const DashboardLayout = () => {
    const { loading } = useAuth();
    const [role, isRoleLoading] = useRole();
    useApplyTheme();

    if (loading || isRoleLoading) return <Loading />

    return (
        <>
            {
                role &&
                <div className="flex min-h-screen">
                    <DashboardSidebar />
                    <div className="flex-1 pt-6 px-4 md:px-10 md:ml-64 ml-18">
                        <Outlet />
                    </div>
                </div>
            }
        </>
    );
};

export default DashboardLayout;
