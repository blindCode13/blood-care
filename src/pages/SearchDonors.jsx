import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Loading from "../components/Shared/Loading";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const SearchDonors = () => {
  const districtData = useLoaderData().sort((a, b) =>
    a.district.localeCompare(b.district)
  );

  const navigate = useNavigate();
  const {user} = useAuth();
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [bloodGroup, setBloodGroup] = useState("all");

  const [searchKey, setSearchKey] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);

  const { data: users = [], isLoading } = useQuery({
    queryKey: [searchKey],
    enabled: hasSearched,
    queryFn: async () => {
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_SERVER_API_URL}/users/donors?blood=${encodeURIComponent(bloodGroup)}&district=${district}&upazila=${upazila}&currentUser=${user && user.email || null}`);
        return result.data;
      } catch (err) {
        toast.error(err.message);
      }
    },
  });

  const handleSearch = () => {
    if (district === 'All') setDistrict("");
    if (upazila === 'All') setUpazila("");
    setHasSearched(true);
    setSearchKey((prev) => prev + 1);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="space-y-10">

      <div className="bg-white shadow-lg rounded-3xl p-8 border border-gray-100 max-w-5xl mx-auto">

        <div className="flex flex-col lg:flex-row gap-6">

          <div className="flex-1">
            <label className="block mb-1 font-medium text-gray-800">
              Blood Group
            </label>
            <select
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-5 py-3 bg-white outline-none focus:border-(--primary-color)"
            >
              <option value="all">All</option>
              <option>A+</option><option>A-</option>
              <option>B+</option><option>B-</option>
              <option>AB+</option><option>AB-</option>
              <option>O+</option><option>O-</option>
            </select>
          </div>

          <div className="flex-1">
            <CustomDropdown
              label="District"
              selected={district}
              options={['All', ...districtData.map((d) => d.district)]}
              onSelect={(value) => {
                setDistrict(value);
                setUpazila("");
              }}
            />
          </div>

          <div className="flex-1">
            <CustomDropdown
              label="Upazila"
              selected={upazila}
              options={
                district
                  ? ["All", ...(districtData.find((d) => d.district === district)?.upazilas || [])]
                  : ["All"]
              }
              onSelect={setUpazila}
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={handleSearch}
              className="primary-btn px-10 py-3"
            >
              Search
            </button>
          </div>

        </div>
      </div>

      {hasSearched && (
        <div className="space-y-6">

          {users.length === 0 && (
            <h2 className="text-center text-gray-500">
              No donors found.
            </h2>
          )}

          {users.length > 0 && (
            <div className="hidden xl:block space-y-3">
              <div className="grid grid-cols-4 mx-auto max-w-[1200px] text-center gap-x-4 py-3 text-sm text-gray-500 uppercase">
                <span>Name</span>
                <span>Blood Group</span>
                <span>Location</span>
                <span>Action</span>
              </div>

              {users.map((user) => (
                <div
                  key={user._id}
                  className="grid grid-cols-4 gap-x-4 mx-auto max-w-[1200px] items-center justify-items-center bg-white shadow-md rounded-xl px-4 py-4"
                >
                  <span className="font-medium">{user.name}</span>

                  <span className="px-3 py-1 rounded-full bg-(--primary-color)/10 text-(--primary-color)">
                    {user.bloodGroup}
                  </span>

                  <span className="text-gray-700">
                    {user.district}, {user.upazila}
                  </span>

                  <button className="primary-btn px-4 py-1 text-sm" onClick={() => navigate("/dashboard/create-donation-request", {
                    state: {
                      donorInfo: {donorName: user.name, donorEmail: user.email, bloodGroup: user.bloodGroup}
                    }
                  })}>
                    Request
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="xl:hidden space-y-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold">{user.name}</p>

                  <span className="inline-block mt-2 px-3 py-1 rounded-full bg-(--primary-color)/10 text-(--primary-color)">
                    {user.bloodGroup}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mt-2">
                  {user.district}, {user.upazila}
                </p>

                <button className="primary-btn w-full mt-4" onClick={() => navigate("/dashboard/create-donation-request", {
                    state: {
                      donorInfo: {donorName: user.name, donorEmail: user.email, bloodGroup: user.bloodGroup}
                    }
                  })}>
                    Request</button>
              </div>
            ))}
          </div>

        </div>
      )}
    </div>
  );
};

export default SearchDonors;


const CustomDropdown = ({ label, options, selected, onSelect }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <label className="block mb-1 font-medium text-gray-800">{label}</label>

      <div
        className="w-full border border-gray-300 rounded-xl px-5 py-3 bg-white cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        {selected || "All"}
      </div>

      {open && (
        <div className="absolute left-0 right-0 mt-2 max-h-44 overflow-y-auto bg-white border border-gray-300 rounded-xl shadow-lg z-20">
          {options?.length > 0 ? (
            options.map((item) => (
              <div
                key={item}
                className="px-5 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  onSelect(item);
                  setOpen(false);
                }}
              >
                {item}
              </div>
            ))
          ) : (
            <div className="px-5 py-2 text-gray-400">No options</div>
          )}
        </div>
      )}
    </div>
  );
};
