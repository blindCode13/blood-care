import useRole from "../../hooks/useRole";
import Loading from "../Shared/Loading";
import DonorHome from "./Donor/DonorHome";
import HomeAV from "./HomeAV";

const RolebasedHome = () => {
    const [role, isRoleLoading] = useRole();
    
    if (isRoleLoading) return <Loading />

    if (role === 'donor') return <DonorHome />
    return <HomeAV />
}

export default RolebasedHome;