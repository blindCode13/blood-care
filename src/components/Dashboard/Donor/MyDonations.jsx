import DashboardNav from "../Shared/DashboardNav";
import { FiEye, FiCheck, FiX } from "react-icons/fi";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../Shared/Loading";
import { useState } from "react";
import { toast } from "react-toastify";

const MyDonations = () => {
  const { user } = useAuth();
  const [filterOption, setFilterOption] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingCount, setProcessingCount] = useState(0);
  const { data: requests = {}, isLoading } = useQuery({
    queryKey: ["requesterEmail", "donationStatus", filterOption, processingCount],
    queryFn: async () => {
      const result = await axios(
        `${import.meta.env.VITE_SERVER_API_URL}/donations?email=${
          user.email
        }&statusFilter=${filterOption}`
      );
      return result.data;
    },
  });

  const statusStyle = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "inprogress":
        return "bg-blue-100 text-blue-700";
      case "done":
        return "bg-green-100 text-green-700";
      default:
        return "bg-red-100 text-red-700";
    }
  };

  return (
    <>
    <div className="space-y-10">
      <DashboardNav title="My Donations" />
      <div className="mt-20">
            <label className="mb-1 font-medium text-gray-800">
              Filter by donation status:
            </label>
            <select className="w-fit border border-gray-300 rounded-xl px-5 py-2 ml-4 bg-white outline-none cursor-pointer focus:border-(--primary-color)" onChange={(e) => setFilterOption(e.target.value === 'none' ? "" : e.target.value)}>
              <option>none</option>
              <option>inprogress</option>
              <option>done</option>
              <option>canceled</option>
            </select>
          </div>
          {
            isLoading && isProcessing && <Loading />
          }
      {requests.length === 0 && (
        <h1>No requests found.</h1>
        
      )}
      {requests.length > 0 && (
        <div className="space-y-4">
          <div className="hidden xl:block">
            <div className="grid grid-cols-8 gap-x-5 text-center px-4 py-3 text-sm text-gray-500 uppercase">
              <span>Recipient</span>
              <span>Location</span>
              <span>Date</span>
              <span>Time</span>
              <span>Blood</span>
              <span>Donor info</span>
              <span>Status</span>
              <span>Actions</span>
            </div>

            <div className="space-y-4">
              {requests.map((req) => (
                <div
                  key={req._id}
                  className="grid grid-cols-8 gap-x-5 items-center justify-items-center bg-white shadow-md rounded-xl px-4 py-5"
                >
                  <span className="font-medium">{req.recipientName}</span>

                  <span className="text-gray-700">
                    {req.recipientDistrict},<br /> {req.recipientUpazila}{" "}
                  </span>

                  <span>{req.donationDate}</span>
                  <span>{req.donationTime}</span>

                  <span className="px-3 w-fit py-1 rounded-full bg-(--primary-color)/10 text-(--primary-color) text-sm font-medium">
                    {req.bloodGroup}{" "}
                  </span>

                  <span className="text-gray-700">
                    {req.donorName ? req.donorName : "..."}
                    <br /> {req.donorEmail ? req.donorEmail : "..."}{" "}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full w-fit text-sm ${statusStyle(
                      req.donationStatus
                    )}`}
                  >
                    {req.donationStatus}{" "}
                  </span>

                  <div className="flex items-center gap-3">

                    {
                        req.donationStatus === 'inprogress' &&
                        <>
                            <button className="text-green-600 hover:text-green-800 cursor-pointer" title="confirm donation" onClick={async() => {
								try {
                                    setIsProcessing(true);
                                    await axios.patch(`${import.meta.env.VITE_SERVER_API_URL}/update-donation-status/${req._id}`, {donationStatus: 'done'});
                                    toast.success("Successfully confirmed donation.");
                                }
                                catch (err) { toast.error(err.message) }
                                finally {setProcessingCount(processingCount + 1); setIsProcessing(false);}					
						    }}>
                      <IoMdCheckmarkCircleOutline size={22} />
                    </button>

                    <button className="text-red-600 hover:text-red-800 cursor-pointer" title="cancel donation" onClick={async() => {
							try {
                                    setIsProcessing(true);
                                    await axios.patch(`${import.meta.env.VITE_SERVER_API_URL}/update-donation-status/${req._id}`, {donationStatus: 'canceled'});
                                    toast.success("Successfully canceled donation.");
                                }
                                catch (err) { toast.error(err.message) }
                                finally {setProcessingCount(processingCount + 1); setIsProcessing(false);}													
						}}>
                      <IoCloseCircleOutline size={22} />
                    </button>
                        </>
                    }

                    <Link
                      to={`/donation-requests/${req._id}`}
                      className="text-gray-700 hover:text-black"
                    >
                      <FiEye size={22} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="xl:hidden space-y-5">
            {requests.map((req) => (
              <div
                key={req._id}
                className="
											        bg-white
											        border border-gray-200
											        rounded-2xl
											        p-5
											        shadow-sm
											        hover:shadow-md
											        transition-all
											      "
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-0.5">
                    <h4 className="text-lg font-semibold text-(--primary-color)">
                      <span className="font-normal text-black">Recipient:</span>{" "}
                      {req.recipientName}{" "}
                    </h4>

                    <p className="text-xs mt-2 text-gray-500 line-clamp-1">
                      Location: &nbsp;
                      {req.recipientDistrict}, {req.recipientUpazila}{" "}
                    </p>

                    <p className="text-xs mt-2 text-gray-500 line-clamp-1">
                      Donor info: &nbsp;
                      {req.donorName ? req.donorName : "..."} ,{" "}
                      {req.donorEmail ? req.donorEmail : "..."}{" "}
                    </p>
                  </div>

                  <span
                    className={`
		            text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap
		            ${statusStyle(req.donationStatus)}
		          `}
                  >
                    {req.donationStatus}{" "}
                  </span>
                </div>

                <p className="text-gray-500 text-xs mt-2">
                  Donation scheduled for the selected date and time.
                </p>

                <div className="flex items-center gap-3 mt-3">
                  <span
                    className="
													          inline-flex items-center justify-center
													          bg-(--primary-color)/10
													          text-(--primary-color)
													          text-xs font-semibold
													          px-3 py-1 rounded-full
													        "
                  >
                    {req.bloodGroup}{" "}
                  </span>

                  <span className="text-xs text-gray-500">
                    📅 {req.donationDate}{" "}
                  </span>

                  <span className="text-xs text-gray-500">
                    ⏰ {req.donationTime}{" "}
                  </span>
                </div>

                <div
                  className="
												        flex items-center justify-between
												        mt-4 pt-3 border-t border-gray-200
												      "
                >
                  <div className="flex items-center gap-4 text-gray-600">

                    {
                        req.donationStatus === 'inprogress' &&
                        <>
                            <button className="text-green-600 hover:text-green-800 cursor-pointer" title="confirm donation" onClick={() => {
													
													
						}}>
                      <IoMdCheckmarkCircleOutline size={22} />
                    </button>

                    <button className="text-red-600 hover:text-red-800 cursor-pointer" title="cancel donation" onClick={() => {
													
													
						}}>
                      <IoCloseCircleOutline size={22} />
                    </button>
                        </>
                    }

                    <Link
                      to={`/donation-requests/${req._id}`}
                      className="hover:text-black"
                    >
                      <FiEye size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default MyDonations;
