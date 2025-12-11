import DashboardNav from "../Shared/DashboardNav";
import { FiLock, FiUnlock, FiUserCheck, FiShield } from "react-icons/fi";
import Loading from "../../Shared/Loading";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [processingCount, setProcessingCount] = useState(0);
  const [filterStatus, setFilterStatus] = useState("all");

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["allUsers", processingCount, filterStatus],
    queryFn: async () => {
      try {
        const result = await axiosSecure(
          `${import.meta.env.VITE_SERVER_API_URL}/users`
        );
        return result.data;
      } catch (err) {
        toast.error(err.message);
      }
    },
  });

  const filteredUsers =
    filterStatus === "all"
      ? users
      : users.filter((u) => u.status === filterStatus);

  const handleBlock = async (id) => {
    try {
      await axiosSecure.patch(`/users/block/${id}`);
      toast.success("User blocked successfully");
      setProcessingCount((p) => p + 1);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleUnblock = async (id) => {
    try {
      await axiosSecure.patch(`/users/unblock/${id}`);
      toast.success("User unblocked successfully");
      setProcessingCount((p) => p + 1);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const makeVolunteer = async (id) => {
    try {
      await axiosSecure.patch(`/users/make-volunteer/${id}`);
      toast.success("User role updated to volunteer");
      setProcessingCount((p) => p + 1);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const makeAdmin = async (id) => {
    try {
      await axiosSecure.patch(`/users/make-admin/${id}`);
      toast.success("User role updated to admin");
      setProcessingCount((p) => p + 1);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="space-y-10">
      <DashboardNav title="All Users" />

      {isLoading && <Loading />}

      {/* FILTER BUTTONS */}
      <div className="flex gap-4 mt-4">
        <button
          className={`px-4 py-2 rounded-xl border border-(--primary-color) cursor-pointer ${
            filterStatus === "all"
              ? "bg-(--primary-color) text-white"
              : "bg-white"
          }`}
          onClick={() => setFilterStatus("all")}
        >
          All
        </button>

        <button
          className={`px-4 py-2 rounded-xl border border-(--primary-color) cursor-pointer ${
            filterStatus === "active"
              ? "bg-(--primary-color) text-white"
              : "bg-white"
          }`}
          onClick={() => setFilterStatus("active")}
        >
          Active
        </button>

        <button
          className={`px-4 py-2 rounded-xl border border-(--primary-color) cursor-pointer ${
            filterStatus === "blocked"
              ? "bg-red-600 text-white"
              : "bg-white"
          }`}
          onClick={() => setFilterStatus("blocked")}
        >
          Blocked
        </button>
      </div>

      {/* DESKTOP TABLE */}
      {filteredUsers.length === 0 && <h1>Nothing to show.</h1>}
      {filteredUsers.length > 0 && (
        <div className="hidden xl:block space-y-4">
          <div className="grid grid-cols-7 text-center gap-x-4 py-3 text-sm text-gray-500 uppercase">
            <span>Avatar</span>
            <span>Email</span>
            <span>Name</span>
            <span>Role</span>
            <span>Status</span>
            <span>Block / Unblock</span>
            <span>Actions</span>
          </div>

          <div className="space-y-3">
            {filteredUsers.map((user) => (
              <div
                key={user._id}
                className="grid grid-cols-7 gap-x-4 items-center justify-items-center bg-white shadow-md rounded-xl px-4 py-4"
              >
                {/* AVATAR */}
                <img
                  src={user.avatar}
                  className="size-12 rounded-full object-cover border"
                />

                {/* EMAIL */}
                <span>{user.email}</span>

                {/* NAME */}
                <span className="font-medium">{user.name}</span>

                {/* ROLE */}
                <span className="capitalize text-gray-600">
                  {user.role}
                </span>

                {/* STATUS */}
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    user.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {user.status}
                </span>

                {/* BLOCK/UNBLOCK BUTTONS */}
                <div>
                  {user.status === "active" ? (
                    <button
                      onClick={() => handleBlock(user._id)}
                      className="text-red-600 hover:text-red-800 cursor-pointer"
                    >
                      <FiLock size={20} />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUnblock(user._id)}
                      className="text-green-600 hover:text-green-800 cursor-pointer"
                    >
                      <FiUnlock size={20} />
                    </button>
                  )}
                </div>

                {/* ACTIONS */}
                <div className="flex items-center gap-4">
                  {user.role !== "volunteer" && (
                    <button
                      onClick={() => makeVolunteer(user._id)}
                      className="text-(--primary-color) hover:text-(--primary-color) cursor-pointer"
                    >
                      <FiUserCheck size={20} />
                    </button>
                  )}

                  {user.role !== "admin" && (
                    <button
                      onClick={() => makeAdmin(user._id)}
                      className="text-blue-600 hover:text-blue-800 cursor-pointer"
                    >
                      <FiShield size={20} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MOBILE CARD VIEW */}
      <div className="xl:hidden space-y-4">
        {filteredUsers.map((user) => (
          <div
            key={user._id}
            className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <img
                src={user.avatar}
                className="size-14 rounded-full border object-cover"
              />
              <div>
                <p className="text-lg font-semibold">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>

              <span
                className={`ml-auto px-3 py-1 rounded-full text-sm ${
                  user.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {user.status}
              </span>
            </div>

            <p className="mt-2 text-sm text-gray-500">
              Role: {user.role}
            </p>

            <div className="flex items-center gap-6 mt-4 pt-3 border-t">
              {/* BLOCK/UNBLOCK */}
              {user.status === "active" ? (
                <button
                  onClick={() => handleBlock(user._id)}
                  className="text-red-600"
                >
                  <FiLock size={20} />
                </button>
              ) : (
                <button
                  onClick={() => handleUnblock(user._id)}
                  className="text-green-600"
                >
                  <FiUnlock size={20} />
                </button>
              )}

              {/* MAKE VOLUNTEER */}
              {user.role !== "volunteer" && (
                <button
                  onClick={() => makeVolunteer(user._id)}
                  className="text-(--primary-color)"
                >
                  <FiUserCheck size={20} />
                </button>
              )}

              {/* MAKE ADMIN */}
              {user.role !== "admin" && (
                <button
                  onClick={() => makeAdmin(user._id)}
                  className="text-blue-600"
                >
                  <FiShield size={20} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
