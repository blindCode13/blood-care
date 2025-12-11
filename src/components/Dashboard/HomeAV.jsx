
import { FiUsers, FiDollarSign, FiDroplet } from "react-icons/fi";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import DashboardNav from "./Shared/DashboardNav";
import Loading from "../Shared/Loading";

const HomeAV = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: [""],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_SERVER_API_URL}/application-stats`
      );
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  const items = [
    {
      title: "Total Users",
      count: stats.totalUsers,
      icon: <FiUsers size={32} />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Funding",
      count: `$${stats?.totalFunding}`,
      icon: <FiDollarSign size={32} />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Total Donation Requests",
      count: stats.totalDonationRequest,
      icon: <FiDroplet size={32} />,
      color: "bg-red-100 text-red-600",
    },
  ];

  return (
    <div className="space-y-10">
      <DashboardNav title="App Overview" />

      <div className="mt-8">
        <h2 className="text-3xl font-semibold">
          Welcome back,{" "}
          <span className="text-(--primary-color)">
            {user?.displayName}
          </span>
        </h2>
        <p className="text-gray-600 mt-1">
          Here's an overview of the platform performance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <div
            key={i}
            className="
              bg-white 
              shadow-md 
              rounded-2xl 
              p-6 
              border border-gray-100
              hover:shadow-lg 
              transition
              flex 
              items-center 
              gap-6
            "
          >
            <div
              className={`size-16 rounded-2xl flex items-center justify-center ${item.color}`}
            >
              {item.icon}
            </div>

            <div>
              <p className="text-gray-500">{item.title}</p>
              <h3 className="text-3xl font-bold mt-1">{item.count}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeAV;
