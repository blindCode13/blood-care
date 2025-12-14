import useAuth from "../../../hooks/useAuth";

const DashboardNav = ({ title }) => {
    const { user } = useAuth();

    return (
        <div className="flex items-center justify-between gap-5">
            <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>

            <div className="flex items-center gap-2">
                <img 
                    src={user?.photoURL}
                    referrerPolicy="no-referrer"
                    className="size-12 rounded-full border-2 border-(--primary-color)"
                    title={user?.email}
                />
                <h1 className="text-lg hidden sm:block">{user?.displayName}</h1>
            </div>
        </div>
    );
};

export default DashboardNav;
