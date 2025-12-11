import { Navigate } from "react-router";
import useRole from "../hooks/useRole";
import Loading from "../components/Shared/Loading";


const AdminRoute = ({ children }) => {
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) return <Loading />
  if (role === 'admin') return children;
  return <Navigate to='/' replace='true' />
}

export default AdminRoute;