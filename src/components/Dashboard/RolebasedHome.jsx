import useRole from "../../hooks/useRole";
import DonorHome from "./Donor/DonorHome";
import HomeAV from "./HomeAV";

const RolebasedHome = () => {
    const role = useRole();

    if (role === 'donor') return <DonorHome />
    else return <HomeAV />
}

export default RolebasedHome;