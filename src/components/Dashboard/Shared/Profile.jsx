import { useState, useEffect } from "react";
import DashboardNav from "../Shared/DashboardNav";
import useAuth from "../../../hooks/useAuth";
import { Link, useLoaderData } from "react-router";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../Shared/Loading";
import { toast } from "react-toastify";
import { FiEdit2 } from "react-icons/fi";
import { imageUpload } from "../../../utils/utils";

const Profile = () => {
  const axiosSecure = useAxiosSecure();
  const { user, updateUserProfile } = useAuth();
  const districtsData = useLoaderData().sort((a, b) =>
    a.district.localeCompare(b.district)
  );

  const {
    data: userData = {},
    isLoading: loadingUser,
    refetch,
  } = useQuery({
    queryKey: ["profile", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `${import.meta.env.VITE_SERVER_API_URL}/users/${user.email}`
      );
      return res.data;
    },
  });

  const [editMode, setEditMode] = useState(false);
  const [avatarName, setAvatarName] = useState("No file chosen");
  const [processing, setProcessing] = useState(false);

  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const [triggerError, setTriggerError] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      bloodGroup: "",
    },
  });

  useEffect(() => {
    if (userData && Object.keys(userData).length) {
      reset({
        name: userData.name || "",
        bloodGroup: userData.bloodGroup || "",
      });

      setSelectedDistrict(userData.district || "");
      setSelectedUpazila(userData.upazila || "");
      setAvatarName("No file chosen");
      setTriggerError(false);
    }
  }, [userData, reset]);

  if (loadingUser || processing) return <Loading />;

  const onSubmit = async (formData) => {
    if (!selectedDistrict || !selectedUpazila) {
      setTriggerError(true);
      return;
    }

    setProcessing(true);

    let avatarURL = userData.avatar;
    const file = document.getElementById("avatarInput")?.files?.[0];
    if (file) {
      try {
        avatarURL = await imageUpload(file);
      } catch (err) {
        toast.error(err.message);
        setProcessing(false);
        return;
      }
    }

    const updatedData = {
      name: formData.name,
      avatar: avatarURL,
      bloodGroup: formData.bloodGroup,
      district: selectedDistrict,
      upazila: selectedUpazila,
    };

    try {
      await axiosSecure.patch(
        `${import.meta.env.VITE_SERVER_API_URL}/users/update/${user.email}`,
        updatedData
      );
      await updateUserProfile(formData.name, avatarURL);
      toast.success("Profile updated");
      setEditMode(false);
      setAvatarName("No file chosen");
      setTriggerError(false);
      refetch();
    } catch (err) {
      toast.error(err.message || "Update failed");
    } finally {
      setProcessing(false);
    }
  };

  const handleDiscard = () => {
    reset({
      name: userData.name || "",
      bloodGroup: userData.bloodGroup || "",
    });
    setSelectedDistrict(userData.district || "");
    setSelectedUpazila(userData.upazila || "");
    setAvatarName("No file chosen");
    setEditMode(false);
    setTriggerError(false);
  };

  return (
    <>
      <DashboardNav title="My Profile" />

      <div className="max-w-5xl mx-auto my-10 grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-4 bg-primary-bg rounded-3xl shadow-lg p-6 border border-gray-300/40 flex flex-col items-center">
          <img
            src={user.photoURL}
            className="w-44 h-44 rounded-full object-cover border-4 border-primary"
            referrerPolicy="no-referrer"
            alt="avatar"
          />

          <h2 className="text-2xl font-semibold mt-5">{user.displayName}</h2>
          <p className="text-primary-text/60 text-sm">{user.email}</p>

          <div className="flex items-center gap-3 mt-3">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
              {userData.role}
            </span>

            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                userData.status === "active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {userData.status}
            </span>
          </div>

          <div className="text-red-400 text-sm mt-4 hover:underline hover:text-red-600 cursor-pointer">
            <Link to="/forgot-password" state={user.email}>Request password reset</Link>
            </div>

          {!editMode && (
            <button
              onClick={() => setEditMode(true)}
              className="mt-6 flex items-center gap-2 text-blue-400 cursor-pointer"
            >
              <FiEdit2 size={18} /> Edit Profile
            </button>
          )}
        </div>

        <div className="lg:col-span-8 bg-primary-bg rounded-3xl shadow-lg p-8 border border-gray-300/60">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                disabled={!editMode}
                className={`w-full border border-gray-400/50 rounded-xl px-5 py-3 outline-none ${
                  editMode ? "focus:border-primary" : "bg-primary-text/8"
                }`}
                defaultValue={userData.name}
              />
              {errors.name && (
                <p className="text-red-600 mt-1 ml-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                value={userData.email}
                readOnly
                disabled
                className="w-full border border-gray-400/50 rounded-xl px-5 py-3 bg-primary-text/8"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Change Avatar</label>

              <div
                className={`w-full border border-gray-400/50 rounded-xl px-4 py-3 flex items-center justify-between cursor-pointer bg-primary-bg ${
                  !editMode ? "opacity-50 pointer-events-none" : ""
                }`}
                onClick={() => editMode && document.getElementById("avatarInput").click()}
              >
                <span className="text-sm line-clamp-1">{avatarName}</span>

                <span
                  className="px-3 py-1 rounded-lg text-sm text-white"
                  style={{
                    backgroundColor:
                      avatarName === "No file chosen" ? "var(--primary-color)" : "green",
                  }}
                >
                  {avatarName === "No file chosen" ? "Choose" : "Selected"}
                </span>
              </div>

              <input
                id="avatarInput"
                type="file"
                accept="image/*"
                className="hidden"
                disabled={!editMode}
                onChange={(e) => setAvatarName(e.target.files[0]?.name || "No file chosen")}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CustomDropdown
                label="District"
                selected={selectedDistrict}
                disabled={!editMode}
                options={districtsData.map((d) => d.district)}
                onSelect={(val) => {
                  if (!editMode) return;
                  setSelectedDistrict(val);
                  setSelectedUpazila("");
                }}
              />

              <CustomDropdown
                label="Upazila"
                selected={selectedUpazila}
                disabled={!editMode}
                options={
                  selectedDistrict
                    ? districtsData.find((d) => d.district === selectedDistrict)?.upazilas || []
                    : []
                }
                onSelect={(val) => editMode && setSelectedUpazila(val)}
              />
            </div>

            {triggerError && !selectedDistrict && (
              <p className="text-red-600 mt-1 ml-1">Please select district</p>
            )}
            {triggerError && !selectedUpazila && (
              <p className="text-red-600 mt-1 ml-1">Please select upazila</p>
            )}

            <div>
              <label className="block mb-1 font-medium">Blood Group</label>
              <select
                {...register("bloodGroup", { required: "Blood group is required" })}
                disabled={!editMode}
                className={`w-full border border-gray-400/50 rounded-xl px-5 py-3 outline-none cursor-pointer ${
                  editMode ? "focus:border-primary" : "bg-primary-text/8"
                }`}
                defaultValue={userData.bloodGroup}
              >
                <option value="">Select</option>
                <option>A+</option><option>A-</option>
                <option>B+</option><option>B-</option>
                <option>AB+</option><option>AB-</option>
                <option>O+</option><option>O-</option>
              </select>
              {errors.bloodGroup && (
                <p className="text-red-600 mt-1 ml-1">{errors.bloodGroup.message}</p>
              )}
            </div>

            {editMode && (
              <div className="flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  onClick={handleDiscard}
                  className="secondery-btn"
                >
                  Discard
                </button>

                <button type="submit" className="primary-btn px-6 py-2">
                  Update Profile
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

const CustomDropdown = ({ label, options, selected, onSelect, disabled }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <label className="block mb-1 font-medium">{label}</label>

      <div
        className={`w-full border border-gray-400/50 rounded-xl px-5 py-3 bg-primary-bg cursor-pointer ${
          disabled ? "opacity-50 pointer-events-none bg-gray-100" : ""
        }`}
        onClick={() => !disabled && setOpen(!open)}
      >
        {selected || "Select an option"}
      </div>

      {open && (
        <div className="absolute left-0 right-0 mt-2 max-h-44 overflow-y-auto bg-primary-bg border border-gray-400/50 rounded-xl shadow-lg z-20">
          {options.length > 0 ? (
            options.map((item) => (
              <div
                key={item}
                className="px-5 py-2 hover:bg-primary-text/8 cursor-pointer"
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

export default Profile;
